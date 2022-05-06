# JavaScript Engine 

V-8 Engine. JS Single threaded. Uses a callback queue. JS is an interpreted language. 

```
const isHappy = true;
```

If gave a computer with a file to read, computer only understands 1's and 0s. When we give it a JS file, it's like me talking to a computer in French. Doesn't understand it. Computer doesn't know what JS is. How can we communicate using a JS file so it displays what we want? 

The JS Engine. A JS Engine allows you to give the JS file to the computer. The machine tells it what to do. It's a translator. The JS Engine understands JS. So now the computer finally understands us. 

There are loads of JS engines. ECMAScript engines. Anytime we use an engine, we give it a JS file, gets understood by the engine and allows us to communicate and for the machine to tell the computer what to do with the JS. 

# Inside the Engine

Know the JS Engine takes our stuff and does magic to tell the computer what we want it to do. What's happening inside of this engine? It's just a program. In V-8, it's written in C++. 

Inside there's a Parser, AST (Abstract Syntax Tree), Interpreter, Profiler, Compiler, Bytecode, and Optimized Code, the Call Stack and the Memory Heap. 

AST Explorer.net shows how the Abstract Syntax Tree looks like. 

Once in the AST form, goes through an interpreter, profiler, compiler. Gives us some code that our CPU will understand to give it instructions. Can think of the whole process as this:

```
function jsengine(code) {
    return code.split(/\s+/)
}

jsengine('var a = 5');
```

What problems do you see with other people creating their own Engines in JS? Would be total chaos. ECMAScript is the governing body of JS, which decides how the language should be standardized. Tells engine creators this is how JS engines should work. Internally the engine is up to you and how it conforms to the standards. Can do whatever you want as a creator so long as it conforms to those standards. 

The V-8 engine is the most popular (Google). 

# Interpreters and Compilers 

In program there are generally 2 ways of translating to something our computer can understand. Applies to all languages (C++, Python, Java, etc)

## The Interpreter 

Translate and read the files line by line on the fly. 

```
// interpreter vs compiler 
function someCalculation(x, y) {
    return x + y;
}

for (let i = 0; i < 1000; i++) {
    someCalculation(5,4);
    console.log(i);
}
```

With an interpreter, if we give the file above to an interpreter, it happens line by line on the fly. Interpreter reads it line by line. May think this is how it should be done. 

What's the deal with a compiler? A compiler doesn't translate on the fly. Works ahead of time to create a translation of what code we've just written. Compiles down to a language that can be understood by our machines. 

With a compiler, it will take one pass through the code, and try to understand what it does. The new language it creates and spits out, if we interpret it, will create the same results as our previous language. Compiler tries to understand what we want to do. Takes our language and turns it into something else. A lower level language. Machine code. 

In some respects all languages have to be interpreted and compiled. Has to be interpreted, and get translated into something low level like machine code. 

Two ways to run JS. Using either or. 

# Inside the V8 Engine 

Interpreters are quite to get up and running. With an interpreter, don't have to convert the code into another language as we would with a compiler. No compilation step. Just give it to an interpreter and the interpreter starts translating. 

It's a natural fit for JS. 

JS was originally created for the browser, so speed was good. There is a con though. Problem with interpreters, when you're running the same code more than once, over and over, it can get really really slow. The compiler helps us here. 

Takes a little more time for the compiler to start up, but the compiler will be smart enough that when it sees code like this that we just loop over, it can simplify it. Instead of calling it multiple times, just replaces it. Doesn't need to repeat the translation for each loop, so the code is faster. Called Optimization. 

## Interpreter VS Compiler. Which one is better? 
Both have their pros and cons. 

Is there a way to get the best of both worlds? What if we combined them? What if instead of using either, we combine them into a JIT Compiler (Just in time compiler). This is exactly what browsers started doing to make the engines faster. 

Called ignition. Takes the AST and spits out Bytecode. Not as low level as machine code, but able to be interpreted by the JS engine in order to run our program. 

JIT compiler, as the code is running, takes the code and compiles it/modifies it so it does what you've asked it to, tries to make optimizations to have it run faster. Optimized code is then used instead of Bytecode. Means JS code will be improving. Execution will gradually improve. Profiler and compiler are constantly optimizing. That's where the name comes from. The one for V8 is turbofan. Previous versions used 2 JIT compilers. This way is faster.

Now we know this, we can write more optimized code. Can use this knowledge to make sure we don't confuse the compiler. 

# Comparing Other Languages 

`.exe` file is created by C++. 

`g++ your_program.cpp -o your_program` creates the .exe file. 

