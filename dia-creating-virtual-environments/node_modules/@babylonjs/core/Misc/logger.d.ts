/**
 * Logger used throughout the application to allow configuration of
 * the log level required for the messages.
 */
export declare class Logger {
    /**
     * No log
     */
    static readonly NoneLogLevel = 0;
    /**
     * Only message logs
     */
    static readonly MessageLogLevel = 1;
    /**
     * Only warning logs
     */
    static readonly WarningLogLevel = 2;
    /**
     * Only error logs
     */
    static readonly ErrorLogLevel = 4;
    /**
     * All logs
     */
    static readonly AllLogLevel = 7;
    /**
     * Message to display when a message has been logged too many times
     */
    static MessageLimitReached: string;
    private static _LogCache;
    private static _LogLimitOutputs;
    private static _Levels;
    /**
     * Gets a value indicating the number of loading errors
     * @ignorenaming
     */
    static errorsCount: number;
    /**
     * Callback called when a new log is added
     */
    static OnNewCacheEntry: (entry: string) => void;
    private static _CheckLimit;
    private static _GenerateLimitMessage;
    private static _AddLogEntry;
    private static _FormatMessage;
    private static _LogDisabled;
    private static _LogEnabled;
    /**
     * Log a message to the console
     */
    static Log: (message: string | any[], limit?: number) => void;
    /**
     * Write a warning message to the console
     */
    static Warn: (message: string | any[], limit?: number) => void;
    /**
     * Write an error message to the console
     */
    static Error: (message: string | any[], limit?: number) => void;
    /**
     * Gets current log cache (list of logs)
     */
    static get LogCache(): string;
    /**
     * Clears the log cache
     */
    static ClearLogCache(): void;
    /**
     * Sets the current log level (MessageLogLevel / WarningLogLevel / ErrorLogLevel)
     */
    static set LogLevels(level: number);
}
