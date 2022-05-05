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