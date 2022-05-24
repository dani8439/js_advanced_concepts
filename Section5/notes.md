# Functions are Objects 

Functions in JS are also objects. When we invoke a function we get two parameters automatically, the `this` keyword and the `arguments` keyword. The `arguments` keyword is an Array like object that has some weird behaviors like looping and iteration, so we want to avoid it and use the spread `...` operator. Because of it, we could technically not have any parameters defined for a function. When we call a function, if we add parameters to it we can still grab them using the `arguments` keyword. Learned when we defined the functions, and the compiler look at it lexically, it determines what variables are available to us in our variable environment and adds our scope chain. 

We have a few ways of creating/invoking functions. 

```Javascript
function one() {
    return 1
}

one()

const obj = {
    two: function() {
        returns 1;
    }
}

obj.two();
```

Can also simplify as: `two() { return 2 };` 

```Javascript
function three() {
    return 3;
}

three.call();
```
One more way to invoke functions. Won't see it very often. 

```Javascript 
const four = new Function('return 4')

four();
```
This is called a **FunctionConstructor**. It creates functions for us. All we do is the first parameter is whatever we want the text to be. We can also add parameters. Can also do: `('num', 'return num')` if we call it with `4` it will still return 4. 

Functions are objects. It's something that's not very common in other languages. Can do something like:

```Javascript
function wohoo() {
    console.log('woohooo');
}

wohoo.yell = 'ahhhh';
```

Can add properties to functions. Underneath the hood, JS creates a special type of object called a **Callable object**. That is the psuedocode. Won't really work. 

```Javascript
const specialObj = {
    yell: 'ahhhhh',
    name: woohoo,
    (): console.log('woohoo');
}
```

If we had `somefunc()` it would have some special properties. `Code()`, `Name (optional)`, `Properties` (call(), apply(), bind()). 

Can do:

```Javascript 
woohoo.call()
```