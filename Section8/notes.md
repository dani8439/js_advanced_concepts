# Section overview 

What does **asynchronous** mean? Async means simply means we don't have it right now. Information we don't have yet, need to get it. Asynchronous functions are functions we can execute later. Because JS is single threaded and has no idea what's going on out there on the world wide web.

# How JavaScript Works 

What is a program? A program has to allocate memory. A program has to parse and execute scripts (read and run commands).

There's the JS engine, the V8 engine consists of a memory heap and a call stack. Memory heap (Where things are stored), callstack (where they are read and executed). Can have memory leaks when things allocated in the memory are all global variables. 

Javascript is a single threaded language that can be non-blocking. Single threaded means it has one callstack, and does one thing at a time. First in, last out. Other languages can have multiple call stacks (multi-threaded). JS was designed to be single threaded because it's easier. With multithreaded environments you can have something called deadlocked.

Synchronous programming means line 1 gets executed, then line 2, then line 3. Ladder can't start before the first finishes. 

Stack overflow is when the callstack just gets bigger and bigger and doesn't have enough space anymore. 

Non-blocking. Asynchronous to the rescue. Asynchronous is like a behavior. 

In order for JS to run, need more than just the JS engine. Need a runtime environment (part of the browser). Have Web API's, callback Queue's and the event loop. 

Can do a `setTimeout()` along with some `console.log()`'s to make it asychronous to go through all those processes, and illustrate how the callstack works:

```js
console.log('1');
setTimeout(() => {
    console.log('2');
}, 2000)
console.log('3')
// 1
// 3
////////
// 2 

// Call Stack 

// Web API 

// Callback Queue

// Event Loop
```

```js
element.addEventListener('click', () => {
    console.log('click');
})
```

When is asynchronous happening? It happens a lot, when you talk between machines (databases), reading files, etc. It is a single-threaded language that can be non-blocking. Single callstack and does one thing at a time. In order to be non-blocking it can be asynchronous with callback functions. These callback functions get run in the background through the callback queue and then the event loop to bring them back into the callstack.

# Promises 
A promise is an object that may produce a single value sometime in teh future. Either a resolved value, or a reason that it's not resolved (rejected).

A promise may be in one of three possible states, fulfilled, rejected, or pending. 

Have to understand callbacks first. 

```js
el.addEventListener("click", submitForm)
// callback pyramid of doom 
movePlayer(100, 'Left', function() {
    movePlayer(400, 'Left', function() {
        movePlayer(10, 'Right', function() {
            movePlayer(330, 'Left', function() {

            });
        });
    });
});
```

When something is done, execute this code. Pyramid of doom in above code. With callbacks you'll get this nested function and really complicated code. Hard to read. More realistic example is:

```js
grabTweets('twitter/andreineagoie', (error, andreiTweets) => {
    if(error) {
        throw Error;
    }
    displayTweets(andreiTweets)
    grabTweets('twitter/elonmusk', (error, elonTweets) => {
        if(error) {
            throw Error;
        }
        displayTweets(elonTweets)
        grabTweets('twitter/vitalikbuterin', (error, vitalikTweets) => {
            if(error) {
                throw Error;
            }
            displayTweets(vitalikTweets)
        })
    })
})
```

Doesn't look very pretty does it? Have to do the same thing, nested, and reptition. Promises serve the same purpose as callbacks. Why do we have two things? They are new in ES6, and a little more powerful. 

```js
el.addEventListener("click", submitForm)

movePlayer(100, 'Left', function() {
    movePlayer(400, 'Left', function() {
        movePlayer(10, 'Right', function() {
            movePlayer(330, 'Left', function() {

            });
        });
    });
});

movePlayer(100, 'Left')
    .then(() => movePlayer(400, 'Left'))
    .then(() => movePlayer(10, 'Right'))
    .then(() => movePlayer(350, 'Left'))
```

How to create a **Promise** 

```js
const promise = new Promise((resolve, reject) => {
    if (true) {
        resolve('Stuff Worked');
    } else {
        reject('Error, it broke');
    }
})

// to run 
// promise.then(result => console.log(result))

// Stuff Worked
// Promise {<fulfilled>: undefined}

promise
    .then(result => result + '!')
    .then(result2 => {
        console.log(result2);
    })

// Stuff Worked!
// Promise {<fulfilled>: undefined}

// What if there was an error? 
promise
    .then(result => result + '!')
    .then(result2 => {
        throw Error
        console.log(result2);
    })
    .catch(() => console.log('error!'))

// What if the error happened higher up and we move it? 
promise
    .then(result => {
        throw Error
        result + '!'})
    .then(result2 => {
        console.log(result2);
    })
    .catch(() => console.log('error!'))

// error! 
// Promise... 
```

