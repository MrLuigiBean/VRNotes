/**
 * Extracts the characters between two markers (for eg, between "(" and ")"). The function handles nested markers as well as markers inside strings (delimited by ", ' or `) and comments
 * @param markerOpen opening marker
 * @param markerClose closing marker
 * @param block code block to parse
 * @param startIndex starting index in block where the extraction must start. The character at block[startIndex] should be the markerOpen character!
 * @returns index of the last character for the extraction (or -1 if the string is invalid - no matching closing marker found). The string to extract (without the markers) is the string between startIndex + 1 and the returned value (exclusive)
 */
export declare function ExtractBetweenMarkers(markerOpen: string, markerClose: string, block: string, startIndex: number): number;
/**
 * Parses a string and skip whitespaces
 * @param s string to parse
 * @param index index where to start parsing
 * @returns the index after all whitespaces have been skipped
 */
export declare function SkipWhitespaces(s: string, index: number): number;
/**
 * Checks if a character is an identifier character (meaning, if it is 0-9, A-Z, a-z or _)
 * @param c character to check
 * @returns true if the character is an identifier character
 */
export declare function IsIdentifierChar(c: string): boolean;
/**
 * Removes the comments of a code block
 * @param block code block to parse
 * @returns block with the comments removed
 */
export declare function RemoveComments(block: string): string;
/**
 * Finds the first occurrence of a character in a string going backward
 * @param s the string to parse
 * @param index starting index in the string
 * @param c the character to find
 * @param c2 an optional second character to find
 * @returns the index of the character if found, else -1
 */
export declare function FindBackward(s: string, index: number, c: string, c2?: string): number;
/**
 * Escapes a string so that it is usable as a regular expression
 * @param s string to escape
 * @returns escaped string
 */
export declare function EscapeRegExp(s: string): string;
