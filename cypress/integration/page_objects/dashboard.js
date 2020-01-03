class Dashboard {
    exploreBtn() {
        cy.get(".btn-primary").click();
    }

    registerBtn() {
        cy.get(".edx-header-ui a")
            .contains("Register")
            .click();
    }

    signInBtn() {
        cy.get(".edx-header-ui a")
            .contains("Sign In")
            .click();
    }
}

export default new Dashboard();