`.catch()` catches any errors that occur. 

```js
promise
    .then(result => result + '!')
    .then(result2 => result2 + '?')
    .catch(() => console.log('error!'))
    .then(result3 => {
        console.log(result3 + '!')
    })
// Stuff Worked!?!
// Promise...
```
`.catch` only works if something fails inbetween. Where you put the catch statement, it will check and run if anything before it fails. That's how you create a promise, with resolve or reject. With a promise we can give it to a variable and run it asynchronously. Can keep chaining it, and also chain our errors. 

A promise is something we have now and can use around the code. When would it be a good thing? Promises are great for asynchronous programming. When you don't want JS to block the running of your code, you use a promise so the task happens in the background. When it gets resolved or rejected, you'll get the response. 

Something else they can do which makes them very powerful:

```js
const promise = new Promise((resolve, reject) => {
    if (true) {
        resolve('Stuff Worked');
    } else {
        reject('Error, it broke');
    }
})

const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'HIII')
})

const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 'POOKIE')
})

const promise4 = new Promise((resolve, reject) => {
    setTimeout(resolve, 30000, 'Is it me you are looking for?')
})

Promise.all([promise, promise2, promise3, promise4])
    .then(values => {
        console.log(values);
    })

// Promise {<pending>}
// (4) ['Stuff Worked', 'HIII', 'POOKIE', 'Is it me you are looking for?']
```
Waited until all promises were resolved and then logged out all the values. 

```js
const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/albums'

]

Promise.all(urls.map(url => {
    return fetch(url).then(resp => resp.json())
})).then(results => {
    console.log(results[0])
    console.log(results[1])
    console.log(results[2])
})

// Promise {<pending>}
// VM875:11 (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// VM875:12 (100) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// VM875:13 (100) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]

Promise.all(urls.map(url => {
    return fetch(url).then(resp => resp.json())
})).then(results => {
    console.log(results[0])
    console.log(results[1])
    console.log(results[2])
}).catch(() => console.log('error'))
// error
```
fetch simply returns a promise. At their most basic, promises are like event listeners. Except it can only succeed or fail once, not twice. 

# ES8 Async Await

Async/Await is part of ES8. Built on top of promises. Underneath the hood, an async function is a function that returns a promise. Benefit is that it makes code easier to read. 

```js
// ASYNC/AWAIT
movePlayer(100, 'Left')
    .then(() => movePlayer(400, 'Left'))
    .then(() => movePlayer(10, 'Right'))
    .then(() => movePlayer(330, 'Left'))
```

This is asynchronous code. One happens then the next, then the next... With async/await, it loks something like this:

```js 
async function playerStart() {
    const firstMove = await movePlayer(100, 'Left'); // pause 
    const second = await movePlayer(400, 'Left'); // pause 
    await movePlayer(10, 'Right'); // pause
    await movePlayer(330, 'Left'); // pause
}
```

Benefit of `async/await` is to make code look synchronous and easier to read. A promise in js is kind of like an iou. I promise to return something to you in the future. Instead of waiting around on them, want to continue on with our lives while it works in the background. This is how js works. Promises help us solve js being single threaded. 

async/await code are just promises underneath the hood. We call that syntactic sugar. Still does the same thing, but just different syntax to make it look prettier. Promises have the `.then()` you keep having to chain. Asynch has `async/await`. 

First declare a function as `async function playerStart()`. Can now do anything we want inside of it, but have access to a new word as we defined with `async`. The `await` keyword says hey, pause this function until I have something for you. We're awaiting the response. Can use it in front of any function that returns a promise. Once the promise is resolved, function moves to the next line and awaits next move, and so on and so on. Instead of chaining it, can assign a variable first to await it, and can assign a second, etc. `first` and `second` will have the result of each function in a variable so it looks very synchronous. 

More realistic example:

```js
fetch('https://jsonplaceholder.typicode.com/users')
    .then(resp => resp.json())
    .then(console.log)
// promise pending
//// info.....
```
How can we turn this into an async function?

```js 
async function fetchUsers() {
    const resp = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await resp.json();
    console.log(data);
}
// promise pending...
// data....
```

Nothing different, and works the same. Is it prettier than what we had before? Up to you. 

```js
const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/albums'

]

// convert this to async/await
Promise.all(urls.map(url => {
    return fetch(url).then(resp => resp.json())
})).then(array => {
    console.log('users', array[0])
    console.log('posts', array[1])
    console.log('albums', array[2])
}).catch(() => console.log('oops'))

const getData = async function() {
    try {
    const [ users, posts, albums ] = await Promise.all(urls.map(url =>  fetch(url).then(resp => resp.json())))
    console.log('users', users)
    console.log('posts', posts)
    console.log('albums', albums)
    } catch (err){
        console.log('oops', err)
    }
}
```

