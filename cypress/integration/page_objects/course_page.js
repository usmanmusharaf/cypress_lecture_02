class CoursesPage {
    searchCourse(_course) {
        cy.get(".js-course-search-bar input").type(_course);
    }
}

export default new CoursesPage();
