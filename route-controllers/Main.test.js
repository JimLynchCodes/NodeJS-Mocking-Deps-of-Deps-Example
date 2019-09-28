jest.mock("../services/ClassDepService.js", () => {
  const mockOverriddenOutput = "fake things, yay!";
  return class MockClassDepService {
    doThings() {
      console.log(mockOverriddenOutput);

      return 'FAKE_THING';
    }
  };
});

const Main = require("./Main");

describe("users route", () => {

  it("should call a function of its dependency's dependecy", () => {

    const consoleLogSpy = jest.spyOn(console, "log");

    const expectedOverriddenOutput = "fake things, yay!";
    const main = new Main();

    expect(consoleLogSpy).toHaveBeenCalledWith(expectedOverriddenOutput);
    expect(main.thing).toBe('FAKE_THING');

    consoleLogSpy.mockRestore();
  });
});
