/**
 * Class for storing data to local storage if available or in-memory storage otherwise
 */
export declare class DataStorage {
    private static _Storage;
    private static _GetStorage;
    /**
     * Reads a string from the data storage
     * @param key The key to read
     * @param defaultValue The value if the key doesn't exist
     * @returns The string value
     */
    static ReadString(key: string, defaultValue: string): string;
    /**
     * Writes a string to the data storage
     * @param key The key to write
     * @param value The value to write
     */
    static WriteString(key: string, value: string): void;
    /**
     * Reads a boolean from the data storage
     * @param key The key to read
     * @param defaultValue The value if the key doesn't exist
     * @returns The boolean value
     */
    static ReadBoolean(key: string, defaultValue: boolean): boolean;
    /**
     * Writes a boolean to the data storage
     * @param key The key to write
     * @param value The value to write
     */
    static WriteBoolean(key: string, value: boolean): void;
    /**
     * Reads a number from the data storage
     * @param key The key to read
     * @param defaultValue The value if the key doesn't exist
     * @returns The number value
     */
    static ReadNumber(key: string, defaultValue: number): number;
    /**
     * Writes a number to the data storage
     * @param key The key to write
     * @param value The value to write
     */
    static WriteNumber(key: string, value: number): void;
}
