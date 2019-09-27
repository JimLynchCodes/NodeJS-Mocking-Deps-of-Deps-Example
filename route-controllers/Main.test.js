
const ClassDepService = require('../services/ClassDepService');
const overriddenOutput = "fake things, yay!"

const Main = require('./Main');
const chai = require("chai"),
    expect = require('chai').expect,
    sinonChai = require('sinon-chai'),
    calledWith = require('sinon-chai'),
    sinon = require("sinon");

chai.use(sinonChai);
let consoleLogSpy

describe("users route", () => {
    before(() => {
        consoleLogSpy = sinon.spy(console, "log");
    });
    after(() => {
        console.log.restore()
    });

    it("should call a function of its dependency's dependecy", () => {

        sinon.stub(ClassDepService.prototype, 'doThings').callsFake(
            () => {
                console.log(overriddenOutput)
            })

        main = new Main();

        expect(consoleLogSpy).to.have.been.calledOnceWith(overriddenOutput);

    });
});
