# Functional Programming Intro 

**Functional Programming** is all about separation of concerns. All about packaging our code into separate chunks so everything is well organized. Each part of our code concerns itself with what it deals with. Also separates Data and Function. No correct definition of what is and isn't functional. Generally, functional languages have an emphasis on simplicity where data and functions are concerned. Don't have concepts of classes and methods. Operate on well defined data structures, rather than belonging to that data structure. Goals are the same as OOP. (Clear + Understandable, Easy to Extend, Easy to Maintain, Memory Efficient, DRY).

Have a very important Pillar with FP. **Pure Functions**. There's a separation between the data of a program and the behavior. All objects created in FP are immutable. Once something is created, it cannot be changed. Avoid shared state, adhere to principle of pure functions. 

# Pure Functions 

What are pure functions? There's 2 main things. A function has to always return the same output given the same input. The function cannot modify anything outside of itself. No side effects. 

```js
// No side effects 
// input --> output

const array = [1, 2, 3];

function mutateArray(arr) {
    arr.pop();
}

function mutateArray2(arr) {
    arr.forEach(item => {
        arr.push(1)
    })
}
mutateArray(array);
mutateArray2(array);
console.log(array) // [1, 2]
```

The function above has *side-effects*. Meaning, does the function modify anything outside of itself? It does. When we run it, the array changes from `[1, 2, 3]` to `[1, 2]`. If we call it again, then the array is modified again. 

With side effects, we're using shared state that can interact with anything. One of the troubles of this. Order of the function calls matter, this can cause a lot of bugs. How can we write something that has no side effects?

# Pure Functions 2

How can we make the code not have any side effects and not change what the array is? We can create a new array. 

```js
const array = [1, 2, 3]
function removeLastItem(arr) {
    const newArray = [].concat(arr);
    newArray.pop()
    return newArray 
}

function multiplyBy2(arr) {
   return arr.map(item => item*2)
}

const array2 = removeLastItem(array); // 1, 2
const array 3 = multiplyBy2(array) // 2, 4, 6
console.log(array); // 1, 2, 3
console.log(array2, array3)
```

Created a new state or data, but it's a local variable. Not modifying anything outside of it. Not effecting the outside world, that's the beauty with no side effects. Doesn't effect the outside world, and so konw what to expect from it. 

No side effects for `multiplyBy2` as well. If we `console.log()` it all, see different arrays living on their own. What happens if we have a `function a()` is it a pure function? 

```js
function a() {
    console.log('hi');
}
```

No, it's not. It's window specific, using the browser to log to the browser. Effecting the outside world, modifying something outside of itself, so it's not a pure function. Has side effects *Input should always result in the same output*  Yes. it's always the same with it. 

```js
function a(num1, num2) {
    return num1 + num2
}

a(3, 4) // 7
```
Click many times and it's always 7. This is what we call **Referential Transparency**, means if I completely change the function to the number 7, will it effect any part of the program? 

```js
function b(num) {
    return num*2
}

b(a(3,4)) //14 
```

*Referential transparency* says if we change `b(a(3,4))` to `b(7)` will it have any effect on the program? As it is, no. Always gives the same output of `14`. These functions also have no side effects, not touching hte outside world. Only touching their own parameters. 

The biggest thing in functional programming, idea with pure functions, is that it makes functions very easy to test, to compose, and avoids a lot of bugs. No mutations, no shared state, have these predictable functions that minimize the bugs in our code. Is it possible to have pure functions everywhere? Can you have 100% pure functions? 

# Can Everything be Pure? 

Learned about a pure function where we have no side effects and the same input gives the same output. Can we do anything without side effects? `console.log()` is a side effect. `input/output` is a side effect. Communicating with the outside world in any way which is what input/output is, is not pure. With just pure functions, that outside world knows nothing about, philisophically, doesn't do anything.

A program doesn't exist without side effects. Can't run basic code, websites, without interacting with the browser. Browsers have to make `fetch` calls, to http, interact with the DOM, to achieve anything. Idea is just to minimize side effects. 

