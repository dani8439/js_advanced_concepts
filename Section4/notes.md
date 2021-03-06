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

```js
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

```js
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

```js
const obj1 = {
    a: 'Tom'
}
```
This `obj1` doesn't actually contain the value here directly. Instead it has a reference, similar to a pointer, to somewhere in memory where the object is held. 

The idea of JS built-in object. Can see them on MDN. In built-in objects, don't mean global objects. Standard built-in objects come with the language, `infinity`, `NaN`, `undefined`, `Map`, `Error`... etc. Built in objects that come with JS. Everything in JS is an object. Gets a little tricky. Many things we interact with directly such as strings, numbers, booleans, which are not objects, get a little bit complicated by the fact that these primitives have object wrappers, like `String` or `Number` or `Boolean`.  

Ex:
```js
true.toString()
// true
```
Why is this primitive type acting like an object using dot notation and toString? Because it silently creates a wrapper around true:

```js
Boolean(true).toString()
```

Keep in mind that things like boolean, or string, exist in order for us to use some methods on these primitive values. Not everything in JS is an object, but there are a lot of built in objects we can use, so that if we do `typeof Math` that's an object. `typeof Infinity` that's a number. 

Types can get a little tricky, most of the time you don't need to concern yourself with it. 

# `Array.isArray()` 

Arrays are objects. 

```js
var array = [1, 2, 3];

var array = {
    0: 1,
    1: 2,
    2: 3
}
```

Same thing pretty much. 

That's why when we do `typeof []` we get an object. 

How can we test if something we create is an array? Have something called `Array.isArray()`. Array constructor with dot notation to access a new property, `isArray()`. We can give it something and test: `Array.isArray([1, 2, 3])` // true. This is how we test in JS, otherwise it would be really hard to test it.

# Pass by Reference vs Pass by Value
Primitive types are immutable. We can't really change them. We have to completely remove the primitive type to do so. Can't really modify it, something new gets greated. In memory, contains the reference to it. This is called pass by value. Don't really know of each others existence. Objects on the other hand, are pass by reference. 

```js
var a = 5;
var b = a;

b++;

console.log(a);
console.log(b);
// 5
// 6
```

a now has the address of where this primitive lives in memory, same thing goes for b. What if we do variable b = a. Remember primitive types are passed by value. a = 5, b = 6. When we do pass by value, if we do something like `b++` and then console.log both, we get 5, and 6. 

This is because of pass by value. All we did, all JS engine did was copy the primitive type value 5, as if b = 5, so now b has a reference to the value primitive type 5. All we did was copy the value. 

Copied the value, and put it into a new memory space in our machine. In our stack, we made a copy. No connection whatsoever between a and b. Pass by value means we copy the value, and we create that value somewhere else in memory. 

Let's see how objects are different:

```js
let obj = { name: 'Yao', password: '123'};
let obj2 = obj1;

obj2.password = 'easypeasy';

console.log(obj1);
console.log(obj2);

// {name: 'Yao', password: 'easypeasy'}
// {name: 'Yao', password: 'easypeasy'}
```
`obj2` and `obj1` should be the same. But what if we change the password of obj2. What will happen then? Whoa! Password has been changed for both! Both were updated. Why? Because of pass by reference. 

Objects in JS are stored in memory and passed by reference. Mean we don't copy the values like we do with primitive types. We simply, when we assigned the objects, said hey this is where the object is in memory. Both are pointing somewhere in memory to a shelf that contains the information. Means that when we change `obj2.password` change password on this object in memory that also `obj1` is pointing to.

*Why is this good?* It's kind of nice, by having 1 object, we're saving space in memory. We're not creating multiple versions. Just reference one location instead of loading up our memory heap. But why might this also be bad? Because unlike a primitive type, someone else can change a property on that reference object. Need to be careful of it. 

Another example to prove that arrays are simply objects:

```js
var c = [1,2,3,4,5];
var d = c;
d.push(187282618);
console.log(d)
/// [1, 2, 3, 4, 5, 187282618]
console.log(c)
/// [1, 2, 3, 4, 5, 187282618]
```
Both `c` and `d` change as it's pass by reference. 

Maybe there are times when we want to clone an object. How can we do that? With an array: `var d = [].concat(c)`. Objects are a little more difficult: 

