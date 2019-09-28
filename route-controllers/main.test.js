const chai = require("chai")
const expect = require('chai').expect
const sinonChai = require('sinon-chai')
const sinon = require("sinon")
chai.use(sinonChai);

var proxyquire = require('proxyquire')

let consoleLogSpy
const overriddenOutput = 'fake things, yay!'


describe("users route", () => {

    before(() => {
        consoleLogSpy = sinon.spy(console, "log");
    });

    after(() => {
        console.log.restore()
    });

    it("should call a function and use a mock of a dependency's dependecy", () => {

        class MockClassDepService {

            doThings() {
                console.log(overriddenOutput)
            }

        }
        MockClassDepService['@noCallThru']

        const Main = require('./main')

        const ClassService = proxyquire('./../services/ClassService', {
            './ClassDepService': MockClassDepService
        })

        const main = new Main()

        expect(consoleLogSpy).to.have.been.calledWith(overriddenOutput);

    });
});
