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