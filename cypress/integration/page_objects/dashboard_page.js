class Dashboard {
    exploreBtn() {
        cy.get(".btn-primary").click();
    }
}
export default new Dashboard();
