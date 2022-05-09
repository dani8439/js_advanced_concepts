# Javascript Foundation II 

# Execution Context 

How do we run code in JS? We assign variables and run functions.

```
function printName() {
    return 'Andrei Neagoie'
}

function findName() {
    return printName()
}

function sayMyName() {
    return findName()
}

sayMyName()
```

Add brackets at end of function to run/execute the function. JS engine will see those brackets and create an execution context. If we run this function `sayMyName()` will be run, which will return `findName()` which will return `printName()` and will print `Andrei Neagoie`.

When the JS engine sees those brackets going to run a function and create an execution context. And adds the EC onto the stack. It tries to run it, and sees that the function calls another function, and adds it onto the stack. That function sees it references another one, and adds that onto the stack. Eventually the callstack all gets popped off. 

The base EC that runs is called the global execution context. Initially our JS engine creates a global EC. We don't see it, it's underneath the hood. On top of that, we start adding `sayMyName()`, `findName()` and `printName()`. As these EC's get popped off, the global remains. When the final line of code runs, and we're done, the `global()` gets popped off the stack too. 


Whenever code is run in JS, it's run within an execution context. It's always part of an EC. `global()` or some function we call.

**Global Execution Contect** - first thing the engine does is to create the G. EC. Gives you a `global object` and `this` keyword in JS. 

Global EC gives us them right off the bat when the JS engine starts up. If true, when we fire up the browswer should have a `global` and a `this`. In the browser, the global object is `window`. And they're both there! `this === window` is true. Very first step JS engine does for us.

The JS engine creates these two objects, and these two objects are equal to one another (for now at least). If using something like node, the global object is called global instead. To the global object we can assign variables. 

Once we've done the **creation phase**, we have the second phase, the **execution phase** where we actually run the code. Which we run until all the code is popped off the stack and run.

# Lexical Environment

May have heard it called lexical scope or lexical analysis. 

**Lexical** related to the words or vocabulary of a language. 

It's simply where you write something. Because we now know how our JS engine works, where we write something is important. A lexical environment simply means that. Lexical environment is like little universes that are created whenever we created an execution context.

Lexical analysis, means it's checking to see where the words were written and it's location. What universe is it part of? 

A function can lexically be inside of another function. There are a lot of lexical environments. In JS, every time we have a function it creates a new world for us inside of that function. We are shot up into that planet whenever we add it onto the callstack. Inside that planet we can do different things, with different info inside of them.

EC tells you which lexical environment is currently running. 

In JS our lexical scope (available data + variables where the function was defined) determines our available variables. Not where the function is called (dynamic scope). 

It doesn't matter where we call our function. Because wherever the function was lexically scoped, it will have access to certain things based on that property (say being written globally).

What is the first lexical environment that we have? The **global lexical environment**.