`try/catch` block to catch and display errors. 

# ES9/ES2018

```js
// Object spread operator 
const animals = {
    tiger: 23, 
    lion: 5, 
    monkey: 2
}

const { tiger, ...rest } = animals;
// undefined  

tiger 
// 23
rest 
// lion: 5, monkey: 2}

const array = [1,2,3,4,5];
function sum (a, b, c, d, e) {
    return a + b + c + d + e;
}
sum(...array)
// 15
sum(1,2,3,4,5)
// 15

function objectSpread(p1, p2, p3) {
    console.log(p1);
    console.log(p2);
    console.log(p3);
}

const animals2 = {
    tiger: 23, 
    lion: 5, 
    monkey: 2
}

const { tiger, lion ... rest } = animals2
objectSpread(tiger, lion, rest)
// 23
// 5
// {monkey: 2, bird: 40}

```
Object spread operator just means we can do it with objects as well as arrays. 

# ES9 (ES2018) - Async
Two ES2018 new features. 

```js
const urls = [
    'https://swapi.dev/api/people/1',
    'https://swapi.dev/api/people/2',
    'https://swapi.dev/api/people/3',
    'https://swapi.dev/api/people/4'
]

Promise.all(urls.map(url => {
    return fetch(url).then(people => people.json())
}))
    .then(array => {
        console.log('1', array[0])
        console.log('2', array[1])
        console.log('3', array[2])
        console.log('4', array[3])
    })
    .catch(err => console.log('ughhhhh fix it!', err))

// Promise {<pending>}
// 1 {name: 'Luke Skywalker', height: '172', mass: '77', hair_color: 'blond', skin_color: 'fair', …}
// 2 {name: 'C-3PO', height: '167', mass: '75', hair_color: 'n/a', skin_color: 'gold', …}
// 3 {name: 'R2-D2', height: '96', mass: '32', hair_color: 'n/a', skin_color: 'white, blue', …}
// 4 {name: 'Darth Vader', height: '202', mass: '136', hair_color: 'none', skin_color: 'white', …}
```

`finally` allows us to do something after a promise is finished. Added at the end. No matter what after it is done, it will be called whether a promise is resolved or rejected.

```js
const urls = [
    'https://swapi.dev/api/people/1',
    'https://swapi.dev/api/people/2',
    'https://swapi.dev/api/people/3',
    'https://swapi.dev/api/people/4'
]

Promise.all(urls.map(url => {
    return fetch(url).then(people => people.json())
}))
    .then(array => {
        console.log('1', array[0])
        console.log('2', array[1])
        console.log('3', array[2])
        console.log('4', array[3])
    })
    .catch(err => console.log('ughhhhh fix it!', err))
    .finally(data => console.log('extra', data));

// Promise {<pending>}
// 1 {name: 'Luke Skywalker', height: '172', mass: '77', hair_color: 'blond', skin_color: 'fair', …}
// 2 {name: 'C-3PO', height: '167', mass: '75', hair_color: 'n/a', skin_color: 'gold', …}
// 3 {name: 'R2-D2', height: '96', mass: '32', hair_color: 'n/a', skin_color: 'white, blue', …}
// 4 {name: 'Darth Vader', height: '202', mass: '136', hair_color: 'none', skin_color: 'white', …}
// extra undefined
```
`finally` doesn't really receive a parameter, usually empty. But can call it even though the `.then()` finished. What happens if we throw an error and the `catch()` block gets called? Still get it eve if we add a `throw Error;` within the `.then()` block.

`finally()` is great if you want to run a piece of code no matter what after a promise. Many ways to use it. 

**for await of** feature
```js
// for await of 
const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/albums'

]

const getData = async function() {
    try {
    const [ users, posts, albums ] = await Promise.all(urls.map(url =>  fetch(url).then(resp => resp.json())))
    console.log('users', users)
    console.log('posts', posts)
    console.log('albums', albums)
    } catch (err){
        console.log('oops', err)
    }
}

const loopThroughUrls = urls => {
    for (url of urls) {
        console.log(url)
    }
}

const getData2 = async function() {
    // creating an array of these fetch promises of each one of the requests
    const arrayOfPromises = urls.map(url => fetch(url));
    for await (let request of arrayOfPromises) {
        const data = await request.json();
        console.log(data);
    }
}

getData2();
// Promise {<pending>}
// (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// (100) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// (100) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
```
Once called get all the users, posts, and the albums. Exact same thing as above with the `async/await`. Just another way of writing it. Only thing the `for/await/of` feature does, is allows us to loop through the multiple promises almost as if we're writing synchronous code. 

To review: Have the `finally()` function we can run at the end of a promise. Have the for/await/of that takes each item from an array of promises that returns to us in the correct order all the responses. 