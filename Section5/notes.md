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
// A function that accepts some parameters - function with parameters

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

# Exercise: Higher Order Functions 

```js
const multiplyBy() = function(num1) {
    return function(num2) {
        return num1 * num2
    }
}

const multiplyByTwo = multiplyBy(2);
const multiplyBySix = multiplyBy(6);
```
The higher order function here is the `multiplyBy()` as it returns another function. Can write it in a cleaner way with arrow functions: 

```js 
const multiplyBy = (num1) => (num2) => return num1 * num2

multiplyBy(4)(6) // 24
```

# Closures 

The first pillar of JS. **Closures** (other is **Prototypes**)

Have these things called Closures in JS because of two reasons.

1. Functions are first class citizens. Can pass functions around like data and any other type. 
2. Lexical scope. JS engine knows based on where code is written before it's even written, what variables each functions have access to. 

Closure = combination of function + lexical environment where it was declared. Closures allow a function to access variables from an enclosing scope or environment, even after it leaves the scope in which it was declared. Sounds confusing, eh? It is. 

```js 
function a() {
    let grandpa = 'grandpa';
    return function b() {
        let father = 'father';
        return function c() {
            let son = 'son';
            return `${grandpa} > ${father} > ${son}`
        }
    }
}

a() // Function: b
a()() // Function: c 
a()()() // grandpa > father > son
```

`function a()` and `function b()` are higher order functions that return other functions. `function c()` is a regular old function that returns a piece of string.

How did `son` of all people remember what `grandpa` was? 

```
const one = a();
```
Function a got popped off the stack. We removed the variable environment. Shouldn't `let grandpa` be garbage collected and removed from the stack? Somehow `son` has access to `grandpa` and `father`. This is what Closure is. 

With a closure when we run the `a()` function first, its pushed onto the stack and we create a variable environment. And this context execution has `grandpa` as a variable. This `grandpa` once we call function a, we have the chain that gives us a link to the global scope. If any variables there, we get access to them. Pops off the stack, but `grandpa` still remains? Why? Because it goes up into the box of closure. Because technically that's where the memory is. As soon as we don't need things, it'll be removed. But when the garbage collector comes and sees `grandpa`, it sees it's in the special closure box which can't be cleaned up, because there's something else referencing `grandpa` from inside of it. 

The next `b()` function is called, a new variable environment is created, and we have `father`. b() gets popped off the stack, and `father` gets put into the closure box. 

`c()` comes around, finally gets called, and we have `son`. When we return the statement of grandpa, father son, it looks into the variable environment for `father`. Can't find it. Instead of looking up globally, it looks into the closure box, sees both `grandpa` and `father`. JS does something unique here. The JS engine will make sure the function has access to all of the variables outside of the function with this closure. Closure is a feature of JS. It creates the closure because of `function c()`. 

If we placed another random variable b, but it's not referenced in `c()`, it doesn't keep it around. But it keeps anything that's still being referenced by a child function. So c needs `father` and `grandpa`. 

Closures are also called **lexical scoping**. Lexical = where it's written. Scoping = What variable we have access to. By that definition, means the JS engine before we run any code, already knows which functions has access to what variables, because JS is lexically scoped or statically scoped. It sees during the first phase when looking through the code, to keep grandpa and father around because it creates the scope chains. 

This all works because the values are not on the call stack, they're on the heap. Not garbage collected. 

```js
function boo(string) {
    return function(name) {
        return function(name2) {
            console.log(`${string} ${name} ${name2}`)
        }
    }
}

// rewritten as arrow function:
const boo = (string) => (name) => (name2) => 
    console.log(`${string} ${name} ${name2}`)

boo('hi')('tim')('becca'); // hi tim becca 
constbooString = boo('hi');
// could hypothetically wait 5 years before calling below if JS engine is running. And still get the right answer. 
const booStringName = booString();
```
Can have hidden powers now. 

# Exercise: Closures 

```js
function callMeMaybe() {
    const callMe = 'Hi! I am now here!';
    setTimeout(function() {
        console.log(callMe);
    }, 4000);
}

callMeMaybe();
```

# Closures and Memory

Closures have 2 really important main benefits. 

1. Memory efficient 

```js
function heavyDuty(index) {
    const bigArray = new Array(7000).fill('😊')
    console.log('created!')
    return bigArray[index];
}

heavyDuty(); // lots of 😊.
heavyDuty(688); // 😊
heavyDuty(688);
heavyDuty(688);
heavyDuty(688);
```

