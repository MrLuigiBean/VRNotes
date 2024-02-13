/**
 * Hello Module
 * 
 * This TypeScript file defines a simple module for generating and logging hello messages.
 * It consists of two functions: `createHelloMessage` and `sayHello`. The `createHelloMessage`
 * function takes a string argument and returns a formatted hello message. The `sayHello`
 * function logs the hello message to the console.
 * 
 * @version 1.0
 * @author Prashanth Subrahmanyam Sharma
 */

/**
 * Generates a hello message.
 * 
 * @param str The string to include in the hello message.
 * @returns A formatted hello message.
 */
export function createHelloMessage(str: string): string {
	return "Hello, " + str + "!"
}

/**
 * Logs a hello message to the console.
 * 
 * @param str The string to include in the hello message.
 */
export function sayHello(str: string): void {
	console.log(createHelloMessage(str))
}
