/*
email, username and password are used from cypress.env.json
that is kept in .gitignore to keep credentials confidential.
You can create your own cypress.env.json file to run the test
*/

class RegisterationApi {
    RegistrationApiRequest(_email, _username, _password) {
        cy.request({
            method: "GET",
            url: "https://courses.stage.edx.org/register"
        });
        // gets csrfToken from cookie and saves it in $csrfToken after resolving promise
        cy.getCookie("csrftoken")
            .its("value")
            .then($csrfToken => {
                cy.request({
                    method: "POST",
                    url:
                        "https://courses.stage.edx.org/user_api/v1/account/registration/",
                    form: true,
                    headers: {
                        "X-CSRFToken": $csrfToken
                    },
                    body: {
                        // form data in request body
                        email: _email,
                        name: "usman musharaf",
                        username: _username,
                        password: _password,
                        country: "PK",
                        honor_code: true
                    }
                }).then(response => {
                    expect(response.status).to.eq(200);
                });
            });
    }
}

// exporting class object directly
export default new RegisterationApi();