Example seems silly, but let's say the function is doing a very heavy operation. Let's say this index `688` is someplace in a database, someplace that gets accessed a lot. What happens if we call the function many times. Creating it every time. We create the memory, then we return it, then it's destroyed over and over and over. That doesn't sound very efficient. Wouldn't it be great if there was a way to create the array once and just have it in memory so we can constantly access it instead of creating all that work? 

How can we do that with closures? 

```js 
function heavyDuty2() {
    const bigArray = new Array(7000).fill('😊')
    console.log('created Again!')
    return function(index) {
        return bigArray[index];
    }
}

const getHeavyDuty = heavyDuty2();
getHeavyDuty(688);
getHeavyDuty(700);
getHeavyDuty(800);
// created Again! 
// 😊
```

Now we've created closure, and have a reference to `bigArray`. Maintained our closure scope without doing all that creation and descrution work. 

2. Allows us to do encapsulation 

```js
const makeNuclearButton = () => {
    let timeWithoutDestruction = 0;
    const passTime = () => timeWithoutDestruction++;
    const totalPeaceTime = () => timeWithoutDestruction;
    const launch = () => {
        timeWithoutDestruction = -1;
        return '💥'
    }
    setInterval(passTime, 1000);
    return {
        // launch: launch, remove as don't want people to have access to it. 
        totalPeaceTime: totalPeaceTime
    }
}

const ohno = makeNuclearButton(); // 0
ohno.totalPeaceTime(); // 12 
ohno.totalPeaceTime(); // 18 
ohno.totalPeaceTime(); // 24
ohno.launch(); // 💥
```

We used closures here. The `timeWithoutDestruction` is something that the function has access to. Don't want people to have access of `launch()` so we remove it. And can no longer launch. Encapsulation is this, it's hiding of information that is unnecessary to be seen by the outside world and be manipulated. Gets into the idea of **Principle of least Privilege** a big security principle when it comes to programming. Don't want to give anyone access to your API. Using closures we're able to access things that we don't want anyone else touching. But at the same time want people to have access to other things like `totalPeaceTime`. This is one of the main benefits of closure and data encapsulation. Some data should just not be directly exposed. Later on, will see modules use this pattern.

# Exercise: Closures 2 

Using closures, can you turn this function into something that can only be run once? 

```js 
let view 
function initialize() {
    view = '⛰️';
    console.log('view has been set!');
}

initialize();
initialize();
initialize();
console.log(view);
```

```js 
let view 

function initialize() {
    let called = 0;
    return function() {
        if (called > 0) {
            return 
        } else {
            view = '⛰️';
            called++;
            console.log('view has been set!');
        }
    }
}

const startOnce = initialize();
startOnce(); // view has been set! ⛰️
startOnce(); // doesn't work.
console.log(view);
```

# Exercise Closures 3 

```js
const array = [1,2,3,4]
for (var i = 0; i < array.length; i++) {
    setTimeout(function() {
        console.log('I am at index' + array[i])
    }, 3000)
}

// => 4 
// I am at index 4 
// I am at index 4
// I am at index 4 
// I am at index 4
```

Easiest way to solve this is to change `var` to `let`, because `let` allows us to use block scoping. So that the block creates a separate scope for each loop, and `i` is scoped within each one. `var` scopes globally, so it's always from the final return after exiting out of the function.

```js
const array = [1,2,3,4]
for (let i = 0; i < array.length; i++) {
    setTimeout(function() {
        console.log('I am at index' + array[i])
    }, 3000)
}
// => 4 
// I am at index 1 
// I am at index 2 
// I am at index 3 
// I am at index 4

```
Another way to solve is to use closures and an IFFE. We can reference `i` then in each iteration of the loop and it won't lose it. Pass in parameter of `i` so we can see, 0, 1, 2, 3. 
```js
const array = [1,2,3,4]
for (let i = 0; i < array.length; i++) {
    (function(closureI) {
        setTimeout(function() {
            console.log('I am at index' + array[closureI])
        }, 3000)
    })(i)
}
```

# Closures Review 
Learned that a closure is a combination of a function and a lexical environment in which it's declared. Closures allow a function to access variables from an enclosing scope or outer scope, even after it leaves the scope that it's declared. JS really popularized the idea of closures and it's now everywhere. It's adopted and added into different languages like `Python` and `Ruby`. 

# Prototypal Inheritance 

