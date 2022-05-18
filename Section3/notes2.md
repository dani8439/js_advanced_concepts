# `this` keyword

The most confusing and scariest part of JS.

What is it? `this` is the object that the function is a property of. Means that we have an object, and this object has some function and inside of this function, when we do something we have access to the `this` keyword. `this` refers to this object that the function is a property of: 

`obj.someFunc(this)`

EX:

```
this
// Window
```

`this` returns the window object in the dev console. Remember that `this` gets set as `Window` in the execution context initially. When the `Global Object` and `this` are created. 

```
function a() {
    console.log(this)
}
// undefined 
a()
// Window {postMessage:f ....}
```

Get `Window` once again. `this` = `Window`. `this` is the object that the function is the property of. When we call `a()` we're really calling `window.a()`. So that's what `this` is. It's the window. 

When it comes to coding, we never want `this` to refer to the `Window` object. 

```
function b() {
    'use strict' 
    console.log(this);
}
b()
// undefined
```

`'use strict'` will help us avoid the common mistakes that can happen with JS. Allows us not to have this, `this` referring to the window object. Can be used at beginning of a function, or top of the file. ES6 have it automatically. 

```
const obj = {
    name: 'Billy', 
    sing: function() {
        return 'lalala' + this.name
    }
}
```

Inside of an object how can we access a property so that the `sing` function can sing billy's name? Can instead use the `this` keyword, and do `this.name`. So if the name changes, it's all dynamic. Can do this because `this` is the object that the function is a property of. So we're simply saying `obj.name`, in `this.name`. But `obj` wouldn't work, and we use `this`. 

If we run `obj.sing()` we get `lalala Billy`. 

`this` is the object that the function is the property of. `this` refers to whatever is to the left of the `.`. With an object we access properties and methods of an obj (methods are functions that are inside of objects). The property and methods can be accessed with the `.` notation. All you really need to know about `this` is whatever is to the left of the dot. 

```
const obj = {
    name: 'Billy', 
    sing: function() {
        return 'lalala' + this.name
    },
    singAgain() {
        // return 'lalala' + this.name + '!'
        return this.sing() + '!'
    }
}
```

This is not good above. It's not DRY. A better way would be to call the `sing()` function and add the exclamation mark to it. So instead do: 

`return this.sing() + '!'`

Keeps things DRY. 

## Two main benefits of this. 
1. It gives methods access to their object. Gives `sing()` access to the object so it can use properties and methods within that object. 

2. Can execute the same code for multiple objects. 

```
function importantPerson() {
    console.log(this.name + "!")
}

const name = 'Sunny';
const obj1 = {
    name: 'Cassy',
    importantPerson: importantPerson
}
const obj2 = {
    name: 'Jacob',
    importantPerson: importantPerson
}

console.log(name)
importantPerson();
// Sunny!
```

If we run this, `this` will refer to the window object. Because when we call `importantPerson()` it's being called with the global object (`window.importantPerson()`). `window.name` won't know anything about it. 

-- 
Second important use of `this` is that it executes code for multiple objects as shown above with `obj1` and `obj2` having `importantPerson` in both of them. If we add an exclamation mark to above, it filters down to both.

if we call `importantPerson()` we get `Sunny!`. If we call `obj1.importantPerson()` we get `Cassy!`, and `obj2.importantPerson()` we get `Jacob` as that's what it's being called on. 

Gives methods access to their object, and executes same code for multiple objects. `this` is usually determined by asking hey, EC, what called the function? What called me? Can think of `this` as Who called me?. The `this` keyword acts as a placeholder and refer to whatever object called that method. 

# Exercise Dynamic Scope vs Lexical Scope 

```
const a = function() {
    console.log('a', this)
    const b = function() {
        console.log('b', this)
        const c = {
            hi: function() {
                console.log('c', this)
            }}
        c.hi()
    }
    b()
}
a()
```
When we run `a()` it will execute all of it. 

```
a Window {window: Window, self: Window, document: document, name: '', location: Location, …}
b Window {window: Window, self: Window, document: document, name: '', location: Location, …}
c {hi: ƒ}
```

`c()` happens because of lexical scope inside of the object. 

Another example:
```
const obj = {
    name: 'Billy',
    sing() {
        console.log('a', this);
        var anotherFunc = function() {
            console.log('b', this)
        }
        anotherFunc()
    }
}
obj.sing
// a {name: "Billy", sing: f}
// b Window {...}
```
Why is `b` referring to Window? Because the `this` keyword is not lexically scoped - means it doesn't matter where it's written but how it's actually called - what happened underneath the hood is that `obj.sing()` ran, and the `obj.sing()` function inside of the `sing()` `anotherFunc()` ran. `obj.sing()` did not call another function, the `sing()` function did. `this` keyword defaults to the window object in here, it's very confusing. Created a lot of problems for people as this error was so problem. 

Remember, in JS our **lexical scope** (available data + where the function was defined) determines our available variables. Not where the function is called (**dynamic scope**). 

There is a footnote to this statement. Everything in JS is actually lexically scoped, but how we write it is how we determine what's available, except for the `this` keyword, which is dynamically scoped. Doesn't matter where it's written, but how it's called. 

*How can we avoid this pitfall?* 
Can solve this issue using **arrow functions**, which we got in ES6. Arrow functions are lexically bound. Have a lexical `this` behavior. If we change it to arrow functions instead, it will lexically bind `this` to the surrounding object.

