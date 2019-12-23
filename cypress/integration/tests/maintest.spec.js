import register from '../helpers/registration_helper'
import dashboard from '../page_objects/dashboard'
import location_helper from '../helpers/location_helper'

describe('Registration and login tests', () => {

    before(() => {
        // registers user using cypress_request once before running all tests
        register.RegistrationApiRequest()
    })

    beforeEach(() => {
        // saves user_session and uses it before every test so user may need not to login everytime
        Cypress.Cookies.preserveOnce('stage-edx-sessionid', 'edxloggedin', 'stage-edx-user-info', 'csrftoken')
        cy.visit('/') // visit baseURL defined in cypress.json
    })

    it('verifies user is on dashboard page ', () => {
        location_helper.CheckPageLocation('/dashboard/')
        cy.title().should('contain', 'Dashboard')
    })

    it('verifies Explore New Courses text to be present', () => {
        cy.get('.btn-neutral').should('contain.text', 'Explore New Courses')
    })

    it('verifies mycourse section is present and navigates user to course page', () => {
        cy.get('.header-courses').should('contain.text', 'My Courses')
        dashboard.exploreBtn().click() // clicks on explore button on dashboard
        location_helper.CheckPageLocation('/course')
    })
})


