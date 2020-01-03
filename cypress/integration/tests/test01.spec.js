import register from "../helpers/registration_helper";
import dashboard from "../page_objects/dashboard";
import location_helper from "../helpers/location_helper";
import registeration_page from "../page_objects/registeration_page";
import registration_helper from "../helpers/registration_helper";

describe("Registration and login tests", () => {
    beforeEach(() => {
        cy.visit("/");
        dashboard.registerBtn();
        Cypress.Cookies.preserveOnce(
            "stage-edx-sessionid",
            "edxloggedin",
            "stage-edx-user-info",
            "csrftoken"
        );
    });

    it("should display email address not valid", () => {
        cy.fixture("registration.json").then(data => {
            const invalid_email = data.invalid_email;
            registeration_page.fill_in_registration_field(
                invalid_email.email,
                invalid_email.fullname,
                invalid_email.username,
                invalid_email.password
            );
        });
        registeration_page.select_country("PK");
        registeration_page.register_button();
        cy.get("#register-email-validation-error-msg").should(
            validation_message => {
                expect(validation_message).to.contain(
                    "not a valid email address"
                );
            }
        );
    });

    it("should display username already exists message to the user", () => {
        cy.fixture("registration.json").then(data => {
            const existing_username = data.existing_username;
            registeration_page.fill_in_registration_field(
                existing_username.email,
                existing_username.fullname,
                existing_username.username,
                existing_username.password
            );
        });
        registeration_page.select_country("PK");
        registeration_page.register_button();
        cy.get("#register-username-validation-error-msg").should(
            validation_message => {
                expect(validation_message).to.contain(
                    "Try again with a different username"
                );
            }
        );
    });

    it("should display email-id already exists message to the user", () => {
        cy.fixture("registration.json").then(data => {
            const existing_email = data.existing_email;

            registeration_page.fill_in_registration_field(
                existing_email.email,
                existing_email.fullname,
                existing_email.username,
                existing_email.password
            );
        });
        cy.get("#register-email-validation-error-msg").should(
            validation_message => {
                expect(validation_message).to.contain(
                    "Try again with a different email address"
                );
            }
        );
    });

    it("should let user register successfully", () => {
        cy.fixture("registration.json").then(data => {
            const valid = data.valid_data;
            registration_helper.RegistrationApiRequest(
                valid.email,
                valid.username,
                valid.password
            );
        });
    });
});
