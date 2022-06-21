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