java uses a jvm, java virtual machine. Compiles or interprets to bytecode. Only needs to be converted once. 

Bytecode is not a native machine code. Most computers won't understand it. With bytecode you need software such as a virtual machine or js engine. Can't double click and run a bytecode file without a js machine. 

### Is JavaScript an interpreted language? 
Yes initially when it first came out, had JS engines that interpreted JS to bytecode, and that engine was able to run inside of our browswers. Things have evolved. Use interpreters and compilers to run it. Not technically an interpreted language. 

Depends on the implementation of it. Can make one that only compiles. This is also true when it comes to Python. All matters depending on implentation. 

# Writing Optimized Code

Don't want to work against optimization and make it slow. 

In order to help the JS engine want to be careful with: 

- `eval()`
- `arguments`
- `for in` loop. 
- `with` 
- `delete` 

Main reasons why these things can make our code less optimized. **inline caching**

```
// inline caching 
function findUser(user) {
    return `found ${user.firstName} ${user.lastName}`
}

const userData = {
    firstName: 'Johnson',
    lastName: 'Junior'
}

findUser(userData)
```

Due to inline caching done by the compiler, code that executes the same method repeatedly, compiler can optimize it so that whenever it's looking for userData, can use inline caching. Instead of looking up the object every time, it will cache or inline cache so find user just becomes the line of text. 

will become 'found Johnson Junior' 

Other thing are **Hidden Classes**. 

```
// hidden classes 
function Animal(x, y) {
    this.x = x;
    this.y = y;
}

const obj1 = new Animal (1, 2);
const obj2 = new Animal(3, 4);
```

Compiler will look at this and see we're creating 2 objects. 

But if say:

```
obj1.a = 30;
obj1.b = 100;
obj2.b = 30;
obj.a = 100;
```

This code will make the code run slower. Deoptimize it. Called hidden classes. Want to instantiate properties in same order. So hidden classes have the same properties. As soon as you start introducing things out of order, it will get confused. Internally it will slow things down. Want to assign all properties of an object in its constructor. Also make sure we add things in the same order. 

That's why there's the issue of the delete keyword as well. If you delete a property, change hidden classes so they don't match up anymore.

We should write code that is predictable not only for humans but also for machines. More predictable it is, better as it has no surprises. 

# Web Assembly

*Why not just use machine code from the beginning?* 

If JS were compiled, then either compilation would have to be super fast, OR the competing browsers would have to agree on some binary executable standard/format that can understand this machine code. As the browswers are the one executing the code.

When JS was created in 1995, start of the browser wars. Compiling code ahead of time wasn't feasible. Also, having all the browsers agree, they didn't get along, wasn't going to happen. Still won't happen now.

Now have WebAssembly. Could be a game changer. Standard Binary executor format. Didn't have it in 1995. 

# Call Stack and Memory Heap

JS Engine does a lot of work for us. Biggest thing is reading our code and executing it. 2 most important things in this step are a place to store the data, and a place to actually run and keep track of what's happening line by line. 

Call stack and Memory Heap. 

Heap stores and writes information. Allocates, uses, and releases memory. 

Stack a place to keep track of where we are in the code so we can run it in order. 

With these two things the JS engine can do that. 

```
// Call stack + Memory Heap 
const number = 610; // allocate memory for number 
const string = "some text" // allocate memory for a string 
const human = { // allocate memory for an object... and it's values
    first: 'Andrei',
    last: 'Neagoie'
}

function subtractTwo(num) {
    return num - 2;
}

function calculate(){
    const sumTotal = 4 + 5;
    return subtractTwo(sumTotal);
}

calculate()

// callstack adds calculate() on top of the stack. When finished running, will remove it.
```

Assign variables, and point to a region in the memory heap that has these values. 

Our Memory Heap is a free store. Large region in memory JS Engine provides for. Can store any kind of arbitrary data in unordered fashion. Engine takes care of us to put data in storage boxes for us. 

Call Stack operates as region of memory first in last out mode. 

Stores functions and variables as your code executes. At each entry the state of the stack (the stack frame) allows us to know where we are in the code. Runs in first last one out mode. First one in is last one popped up. Can keep adding to it, and eventually pops all function calls until done with command. Use memory heap to point to different variables and objects and data we store. This is the way it works in most programming languages. 

Not the same in every JS engine. Some are different. Where it's stored may be different. Simple objects are usually stored on the stack. Objects, complex data structures (arrays, etc) are stored in the heap. 

Whatever is on top of the call stack is what JS is running. How cool is that? 

