const ClassDepService = require('./ClassDepService')

module.exports = class ClassService {
  
  callDep () {
    
    const classDepService = new ClassDepService()
    classDepService.doThings()
    
  }
  
}

