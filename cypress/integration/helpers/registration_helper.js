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
                    email: 'usman.musharaf+025@arbisoft.com',
                    name: 'usman musharaf',
                    username: 'usman025',
                    password: 'edx72326',
                    country: 'PK',
                    honor_code: true
                }
            })
        })
    }
}

export default new RegisterationApi
