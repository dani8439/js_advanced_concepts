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