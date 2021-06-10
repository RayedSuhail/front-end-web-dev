import { handleSubmit } from "../src/client/js/formHandler";

describe("Testing the submit functionality", () => {
    test("Testing the handleSubmit() function", () => {
        expect(handleSubmit).toBeDefined();
    });
    test('It should be a function', () => {
        expect(typeof handleSubmit).toBe("function");
    });
});