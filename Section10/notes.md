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
        throw new Error('oopsie!!!')
    } catch (error) {
        console.log('we have made an oopsie')
        console.log(error.name) /// error.stack, error.message...
    } finally {
        console.log('still good')
        return 'returning fail'
    }
    console.log('!!!!!!:)')
}

fail();
// this works
```

If we changed it to `consol.log()` get a huge stack trace error. If we move the `throw new Error('oopsie!!')` up, won't go past that, will stop the code right there. Can also have a `finally {}` block. This block says, no matter what happens in the try/catch block, do something for me can do above code, and `returning fail`. 

The interesting thing with the try/catch block, if we had any code outside of it, say a `console.log('!!!!!!:)')`. That part will never run. 

Often times the try/catch is the simplest way to solve errors. Can be used in different ways, can nest them if we wanted. 

```js
try {
    try {
        something();
    } catch(e) {
        throw new Error(e)
    }
} catch (e) {
    console.log('got it', e)
}

// get a huge reference error, as something is not defined. 
// change to console.log('got it', err) get a red ReferenceError
```

The try/catch block works with synchronous errors/synchronous code. If we had a `setTimeout(function() { fakeVariable; }, 1000)` inside the try block that doesn't do anything. If we change `err` to `e`, and click run, don't get any errors. Runs 1. That is a problem. In JS we do not always write synchronous code. How do we handle that? 

# Async Error Handling 
How do we handle asynchronous code? Our code is not always going to be synchronous. When we have an asychronous function and an error occurs inside of it, our script will just continue executing. Handle these types of errors in JS using the `catch()` method. 

```js
Promise.resolve('asyncfail')
    .then(response => {
        throw new Error('#1 Fail')
        // console.log(response)
        return response
    })
    .then(response => {
        console.log(response)
    })
```
Code above is a HUGE gotcha. A silent error. It could have failed, but we don't know as we don't see it. Doesn't display or show this error. Very dangerous. Need to make sure with our promises to have `.catch()` clause. Works the same as the catch part of they try/catch block.

```js
Promise.resolve('asyncfail')
    .then(response => {
        throw new Error('#1 Fail')
        // console.log(response)
        return response
    })
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.log(err)
        // can also return err
    })
    .then(response => {
        console.log(response.message)
    })
    .catch(err => {
        console.log('final error')
    })

// # Error: #1 Fail
```

```js
Promise.resolve('asyncfail')
    .then(response => {
        Promise.resolve().then( ()=> {
            throw new Error('#3 fail')
        })
        return 5
    })
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        throw new Error('#2')
    })
    .then(response => {
        console.log(response.message)
    })
    .catch(err => {
        console.log('final error')
    })

// 5
// final error
```

```js
Promise.resolve('asyncfail')
    .then(response => {
        Promise.resolve().then(() => {
            throw new Error('#3 Fail')
        }).catch(console.log)
        return 5
    })
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.log('final error', err)
    })

// 5
// Error: #3 fail 
//    at Promise.resolve.then (eval at n.evaluate)...
```

`async await` luckily have it rather than all this chaining. Can be a lot simpler.

# Async Error Handling 2

The try catch block is only for synchronous code and use .catch() block for our asynchronous code using promises. Because `async/await `code makes our code look synchronous, we can use `try/catch` blocks with them. 

```js
(async function() {
    try {
        await Promise.reject('oopsie #1')
        await Promise.reject('oopsie #2')
    } catch (err) {
        console.log(err)
    }
    console.log('is this still good?')
})()

// oopsie
// VM1894:7 is this still good?
// Promise {<fulfilled>: undefined}
```

# Exercise: Error Handling 
```js
(function () {
  try {
    throw new Error();
  } catch (err) {
    var err = 5;
    var boo = 10;
    console.log(err);
  }
  //Guess what the output is here:
  console.log(err);
  console.log(boo);
})();
// 5 
// boo
```