Purity is more of a confidence level. Cannot be 100%. Side effects and impurity is not necessarily bad. Idea is to organize your code in a way that you put side effects to a certain place in the code so it becomes predictable and easier to debug. 

At its core, essence of functional programming, want to build programs that are very small, very usable, pure functions. How do we build the perfect function? A perfect function should do 1 task and 1 task only, should have a `return` statement, pure, no shared state, Immutable state (can modify within our functions, but always return a new copy of the output no matter the input), composable, and predicatable. 

# Idempotence 

**Idempotence** means given the same input a function will alway returns or does what we expect it to do. Little bit different. Would be the same if we switched `return Math.random(num)` with `console.log(num)`. Another idea that would be idempotenct, is deleting a user from a database. Can delete the user once, but if we keep calling the function, going to return the same empty field, as there's no more users. See idempotence with http GET requests in API calls. 

Why do we care about it? The idea to call something 1000 times and always getting the same result is extremely valuable. Makes our code predictable. 

Another idea is to be able to call yourself over and over and still get the same result. (`Math.abs(Math.abs(-50))`). With all of this we have the guarantee of code being predictable. 

```js
function notGood(num) {
    return Math.random(num)
}

notGood(); // 0.94639010101010

Math.abs(Math.abs(-50))
```

# Imperative vs Declarative

**Imperative** code tells the machine what to do and how to do it.

**Declarative** code tells the computer what to do and what should happen. Doesn't tell the computer how to do things. 

A computer is better at being imperative. Needs to know how to do things. That is, it needs to know how to do things. We as humans are more declarative. If you ask someone for a jug of water, they know how to do it, don't have to instruct. 

Machine code is imperative, and very descriptive. VS going higher up the chain, that becomes more declarative (js). Don't need to tell computer where to store the variable etc. 

Imperative, very instructive. 
```js
for (let i = 0; i < 1000; i++) {
    console.log(i)
}
```
How can we make it more declarative?
Not telling the program what to do or how to do it.
```js
[1,2,3].forEach(item => console.log(item))
```
Another classic example is jquery. Is a lot more imperative than what we have now, like react, angular or vue. With it, we told our website exactly what to do. Hey if x happens, do this. React on the other hand is declarative. Takes in some parameters and returns something else, don't tell how to display it, etc. 

Functional programming helps us be more declarative. Important to remember when we talk about declarative and imperative, declarative is compiled down or processed by something imperative. At the end of the day we can't avoid side effects or data manipulation. Something has to do it.

# Immutability 

**Immutability** means not changing the data or the state. Instead, making copies of the state and returning a new state every time.

Pure function, clones the object. 

```js
const obj = {name: 'Andrei'}
function clone(obj) {
    return {...obj}; // this is pure
}
obj.name = 'Nana';
```

As soon as we change the `obj.name` we are mutating the state. Immutability is very important, we can change things inside of our function, but we don't want to effect the outside world. Our function is pure, but we have a lot of mutation in it. Ideally, we'd create a function to change the name:

```js
function updateName(obj) {
    const obj2 = clone(obj)
    obj2.name = 'Nana';
    return obj2
}

updateName(obj) 
const updatedObj = updateName
console.log(obj, updatedName) // { name: 'Andrei'} {name: 'Nana'}
```

Maintained immutability by making copies. Doesn't seem very memory efficient though. If we're just copying things over and over, doesn't that just fill up our memory? Something called structural sharing, when it comes to functional programming a lot of things implement it. Under the hood, only the changes to the state are copied. Everything else is still there in memory. 

# Higher Order Functions and Closures 

In js functions are first class citizens. Higher order functions and closures. 

HOF mean it's a function that does 1 of 2 things, either takes 1 or more functions as arguments, or returns a function as a result, often called a callback. 

Closure is a mechanism to maintain some bit of state. Easy to create. Define a function within another function, and then expose it. 

