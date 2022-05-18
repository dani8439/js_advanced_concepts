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