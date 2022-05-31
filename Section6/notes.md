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

# OOP: `Object.create()`

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