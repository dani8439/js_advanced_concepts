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

What about objects? If we created an object would we have those properties on there? No. Don't have `call`, `bind`, `arguments`. Functions are objects and there a special type of objects, a callable objects with the bracket notation for invoking the function contains the code, has name, and also has some properties. Why do we care? Why is that important? Because functions are just objects, that means we can pass them around like objects, like things that contain data. So beside doing things for us and performing actions in our code, we can also store data and move them around and have some really interesting applications. 

# First Class Citizens 

Functions can be passed around like data, besides something that performs actions. Will hear people say functions are first class citizens in JS. What does that mean? 

1. Functions can be assigned to variables and properties of objects, so we can do: 

```Javascript
var stuff = function(){}
```

2. Can also pass functions as arguments into a function:

```Javascript 
function a(fn) {
    fn();
}

a(function() {console.log('hi there')})
```

Able to pass a function as a parameter to a function. Almost as if we're just passing it as a string. 

3. Can return functions as values from other functions: 

```Javascript 
function b() {
    return function c() {console.log('bye')}
}
b()
// function c 
b()()
// bye
```

Those are the 3 properties that make functions a first class citizen in JS. Can assign, can pass these functions into arguments, can also return functions as values. Goes back to functions are data. Not only do they perform actions for us, but they are also pieces of data that can be passed around like first class citizens as if there were JS types. So anything you can do with other types, you can do with a function. As a matter of a fact, this idea of a first class citizen property in JS, introduces us to a whole world called **functional programming**. 

# Extra Bits: Functions 

Some of the things you want to watch out for with functions. You want to be careful about initializing them inside of loops:

```js
for (let i = 0; i < 5; i++) {
    function a() {}
}

a()

/// should be

function a() {}
for (let i = 0; i < 5; i++) {
    a()
}

```

Want to be careful because of instead of initializing the function in the loop each time, it should be initialized up top once and executed each time. 

Another thing you want to be careful with is say a function that returns some parameter that is not defined. Often finds us doing some check to see if something exists first. 

```js
function a() {
    return param
}

a()
// returns a ReferenceError 

// could add the param to the function as an argument which will give us undefined. Can avoid this by giving a default parameter: 

function a(param=6) {
    return param
}

a() // 6
```
Good to have default parameters set on a function as a way to avoid edge cases. 

# Higher Order Functions

**Higher Order Functions** are simply functions that can take other functions as arguments Or a function that returns another function. The big problem is that most people know what a HOF are but don't understand why we care/what they're used for. 

```js
// A simple function 
function letAdamLogin() {
    let array = [];
    for (let i = 0; i < 1000000; i++) {
        array.push(i)
    }
    return 'Access Granted to Adam'
}

function letEvaLogin() {
    let array = [];
    for (let i = 0; i < 1000000; i++) {
        array.push(i)
    }
    return 'Access Granted to Eva'
}

letAdamLogin();
letEvaLogin();
```
What's the problem with this code? It's not DRY. We've created some code that's not very flexible. For each user we have, we have to copy and paste code and repeat ourself. Imagine how inefficient it would be for hundreds of employees? How can we fix this? 

```js
// A function that acceps some parameters 

const giveAccessTo = (name) => 
    'Access Granted to ' + name


function letUserLogin(user) { // ++ we now tell the function WHAT DATA to use when we call it
    let array = [];
    for (let i = 0; i < 1000000; i++) {
        array.push(i)
    }
    return giveAccessTo(user);
}

letUserLogin('Eva');
// Access Granted to Eva
```

What superhero power did we just gain here? We leveled up by telling the function what data to use when we call it. Now we have a more generic function. We have the ability when we call the function to define the data. Have a bit more flexibility. Can delay telling what needs to be done until Execution Time. Also kept our code dry. 

What if we had instead of just a user, an admin? Someone with a lot higher privileges. Would have to create a separate login function for admin. Have to go through a bit more security procedures. 

```js
function letAdminLogin(admin) { 
    let array = [];
    for (let i = 0; i < 5000000; i++) {
        array.push(i)
    }
    return giveAccessTo(admin);
}
```

What did we do here? We copied more code. Not being very dry. Imagine if we had many more roles within the company? This is where Higher Order Functions are going to come into play. Can give it the data and also tell the function what to do when we actually invoke it. 

```js
const giveAccessTo = (name) => 
    'Access Granted to ' + name

function authenticate(verify) {
    let array = [];
    for (let i = 0; i < verify; i++) {
        array.push(i)
    }
    return giveAccessTo(person.name);
}

function sing(person) {
    return 'lalalala my name is ' + person.name;
}

function letPerson(person, fn) { // ++ tell it what data to use + what function to use as well. 
    if (person.level === 'admin') {
        return fn(person)
    } else if (person.level === 'user') {
        return fn(person)
    }
}

letPerson({level: 'user', name: 'Tim'}, authenticate)
letPerson({level: 'admin', name: 'Sally'}, authenticate)
letPerson({level: 'admin', name: 'Sally'}, sing)
```

Gain all the power with the code above. Also DRY. And general. Higher order functions returns other functions.

Kind of broke the code by removing 100000, and 500000 in the `letPerson()` function, but maybe can write some kind of logic into authenticate to change that. 

We're able to tell the function what to do during invocation. DRY, and more flexible this way.

```js
const multiplyBy() {
}

multiplyByTwo()
multiplyByTen()
```