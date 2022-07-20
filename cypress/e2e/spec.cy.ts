describe("e2eTest", () => {
  before(() => {
    cy.visit("/");
    cy.wait(5000);
  });
  it("要素がレンダリングされている", () => {
    cy.contains("search");
    cy.get("#map");
    cy.get("nav");
    cy.screenshot();
  });
  it("searchボタン押下にてmap上にmarkerが表示される", () => {
    cy.get(".MuiFab-info").click();
    cy.wait(1000);
    cy.screenshot();
  });
  it("listをclickするとmodalが表示される", () => {
    cy.get("nav div").first().click();
    cy.wait(1000);
    cy.screenshot();
  });
});
