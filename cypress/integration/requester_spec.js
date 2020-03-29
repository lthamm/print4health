describe('requester workflow', function () {
  beforeEach(function () {
    Cypress.Cookies.preserveOnce('PHPSESSID');
  });
  it('go to homepage', function () {
    cy.visit('http://192.168.222.12');
  });
  it('login as requester', function () {
    cy.login('requester@print4health.org', 'test');
  });
  it('place order', function () {
    cy.openOrderModal();
    cy.checkQuantityInput(50);
    cy.get('button:contains("Bedarf eintragen")').click();
    cy.scrollTo('top');
    cy.get('.alert-success').contains('Danke, der Bedarf wurde eingetragen');
  });
  it('check that commit modal only displays info text', function () {
    cy.openCommitModal();
    cy.get('input[value=OK]').click();
  });
  it('logout', function () {
    cy.logout();
  });
});