Second pillar. Very tough. 🤯

Remember `Array` and `Functions` are just `Objects` in JS. JS uses something called prototypal inheritance. What does that mean? Inheritance is an object getting access to the properties and methods of another object. The `Array[]` object gets access to the properties and methods of the `Object {}`, as does `Function()` through prototypal inheritance. 

```js
const array = [];
array.__proto__ 
// [constructor: f] ... lots of info
array.__proto__.__proto__
// base object everything in JS gets created from. 
```

Do `__proto__` and you see all these things that come with, comes with all sorts of methods `reduce`, `push`, `pop`. The new Array was created from the Array constructor, which contained an empty array, and we got all of this stuff from `Object`. The underscore underscore went up the prototype chain to the object. 

If we go up and do `__proto__.__proto__` we go up to `Object` and see all the base logic that everything in JS has. `toString()`. Anything that is a decendent of an object will get the `toString()` method. So an array has the `toString()` method on it because of the prototype chain. 

```js 
function a() {}
a.__proto__ 
// f () { [native code]} base function that all functions are created from 
a.__proto__.__proto__ 
// base object that all objects are created from 

const obj1 = {}
obj1.__proto__ 
// {constructor: f....} base object again 
```
Get the base object with `__proto__`. This is what prototypal inheritance is. It's a concept we'll understand why it's so useful to us. It's quite unique and not that common in other languages like c# or java, they use classical inheritance. In JS we have the class keyword, but it's syntactic sugar. There are no classes in JS, we only have prototypal inheritance. 

# Prototypal Inheritance 2

```js
let dragon = {
    name: 'Tanya',
    fire: true,
    fight() {
        return 5
    },
    sing() {
        if (this.fire) {
            return `I am ${this.name}, the breather of fire`
        }
    }
}

dragon.sing()
dragon.fight()

let lizard = {
    name: 'Kiki',
    fight() {
        return 1
    }
}

const singLizard = dragon.sing.bind(lizard)
console.log(singLizard())
// I am Kiki, the breather of fire
```

If we wanted to borrow a method from the `dragon` object, we've learned how to do that before. Can use `bind`. But we don't have fire set to true, so Kiki won't read it once we move the fire into an if statement. We want to inherit a bunch of these properties for the lizard as well to make it more powerful. What if we created a prototype chain? Hey I want Lizard to inherit all these properties and methods from dragon. How? We can do this:

```js
lizard.__proto__ = dragon;
lizard.sing() // I am Kiki, the breather of fire 
lizard.fire // true 
lizard.fight // 1 
```

Creating that chain up from `lizard` to `dragon`. Inherit everything, but we already have `fight()` so the power is `1` because that's what we originally set it to. Through the prototype chain, we can inherit the properties and methods of the dragon, and overwrite anything that we've already declared. So `name` and `fight` stay with us. But as soon as we say something like `sing()`, the JS engine goes up the prototype chain and finds it there. 

What would happen if we called something else like `lizard.dance()` and it doesn't exist? We get a `TypeError: lizard.dance is not a function`. Because we go up the prototype chain, and it doesn't exist all the way up to the tippy top to `Object`. 

```js 
dragon.__proto__ // {} base object
dragon.isPrototypeOf(lizard) // true 
```

Hypothetically we can use whatever methods this base object has. Use `isPrototypeOf()` says hey is `dragon` a `prototype` of `lizard` that is does `lizard` inherit from `dragon`? Yes. true. But if we change it around, to `lizard.isPrototypeOf(dragon)` we get false as it's not. 

# Prototypal Inheritance 3

```js
let dragon = {
    name: 'Tanya',
    fire: true,
    fight() {
        return 5
    },
    sing() {
        if (this.fire) {
            return `I am ${this.name}, the breather of fire`
        }
    }
}

dragon.sing()
dragon.fight()

let lizard = {
    name: 'Kiki',
    fight() {
        return 1
    }
}

// create a prototype chain up to dragon 
lizard.__proto__ = dragon 
for (let prop in lizard) {
    if (lizard.hasOwnProperty(prop)) {
        // only log whatever lizard has as its own property. 
        console.log(prop)
    }
}

// name 
// fight 
// fire 
// sing
```

if we loop through intially without the `hasOwnProperty(prop)` logic, then we console log all the properties. But if we put it in and only log the properties that lizard has itself, then it shortens to only `name` and `fight` as those are the only two properties `lizard` has on its own. Other properties are inherited up the prototype chain, so we're not just copying these properties from the dragon. 

