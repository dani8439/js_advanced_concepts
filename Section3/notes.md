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

# Hoisting 

In the Global Execution Context there was `global` and `this`. Then the run your code phase. Between them, there's an important step missing, **hoisting**.

Hoisting is the behavior of moving the variables or function declarations to the top of their respective environment in compilation phase. 

Variables are partially hoisted, and function declarations are hoisted. 

```
console.log('1----------');
console.log(teddy);
console.log(sing());
var teddy = 'bear';
function sing() {
    console.log('ohhh la la la')
}
```
Hoisting, during the creation phase of our global e.c., if we run this, get `undefined` for `teddy`. 

JS engine will run `ohhh la la la`. During the creation phase will look through the code, as soon asa it sees the `var` keyword or the `function` it will allocate some memory to the code even if it just assigns it to `undefined`. 

`teddy` is undefined because the JS engine during the creation phase, knew `teddy` was going to be a variable, but we don't know what it is yet, so it's `undefined`. That's what it means by variables being partially hoisted. We assign the variable itself, but not what's on the right side of the equal sign. Functions on the other hand are fully hoisted, so the function declaration is assigned a location in memory, so we know to `console.log('ohhh la la la')`.

If we add a bracked to the function, so the js engine no longer sees `function` as the first word, we get a reference error, because it doesn't hoist it. Didn't see a `var` or a `function` so it's `undefined`. 

If we change `var` to `const`, `const` or `let` are not hoisted. Only `var`. 

The compiler isn't actually moving these lines of code. It's not moving `teddy` all the way up or the function. It's simply having one pass through the code, and reserving/assigning memory to that space. 

We have function declarations (`function` is on the first line). Or function expressions, where we create a variable function: `var sing2 = function() { console.log('uhhh la la la')}`

```
console.log('1----------');
console.log(teddy);
console.log(sing());
var teddy = 'bear';

// function expression
var sing2 = function() {
    console.log('uhhh la la la')
}

// function declaration
function sing() {
    console.log('ohhh la la la')
}
```

A function expression in hoisting, during creation phase, the variable is hoisted and assigned to `undefined`. With a function expression, until the execution phase reaches it, when we start running the code. With a function expression it's only going to be run after it's been defined. If run before, we get an error. 

With our global EC, we have a few things that happen, the global object, and the this object during the creation phase when it gets assigned. Then during the execution phase when we run our code. Important to remember during the creation phase also have the act of hoisting. Anytime we see the `function` or the `var` keywords, we allocate space to them in our heap, to make sure that the JS engine is ready for the execution.

# Exercise Hoisting 

```
var one = 1;
var one = 2;

console.log(one);
// 2
```

```
a();

function a() {
    console.log('hi')
}

function a() {
    console.log('bye')
}

// bye
```
Last in becomes what it is. During hoisting phase, we look at the function, compiler says okay I'm going to hoist this, then goes to the next line, and puts it into memory. Because they are the same, because we're doing it one after the other, it will rewrite the place in memory to include the latter code. So lose the ability to say hi.

# Exercise Hoisting 2

```
var favoriteFood = "grapes";

var foodThoughts = function () {
    console.log("Original favorite food: " + favoriteFood);

    var favoriteFood = "sushi";

    console.log("New favorite food: " + favoriteFood);
};

foodThoughts();

// Original favorite food: undefined
// New favorite food: sushi
```

Because `var favoriteFood = undefined` on the first pass. Then we go to the variable so foodThoughts get hoisted. 
`var foodThoughts = undefined`. (During creation phase).

During Execution Phase, almost don't need the variable keywords anymore. Start executing the code. First execution is `favoriteFood`. Then `foodThoughts` assigned the function, which is then run at the bottom. As soon as we run the function, a new execution is created, inside of it, hoisting happens during the creation phase. 

Sees `var` in the little world with `favoriteFood` and it hoists it up. `var favoriteFood = undefined`. Which is the only one it sees. Logging `Original favorite food: undefined`. Then `favoriteFood` becomes sushi, which logs as the favorite food. 

Isn't hoisting confusing? What happened to being predicatable with our code and making sure that the compiler and humans can understand it? Are arguments about whether you should use hoisting and if it's bad practice because we want to make coding predicatable. Doing things like above makes code very unpredicatable. Can avoid hoisting by not using the `var` keyword. Change all `vars` to `const` and `let`. Which will then give us an error. 

If we're no longer using hoisting, we have to rewrite the code to make more sense. 