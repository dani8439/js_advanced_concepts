# Section Overview
Errors or exceptions in programming are rarely taught. However handling errors is an important skill in becoming a great developer. No such thing as a perfect program. Need to stop thinking of errors as mistakes, but as a feature to tell the program when something is wrong.

# Errors in JavaScript
Have a native `Error` constructor function. Can type `Error` in console. Can create new instances by writing: `new Error('oopsie')`. The error instance doesn't actually do anything. What we need to do instead is throw an error. That's when things get interesting. 

When we write `throw` the code stops executing. 

```js
throw new Error()
// Uncaught Error
//   at <anonymous>:1:7
```
Underneath the hood the error gets thrown and says stop the program and handle the error somehow. The `throw` statement is used to define our errors. During runtime when a throw statement is encountered by the program, the execution of current function will stop, and pass to the next part of the callstack. 

Can throw anything in js. 

```js
throw 'string' 
// Uncaught string 
throw 'boolean' 
// Uncaught boolean
throw Error 
// Uncaught f Error() { [native code] }
throw new Error()
// Uncaught Error
// at <anonymous>:1:7
```
Program gets stopped wherever Error is called. The `Error` property has 3 built in properties for us to use, `name`, `message`, and the `stack` trace. 

```js 
const myError = new Error('oopsie')
myError.name 
// 'Error'
myError.message 
// "oopsie"
myError.stack
// 'Error: oopsie\n    at <anonymous>:1:17'
```
In the stack trace, error happened inside of an anonymous function, which is the main execution context for errors. 

```js
function a() {
    const b = new Error('what??')
    return b
}

a()
// Error: what??
//     at a (<anonymous>:2:15)
//     at <anonymous>:1:1
```
JS has many built in constructors for errors. Have the generic `Error`. There's also `new SyntaxError`. Also have a `new ReferenceError`. It automatically throws the error, and has the `throw` keyword added upon it when it sees an error:

```js
new SyntaxError 
// SyntaxError
//     at <anonymous>:1:1
// (, 
// VM293:1 Uncaught SyntaxError: Unexpected token ','
new ReferenceError 
// ReferenceError
//    at <anonymous>:1:1
// something 
// VM361:1 Uncaught ReferenceError: something is not defined
//    at <anonymous>:1:1
```
So far errors are useful, but what if we wanted to handle them inside of our programs. This is our system/callstack:

**ERROR**
**Is there a catch?**
**Is there a catch?** 
Runtime catch: `onerror()` 
`process.on('uncaughtException')`

As soon as an error happens on the callstack, go to the EC beneath us. Then keep going. If all the way through the callstack there's nothing handling it, we're going to get the `onerror()` function that runs in the browser. In Node.js we have a `process.on('uncaughtexception')`. 

The power in the errors is in the fact that you can create these little hurdles/stops to catch the exceptions. How do we catch an error in JS? Will show in next video.

# `Try` `Catch`
How can we catch errors in our programs? Two ways. 1 is the `try{} catch{}` block. Also the `catch()` method.

How does it work? A try/catch block works like this:

`try` means run this piece of code. Can be accompanied by a `catch` block. If inside of this block there are any errors, catch it. 

```js
function fail() {
    try {
        console.log('this works')
    } catch {
        console.log('we have made an oopsie')
    }
}

fail();
// SyntaxError: Unexpected token. 
```

`catch` block also accepts an error parameter, so should be this: 

```js
function fail() {
    try {
        console.log('this works')
    } catch (error) {
        console.log('we have made an oopsie')
    }
}

fail();
// this works
```