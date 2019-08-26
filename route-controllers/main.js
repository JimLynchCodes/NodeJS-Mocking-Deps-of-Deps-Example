const ClassService = require('./../services/ClassService')

class Main {

    constructor() {

        const classService = new ClassService()
        classService.callDep()
    }

}
module.exports = Main;
