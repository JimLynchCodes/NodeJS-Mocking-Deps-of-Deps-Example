

const rewiremock = require("rewiremock/node");
rewiremock.overrideEntryPoint(module); // this is important

const overriddenOutput = "fake things, yay!"

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
        const rewiremock = require("rewiremock/node");
        const MockClassDepsService = class ClassDepService {
            doThings() {
                console.log(overriddenOutput);
            }
        }
        MockClassDepsService['@noCallThru']

        const mock = rewiremock.proxy(() => require("./../services/ClassService.js"), {
            "./../services/ClassDepService": MockClassDepsService
        });

        const mainMock = rewiremock.proxy(() => require("./Main.js"), {
            "./../services/ClassService.js": mock
        });

        main = new mainMock()

        expect(consoleLogSpy).to.have.been.calledOnceWith(overriddenOutput);

    });
});