# Stack Overflow 
What happens if we keep calling functions nested inside of functions? So we keep growing stack until it gets larger and larger and larger and we can't do it anymore? That's called stack overflow. It can be caused very easily. 

```
function inception() {
    inception()
}

inception();
```

`inception()` uses recursion. A function calling itself. 

If we run `inception()` get a `RangeError: Maximum call stack size exceeded`. Get a stack trace (a snapshot of code execution of the stack frame).

# Garbage Collection

Before we talk about memory leaks, we have to talk about garbage collection. JS is a garbage collected language. Means when JS allocates memory. Say within a function we create an object that gets stores within our memory heap. Once we finish calling a function and we don't need that memory anymore, JS automatically frees up this memory that e no longer use, and collects our garbage. Only the data that is still useful to us remains as memory is limited.

The GC prevents memory leaks (when memory gets too big and we reach our maximum size). But that's hypothetical. No perfect system. Garbage collection gives us a false sense of security. Because GC is done automatically. Big mistake though. Gives JS developers the false impression they can choose not to care about memory management. There are ways to make mistakes where GC doesn't clean up the memory and we still have little references hanging around.

In low level languages like C, you control the GC. That's very dangerous. Also why programs like C are fast and memory efficient, as they give you control. 

In JS, they use the mark and sweep algorithm to GC. Mark what we need, and sweep what we don't. 

# Memory Leaks 

```
let array = [];
// infinite loop
for (let i = 5; i > 1; i++) {
    array.push(i - 1);
}
```
Run an infinite loop that keeps pushing to the array `i - 1` over and over until we fill up our memory, and use everything up and crash our browser.

Filled up our memory heap with more and more data, garbage collection wasn't really working until we crashed our program. 

Memory leaks are pieces of memory our app has used in the past, but is not needed any longer but has not yet been returned back to us. 

## 3 Common Memory Leaks 
- Global Variables: keep adding more and more and it's unnecessary. 
- Event Listeners: not removing event listeners after they're finished, especially in SPA's navigating back and forth and they are constantly running in the background. 
- Using set interval: keeps running and running unless we clear it. 

```
// Memory Leaks 
// Global Variable 
var a - 1;
var b = 1;
var c = 1;

// Event listeners 
var element = document.getElementById('button');
element.addEventListener('click', onClick);

// setInterval
setInterval(() => {
    // referencing objects...
})
```

One example is Sound Cloud. People had it in the background of a gaming console, and they had a memory leak problem because people wouldn't close the app for hours. Huge memory leak in program. Unlike most website or apps, runs a really long time in background. 

Memory is limited. When it comes to call stack and memory heap, those are two places JS remembers for its stored memory. We have limited use of them. To write efficient code, have to be conscious not to have stack overflow or memory leak.

# Single Threaded

JS is a single threaded programming language. Being single threaded means only one set of instructions is executed at a time. How to check if it's single threaded? If it has only 1 call stack. We're never running functions in parallel. 

Initially in 1995 when JS was born, this made things easy for implementation and developers, because JS was initially only a language for returning actions on a webpage, nothing really required having more than a single thread.

Single threaded means I'm the JS engine and I'm eating with one hand. Putting food in my mouth and using same hand to grab next food when done chewing. Can't grab anymore food or eat anything more until I'm done chewing. One thing at a time. 

Because of this, JS is *synchronous* meaning one at a time, as things appear, only one thing can happen at a time. That doesn't sound super fast, does it?

# Excercise: Issue with Single Threaded 

**What problems do you see with synchronous code?** 

Going to make it really difficult if we have long running tasks. Imagine on twitter each thing had a long time to complete (5 seconds) before we could do something else. Couldn't scroll until the task was completed. 

Using the `alert()` function in console mimicks this. Until we click on `ok` can't do anything, freezes the page. 

When we talk about JS, most of the time not just using the JS Engine which is synchronous. Not just that running our code. We have the **JavaScript Runtime**.

# JavaScript Runtime

JS is a single threaded language. One Stack, one Heap. If any other program wants to execute something, has to wait until the previous is executed. If do something that takes a really long time, will take a long time for our program. 

In this case there's **JavaScript Runtime**

**Web API** Web browser API to communicate and let the JS engine know hey I'm back with some data, some work you told me to do in the background. 

The Web API comes with the browswer (Chrome, Safari, Firefox). All have JS implementation and JS runtime that provides a Web API. Applications that can do a bunch of things like send http requests, listen to DOM events, click events on the DOM, delay execution using `setTimeout()` or `setInterval()` can even be used for caching events on the browser. 

