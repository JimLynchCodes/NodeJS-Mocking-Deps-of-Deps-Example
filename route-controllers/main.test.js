const chai = require("chai")
const expect = require('chai').expect
const sinonChai = require('sinon-chai')
const sinon = require("sinon")
chai.use(sinonChai);

const Main = require('./main')

describe("users route", () => {

    let consoleLogSpy
    const overriddenOutput = 'fake things, yay!'

    before(() => {
        consoleLogSpy = sinon.spy(console, "log");
    });
    after(() => {
        console.log.restore()
    });

    it("should call a function and use a mock of a dependency's dependecy", () => {

        var proxyquire = require('proxyquire')

        class MockClassDepService {
            doThings() {
                console.log(overriddenOutput);
            }
        }

        const ClassService = proxyquire('./../services/ClassService', {
            './ClassDepService': MockClassDepService
        })

        const main = new Main()

        classService.callDep()

        expect(consoleLogSpy).to.have.been.calledWith(overriddenOutput);

    });
});
