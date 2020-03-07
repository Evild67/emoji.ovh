describe("Sample tests", () => {
  it("Should display H2 Title", () => {
    cy.visit("/");
    cy.contains("h2", "👆️ Click to Copy and Paste Emojis !");
  });
});
