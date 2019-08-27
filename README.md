# NodeJS Mocking Deps of Deps Example

The purpose of this project is to demonstrate a few ways of mocking "dependencies of dependencies". 

## Usage

1. Install imports
```
npm install
```

2. Run npm test
```
npm test
```

Note how the console prints the text from the `doThings` method on the mocked "ClassDepService" rather than the string that is by in the `doThings` method of real "ClassDepService". 


## Many Ways To Win
There are a few different ways to acheive mocked dependencies of dependencies in node.js, and since I'm such a nice guy I tried to include a few of the ways of doing it here in this repository different branches.

The current branches correspond to example using these libraries:

- master: uses [`rewiremock`](https://github.com/theKashey/rewiremock)
- proxyquire-example: uses [`proxyquire`](https://github.com/thlorenz/proxyquire)


## The OOP Dilemma

Suppose you are writing a node.js program, and you want to make some helper service, some <i>container of functions</i> or JavaScript class that can contain these functions. 

Consider the class `ClassDepService` below. Other code that uses it should instantiate it with the `new` keywork and then call its function <i>doThings.</i>

```
// ClassDepService.js


class ClassDepService {
  
  doThings() {
    
    console.log('in class dep service!')
    
  }
  
}
module.exports = ClassDepService;
```

Ok. So suppose now it gets instantiated by a different service, ClassService.

```
// ClassService.js
const ClassDepService = require('./ClassDepService')

module.exports = class ClassService {
  
  callDep () {
    
    const classDepService = new ClassDepService()
    classDepService.doThings()
    
  }
  
}

```  

## So, What's The Trick?
The million dollar lines of code in this example lives [here](https://github.com/JimTheMan/NodeJS-Mocking-Deps-of-Deps-Example/blob/master/route-controllers/Main.test.js#L34_#L40) (rewire-mock example) or [here](https://github.com/JimTheMan/NodeJS-Mocking-Deps-of-Deps-Example/blob/proxyquire-example/route-controllers/main.test.js#L31_#L33) (proxyquire example). Basically, the trick is to use either rewiremock or proxyquire and pass it the filepath itself for the Class whose dependency you wish to mock and the actual mock to use instead. Then <i>later on when ClassService is instantiated it's "require" will bring in your mock instead of the real thing!</i> 

Now Suppose you have a the main function, Main, which uses only `ClassService`.

```
// main.js
const ClassService = require('./../services/ClassService')

class Main {

    constructor() {

        const classService = new ClassService()
        classService.callDep()
    }

}
module.exports = Main;
```

Ok. Now suppose that you are writing a unit test for Main, and you want to stub or mock out the function call for "doThings" from the main.test.js tests. This can be problematic because The service ClassService ususally does not publically expose its dependencies, and so there is no way to, from the test of main.js, hook into ClassServices's instance of ClassDepService in order to mock any of its functions.


## Mocking Deps of Deps In React Specifically
React development often uses regular es6 JavaScript classes and modules, and this issue of mocking the unit under test's dependency's dependency does come up when testing in React. Although not covered in this repo, jest provides a similar "mock by filepath that replaces future imports / requires of that file" functionality. You can find a similar "Deps-of-Deps Example Project" built out in a create-react-app scaffold [here](https://github.com/JimTheMan/React-Mocking-Deps-of-Deps-Example).

## Mocking Deps of Deps In Angular Specifically
Even in the early version of Angular 1 dependency injection was a core piece of Angular, and the wise lecturers would often say that DI helps with testing without really explaining why. Personally, I think going through the pain of figuring out how in the heck to mock things after they are being instantiated by other things can make you jealous of Angular developers who can mock a dependency's dependencies with ease since in Angular <i>you hardly ever need to use the `new` keyword.</i>

## An Apreciation for (But Not A Dependency On) Dependency Injection
Sure, Angular developers have been able to mock dependency dependencies for years, but they no longer have a one-up on us class instantiators since, as the examples in this repository shows, it is perfectly possible to unit test while mocking deps of deps even without dependency injection, thank you very much though.

## Contributing

Feel free to open issues and / or PRs if you have any ideas or suggestions or need help. Feel free to star this repo if you like it. Thanks for checking this out, and stay awesome. 

#TestFirst
