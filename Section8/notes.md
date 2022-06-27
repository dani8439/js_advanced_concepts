# Section overview 

What does **asynchronous** mean? Async means simply means we don't have it right now. Information we don't have yet, need to get it. Asynchronous functions are functions we can execute later. Because JS is single threaded and has no idea what's going on out there on the world wide web.

# How JavaScript Works 

What is a program? A program has to allocate memory. A program has to parse and execute scripts (read and run commands).

There's the JS engine, the V8 engine consists of a memory heap and a call stack. Memory heap (Where things are stored), callstack (where they are read and executed). Can have memory leaks when things allocated in the memory are all global variables. 

Javascript is a single threaded language that can be non-blocking. Single threaded means it has one callstack, and does one thing at a time. First in, last out. Other languages can have multiple call stacks (multi-threaded). JS was designed to be single threaded because it's easier. With multithreaded environments you can have something called deadlocked.

Synchronous programming means line 1 gets executed, then line 2, then line 3. Ladder can't start before the first finishes. 

Stack overflow is when the callstack just gets bigger and bigger and doesn't have enough space anymore. 

Non-blocking. Asynchronous to the rescue. Asynchronous is like a behavior. 

In order for JS to run, need more than just the JS engine. Need a runtime environment (part of the browser). Have Web API's, callback Queue's and the event loop. 

Can do a `setTimeout()` along with some `console.log()`'s to make it asychronous to go through all those processes, and illustrate how the callstack works:

```js
console.log('1');
setTimeout(() => {
    console.log('2');
}, 2000)
console.log('3')
// 1
// 3
////////
// 2 

// Call Stack 

// Web API 

// Callback Queue

// Event Loop
```

```js
element.addEventListener('click', () => {
    console.log('click');
})
```

When is asynchronous happening? It happens a lot, when you talk between machines (databases), reading files, etc. It is a single-threaded language that can be non-blocking. Single callstack and does one thing at a time. In order to be non-blocking it can be asynchronous with callback functions. These callback functions get run in the background through the callback queue and then the event loop to bring them back into the callstack.

# Promises 
A promise is an object that may produce a single value sometime in teh future. Either a resolved value, or a reason that it's not resolved (rejected).

A promise may be in one of three possible states, fulfilled, rejected, or pending. 

Have to understand callbacks first. 

```js
el.addEventListener("click", submitForm)
// callback pyramid of doom 
movePlayer(100, 'Left', function() {
    movePlayer(400, 'Left', function() {
        movePlayer(10, 'Right', function() {
            movePlayer(330, 'Left', function() {

            });
        });
    });
});
```

When something is done, execute this code. Pyramid of doom in above code. With callbacks you'll get this nested function and really complicated code. Hard to read. More realistic example is:

```js
grabTweets('twitter/andreineagoie', (error, andreiTweets) => {
    if(error) {
        throw Error;
    }
    displayTweets(andreiTweets)
    grabTweets('twitter/elonmusk', (error, elonTweets) => {
        if(error) {
            throw Error;
        }
        displayTweets(elonTweets)
        grabTweets('twitter/vitalikbuterin', (error, vitalikTweets) => {
            if(error) {
                throw Error;
            }
            displayTweets(vitalikTweets)
        })
    })
})
```

Doesn't look very pretty does it? Have to do the same thing, nested, and reptition. Promises serve the same purpose as callbacks. Why do we have two things? They are new in ES6, and a little more powerful. 

```js
el.addEventListener("click", submitForm)

movePlayer(100, 'Left', function() {
    movePlayer(400, 'Left', function() {
        movePlayer(10, 'Right', function() {
            movePlayer(330, 'Left', function() {

            });
        });
    });
});

movePlayer(100, 'Left')
    .then(() => movePlayer(400, 'Left'))
    .then(() => movePlayer(10, 'Right'))
    .then(() => movePlayer(350, 'Left'))
```

How to create a **Promise** 

```js
const promise = new Promise((resolve, reject) => {
    if (true) {
        resolve('Stuff Worked');
    } else {
        reject('Error, it broke');
    }
})

// to run 
// promise.then(result => console.log(result))

// Stuff Worked
// Promise {<fulfilled>: undefined}

promise
    .then(result => result + '!')
    .then(result2 => {
        console.log(result2);
    })

// Stuff Worked!
// Promise {<fulfilled>: undefined}

// What if there was an error? 
promise
    .then(result => result + '!')
    .then(result2 => {
        throw Error
        console.log(result2);
    })
    .catch(() => console.log('error!'))

// What if the error happened higher up and we move it? 
promise
    .then(result => {
        throw Error
        result + '!'})
    .then(result2 => {
        console.log(result2);
    })
    .catch(() => console.log('error!'))

// error! 
// Promise... 
```

`.catch()` catches any errors that occur. 

```js
promise
    .then(result => result + '!')
    .then(result2 => result2 + '?')
    .catch(() => console.log('error!'))
    .then(result3 => {
        console.log(result3 + '!')
    })
// Stuff Worked!?!
// Promise...
```
`.catch` only works if something fails inbetween. Where you put the catch statement, it will check and run if anything before it fails. That's how you create a promise, with resolve or reject. With a promise we can give it to a variable and run it asynchronously. Can keep chaining it, and also chain our errors. 

A promise is something we have now and can use around the code. When would it be a good thing? Promises are great for asynchronous programming. When you don't want JS to block the running of your code, you use a promise so the task happens in the background. When it gets resolved or rejected, you'll get the response. 

Something else they can do which makes them very powerful:

```js
const promise = new Promise((resolve, reject) => {
    if (true) {
        resolve('Stuff Worked');
    } else {
        reject('Error, it broke');
    }
})

const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'HIII')
})

const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 'POOKIE')
})

const promise4 = new Promise((resolve, reject) => {
    setTimeout(resolve, 30000, 'Is it me you are looking for?')
})

Promise.all([promise, promise2, promise3, promise4])
    .then(values => {
        console.log(values);
    })

// Promise {<pending>}
// (4) ['Stuff Worked', 'HIII', 'POOKIE', 'Is it me you are looking for?']
```
Waited until all promises were resolved and then logged out all the values. 

```js
const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/albums'

]

Promise.all(urls.map(url => {
    return fetch(url).then(resp => resp.json())
})).then(results => {
    console.log(results[0])
    console.log(results[1])
    console.log(results[2])
})

// Promise {<pending>}
// VM875:11 (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// VM875:12 (100) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// VM875:13 (100) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]

Promise.all(urls.map(url => {
    return fetch(url).then(resp => resp.json())
})).then(results => {
    console.log(results[0])
    console.log(results[1])
    console.log(results[2])
}).catch(() => console.log('error'))
// error
```
fetch simply returns a promise. At their most basic, promises are like event listeners. Except it can only succeed or fail once, not twice. 

# ES8 Async Await

Async/Await is part of ES8. Built on top of promises. 

```js
// ASYNC/AWAIT
```