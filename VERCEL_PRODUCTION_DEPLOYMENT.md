# Vercel Deployment Guide - 2026 Production Standards

This document outlines the complete deployment process and production requirements for the GAPP (Grocery App) project on Vercel.

## Pre-Deployment Checklist

### ✅ Security & Secrets
- [ ] `.env.local` is **NOT** committed to git (verify with `git ls-files | grep env`)
- [ ] All sensitive credentials are added to Vercel Environment Variables dashboard
- [ ] `SEED_API_SECRET` environment variable is set and secured
- [ ] No stack traces or sensitive data in API responses
- [ ] Content Security Policy headers are configured (see middleware.ts)

### ✅ Environment Variables Setup
Before deploying, set these in Vercel Dashboard > Settings > Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = (your anon key)
SEED_API_SECRET = (generate a secure random string)
NODE_ENV = production
```

**How to find Supabase credentials:**
1. Go to https://supabase.com > Your Project
2. Settings > API > Copy Project URL and Anon Key
3. Store these values in Vercel Environment Variables (not in `.env.local`)

### ✅ Build Process
- [ ] `npm run build` completes without errors
- [ ] `npm run type-check` passes (TypeScript strict mode)
- [ ] No unused imports or variables
- [ ] All environment variables present

**Run locally before deploying:**
```bash
npm run type-check
npm run build
npm run lint
```

### ✅ Performance
- [ ] Database initialization is cached (5-minute TTL)
- [ ] Product list uses ISR (revalidates every 5 minutes)
- [ ] API routes have appropriate timeout configurations
- [ ] Cache headers are set on responses
- [ ] Images use Next.js Image compression

### ✅ Monitoring & Health Checks
- [ ] `/api/health` endpoint is accessible
- [ ] Vercel Health Checks configured to use `/api/health`
- [ ] Logs are structured and parseable (JSON format)
- [ ] Request IDs are tracked for tracing

## Deployment Steps

### 1. Prepare Repository
```bash
# Ensure .env.local is NOT tracked
git status | grep env.local  # Should show nothing

# Verify no sensitive data in code or commits
git log --all --oneline --grep="password\|secret\|key" --ignore-case

# Add and commit all changes
git add .
git commit -m "chore: Production deployment optimization - security hardening, caching, monitoring"
git push origin main
```

### 2. Deploy to Vercel
**Option A: Automatic (Recommended)**
- Vercel automatically deploys when you push to main branch
- Monitor the deployment at https://vercel.com/your-username/gapp/deployments

**Option B: Manual Deployment**
1. Go to https://vercel.com/dashboard/alihamza-khan/gapp
2. Click "Deploy" or trigger redeploy
3. Wait for build to complete (typically 2-3 minutes)

### 3. Configure Vercel Settings

**Environment Variables:**
- Go to Settings > Environment Variables
- Add all variables from `.env.example`
- Ensure `SEED_API_SECRET` is set

**Domains:**
- Configure production domain (if using custom domain)
- Update DNS records to point to Vercel

**Build & Development:**
- Framework: Next.js (auto-detected)
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `.next`
- Node.js Version: 20.x (or latest)

**Functions:**
- Memory: 1024 MB (default)
- Max Duration: 60 seconds for API routes

### 4. Post-Deployment Verification

#### Health Checks
```bash
# Test health endpoint
curl https://your-vercel-app.vercel.app/api/health

# Should return status: 'ok' with database connectivity info
```

#### Smoke Tests
```bash
# 1. Home page loads
curl https://your-vercel-app.vercel.app

# 2. Products page works
curl https://your-vercel-app.vercel.app/products

# 3. Database is seeded (check FreshCart app)
# Visit https://your-vercel-app.vercel.app and see products

# 4. API accepts orders
curl -X POST https://your-vercel-app.vercel.app/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "1234567890",
    "address": "123 Main St",
    "city": "City",
    "zipCode": "12345",
    "items": [{"id": "1", "name": "Test", "price": 10, "quantity": 1}],
    "total": 10
  }'
