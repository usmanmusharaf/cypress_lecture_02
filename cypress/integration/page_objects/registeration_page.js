class RegistrationPage {
    fill_in_registration_field(email_id, full_name, username, password) {
        cy.get("#register-email").type(email_id);
        cy.get("#register-name").type(full_name);
        cy.get("#register-username").type(username);
        cy.get("#register-password").type(password);
    }

    select_country(country) {
        cy.get("#register-country").select(country);
    }

    register_button() {
        cy.get(".register-button").click();
    }
}

export default new RegistrationPage();
