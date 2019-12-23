class Dashboard {

    dashboardLinkText() {
        return cy.get('nav[aria-label="Account"] a').contains('Register')
    }
}

export default new Dashboard