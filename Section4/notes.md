# **Types in JavaScript** 

# JavaScript Types

The different types we have in JS. Luckily there aren't that many. Only 7

- Numbers - `5`
- Booleans  `true` or `false` 
- Strings `To be or not to be`
- undefined `undefined`
- null `null`
- Symbol('just me')
- Object `{}`

Luckily for us, JS has an operator called `typeof` which tells us the type of an item. 

```
// Primitive
typeof 5
// number

typeof true 
// boolean 

typeof 'To be or not to be'
// string 

typeof undefined 
// undefined 

typeof null
// object 

typeof Symbol('just for me')
// symbole

// Non-Primitive
typeof {}
// object
typeof []
typeof function(){}
```

`null` is not actually an object. This is a mistake. The creater of JS acknowledges it. It *should* be `null`. A primitive type. Was a proposal to fix it, but there's so much legacy code that depends on it so can't change it without breaking everything. 

A `symbol` is a new type. Usually used for creating object properties so that the object's property is unique. 

`undefined` is the absence of a definition. Used as a default value when JS engine intializes our values. `undefined` means there's a variable there but there's nothing there. `null` on the other hand means the absence of the value. Means there's no value there. 


Where are Arrays? `typeof []` is an `object`. 
`typeof function(){}` is ` function`. 

There clearly is a typeof function. Technically though no. Technically, Arrays and functions are types of objects. But actually they are, because we can do this:

```
function a() {
    return 5;
}

a.hi = 'hihihihihih'

console.log(a.hi)
// hihihihihih
// undefined 
```

Functions are objects. 

Have the `typeof` operator that tells us what type things are. But there are two distincions in JS, primitives and non primitives.

In JS, all types, other than object types, are primitives. A **Primitive type** is data that only represents a single value. Means that the primitive 5, in memory the value is 5. Same thing goes for the rest, no ambiguity about it. Kind of like atoms, in that they can't be broken down to anything else save the value in memory. 

A **Non-Primitive type** doesn't include the actual value directly. Say do this:

```
const obj1 = {
    a: 'Tom'
}
```
This `obj1` doesn't actually contain the value here directly. Instead it has a reference, similar to a pointer, to somewhere in memory where the object is held. 

The idea of JS built-in object. Can see them on MDN. In built-in objects, don't mean global objects. Standard built-in objects come with the language, `infinity`, `NaN`, `undefined`, `Map`, `Error`... etc. Built in objects that come with JS. Everything in JS is an object. Gets a little tricky. Many things we interact with directly such as strings, numbers, booleans, which are not objects, get a little bit complicated by the fact that these primitives have object wrappers, like `String` or `Number` or `Boolean`.  

Ex:
```
true.toString()
// true
```
Why is this primitive type acting like an object using dot notation and toString? Because it silently creates a wrapper around true:

```
Boolean(true).toString()
```

Keep in mind that things like boolean, or string, exist in order for us to use some methods on these primitive values. Not everything in JS is an object, but there are a lot of built in objects we can use, so that if we do `typeof Math` that's an object. `typeof Infinity` that's a number. 

Types can get a little tricky, most of the time you don't need to concern yourself with it. 