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

# Exercise 3

```
function bigBrother(){
  function littleBrother() {
    return 'it is me!';
  }
  return littleBrother();
  function littleBrother() {
    return 'no me!';
  }
}

// Before running this code, what do you think the output is?
bigBrother();

// no me!
```

# Function Invocation 

Programs are simply assigning memory, for example assigning a value to a variable, then running a function to do something with those variables. Without functions our programs wouldn't do anything. Functions give us some amazing powers in JS. 

We have function expression and function declarations.

Expression starts with `var`, declaration starts with `function` keyword. Declarations get hoisted, expressions don't. 

```
// Function Expression 
var canada = function() {
    console.log('cold');
}

// Function Declaration 
function india() {
    console.log('warm');
}
```

Can also write a function expression with an arrow function and it will have the same effect:

```
// Function Expression 
var canada = () => {
    console.log('cold');
}
```

Our functions, we can call them. Terms sometimes vary. Telling our JS engine, hey run our function. Run with curly brackets, as soon as JS engine sees this, creates an execution context.

```
// Function Invocation/Call/Execution
canada();
india();
```

Pretty basic, nothing new. When it comes to the `canada()` function. The function is defined at run time, when we actually run the function vs `india()` where this function gets defined at parse time, when the compiler actually looks at the code, and starts hoisting and allocating memory. 

These functions when executed have another piece to them. When a function is invoked, we create a new Execution Context on top of our global execution context. Get the `this` keyword. But unlike the global e.c. which gave us a global which is equal to `this`, we get `arguments`. 

It's another keyword in JS. 

```
function marry(person1, person2) {
    console.log('arguments', arguments)
    return `${person1} is now married to ${person2}`
}

marry('Tim', 'Tina');

// Arguments(2) ['Tim', 'Tina'...
// 'Tim is now married to Tina'
```

Don't get `arguments` in the global object. Only available to us when we create a new EC with a function.

# Arguments Keyword

`Arguments` is a little dangerous to use. Why? Because it looks a little like an array but isn't an array. There's a lot of things you can do with the keyword which makes it harder for the engine to optimize your code. 

Some cases where we might want to iterate or loop through arguments. One way to go about it is to say:

`console.log(Array.from(arguments))` will create an array from whatever we give it, which will spit out: `['Tim', 'Tina']`. Which is nice. 

Another method is to use Rest Parameters: 

```
function marry2(...args) {
    console.log('arguments', args);
    console.log(Array.from(arguments));
    return `${args[0]} is now married to ${args[1]}`
}

marry2('Tim', 'Tina');

// (2) ['Tim', 'Tina']
// 'Tim is now married to Tina'
```

With modern JS you want to avoid `arguments`. Using the above techniques we can convert them to an array like object. 

The arguments object is something we get on each execution context. 

If we go back to the `india()` function, if we console.log(arguments) inside of it, what will we get? 

```
function india() {
    console.log(arguments);
    console.log('warm')
}

india();
// {}
// warm
```

Get an empty arguments object. Can still use it, even though we didn't pass any parameters into the function, because on each execution context, we still create a new arguments object.

# Variable Environment 

There can be many execution contexts. What about variables that are created inside of these individual EC's. (Variables inside of a function?

`Variable Environment` lives within the EC with `this` and `arguments`. 

Each EC is like its own universe. Don't really know of each other. 

What type of thing do we have in this variable environment?

```
function two() {
    var isValid; // undefined
}

function one() {
    var isValid = true; // local env
    two(); // new EC
}

var isValid = false;
one();

// two()
// one() -- true
// global() -- false 
```

First thing that happens is we have function declarations, so everything gets hoisted and put at the top. Also have `isValid` which is a global variable and is assigned to `undefined` when its hoisted. 

Then we start running or executing our code, first step is line 10, where we assign `false` to `isValid`, so changes `undefined` to `false`. Second step is line 11, where we invoke `one()` and a new EC is created on top of the stack.

First step is we go into the funciton and have the `var isValid = true` which will be put into the new EC or the local environment.

A new EC is created for `two()`, and put on top of the stack. And then we go into the `two()` world, where `isValid` remains `undefined.`

In the global environment, we have `var isValid = false`. 

In the `one()` EC, `isValid` is true. Doesn't care about what's happening globally. 

In the `two()` EC, `isValid` is undefined. 

Each of these worlds carries information/data that we have access to. Once each EC is done, it pops off the stack and the memory space is gone. Until all the memory is gone from our program.

This variable environment - the place where we store the info (some can be on the callstack, or it can be a reference to somewhere in the heap). Each EC has its own variable environment.

# Scope Chain 

```
var x = 'x';
function findName() {
    console.log(x);
    var b = 'b';
    return printName();
}

function printName() {
    var c = 'c'
    return 'Andrew Neagoie'
}

function sayMyName() {
    var a = 'a';
    return findName();
}

sayMyName();
// 'Andrei Neagoie' 
```

Another part of the EC we have not discussed. The other piece of the puzzle when it comes to EC, is that each world, each context has a link to its outside world. A link to its parent. This outer environment depends on where the function sits lexically. Lexically means where the function is written. 

