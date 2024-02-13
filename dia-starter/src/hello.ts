
//function to create a hello message with the given name
export function createHelloMessage(name: any) {
    return `Hello, ${name}!`;
}

//function to create a hello message with the given name and print it to the console
export function sayHello(name: any) {
    const message = createHelloMessage(name);
    console.log(message);
}
