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