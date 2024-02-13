export function createHelloMessage(str: string) {
	return "Hello, " + str + "!"
}

export function sayHello(str: string) {
	console.log(createHelloMessage(str))
}