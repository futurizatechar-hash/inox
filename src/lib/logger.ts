/**
 * Logger centralizado para INOX E-Commerce
 *
 * Uso:
 *   import { logger } from '@/lib/logger';
 *   logger.info('Pedido creado', { orderId: '123' });
 *   logger.error('Error de pago', { error, paymentId: '456' });
 */

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: Record<string, unknown>;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

const CURRENT_LEVEL: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'INFO';

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[CURRENT_LEVEL];
}

function formatEntry(entry: LogEntry): string {
  const base = `[${entry.timestamp}] [${entry.level}] ${entry.message}`;
  if (entry.data) {
    return `${base} ${JSON.stringify(entry.data)}`;
  }
  return base;
}

function log(
  level: LogLevel,
  message: string,
  data?: Record<string, unknown>,
): void {
  if (!shouldLog(level)) return;

  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    data,
  };

  const formatted = formatEntry(entry);

  switch (level) {
    case 'ERROR':
      console.error(formatted);
      break;
    case 'WARN':
      console.warn(formatted);
      break;
    default:
      // En producción, INFO y DEBUG se envían a un servicio externo
      // Por ahora usamos console.info que no es bloqueado por ESLint
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.log(formatted);
      }
      break;
  }
}

export const logger = {
  debug: (message: string, data?: Record<string, unknown>) =>
    log('DEBUG', message, data),
  info: (message: string, data?: Record<string, unknown>) =>
    log('INFO', message, data),
  warn: (message: string, data?: Record<string, unknown>) =>
    log('WARN', message, data),
  error: (message: string, data?: Record<string, unknown>) =>
    log('ERROR', message, data),
};