```
const obj = {
    name: "Billy", 
    sing() {
        console.log('a', this);
        var anotherFunc = () => {
            console.log('b', this)
        }
        anotherFunc()
    }
}
obj.sing
// a {name: 'Billy', sing: f}
// b {name: 'Billy', sing: f}
```

What did we do before arrow functions? We'd `return anotherFunc.bind(this)`. Return another function and then `bind` it to `this`. 

Another way is to outside of the function itself, create a reference to `self`. 

```
const obj = {
    name: "Billy", 
    sing() {
        console.log('a', this);
        var self = this;
        var anotherFunc = function() {
            console.log('b', self)
        }
        return anotherFunc()
    }
}
```

What does `bind` really do? 

# `call()`, `bind()`, `apply()`

`call()` and `apply()` look a lot more intimidating than they are. 

```
function a() {
    console.log('hi')
}

a.call()
// hi
```
Underneath the hood in JS. When we do `a()` to invoke the function, all functions when created have the property `a.call()`. `a()` is just shorthand for `a.call()`. 

`call()` and `apply()` do the same thing for now. 

```
const wizard = {
    name; 'Merlin',
    health: 100,
    heal() {
        return this.health = 100;
    }
}

const archer = {
    name: 'Robin Hood', 
    health: 30
}

wizard.heal();
// 100
```

Wouldn't it be nice if we could borrow the `heal()` function from the wizard? And heal the archer? How can we borrow it from another object? We can't just use `this.heal()` because the second object doesn't have it. Instead we can borrow it and use `call()` and `apply()` to do so. 

```
const wizard = {
    name; 'Merlin',
    health: 100,
    heal(num1, num2) {
        return this.health += num1 + num2;
    }
}

const archer = {
    name: 'Robin Hood', 
    health: 30
}

console.log('1', archer)
wizard.heal.call(archer, 50, 20)
console.log('2', archer)
// 1 {name: 'Robin Hood', health: 30}
// 2 {name: 'Robin Hood', health: 110}
```

First parameter to `call()` is what wizard should be bound to. Hey, call `heal()` instead of using `wizard`, use `archer` so we can borrow it. 

`call()` has other parameters it can receive. It can receive arguments. Say `heal()` took `num1, and num2`. 

All `call()` is really useful for is this. 

With `apply()` it does the same thing. Only difference between is that instead of `call()` that just takes an endless list of parameters, `apply()` takes an array of parameters: 

```
console.log('1', archer)
wizard.heal.apply(archer, [100, 30])
console.log('2', archer)
// 1 {name: 'Robin Hood', health: 30}
// 2 {name: 'Robin Hood', health: 160}
```

How you use `call()` and `apply()` depends on how you wish to pass the parameters to it. 

What about `bind()`? What happens if we use it?

Similar to `call()` and `apply()`, `bind()` allows us to use what we have here. Unlike those two which run immediately, `bind()` returns a new function with a certain context and parameters. Usually used when we want to call a function later on with a certain context, and certain `this` keyword. 

```
console.log('1', archer)
wizard.heal.bind(archer, 100, 30)
console.log('2', archer)
// 1 {name: 'Robin Hood', health: 30}
// 2 {name: 'Robin Hood', health: 30}
```
Doesn't run or work, archer isn't healed. Doesn't `run` the function, it `returns` a function, so that if we added it to a variable so we can use it later on. 

```
console.log('1', archer)
const healArcher = wizard.heal.bind(archer, 100, 30)
healArcher()
console.log('2', archer)
// 1 {name: 'Robin Hood', health: 30}
// 2 {name: 'Robin Hood', health: 160}
```

Now it works!

`bind()` allows us to store the `this` keyword, or this function borrowing for later use. `bind()` is like a bandaid to fix this idea of a dynamically scoped `this` keyword which ruins our lexical scoped discussion we've had. 

**In review** `call` and `apply` are useful for borrowing methods from an object. `bind` is useful for us to call functions later on with a certian context or certain `this` keyword.

# Exercise: `call()`, `apply()`:

How would you implement this:

```
const array = [1,2,3];
 
function getMaxNumber(arr){
  //code here  
}
 
getMaxNumber(array) // should return 3
```

```
const array = [1,2,3];
 
function getMaxNumber(arr){
  return Math.max.apply(null, arr)
}
 
getMaxNumber(array)
// 3
```

# `bind()` and currying

Learned how we can do function borrowing with `apply()` and `call()`. Also learned how we can use `bind()` to do the same thing and call the function later on with a certain value to the `this` keyword. 

Something else you can do with `bind()` which is called **function currying**. 

```
function multiply(a, b) {
    return a * b
}
```
**currying** refers to only partially giving a function a parameter. Why would this be useful? Because we can do something like this:

```
let multiplyByTwo = multiply.bind(this, 2)
console.log(multiplyByTwo(4))
// 8
```
initially `console.log(multiplyByTwo())` will give us `[Function]` BUT, we can pass in numbers to it to use it, and that will give us the answer by whatever number we pass in.

```
let multiplyByTwo = multiply.bind(this, 2)
console.log(multiplyByTwo(4))
// 8
let multiplyByTen = multiply.bind(this, 10)
console.log(multiplyByTen(4))
// 40
```