If we create a new `var x` each function will have access to that variable. All of the functions have access to the global scope. 

They all have a global lexical environment. Gets attached to the window object. Have a little link, a `Scope Chain` that links and gives us access to variables that are in our parent environment. In this case, the global environment. It looks up the scope chain to `console.log(x)` because it's defined globally. 

We can go down the scope chain. From child to parent, and then log it. 

Scope, or static scope. 

In js our lexical scope (available data + variables where the function was defined) determines our available variables. Not where the function is called (dynamic scope). 

This idea of lexical scope, which is also called static scope, means that only by looking at the source code we can determine which variables and data are available in. Compiler looks at the code and attaches all these scope chains before it even runs the code, because we have lexical scope. Know what data can be accessed by each function. 

Scope chain starts where the data is defined, and goes all the way down to the global context. 

Scope means where can I access that variable? Where is it available in my code? 

```
function sayMyName() {
    var a = 'a';
    return function findName() {
        var b = 'b';
        return function printName() {
            console.log(c);
            var c = 'c';
            return 'Andrei Neagoie' 
        }
    }
}

// sayMyName();
// [function: findName]
// sayMyName()();
// [function: printName]
// sayMyName()()();
// Andrei Neagoie
```

Run the above, returns Function: findName. All lexically scoped differently. Previously they were all scoped to the lexical environment. How would you link the chains together? The links go to form a function lexical environment. Functions written within functions. The function lexical environment is within each one, so the scope chain goes down from `printName()` all the way to `sayMyName()`. 

Can throw a `console.log(c)`, `(b)` and `(a)` within and print it out because it keeps looking up the scope chain to find it. 

But we cannot `console.log(c)` within a different context, because it's defined below and not above. 

Variables declared outside a function are in global scope, they can be accessed in any other scope. Local scope however, any scope local to a function, variables declared are accessible within, and scopes surrounding it. Scope just defines the accessibility of variables, what we can access and what we cannot. 

`eval()`, `arguments`, `for in`, `with`, and `delete`, hidden classes and inline caching have problems because of scope chain. Can change how scope and scope chains work with some of these internally, which is difficult for us. Makes problem. 

# [[scope]]

When a function is called, an environment is created for the little world it enters. That environment has a field that has its own variable environment, but also another place that points to the outer scope, and to the outer scope until it hits the global scope. The JS spec has this internally. [[scope]] or scopes. 

If we created in dev tools, a `function a() {}` we can then go into the `window` object, we can then see `a()`. And we can go down in it and see `[[scopes]]` Which in this case is type global, because the scope in function a is global. 

# Exercise: JS is Weird 

```
function weird() {
    height = 50;
    return height;
}

weird();
```

Where do you think this `height` variable is located? Is `height` being created in the variable environment `weird()`? No. This is called leakage of global behaviorals. 

Underneath the hood, looks at `height` and says nothing has been declared. No var, let or const. So don't have it. Those keywords tell JS where to put them in the variable environment. So it goes to the global and asks is there such a thing as the height? Global env will say nope, I don't have it. But it's not throwing an error, because the global environment sees that it doesn't exist and will create it for us. 

That's weird. Doesn't make any sense. This is something that in the past with JS you could do. Now we have something called, `use strict` which if we add it to the top of the page, it's introduced as a way to prevent JS from doing these weird unpredicable edge cases. No such thing as a perfect programming language. `use strict` allows us to prevent these pitfalls. When we use it, it spits out that `height is not defined`. Because it knows we've not declared it. So we have to use `var, let or const` to define that variable. 

```
var heyhey = function doodle() {
    // do something
    return 'heyhey';
}
heyhey();
```

If we run it, that's expected. But what if we run: `doodle()`? What will happen. We'll get a ReferenceError. Means that `doodle()` is nowhere to be seen in the scope chain. This is because the `doodle()` function is actually enclosed to its own scope. Has it's own EC variable environment. That's a low level gotcha where we can't access it on the global scope. Can only access it here. 

# Function Scope VS Block Scope 

Scope means what variables we have access to. JS has `function scope`. Most other programming languages have `block scope`. 

With a `function scope` if we created an if statement, and a variable in it, because JS uses function scope, we can access the password globally. The variable is functionally scoped. We only create a new scope, a new environment when there is a function. If it was a function, then in that case, we couldn't access the `secret`.

```
if (5 > 4) {
    var secret = '12345'
}

secret;
```

In other languages, they use block scope, which means basically whenever we see the curly braces, we create a new environment. JS saw this and said, I want to be able to do block scoping too, how can I do that? With ES6, they introduced `let` and `const` keywords, which allow us to do block scoping. 

```
if (5 > 4) {
    let secret = '12345';
}

secret;
// ReferenceError
```

Variables declared inside of a block scope, like an if statement or for loops, can be accessed from outside the curly brackets when we use `var`. But if we use `let` and `const`, we can't. Doesn't mean you should never use `var`. Most of the time you should use `let` and `const`. But they are alternatives to variable declarations. 