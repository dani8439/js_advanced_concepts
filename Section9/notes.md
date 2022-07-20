# Modules in JS Intro

Just like a painter has on his palate paint in different apartments in different colors and combines them to create art, modules are just like that. Different pieces of code are grouped together, so that things are organized and as our application gets larger and larger we can combine different pieces together to make these large applications. Very similar to separation of concerns (FP and OOP). Good modules are like that, highly self contained and grouped together with their own functionality, allowing them to be moved around without disrupting the system as a whole. 

Need a way in JS to import dependency and export functionality, often called an interface. In modules, this extends beyond functions and classes. Goes beyond just js files. The concept prevails throughout programming. 

# What is a Module? 

What are modules? 

What are programs in general? A way for us to modify data and modify variables. The way we structure this data should be the most important part of our program as it will allow us to have more maintainable code. 

Don't really need multiple files in JS. Just need one. Because of how scope works in JS, functions can't have access to variables defined in other functions. Can just in our head keep the variables we are currently using. 

```js
function signin() {
    var textfield = 'hehehe'
}

function isHuman() {
    ...
}
```

Upside of having separate functions is don't have to care what other functions are doing with different data. Completely manageable. Working on one function at a time. Downside, without talking to other functions, and other pieces of data outside of ourself, we can't really write programs. Need a way to share data between these two functions. Could do this if we had a user variable that was an object, and put the scope outside so both functions have access to it: 

```js 
user = {};
function signin(user) {
    var textfield = 'hehehehe'
}

function isHuman(user) {
    ...
}

// tight coupling
```
Move the data up the scope chain to a parent that can share the data with it's children, from the global scope. 

The problem with this code, if we keep adding variables to our global scope, we have the idea of *tight coupling* which is the idea that everything is connected. So if we modify the user object, who knows what effect it might have in other parts of the file. Tight coupling means a lot of things having to depend on one another (say changing the name in one spot and changing it to nickname in another). This also leads to a lot of problems debugging code because so many things can happen when it comes to modifying data. Polluting the global namespace can cause memory leaks as we keep adding more and more data. 

How do we solve this problem? Easy, I can just have different script files. Then I don't have to worry about anything, right? No. Not really. Browser doesn't really care if you've put code in separate files. Might as well have put everything into one file. Also the dependencies between the parts of the code are implicit. 

Example: 

```js
var harry = 'potter'
var voldemort = 'He who must not be named'
function fight(char1, char2) {
  var attack1 = Math.floor(Math.random() * char1.length);
  var attack2 = Math.floor(Math.random() * char2.length);
  console.log(attack1) // random generated number
  return attack1 > attack2 ? `${char1} wins` : `${char2} wins`
}

fight(harry, voldemort) 
```
If we move the above code into the index.js file, we can call it once we `open index.html`. It's all part of the global scope. Problem arises when we have another script, and this script simply says `<script> var fight = 'hahaha'</script>`. It will overwrite everything that's in the `fight()` function. 

Okay, can't we just move the `script` up higher so the other script gets read after? Yes. Have the function. But, it's not good. Because these variables are on global scope, every part of the code that's on file, can change that variable. Have really hard code to debug, and as it gets bigger and bigger, it's impossible to maintain. How do we solve this? 

Back in the day we used to have one page of JS. How do we do this in JS? JS has something called ESModule. It's recent. What did we do before? Will show how to understand the older methods.

# Module Pattern 

Modules give us a better way to organize variables and functions, so we can group them in a way that makes sense together. Had idea of Global Scope, and function scope. Now have block scope. In an ideal world, have Module Scope above function scope and they all coexist. Can share things without having to go through the global scope. Can be explicit. 

Made the module pattern to create module scope as didn't actually have it, using closures. 

Looked like this: (IIFE)

```js 
// Global scope 
    // Module scope
        // Function scope
            // block scope - let and const 

// IIFE
(function() {
    var harry = 'potter'
    var voldemort = 'He who must not be named'

    function fight(char1, char2) {
    var attack1 = Math.floor(Math.random() * char1.length);
    var attack2 = Math.floor(Math.random() * char2.length);
    console.log(attack1) // random generated number
    return attack1 > attack2 ? `${char1} wins` : `${char2} wins`
    }
    console.log(fight(harry, voldemort))
})()
```

Using the idea to write function scope that's private. Also have the ability to access global variables. Essentially a function as a module. 

No longer have access to fight, but if it's in the index.js, it still works. 

What if we wanted other scripts to use this `fight()` function but we don't want them to touch `harry` or `voldemort` as they are private variables? Using the IIFE pattern can say: 

```js 
// IIFE
// Module Pattern
var fightModule = (function() {
    var harry = 'potter'
    var voldemort = 'He who must not be named'

    function fight(char1, char2) {
    var attack1 = Math.floor(Math.random() * char1.length);
    var attack2 = Math.floor(Math.random() * char2.length);
    console.log(attack1) // random generated number
    return attack1 > attack2 ? `${char1} wins` : `${char2} wins`
    }
    return {
        fight: fight
    }
})()
```
Allows us to assign to this variable, whatever it is that is returned and immediately invoked. Can switch the `console.log()` to `return { fight: fight }`

