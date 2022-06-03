describe('page e2e tests', () => {
  it('should do a sanity check', () => {
    cy.visit('');
  });

  it('should do an implicit subject assertion', () => {
    cy.visit('');

    cy.get('h1').should('have.text', 'Hello World!');
  });

  it('should do an explicit subject assertion', () => {
    cy.visit('/flight-booking/flight-search');

    cy.get('form .btn').should(($button) => {
      expect($button).to.have.attr('disabled', 'disabled');
    });
    cy.get('form input[name="from"]').clear();
    cy.get('form input[name="from"]').type('Graz');
    cy.get('form input[name="to"]').clear();
    cy.get('form input[name="to"]').type('Hamburg');

    cy.get('form .btn').should(($button) => {
      expect($button).to.not.have.attr('disabled', 'disabled');
    });
  });

  it('should test the flight search form', () => {
    cy.visit('/flight-booking/flight-search');

    cy.get('form input[name="from"]').clear();
    cy.get('form input[name="from"]').type('Graz');
    cy.get('form input[name="to"]').clear();
    cy.get('form input[name="to"]').type('Hamburg');
    cy.get('form .btn:nth-child(1)').click();

    cy.get('flight-card').its('length').should('be.gte', 2);
  });
});
