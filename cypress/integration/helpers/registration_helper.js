class RegisterationApi {

    RegistrationApiRequest() {
        cy.request({
            method: 'GET',
            url: 'https://courses.stage.edx.org/register'
        })
        cy.getCookie('csrftoken').its('value').then(($csrfToken) => {

            cy.request({
                method: 'POST',
                url: 'https://courses.stage.edx.org/user_api/v1/account/registration/',
                form: true,
                headers: {
                    Referer: 'https://courses.stage.edx.org/register',
                    'X-CSRFToken': $csrfToken,
                },
                body: {
                    email: Cypress.env('email'),
                    name: 'usman musharaf',
                    username: Cypress.env('username'),
                    password: Cypress.env('password'),
                    country: 'PK',
                    honor_code: true
                }
            })
        })
    }
}

export default new RegisterationApi
