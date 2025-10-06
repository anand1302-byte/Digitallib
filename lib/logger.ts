export class Logger {
  private static log(level: string, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${level}: ${message}`;
    
    if (data) {
      console.log(logMessage, data);
    } else {
      console.log(logMessage);
    }
  }

  static info(message: string, data?: any) {
    this.log('INFO', message, data);
  }

  static error(message: string, error?: any) {
    this.log('ERROR', message, error);
  }

  static warn(message: string, data?: any) {
    this.log('WARN', message, data);
  }

  static success(message: string, data?: any) {
    this.log('SUCCESS', message, data);
  }

  static db(operation: string, collection?: string, data?: any) {
    const message = collection ? `DB ${operation} on ${collection}` : `DB ${operation}`;
    this.log('DB', message, data);
  }
}