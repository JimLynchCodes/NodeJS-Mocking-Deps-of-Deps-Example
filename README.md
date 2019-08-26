# NodeJS Mocking Deps of Deps Example

The purpose of this project is to demonstrate a few ways of mocking "dependencies of dependencies". 


## Many Ways To Win
There are a few different ways to acheive mocked dependencies of dependencies in node.js, and since I'm such a nice guy I tried to include a few (all?) ways of doing it here in this repository as completely different branches so that you you can find useful, working code regardless of the testing framework you are using.


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


Now Suppose you have a the main function, Main, which uses only `ClassService`.

//


Ok. Now suppose that you are writing a unit test for Main, and you want to stub or mock out the function call for "doThings" from the main.test.js tests. This can be problematic because The service COcopeoc ususally does not publically, and so there is no way to, from the main test, hook into COcopeoc's instance of DepClass in order to mock one of its functions.   







## Mocking Deps of Deps In React Specifically


## An Apreciation for (But Not A Dependency On) Dependency Injection