```js 
// HOF 
const hof = () => () => 5;
hof(); // [Function]
hof()() // 5

const hof = (fn) => fn(5);
hof(function a(x) {return x})

// Closure 
const closure = function() {
    let count = 0;
    return function increment() {
        count++
        return count
    }
}

closure() // [Function: increment]
const incrementFn = closure();
incrementFn() // 1
incrementFn() // 2
incrementFn() // 3
```

Because of closure, the incremement function remembers the variable declared in the outer scope. The variable used by the inner function is available. We're modifying the state outside of our function. 

When it comes to functional programming, we can definitely still use closures, and they're still very powerful. Closures only make the function impure, if we modified the closed over variable. If instead our increment is just: 

```js 
const closure = function() {
    let count = 55;
    return function getCounter() {
        return count;
    }
}

const getCounter = closure();
getCounter()
getCounter()
getCounter
```

Not modifying. Created private variables. Used closures to create data privacy. Can't modify the count as a user, it's always the same. 

# Currying 

Currying is the technique of translating the evaluation of a function that takes multiple arguments, into taking a sequence of functions each with a single argument. Take a function can take multiple parameters, instead using currying to modify it to a function that takes one arg at a time. 


```js
const multiply = (a, b) => a * b;
multiple(3,4) // 12

const curriedMultiply = (a) => (b) => a * b;
const curriedMultiplyBy5 = curriedMultiply(5)

curriedMultiply(5)(3) // 15

curriedMultiplyBy5(4) // 20
```

`curriedMultiply` has access to `a` and `b` because of closure. Give the function one parameter at a time, because if you gave it two at once `curriedMultiply(5,3)` it wouldn't work. 

Even if we call `curriedMultiplyBy5(4)` many times, it only runs the `(b) => a * b` part again and again. 

# Partial Application 

Partial application is a way for us to partially apply a function. It's the process of producing a function with a smaller number of parameters. Taking a function, applying some of its arguments in the function so it remembers those parameters then uses closures when it's called with the rest of the arguments. 

Partial application says we want to apply part of the parameters, lets say a, and then the next time I call that function, I want to apply the rest of the arguments. 

```js
const multiply = (a, b, c) => a*b*c; 
// curried version has another arrow function in it:
const curriedMultiply = (a) => (b) => (c) => a*b*c;
curriedMultiply(3)(4)(10) // 120
```

Partial application says no no no, call the function once, and then apply the rest of the arguments to it. How do we do that? 

```js 
const multiply = (a, b, c) => a*b*c; 
const partialMultiplyBy5 = multiply.bind(null, 5)
partialMultiplyBy5(4, 10) // 200
```
Main diff between currying and partial application. On the second call, expect all the arguments. Currying, one argument at a time. 

# MCI: Memoization I

In order how to understand how dynamic programming works, need to understand how caching works. **Caching** is a way to store values, so you can use them later on. Ideally you can think of caching as a backpack you take to school. Instead of going all the way home when you need something, having a small box that holds items that you need, so when you go to school, you can just reuse them. Hold a piece of data in a box. 

**Memoization** is a specific form of caching. We use it a lot in dynamic programming. 

```js 
function addTo80(n) {
    console.log('long time')
    return n + 80;
}

addTo80(5) // 85
addTo80(5) // 85
addTo80(5) // 85
```
What if the operation took a really long time? What if there was a `console.log('long time')` and it took a long time. Every time we run the function, have to run `long time` 3 times, it will take a long time even though we've run the calculation 3 times. 

Is there a way to optimize it? This is where to use memoization or caching. 

```js 

let cache = {
};

function memoizedAddTo80(n) {
    if (n in cache) {
    //similar to doing cache.n  
        return cache[n];
    } else {
        console.log('long time');
        cache[n] = n + 80;
        return cache[n]
    }
}

console.log('1', memoizedAddTo80(5)) // long time, 1 85
console.log('2', memoizedAddTo80(5)) // 2 85
```

What is memoization exactly? It's a specific form of caching that involves caching the return value of a function, based on its parameters. If the parameters of the function is not changed like with console.log 1 and console.log 2, it uses the cache, that's calculated the same thing before with the same parameter and already calculated, uses the cache. Memoization is a way to remember a solution to a solve problem so you don't have to calculate it again.

