describe('misc e2e tests', () => {
  it('should do a sanity check', () => {
    cy.visit('');
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
});
