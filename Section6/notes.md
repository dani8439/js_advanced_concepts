# Object Oriented Programming and Functional Programming 

In all languages there are two primary components, the data, and the behavior (the things the program can do). In order to organize things like that, initially had languages that had different ideas of what we could do. There's things like functions and objects that are really important. Learned about Prototypal inheritance, closures, and functions as first class citizens. Objects allow us to do prototypal inheritance. 

**OOP Object Oriented Programming** says that bringing together the data and its behavior in a single location called an object, and containing all of that in a box, makes it easier to understand how our programs work. 

**Functional Programming** says that data and behavior are distinctly different things and should be kept separate fro clarity, so we have multiple boxes instead. 

OOP is like building a robot. Build it all togetehr. FP says give me that data, I'll act upon that data, and return it with something you gave me. 

Idea is to use both paradigms in unison to make our code easy to read, clear, more understandable, more efficient, easy to extend.

The two pillars Closures and Prototypes all us to learn about these topics. Without them, we wouldn't be able to learn about either (Closures for FP and Prototypes for OOP).

# OOP Introduction 

*Object Oriented Programming* the `this` keyword, `new` keyword, Prototype, ES6 CLasses, Java, Inheritance, `Object.create()` Private vs Public, 4 Principles of OOP. 

OOP has been around since the 70s. It's a style of programming that's very common (C#, Python, Ruby, Java). In OOP, an object is a box containing information and operations that refer to the same concept. Like we're modeling real world objects. 

In the dragon example we had some OOP principles, data and methods. In OOP, this data can also be called `state`. We wrapped the dragon in an object, to model a real world data. The attributes, or properties allow us to keep track of state of the object. The methods allow us to manipulate the state of the object like in the real world. 

With OOP, there's class based programming languages, and prototype based programming languages. In JS we have prototypal inheritance. 

# OOP: Factory Functions 

Naive approach:
```js 
const elf = {
    name: 'Orwell',
    weapon: 'bow',
    attack() {
        return 'attack with ' + elf.weapon
    }
}

elf.name // Orwell
elf.attack // attack with bow
```

What should we do if we want to add another elf? Copy and pase the code, with different name:

```js
const elf2 = {
    name: 'Sallyl',
    weapon: 'bow',
    attack() {
        return 'attack with ' + elf.weapon
    }
}
elf2.attack() // attack with bow
```

The benefit of what we just did, is we have encapsulation. We've grouped functionality together. Have state/data within the objects, and functions/methods acting on that state. So the methods can interact with the state and modify it too even. That's our first step with OOP, to encapsulate functionality that can be maintained into these containers. The problem is that it's repetitive. Most likely we have way more code elves can do, and we're not keeping it DRY. 


Step 2 of OOP - **Factory Functions**: Functions that behave like factories and create objects for us. 
```js
// factory functions - programmatically creating elves
function createElf(name, weapon) {
    return {
        name: name,
        weapon: weapo,
        attack() {
            return 'attack with ' + weapon
        }
    }
}

const peter = createElf('Peter', 'stones')
peter.attack() // attack with stones
```

This works, and we've created a *factory function*. Can simplify it a little bit using ES6 syntax:

```js 
...
return {
    name,
    weapon,
    attack() {
        return 'attack with ' + weapon
    }
}
```
Beauty with factory functions is if we want to create another elf, we can. Function does it for us. 

```js
const peter = createElf('Peter', 'stones')
peter.attack() // attack with stones
const sam= createElf('Sam', 'fire')
sam.attack() // attack with fire
```
We've moved up the step to OOP, and avoided repetitive code. Still a problem. Factory functions are great, but what if we had 1000 elves? Need to store the data in memory, like `name` and `weapon`, but the methods are copied somewhere else. So 1000 `attack()` functions in different places in memory for each elf. Not that great, is it? JS has this interesting thing, we can use that to our advantage to improve this (prototypal inheritance) so we can share functionality across objects. 

# OOP2: `Object.create()`

We know about prototypal inheritance in JS, and we can use that to our advantage to move a little closer to OOP in functional programming. How can we fix the elf example? 

One way would be to take out the `attack()` function, and place it in some kind of a store with functionality:
```js
const elfFunctions = {
    attack() {
        return 'attack with ' + this.weapon
    }
}

function createElf(name, weapon) {
    return {
        name, 
        weapon
    }
}

const peter = createElf('Peter', 'stones')
peter.attack = elfFunctions.attack
peter.attack // attack with stones
const sam= createElf('Sam', 'fire')
sam.attack() = elfFunctions.attack
sam.attack // attack with fire
```
Not too bad, have functionality, but still a lot of work. JS gives us a tool called `Object.create()` which we can clean it up with. Instead of manually having to attach the methods on each elf. Can use `Object.create()` to create the link - prototype chain. 

```js
const elfFunctions = {
    attack() {
        return 'attack with ' + this.weapon
    }
}

function createElf(name, weapon) {
    let newElf = Object.create(elfFunctions)
    newElf.name = name;
    newElf.weapont = weapon;
    return newElf;
}

const peter = createElf('Peter', 'stones')
console.log(peter.attack) // attack with stones
const sam= createElf('Sam', 'fire')
console.log(sam.attack) // attack with fire
```

Now it works! Why? Because we used `Object.create()`. What it does, is create a link between the `elfFunctions` and the `newElf` we created. Doing prototypal inheritance here. If we throw in a `console.log(newElf)` into the `createElf()` function, we see it creates an empty object for us (`{}`). 

```js
function createElf(name, weapon) {
    let newElf = Object.create(elfFunctions)
    // console.log(newElf) // {}
    console.log(newElf.__proto__) // { attack: [Function] }
    newElf.name = name;
    newElf.weapont = weapon;
    return newElf;
}
```

`Object.create()` creates the prototype chain for us, all the way up so we can use `attack`. Solves our problems, it's all working, we're done. Right? No. This is true prototypal inheritance here. But you won't really see this out in most code bases. It's not standard or accepted by JS community. 

# OOP3: Constructor Functions

Didn't have `Object.create()` in the beginning of the js language. Want to use Constructor Functions. It's still a function, except we create an `elf()` function that takes in our attributes, and remove other code so it becomes this. Not `returning` anything, just using `this`. 

```js
// Constructor Functions 
function Elf(name, weapon) {
    this.name = name;
    this.weapon = weapon;
}

const peter = elf('Peter', 'stones')
// console.log(peter.attack())
const sam = lf('Sam', 'fire')
sam.name // typeError cannot read name of undefined. 
// console.log(sam.attack())
```

In order to use a constrcutor function, need to use the `new` keyword, so need to add it in, so it becomes this:

```js
const peter = new Elf('Peter', 'stones')
// console.log(peter.attack())
const sam = new Elf('Sam', 'fire')
sam.name // Sam
```
The `new` keyword in JS automatically returns the object for us that we have here. It creates the elf constructor. It runs the code, constructs the elf function for us, and now we have access to `peter` and `sam`. Any function that is invoked using the `new` keyword, is called a *constructor function*. We've seen constructor functions before, `Number(), Object() Function()`. You invoked them by using the `new` keyword. As a rule, all constructor functions should start with a capital letter, to let other people know you need to call this function using the `new` keyword.

```js
const Elf1 = new Function('name', 'weapon',     
`this.name = name; 
this.weapon = weapon;`)

const sarah = new Elf('Sarah', 'fireworks') // { name: 'Sarah', weapon: 'fireworks'}
```
Constructor functions allow us to use the `new` keyword and create these objects for us. Because we've used the `new` keyword and it automatically returns the elf object and creates the elf constructor, we've created a new object and a new function has been called, and we've created a new execution context. Because this is a function we're running, we automatically get the `this` variable attached to it. Every function that we call gets the `this` and the `arguments` parameter. 

Interesting is when we use the `this` keyword, instead of pointing to the `Window` object as `this` does automatically, the `new` keyword changes what `this` is pointing to when a new EC is pointing to. It's saying, point `this` to the object that we just created, so that `this` now becomes `peter` or `sam`. If we remove `new` and click run, can't read property of undefined, because without the `new` keyword, we're not creating the object, returning it, or assigning `this` to the object that calls it. The `new` keyword does a lot of work under the hodd and behind the scenes. Why it's so powerful, is because it's a function, every function in JS gets automatically a prototype property. 

Remember a function is a special type of object. Get the prototype property. It's absolutely useless, until we have constructor functions. Native constructor functions come with `call, apply, and bind`. We can also add our own to the prototype. 

```js
// Constructor Functions 
function Elf(name, weapon) {
    this.name = name;
    this.weapon = weapon;
}

Elf.prototype.attack = function() {
    return 'attack with ' + this.weapon
}

const peter = new Elf('Peter', 'stones')
const sam = new Elf('Sam', 'fire')
sam.attack // attack with fire
```

We're able to use constructor functions instead of `Object.create()` to create this magical function that creates a new object. Because it's a constructor function, also has a prototype property that we can attach things to. So both `peter` and `sam` can use attack from the same location in memory (goes up the prototype chain to look and find `attack()`). All in the same memory space. Can just keep adding functionality here. 

It doesn't work if we change it to an arrow function, because arrow functions are lexically scoped (define `this` based on where they are written). So this doesn't work:

```js
Elf.prototype.attack = () => {
    return 'attack with ' + this.weapon
}
```

**GOTCHA** `this` in this case is the global object. Not bound to the object itself. By using a regular function, which is dynamically scoped (doesn't matter where it's written it's who it calls it), `this` changes based on who calls it. One gotcha of why you sometimes don't want to use arrow functions, don't want lexically scoped `this`. 

# More Constructor Functions 
Constructor functions are a little tricky. 

```js
// Constructor Functions 
function Elf(name, weapon) {
    // console.log('this', this) // this Elf {}
    this.name = name;
    this.weapon = weapon;
    // console.log('this', this) // this Elf { name: 'Peter', weapon: 'stones'}
}

Elf.prototype.attack = function() {
    return 'attack with ' + this.weapon
}

const peter = new Elf('Peter', 'stones')
const sam = new Elf('Sam', 'fire')
sam.attack 
```
if we `console.log('this', this)` at top, we see that `this` is an empty object (`console.log('this', this) // this Elf {}`). Whereas if we put it lower, then we see all the properties within it. (`console.log('this', this) // this Elf { name: 'Peter', weapon: 'stones'}`). 

If we threw in a `var a = 5` it doesn't get added to the object. Need the `this` keyword for that to happen. 

Also constructor functions change the prototype chain for us. Let's test that out. 

```js
const peter = new Elf('Peter', 'stones')
console.log(peter.prototype) // undefined
console.log(peter.__proto__) // Elf { attack: [Function]}
console.log(Elf.prototype) //  Elf { attack: [Function]}
const sam = new Elf('Sam', 'fire')
sam.attack 
```
Every function we create gets this prototype property. Only constructor functions have use for it though. 

`console.log(peter.prototype)` gives us `undefined`, because `peter` is not a function. 

One of the biggest gotchas is if we use `build`. 

```js
Elf.prototype.build = function() {
    // return 'house'
    function building() {
        return this.name + ' builds a house'
    }
    building()
}

// undefined
```

**GOTCHA** Why does `build()` give `undefined`? Because functions inside of methods/functions, means `this` is not assigned to the object itself but actually to the `Window` object. Can `return building.bind(this)` to fix that. Or even easier `const self = this`; at the top, and `this` can be turned into `self`. 

```js
Elf.prototype.build = function() {
    const self = this;
    function building() {
        return self.name + ' builds a house';
    }
    return building()
}
```

What is the problem with what we have? Are we at OOP nirvana? No, not really. Problem with the code is `prototype` is a bit weird. Looks ugly. Not really understandable if you don't understand prototype inheritance. Can get very confusing very fast. Not a lot of people like this. Problem is OOP is all about classes. 

If we wanted to get closer to OOP, `Object.create()` is less OO than what we have. We can improve it a lot. 

# Funny Thing about JS
```js
var a = new Number(5)
typeof a // object
var b = 5 
typeof b // number 
a === b // false 

b.toString() 
```
JS sees you want to use object methods with something like `toString()`. Have all these methods available even though typeof B is just a number, and numbers are primitive types. In JS when we assign a variable, internally it's going to construct Number we've added so we have access to all these methods. That's how we can use `toFixed` or `toString` even on string values and primitives. It automatically assumes you meant an object instead of a primitive in order to run object methods. This is how things like `new Date()` work as well. Internally these objects have built in prototypes, so on these dates we can run different sorts of methods. 

Technically in JS everything is an object, everything has a constructor function for it, except for `null` and `undefined`, we have constructor functions for everything else and methods we can use. 

# OOP4: ES6 Classes
With ES6 JS finally got the `class` keyword. OOP was created with the class idea in mind, the class being a blueprint of what we want created.  

The constructor is enacted every time the class is run. Everything is contained in a nice object/container. All of our methods are enclosed within it.

```js
// ES6 Class
class Elf() {
    constructor(name, weapont) {
        this.name = name;
        this.weapon = weapon;
    }
    attack() {
        return 'attack with ' + this.weapon
    }
}

const peter = new Elf('Peter', 'stones')
console.log(peter.attack()) // attack with stones
const sam = new Elf('Sam', 'fire')
console.log(sam.attack()) // attack with fire
```

True beauty of OOP. Modeling real life scenarios. Can just keep adding things to one location that holds this entire `Elf` object. Anytime we want to update something, we do it in the class and all instances of the elf get that update. `instance` is a common term with OOP. An `instance` happens when we call the class and create an object. `peter` is an instance of `Elf`. 

```js
console.log(peter instanceof Elf) // true 
```

`instanceof` is language we can use with OOP. With the `new` keyword is called `instantiation`. We're instantiating the class. 

Finally have OOP. Right? No. Not really. This is all called **syntactic sugar**. Underneath the hood, we're using prototypal inheritance. This is the closest JS is going to get to classes. Still using the `new` keyword with the `prototype` underneath the hood. Classes aren't necessarily the answers to everything. 

In JS classes are still just objects. Does JS have classes? Yes they do as syntactic sugar, but `class` keyword is still just prototypal inheritance. Some people call this `pseudoclassical inheritance` as it's not really classical inheritance. 

Why is `attack()` outside of the constructor? Because the constructor runs each time we instantiate it. If we moved `attack()` inside, it would take up a lot of memory. We just want one. One function in one location that all the instances can access. 

# `Object.create()` vs Class

Some people love classes, others hate them. Just personal preference. No right or wrong. We can accomplish all of what we did in previous lecture with `Object.create()`. Some people call using `Object.create()` as pure prototypal inheritance. Most do not use `Object.create()`. At the end of the day it's up to you. 

# `this` 4 Ways

```js
// new binding this - allows us to assign the this to the object we're instantiating. 
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const person1 = new Person('Xavier', 55)
person1

// implicit binding - just implied
const person = {
    name: 'Karen', 
    age: 40,
    hi() {
        console.log('hi ' + this.name)
    }
}

// explicit binding when we dictate exactly what the this keyword should refer to, using call, bind or apply.
const person3 = {
    name: 'Karen', 
    age: 40,
    hi: function() {
        console.log('hi ' + this.setTimeout)
    }.bind(window)
}

person3.hi() // get setTimeout function from the window 

// Arrow functions - unlike all the other times when this is dynamically scoped (gets determined when its called) we can do lexical scoping. Remember a function within a function is the biggest gotcha with this. 
const person4 = {
    name: 'Karen',
    age: 40, 
    hi: function() {
        var inner = () => {
            console.log('hi ' + this.name)
        }
        return inner()
    }
}

person4.hi()
```

# Inheritance 
Inheritance means passing knowledge down. Say we want a new player, an ogre. How would we go about creating it? Could copy and paste the `Elf` code and create a new class. But want to avoid that as it's not dry.

```js 
class Elf {
    constructor(name, weapon) {
        this.name = name;
        this.weapon = weapon;
    }
    attack() {
        return 'attack with ' + this.weapon;
    }
}

const fiona = new Elf('Fiona', 'ninja stars');
const ogre = {...fiona}
ogre // {name: Fiona, weapon...}
ogre.__proto__ // {}
fiona.__proto__ // Elf {}
console.log(fiona === ogre) // false 
```

Cloned the object, but `ogre` no longer has `Elf` as the underlying base class. The objects are not referencing the same place in memory, they're completely different things. Lost the prototypal inheritance chain. Can't even do `ogre.attack()`. How can we extend this? 

Change name from Elf to Character class. Then create an Elf class that extends Character. This is called **Subclassing** in OOP. We have a base class or a super class, and a subclass. We want to inherit from the character class all these properties and methods and create something new out of it.

```js 
class Character {
    constructor(name, weapon) {
        this.name = name;
        this.weapon = weapon;
    }
    attack() {
        return 'attack with ' + this.weapon;
    }
}

class Elf extends Character {
    constructor(name, weapon, type) {
        super(name, weapon); 
        this.type = type 
    }
}

const dobby = new Elf('Dobby', 'cloth', 'house');
dobby.attack() // attack with cloth
```
Keyword `super` for the `super()` class that goes up and calls `this.name`, and `this.weapon`. It's just a standard, where `super` is referring to the super class. 

When we do `class Elf extends Character` means extend, and set the prototype (`__proto__`) to point to `Character`, so `Elf` now has a prototype chain up the `Character`. The `constructor` is our own constructor just for the `Elf` class, only gets run there. In there, we can leave it as is, or we can add to it. If we want to set any property that uses the `this` keyword, have to use `super` and the super class so it knows what to do with the `this` keyword. If we try to `console.log(this)` before `super()`, we get an error. Have to do it after. `super()` must be called. 

`this` keyword simply says, who am I? Who is calling me? 

```js
//// continued from above

class Ogre extends Character {
    constructor(name, weapon, color) {
        super(name, weapon);
        this.color = color;
    }
    makeFort() {
        return 'strongest fort in the world made'
    }
}

const shrek = new Ogre('Shrek', 'club', 'green')
shrek // returns shrek object
shrek.attack // attack with club
shrek.makeFort // strongest fort in the world made
```

# Inheritance 2 

When we created `makeFort()` just for the ogre class, underneath the hood we extended the prototype. It's like saying `Ogre.prototype.makeFort()`. Underneath the hood JS created it for us because we used the class keyword. Also using the prototypal inheritance of JS to create our objects. 

```js 
class Character {
    constructor(name, weapon) {
        this.name = name;
        this.weapon = weapon;
    }
    attack() {
        return 'attack with ' + this.weapon;
    }
}

class Elf extends Character {
    constructor(name, weapon, type) {
        super(name, weapon); 
        this.type = type 
    }
}

class Ogre extends Character {
    constructor(name, weapon, color) {
        super(name, weapon);
        this.color = color;
    }
    makeFort() {
        return 'strongest fort in the world made'
    }
}

const dobby = new Elf('Dobby', 'cloth', 'house');
dobby.attack()
const shrek = new Ogre('Shrek', 'club', 'green')
shrek.makeFort()

console.log(Ogre.isPrototypeOf(shrek)) // false Ogre is a constructor function, we want to check Ogre.prototype. 
console.log(Ogre.prototype.isPrototypeOf(shrek)) // true 
console.log(Character.prototype.isPrototypeOf(Ogre)) // false 
console.log(Character.prototype.isPrototypeOf(Ogre.prototype)) // true 
```

Better to use the `instanceof` keyword:

```js
console.log(dobby instanceof Elf) // true
console.log(dobby instanceof Ogre) // false 
console.log(dobby instanceof Character) // true 
```