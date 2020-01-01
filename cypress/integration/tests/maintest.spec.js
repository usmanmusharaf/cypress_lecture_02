import register from "../helpers/registration_helper";
import dashboard from "../page_objects/dashboard";
import location_helper from "../helpers/location_helper";
import registeration_page from "../page_objects/registeration_page";

describe("Registration and login tests", () => {
    beforeEach(() => {
        cy.visit("/");
        dashboard.registerBtn();
    });
    afterEach(() => {
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

    it("should display user already exists message", () => {
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
                    "belongs to an existing account"
                );
            }
        );
    });

    it("should let user register successfully", () => {
        cy.fixture("registration.json").then(data => {
            const valid = data.valid_data;
            registeration_page.fill_in_registration_field(
                valid.email,
                valid.fullname,
                valid.username,
                valid.password
            );
            registeration_page.select_country("PK");
            cy.server();
            cy.route("POST", "/user_api/v1/account/registration/").as(
                "registerRequest"
            );
            registeration_page.register_button();
            cy.wait("@registerRequest", { timeout: 70000 })
                .its("status")
                .should("eq", 200);
        });
    });
});