If we refresh the page and do `fight`, under the `fightModule` we have fight. 

Can  call `fightModule.fight('ron', 'hagrid')`

Other pieces of code can now use this code, but only when we tell it. Essentially what we are doing is a public API. It's our interface. Only exporting it. Everything else we're not exporting, you can't touch. The pattern of returning what we need is called the **returning module pattern**. 

Can have private functions, and private variables, etc. Because of closure, even though this function gets executed, because we're returning a function inside of a function, if we call it, we still have access to harry and voldemort if we wanted to.

Other benefit of this is used by jQuery. Can add in jquery and have access to it in the global scope. Underneath the hood, jQuery is doing the same as this `fightModule`. 


In the index.html:
```html
  <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="index.js"></script>
    <script>
      var globalSecret = '1234'
      var fight = 'hahahah'
    </script>
    <script>
      var script2 = (function($, globalSecret) {
        $('h1').click(function(){
          $('h1').hide();
        })
        globalSecret = '0'
      })(jQuery, globalSecret)
    </script>
```
Using the module pattern, able to make something available to the outside world, using a public API and returning it, and attaching it to a variable. Other modules can explicitly say they want to use the global variable and be explicit over what they are using.

# Module Patterns Pros and Cons 

Using an IIFE we're able to create a function scope that mimics a module scope. Everything in it will run because we're immediately invoking it, and only return to a variable as it's accesible on the global scope. So `fightModule` is a global variable. 

Benefit of it is that we're only revealing one variable just once. Hiding everything else. Everything we want to make public we can attach to that variable. It's great for maintainability. By definition a module is self contained now. A well designed module like this can just contain functionality and also lower the depenencies on other parts of the cohorts. 

If we do something like say, modifying the jQuery inside of it, won't do it everywhere else. It's contained. It's decoupled. Won't effect the outside parts. Can have one team working on one part, another on the other, no issues. 

Other great thing is reusability. Can copy parts of the code over and over. Have 1 place in our code that has the fight function, don't have to change in multiple places one place to go if we want to change it down the line. 

Two main problems in this. First is that we're still technically polluting the global namespace. `fightModule` is on the global namespace. 

Other issue is that we don't necessarily know all the dependencies. Have to make sure that the order of the script tags is correct. For ex, if we moved the jquery script tag code to the bottom of the page *after* we used the code, it breaks. Computer has no idea because it was declared after. How do we solve this? Had 2 major solutions.

# CommonJS, AMD, UMD

After the module pattern came two really great solutions. Instead of using an IFFE and a module pattern, something called *CommonJS and AMD* came out. Solve a problem the way we won't have a problem of interference with global scope. AMD is Asnychnronous module definition. 

Different modules we require, can even export specific functions. Or we can create our own `fight` function and export within it. Simple. None of this immediately invoked function. Original commonjs standard might be familiar as it was for node. Made for the server with Node.js in mind. One of the main reasons Node.js became so popular. The commonjs import/export module system, made code very easy to share for node.js programmers. 

Might have heard of NPM, node package manager, is just a way for people to share their code/modules. One of the reasons why it Node has grown since 2009, because of npm. 

Modules are meant to be loaded synchronously. Means JS has one callstack. If a module takes a long time to load, that's not ideal. Synchronous code on the browser can get dangerous. How can we use some of these packages on the browser? Had 2 things that came out. 1) Broswerify. Lets you require modules in the browser by bundling up all your dependencies. By using it, in our command line run something like `broswerify script.js > bundle.js` and it will read my script.js and understand the `require` syntax and `export` syntax and output it all to a `bundle.js`. Becomes 1 giant JS file. Webpack can also do this. Finally have the benefit of no global namespace pollution.

```js 
// Common JS and AMD
var module1 = require('module1') //.fight;
var module2 = require('module2') //.importedFunc2;

function fight() {

}

module.exports = {
  fight: fight
};
```

What about AMD? It looks something like this: 

```js
// CommonJS and AMD 
define(['module1', 'module2'],
  function (module1Import, module2Import) {
    var module1 = module1Import.fight 
    var module2 = module2Import // .importedFunc2

    function dance() {

    }

    return {
      dance: dance,
    };
  });
```

Doesn't look as clean as commonjs. AMD loads scripts or modules asynchronously. Crucial for browsers, where the code can't really wait until a module is finished loading. Solved that problem with CommonJS and browserify, but because JS didn't have native modules, came up with different solutions. 

May not have heard of AMD, but may have heard of the libary that makes it possible, `require.js`. 

Commonjs and AMD, resolve 2 problems, depency resolution, and pollution of global scope. We only need to take care of the dependencies when we define our file, and we'er explicit with what each file needs. But also avoiding the pollution of the global namespace. AMD helps us load modules asynchronously as needed. Learned that commonjs allows us to import and be explicit. At the same time, because it's synchronous, we can use a module bundler, to bundle all of our code into one bundle.js file and still use it on the browser. Because of these different standards, if you wanted to have a package in NPM, now you have 2 ways you need to share that, using AMD and commonjs. 

Another thing that came out called UMD, universal module definition, that tried to solve this. In the end it was just an if/else system. Was great and all but wasn't solving our core problem.