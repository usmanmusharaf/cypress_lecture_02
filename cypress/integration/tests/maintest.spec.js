import register from '../helpers/registration_helper'

describe('Login tests', () => {
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('stage-edx-sessionid', 'edxloggedin', 'stage-edx-user-info', 'csrftoken')
        cy.visit('/')
    })

    before(() => {
        register.RegistrationApiRequest()
    })

    it('lets the user register to the application', () => {
        cy.title().should('contain', 'edX')
    })

    it('verifies user is logged in after registration', () => {
        cy.get('.btn-neutral').should('contain.text', 'Explore New Courses')
    })
})