`window` object in the browser provides a whole lot of stuff. Lots of cool stuff. All sorts of functions, some provided storage, etc. All provided by the browser, and not native to JS. Browsers are helping us to create rich web applications so that users aren't just sitting around waiting for JS to execute. Anything that can be offloaded in the background, they will do so in the background. 

Browsers underneath the hood use low level programming languages like C++ in the background and these API's are called Web API's.

Web API's are **Asynchronous**. Meaning we can instruct them to do stuff in the background while we continue to do what we need. 

What are the other two things? **Event Loop** and **Callback Queue**? They are what happen underneath the hood. Have items on the call stack, as soon as something comes up like `setTimeout()` that's not part of JS but part of the Web API, the call stack says I have something here that's not for me, for the Web API, you take care of it. The Web API says I know what that is. I'll do it in the background. Once it's done, it'll send the data to a callback. And the Event loop will say as soon as the call stack is free, I have something for you here,w ould you like to add it ontot he stack. If the stack is empty, it will push the callback onto the stack. 

```
console.log('1');
setTimeout(() => { console.log('2')}, 1000);
console.log('3');
```

It will print out 1, 3, undefined, and then 2. Why? Because we added `console.log('1')` to our stack. Then we went to the next line, of `setTimeout()` which goes on to run in the background in the Web API. Then we run `console.log('3')`. Behind the scenes the Web API takes the setTimeout and runs a timer for 1 second. Once that 1 second is over, it'll push the callback, what to do once it's done running for 1 second, the console.log('2'), to the callback queue, and it says I'm the first person that's done, can you console.log('2')? The event loop is asking, is the callstack empty? Yes we can run. No we can't run, etc. After console.log gets printed and popped off, the event loop ticks and say alright, can you console.log('2') which is why we get this weird pattern.

Philip Roberts has an amazing talk about the JS event loop. Created a tool called `loupe` to show all of this. 

Even if you run the same code above with a timeout of 0, same pattern happens.

```
console.log('1');
setTimeout(() => { console.log('2')}, 0);
console.log('3');

// 1
// 3
// undefined 
// 2
```

Using this pattern, we can run asynchronous code. Whenever we get tasks that may take a long time, we can send that off to the browser, the browser can run that in the background, in the callback queue and event loop and get it done.

# Node.js
Difference between a JS engine, and a JavaScript runtime. 

A js file is like musical notes. Ways for us to write music/write programming.

JS engine is like the musician or the composer. That person can read the music and make sense of it and understand it. 

JS runtime is the whole package where we have the musician, but also give them the musical notes and all the tools to play the music.

If we're able to have different JS runtimes, what do you think Node.js is? Is it a programming language? A JS engine? Is it a runtime? It's a JS runtime. It's not a language. It's a runtime. 

Up until 2009, JS was just run in the browser. But node.js was created based on C++, that provides this runtime for us. The Node.js runtime looks very similiar to our browser based runtime. 

V8 engine, and event loop, our callback queue. It does a little more than our web browser runtime. 

# Exercise: Fix This Code: 

```
//fill array with 60000 elements
const list = new Array(60000).join('1.1').split('.');
 
function removeItemsFromList() {
    var item = list.pop();
 
    if (item) {
        removeItemsFromList();
    }
};
 
removeItemsFromList();
```

```
//fill array with 60000 elements
const list = new Array(60000).join('1.1').split('.');
 
function removeItemsFromList() {
    var item = list.pop();
 
    if (item) {
        setTimeout(removeItemsFromList, 0);
    }
};
 
removeItemsFromList();

list;
```

# Section Review 

Learned about JS engine and all the steps of how we can send a js file through the steps, including an interpreter, and a compiler, a JIT compiler so code can run on our machine. Learned about Call stack and memory heap. Learned about single threaded model and the limitations of it as well as beauty and simplicity. And the very common interview question of `console.log()` and `setTimeout()`. 

What happens here? 

```
setTimeout(() => { console.log('1', 'is the loneliest number')}, 1000);
setTimeout(() => { console.log('2', 'can be as bad as one)}, 10)
console.log('3','is a crowd');

// 3 is a crowd
// undefined 
// 2 can be as bad as one 
// 1 is the loneliest number
```

```
setTimeout(() => { console.log('1', 'is the loneliest number')}, 0);
Promise.resolve('hi').then(() => console.log('2'));
console.log('3','is a crowd');

// 3 is a crowd 
// 2
// undefined 
// 1 is the loneliest number
```

How did that work? We'll learn in the async part of the course. But need to understand more fundamental aspects of JS first. 