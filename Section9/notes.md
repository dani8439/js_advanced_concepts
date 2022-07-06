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