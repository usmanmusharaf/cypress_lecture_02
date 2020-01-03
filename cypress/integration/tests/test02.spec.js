import registration_helper from "../helpers/registration_helper";
import dashboard from "../page_objects/dashboard";
import course_page from "../page_objects/course_page";

describe("Dashboard page tests", () => {
    before(() => {
        cy.visit("/");
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce(
            "stage-edx-sessionid",
            "edxloggedin",
            "stage-edx-user-info",
            "csrftoken"
        );
    });

    it("verify search functionality works fine for present courses", () => {
        dashboard.exploreBtn();
        course_page.searchCourse("python{enter}");
        cy.get(".hide-phone").should(result => {
            expect(result).to.contain("28 results matching");
        });
    });

    it("verify all courses are displayed if the searched courses is not present", () => {
        course_page.searchCourse("cypress{enter}");
        cy.get(".no-results>h3").should(result => {
            expect(result).to.contain(
                "We couldn't find any results for cypress"
            );
        });
        cy.get(".hide-phone").should(result => {
            expect(result).to.contain("2058 results matching");
        });
    });
});
