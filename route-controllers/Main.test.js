jest.mock('../services/ClassDepService.js', () => {
                            
    const mockOverriddenOutput = "fake things, yay!"
    return class MockClassDepService {
        
        doThings () {
            console.log(mockOverriddenOutput)
        }
    }
    
});

const Main = require('./Main');
let consoleLogSpy;

describe("users route", () => {
    beforeEach(() => {
        // consoleLogSpy = sinon.spy(console, "log");

        consoleLogSpy = jest.spyOn(console, 'log');
    });
    afterEach(() => {
        // console.log.restore()
        consoleLogSpy.mockRestore()
    });
    
    it("should call a function of its dependency's dependecy", () => {
        // const rewiremock = require("rewiremock/node");
        // const MockClassDepsService = class ClassDepService {
            //     doThings() {
                //         console.log(overriddenOutput);
                //     }
                // }
                // MockClassDepsService['@noCallThru']
                
                // const mock = rewiremock.proxy(() => require("./../services/ClassService.js"), {
                    //     "./../services/ClassDepService": MockClassDepsService
                    // });
                    
                    // const mainMock = rewiremock.proxy(() => require("./Main.js"), {
                        //     "./../services/ClassService.js": mock
                        // });
                        
                        // main = new mainMock()
                        
                    
                        
                        const expectedOverriddenOutput = "fake things, yay!"
                        const main = new Main();
                        
                        expect(consoleLogSpy).toHaveBeenCalledWith(expectedOverriddenOutput);
                        
                    });
                });
                