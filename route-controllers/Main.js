const ClassService = require('./../services/ClassService')

class Main {

    constructor() {

        const classService = new ClassService()
        this.thing = classService.callDep();
    }

}
module.exports = Main;