The beauty is that js looks for you through the prototype chain automatically. Don't have to do any weird `__proto__` to use `hasOwnProperty()` does it automatically. This isn't the same as the scope chain. Prototype chain vs scope chain work in a similar fashion but are two different things. 

`__proto__` shouldn't really use it. Should never use it. It's bad for performance and there's different ways we want to inherit when it comes to prototypal inheritance. It messes up the JS compiler pretty badly.

Why is this useful? The fact that objects share prototypes, means you can have objects that point to the same place in memory and be more efficient that way. JS engine just looks up the prototype chain to this one instance. Interesting. 

Whenever we get `undefined` on something, because js goes up the prototype chain and finds nothing. 

```js
lizard.ahhha() // type error 
lizard.ahahah // undefined 
```

```js 
const obj = {}
obj.__proto__
// {constructor...}
obj.__proto__.__proto__ 
// null
```

`null` means there's nothing there. When JS was created as a language, `undefined` was created for we don't have that variable it's not defined. `null` means, no there's absolutely nothing there. Because of its prototypal inheritance nature, we needed some way to say hey, pass the base object, there's nothing there, there's `null`. Some would call this a null pointer, pointing to null. End of the chain, I've got nothing for you, sorry. Nothing there. 

# Prototypal Inheritance 4

```js
const obj = {
    name: 'Sally'
}
obj.hasOwnProperty('name');
// true 
obj.hasOwnProperty('hasOwnProperty')
// false 
```

`obj` itself doesn't have `hasOwnProperty` as a property, it has it up the prototype chain. 

```js
function a() {}
a.hasOwnProperty('call')
// false 
a.hasOwnProperty('bind')
// false 
a.hasOwnProperty('apply')
// false 
a.hasOwnProperty('name')
// true 
a.name 
// "a"
```

Our `call`, `apply` and `bind` are not part of it, but `name` is. A Function is a special type of callable object. We have code that can be invoked, an optional name, and properties. We have `call` `apply` and `bind` as properties. Technically not correct. These properties aren't on the function. They are up the prototype chain.

```js
function multiplyBy5(num) {
    return num * 5
}
multiplyBy5.__proto__
// f () { [native code] } base function that all functions are created from. Can capture it by right clicking in dev console, and click store as global variable temp1
temp1. // see all these properties and methods that come with it. So that's what happening here.
```

When we do `multiplyBy5` we have the `proto` property that links upward to the Function that has `call`, `bind` and `apply`. `__proto__` links to everything, links all the way up if you dig deep enough to to the base object and where `null` lives. `__proto__` links to `prototype`. 

`multiplyBy5` which is a callable object that has `Code()` that's available, `Name` (optional), `properties`, `__proto__`, and `prototype: {}`. That `__proto__` links up to the function, that is a callable object that has it's own `Code ()`, `__proto__`, `Properties`, and it's own `prototype: {call, apply, bind`} that has call, apply, and bind. `__proto__` actually lives inside ithe `prototype` object. 

```js 
multiplyBy5.__proto__  // points to function.prototype 
// f () { [native code] }
Function.prototype 
// f () { [native code] }
Object.prototype 
// {constructor: f...}  Base Object. 
Object.prototype.__proto__
// null
```

`__proto__` is simply a reference to up the chain the `prototype` object. 

```js 
const array = []
// undefined 
[].hasOwnProperty('map')
// false 
array.__proto__.hasOwnProperty('map')
// true 
Array.prototype 
// [constructor...] Base Array 
array.__proto__
// [constructor] Base Array
```

Arrays and Functions are objects in JS. Key is `__proto__` points up the chain to `prototype`. And `__proto__` lives in the `prototype`. 

# Prototypal Inheritance 5
Let's explore how we can create our own prototypes. We shouldn't really use `__proto__`. Shouldn't use it because of performance reasons. So what's a safe way to do this? 

```js
let human = {
    mortal: true 
}
let socrates = Object.create(human)
console.log(socrates)
// {}
socrates.age = 45 
console.log(socrates)
// { age: 45 }
console.log(socrates.mortal)
// true 
```
Because we've created using `Object.create()` a prototype chain up to `human`. 

```js 
console.log(human.isPrototypeOf(socrates))
// true 
```

`true` because we've inherited from human. This is how to do it without using `__proto__`. Named it this way so no one accidentally messes with the prototype chain. 