```js
let obj = {a: 'a', b: 'b', c: 'c'};
let clone = Object.assign({}, obj)
let clone2 = {...obj}

obj.c = 5;
console.log(clone)
```

`Object.assign()` first arg is where it's going, and second arg is what it's copying. 

Another way is using the spread operator: `let clone2 = {...obj}`. New feature, very nice. Cloning is great. 

But what will happen with the code we have, if we have an object within an object?:

```js
let obj = {
    a: 'a', 
    b: 'b', 
    c: {
        deep: 'try and copy me'
        }
    };
let clone = Object.assign({}, obj)
let clone2 = {...obj}

obj.c.deep = 'hahaha';
console.log(obj)
console.log(clone);
console.log(clone2)
```

It all changes to `deep: 'hahahah'`. What happened? Each object gets passed by reference, so although we cloned the object initially, this is a shallow clone. It clones only the first level. But within this object there is another address to another object. This address never changed, always referenced this object. So when we change the attribute, it changed all of it. 

How can we do deep cloning? It's a little funky. We use JSON. 

```js
let superClone = JSON.parse(JSON.stringify(obj))
```
Turns it all into a string, then parses it back into an object. If you're doing a deep clone, should be careful. Because the JSON stuff can have some performance implications. It will take a long time to clone them. Should clone objects another way. 

# Exercise: Compare Objects. 

```js
var user1 = {name : "nerd", org: "dev"};
var user2 = {name : "nerd", org: "dev"};
var eq = user1 == user2;
alert(eq); // gives false

var eq = Object.toJSON(user1) == Object.toJSON(user2);
alert(eq); // gives true
```
lodash, `isEqual` does the same. 

# Exercise: Pass by Reference

```js
const number = 100
const string = "Jay"
let obj1 = {
  value: "a"
}
let obj2 = {
  value: "b"
}
let obj3 = obj2;
 
function change(number, string, obj1, obj2) {
    number = number * 10;
    string = "Pete";
    obj1 = obj2;
    obj2.value = "c";
}
 
change(number, string, obj1, obj2);
 
//Guess the outputs here before you run the code: 
console.log(number); // 100
console.log(string); // Jay
console.log(obj1.value); // a
```

# Type Coercion

If there's one thing that will make you pull out your hair in frustration, it's type coercion. There's a lot of funky stuff JS does. 

What is it? It's something like this:

```js
1 == '1'
// true
```

Means that when the operands (things to the left and right of the operator) are different types, one of them will be converted into an equivalent value by the JS engine. 1 equals to string 1, I think you mean number 1! Based on that definition, type coercion means the language converting a certain type to another type.

*Do all languages have type coercion?* Yes they do! Because we always need to convert types between programs to do things. In memory different types look completely different to what we type. It's all represented on the computer in 1's and 0's. But it just so happens that JS has a very heavy type coercion nature to it as it's dynamically typed.

It happens when you use the double equals `==`. Double equals means compare, if they have 2 different types, coerce so we can compare. If we go back though and do same above logic with triple equals `===`. Means compare, don't coerce, be explicit. Will give use false. 

