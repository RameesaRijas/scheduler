describe("Appointment", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  })

  it("should book an interview", () => {
    //click add button
    cy.get("[alt=Add]").first().click();
    //type name to input field
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    //select interviewer name
    cy.get("[alt='Sylvia Palmer']").click();
    //click save
    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  it("should edit an interview", () => {
    //click edit button
    cy.get("[alt=Edit]").first().click({force: true});
    cy.get("[data-testid=student-name-input]").clear().type("Matt Abraham");
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();
    cy.contains("Saving").should("exist");
    cy.contains(".appointment__card--show", "Matt Abraham");
    cy.contains(".appointment__card--show", "Tori Malcolm");

  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({ force: true });
  
    cy.contains("Confirm").click();
  
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
  
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
})
