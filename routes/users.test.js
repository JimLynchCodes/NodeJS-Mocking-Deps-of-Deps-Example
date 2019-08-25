
const rewiremock = require("rewiremock/node");
rewiremock.overrideEntryPoint(module); // this is important

const overriddenOutput = "fake things, yay!"

var chai = require("chai")
  var expect = require('chai').expect,
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
    /// settings
    rewiremock.overrideEntryPoint(module);

    const mock = rewiremock.proxy(() => require("./ClassService.js"), {
      "./ClassDepService": class ClassDepService {
        doThings() {
          console.log(overriddenOutput);
        }
      }
    });

    classService = new mock();

    classService.callDep(); // should print the mocked output, "fake things, yay!"

    expect(consoleLogSpy).to.have.been.calledOnceWith(overriddenOutput);

    var usersRoute = require("./users");
  });
});
