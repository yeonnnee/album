import SearchSection from "../../src/components/SearchSection";

describe("Mounting SearchSection", () => {
  it("mount", () => {
    const reset = () => {};

    cy.mount(<SearchSection reset={reset} />);
    cy.window().its("store").invoke("getState");
  });
});
