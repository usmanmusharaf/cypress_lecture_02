class LocationHelper {

    CheckPageLocation(_path) {
        cy.location().should((loc) => {
            expect(loc.pathname, { timeout: 10000 }).to.eq(_path)
        })
    }

}

export default new LocationHelper