# MCI: Memoization 2

Is there a way to improve the functions from the previous example a little? Ideally, don't want to fill the cache in the global scope. Ideally, it's good practice to have memory for the cache to live inside of the function, not polluting the global scope. Can use closures in JS.

Problem once we put cache inside, it gets reset each time function is called. So can use a closure instead to get around it. 

```js 
function memoizedAddTo80() {
    let cache = {};
    return function(n){
        if (n in cache) {
            return cache[n];
        } else {
            console.log('long time');
            cache[n] = n + 80;
            return cache[n]
        }
    }
}

const memoized = memoizedAddTo80();

console.log('1', memoized(5)) // long time ...... 1 85
console.log('2', memoized(6)) // long time ...... 2 86
```

# Compose and Pipe 

data --> function --> data --> fn --> 

Want a number -50 * 3 and then take the absolute value (remove negative sign from it). 

`compose` doesn't exist in js. But there are libraries. One of the best libraries is Ramda. Use it like `R.compose(...)`. For now don't want to use a library, just want to build our own. 

```js
const compose = (f, g) => (data) => f(g(data))
const multiplyBy3 = (num) => num*3
const makePositive = (num) => Math.abs(num);
const multiplyBy3AndAbsolute = compose(multiplyBy3, makePositive)

multiplyBy3AndAbsolute(-50)
```

We've made our own compose assembly line, that can be selected and assembled in various combinations. Can build functions this way. 

Also another thing called `Pipe`. 

Pipe is essentially the same thing, instead of going right to left, it goes left to right. 

```js
// fn1(fn2(fn3(50)));
// compose(fn1, fn2, fn3)(50)
// pipe(fn3, fn2, fn1)(50)

const compose = (f, g) => (data) => f(g(data));
const pipe = (f, g) => (data) => g(f(data));
const multiplyBy3 = (num) => num*3;
const makePositive = (num) => Math.abs(num);
const multiplyBy3AndAbsolute = compose(multiplyBy3, makePositive);

multiplyBy3AndAbsolute(-50)
```
Will see them changed interchangeably, they produce the same result. 

# Arity 
**Arity** simply means the number of arguments a function takes. 

compose has an arity of 2. MultiplyByThree has an arity of 1. (from previous lecture).

Good idea fewer number of parameters there are in a function, the easier it is to use that function. More parameters a function has, harder it is to compose it. With arity there is no hard right or wrong. Like to stick to less (personal preference).

# Is FP the Answer to Everything? 

Idea of FP is the idea of separation of data and functions, data and the effects. Keeping functions small, pure, and composable. Doing one thing and doing it well. Allows us to have a predictable program that minimizes bugs as everything is so simple. As long as we can even out the bugs, can build really complex programs out of these smaller ones. But times where OP is better. 

# Solution Amazon 

```js
// Amazon Shopping 
const user = {
    name: 'Kim',
    active: true,
    cart: [],
    purchases: []
}

// purchaseItem(user, {name: 'laptop', price: 344})
purchaseItem(
    emptyCart,
    buyItem,
    applyTaxToItems,
    addItemToCart
)(user, {name: 'laptop', price: 200})

const compose = (f, g) => (...args) => f(g(...args));

function purchaseItem(...fns) {
    return fns.reduce(compose)
}

function addItemToCart(user, item) {
    const updateCart = user.cart.concat([item])
    return Object.assign({}, user, { cart: updateCart })
}

function applyTaxToItems(user) {
    const {cart} = user;
    const taxRate = 1.3; 
    const updatedCart = cart.map(item => {
        return {
            name: item.name, 
            price: item.price*taxRate
        }
    })
    return Object.assign({}, user, { cart: updatedCart })
}

function buyItem(user ) {
    return Object.assign({}, user, { purchases: user.cart })
}

function emptyCart(user){
    return Object.assign({}, user, { cart: [] })
}

// Implement a cart feature:
// 1. Add items to cart. 
// 2. Add 3% tax to item in cart 
// 3. Buy item: cart --> purchases 
// 4. Empty cart
```