import register from '../helpers/registration_helper'

describe('Login tests', () => {
    beforeEach(() => {
        // Cypress.Cookies.preserveOnce('stage-edx-sessionid', 'edxloggedin', 'stage-edx-user-info', 'csrftoken')
        cy.visit('/')
        register.RegistrationApiRequest()
    })

    it('lets the user register to the application', () => {
        cy.title().should('contain', 'Register')
    })

})