```

#### Monitor Logs
1. Go to Vercel Dashboard > Deployments > Recent Deployment
2. Click "Logs" to view real-time logs
3. Look for:
   - `status: 'ok'` in health check logs
   - No error messages
   - Request tracing with request IDs

#### Performance Metrics
1. Go to Vercel Analytics
2. Check:
   - Page Load Time (should be <2s)
   - Number of deployments
   - Error rate (should be 0%)

## API Endpoints

### Public Endpoints
| Endpoint | Method | Description | Cache |
|----------|--------|-------------|-------|
| `/` | GET | Home page with featured products | 5 min ISR |
| `/products` | GET | Product listing page | 5 min ISR |
| `/cart` | GET | Shopping cart page | No cache |
| `/api/health` | GET | Health check status | 1 min |

### Protected Endpoints
| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/seed` | POST | Database seeding | `x-seed-secret` header |
| `/api/orders` | POST | Create order | None (public) |

**Seed Endpoint Usage:**
```bash
curl -X POST https://your-vercel-app.vercel.app/api/seed \
  -H "x-seed-secret: $SEED_API_SECRET" \
  -H "Content-Type: application/json"
```

## Error Handling & Troubleshooting

### Build Fails
**Error:** `Module not found: Can't resolve '@/components/ui'`
- **Solution:** Run `npm install` locally and verify `src/components/ui/index.ts` exists

**Error:** `TypeScript error: Property 'X' does not exist`
- **Solution:** Run `npm run type-check` locally to find issues before deploying

### Environment Variables Not Working
**Issue:** `NEXT_PUBLIC_SUPABASE_URL is undefined`
- **Solution:** 
  1. Verify variable is set in Vercel > Settings > Environment Variables
  2. Redeploy (new deployments pick up new variables)
  3. Check variable name exactly (case-sensitive)

### Database Connection Issues
**Error:** `Database connection timeout`
- **Solution:**
  1. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
  2. Check Supabase project is active (go to supabase.com dashboard)
  3. Verify RLS (Row Level Security) policies allow anonymous access

### Seed Endpoint Returns 401
**Error:** `Unauthorized`
- **Solution:**
  1. Ensure `SEED_API_SECRET` is set in Vercel Environment Variables
  2. Include `x-seed-secret` header in seed requests
  3. Verify header value matches environment variable exactly

### Orders API Returns 500
**Error:** `Failed to create order`
- **Solution:**
  1. Check database connectivity with `/api/health` endpoint
  2. Verify Supabase `orders` table exists and has correct columns
  3. Check Supabase RLS policies allow inserts
  4. Review Vercel logs for specific error messages

## Performance Optimization

### Database
- Product initialization caches for 5 minutes to avoid redundant seeding
- Products are revalidated via ISR every 5 minutes
- Use indexesdatabases on frequently queried columns

### Caching Strategy
- **Static pages**: Revalidated every 5 minutes (ISR)
- **API responses**: Cached per endpoint configuration in `vercel.json`
- **Client-side**: Cart stored in localStorage (hydration-safe)

### Monitoring
- Security headers prevent XSS and clickjacking attacks
- All requests logged with request ID for tracing
- Structured logging (JSON format) for easy parsing

## Maintenance

### Regular Checks
- Monitor error rate in Vercel Analytics (should be <0.1%)
- Review function execution time (should be <10s for most endpoints)
- Check build times (should be <5 minutes)

### Updating
1. Make code changes locally
2. Run `npm run build` and `npm run type-check` to verify
3. Push to main branch
4. Vercel automatically deploys

### Scaling
If you experience performance issues:
1. Increase function memory in `vercel.json`
2. Enable Vercel Edge Caching for frequently accessed endpoints
3. Consider database connection pooling if using frequent DB queries

## References

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel Function Configuration](https://vercel.com/docs/serverless-functions/runtimes)

## Support

For deployment issues:
1. Check Vercel build logs: https://vercel.com/dashboard/alihamza-khan/gapp/deployments
2. Review Supabase project status: https://supabase.com/dashboard
3. Check GitHub Actions logs (if using CI/CD)
