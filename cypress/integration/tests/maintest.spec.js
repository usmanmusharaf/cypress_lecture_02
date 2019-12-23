import register from '../helpers/registration_helper'
import dashboard from '../page_objects/dashboard'

describe('Registration and login tests', () => {
    beforeEach(() => {
        // saves user_session and uses it before every test so user may need not to login everytime
        Cypress.Cookies.preserveOnce('stage-edx-sessionid', 'edxloggedin', 'stage-edx-user-info', 'csrftoken')
        cy.visit('/') // visit baseURL defined in cypress.json
    })

    before(() => {
        // registers user using cypress_request once before running all tests
        register.RegistrationApiRequest()
    })

    it('lets the user register to the application', () => {
        cy.title().should('contain', 'edX')
    })

    it('verifies user is logged in after registration', () => {
        cy.get('.btn-neutral').should('contain.text', 'Explore New Courses')
    })

    it('verifies mycourse section is present and user can click on mycourse btn', () => {
        cy.get('.header-courses').should('contain.text', 'My Courses')
        dashboard.exploreBtn().click() // clicks on explore button on dashboard
    })
})


