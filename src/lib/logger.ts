/**
 * Structured logging utility for Vercel deployment
 * Compatible with Vercel's logging system and external logging services
 *
 * @example
 * logger.info('User logged in', { userId: '123', email: 'user@example.com' });
 * logger.error('Database connection failed', { error: err.message });
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  requestId?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Format log entry as JSON for structured logging
   */
  private formatLog(level: LogLevel, message: string, context?: Record<string, any>): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      requestId: this.getRequestId(),
    };
  }

  /**
   * Get request ID from headers if available (for tracing)
   */
  private getRequestId(): string | undefined {
    // In a real implementation, this would get the request ID from AsyncLocalStorage or context
    // For now, return undefined
    return undefined;
  }

  /**
   * Log with debug level (development only)
   */
  debug(message: string, context?: Record<string, any>) {
    if (this.isDevelopment) {
      const log = this.formatLog('debug', message, context);
      console.debug(JSON.stringify(log));
    }
  }

  /**
   * Log with info level
   */
  info(message: string, context?: Record<string, any>) {
    const log = this.formatLog('info', message, context);
    console.log(JSON.stringify(log));
  }

  /**
   * Log with warn level
   */
  warn(message: string, context?: Record<string, any>) {
    const log = this.formatLog('warn', message, context);
    console.warn(JSON.stringify(log));
  }

  /**
   * Log with error level
   */
  error(message: string, context?: Record<string, any>, error?: Error) {
    const log = this.formatLog('error', message, {
      ...context,
      ...(error && {
        errorName: error.name,
        errorMessage: error.message,
        // Only include stack trace in development
        ...(this.isDevelopment && { stack: error.stack }),
      }),
    });
    console.error(JSON.stringify(log));
  }
}

// Export singleton instance
export const logger = new Logger();

/**
 * Helper function to time async operations and log duration
 *
 * @example
 * await timeOperation(async () => {
 *   await expensiveOperation();
 * }, 'Expensive operation');
 */
export async function timeOperation<T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> {
  const startTime = Date.now();
  try {
    const result = await operation();
    const duration = Date.now() - startTime;
    logger.info(`${operationName} completed`, { duration: `${duration}ms` });
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(`${operationName} failed`, { duration: `${duration}ms` }, error as Error);
    throw error;
  }
}
