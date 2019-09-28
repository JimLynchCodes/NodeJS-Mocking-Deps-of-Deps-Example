const ClassService = require('./../services/ClassService')

class Main {

    constructor() {

        // console.log('creating...')
        const classService = new ClassService()
        classService.callDep()
    }

}
module.exports = Main;