Is there any time we should use double equals vs triple equals? No. (His opinion, not Dakota's ????).

Type coercion doesn't just happen with the equals sign. Can work with if statements. 

```js
if (1) {
    console.log(5)
}

// true
```

Website you can go to that shows `==`, vs `===`, vs `if()`. JS Comparison table. (https://dorey.github.io/JavaScript-Equality-Table/)[table].

There's also a grid listed on MDN. 

In JS there's a concept of `-0` and `+0`. 

```js
-0 === +0 
// true

Object.is(-0, +0)
// false 
```
Technically different things in JS. `Object.is` works pretty much the same as `===` save for a few cases. 

# Exercise: Type Coercion

```js
false == ""  // true
false == []  //  true 
false == {}  // false
"" == 0      // true
"" == []   // true 
"" == {}  // false   
0 == []    // true  
0 == {}      // false
0 == null // false
```

# JTS: Dynamic vs Static typing

There are a ton of programming languages out there. Although JS is the dominant one on the web, there's loads of languages that are suitable to their domains and abilities. If we had to categorize them somehow, it would be something like Dynamic vs Static and Strong vs Weak.

*Dynamically and statically typed* 

**Dynamic** Perl, PHP, VB, JavaScript, Erlang, Clojurr, Groovy, Python, Ruby. 

**Static** C, C++, C#, Java, Scala, F#, Haskell

What does that mean? A Dynamically typed language allows us not to have to say what type of variable a variable is going to be. 

```js
var a = 100;
```

In a statically typed language, we'd have to do something like this: 

```js
int a;
a = 100;
```
Have to specifiy the type the variable is in a statically typed language. Don't have to do that with a dynamically typed language. Have to declare them explicitly with statically typed. Dynamic are not bound to this constraint, not bound to a particular type. 

In Dynamically typed languages, type checking is done during runtime. Meaning in runtime. JIT (with JS). Compiles as its running. 

Disagreement in the community of which type is better. Not going to get into that. 

With a statically typed language, we get documentation. 

```js
function sum(a: number, b: number) {
    return a + b;
}

sum('hello', null) // this will error out. 
```
Static typed languages are self documenting. You can come onto a project and immediately see what kind of parameters it expects. Second pro of these types of languages, because of these features, with our IDE's or text editor's, this helps with autocompletion. Can download plugins that say hey, even before you run this, it should be a number. You get less bugs in statically typed languages. Less bugs will go into production, we catch everything really early, in production. 

Some cons. We just made our code a little bit more complex to read. Added another layer to the program, and it takes time to learn. Extra layer of complexity, which is always a concern with programming. Other cons or argument against them, is that, why can't you just write better tests? People forget about writing good unit tests. With a statically typed language, you have a slower development process because there's an extra step to make sure there are not any type errors. This slows it down, and how fast code can be created, run, and then shipped to production.

Dynamically typed langauges, you spend less time debugging in production. Much more interested as developers. Few other pros and cons and everyone has opinions on the topic. 

Main idea is this, static typed usually prevent bugs and help keep errors from happening. Dynamic helps you be more flexible and write software faster. Typescript helps us write JS like a statically typed language. Makes JS extra safe. 

# JTS: Weakly vs Strongly Typed 

Lots of people use this idea incorrectly. You can have a weak language that's Dynamically typed, and a strong langauge that is statically typed. 

JS is a dynamic language that is weakly typed. What does that mean? In JS can do:

```js
var a = "boooyaaa"

a + 17 
"boooyaa17"
```

That's what a weakly typed dynamic language does. Can add a string to 17. So just going to turn the `17` into a string so it fits. This is called *Type Coercion*. Can annoy people. In a strongly typed language, you can't do this. Can't do this in Python. 

```Python
var = "boooyaa" 
var + 17 
// throws an error in Python 
```
Throws an error because it's strongly typed.

# JTS: Static typing in JavaScript 

TypeScript. Many ways to introduce static typing into JS. Different tools like `Flow`, `Reasonml` and `Flow`. They all do the same thing, all try to make JS a statically typed language, somehow. 

Reasonml created by facebook. A language in its own but similar enough to JS that's easy to pick up. Half the messenger code is written in reason. 

All of the tools goals is to make writing JS nicer, less buggy, and introduce static typing. 

**Flow** is a static type checker. Is able to add types to JS by writing some code that works with it, then putting it through a compiler like babel that spits out JS. Flow checks everything and it relies on Babel to remove that @@flow types we've added into our code before putting it into production. Flow comes built into `create-react-app`. 

**Typescript** differs from *flow* as it has its own compiler. Not like flow that depends on babel to remove all this extra code. Typescript is what we call a superset of JS. That is that it adds functionality on top of JS. JS is Typescript. Typescript simply adds a few extra features on top of JS. Difference between reason and typescript is that reason is a separate language on its own. It's not a superset like Typescript.

**Elm** is just like Reasonml in that it's own language that spits stuff out. Elm and Reasonml are both fairly new. 

Growth of Typescript outweighs growth of all others. Big part is because Angular is built using typescript. A lot of the react community is starting to use typescript. Typescript is overtaking flow's popularity. Once you learn the 1 method, it's quite easy to pick up in flow. 

As developers we must decide for ourselves what works for our projects and our teams. 