describe("login page", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it.only("should login with valid email and password", () => {
        cy.login("test@test.com", "test");
        cy.contains("Добро пожаловать test@test.com").should("be.visible");
    });

    it("should not logi with empty mail", () => {
        cy.login(null, "test");

        cy.get("#mail").then((elements) => {
            expect(elements[0].checkValidity()).to.be.false;
            expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
        });
    });

    it("should not logi with empty password", () => {
        cy.login("test@test.com", null);

        cy.get("#pass").then((elements) => {
            expect(elements[0].checkValidity()).to.be.false;
            expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
        });
    });
});

describe("add books", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.login("test@test.com", "test");
        cy.contains("Добро пожаловать test@test.com").should("be.visible");
    });

    it("should add one new book add to favorite", () => {
        cy.contains("Add new").click();
        cy.fillBookAttributes(
            "Book Title",
            "Book description",
            "imageForBook1.png",
            "Book.doc",
            "A.A. Author"
        );
        cy.get("#favorite").click();
        cy.contains("Submit").click();

        cy.get(".card-deck .h-100").should("have.lengthOf", 1);
        
        cy.getCountFavoritesBook().should("have.lengthOf", 1);
    });

    it("del from favority and add to favorite", () => {
        cy.contains("Favorites").click();
        cy.get(".h-100 > .card-footer > .btn").click();
        cy.get(".h-100 > .card-footer > .btn").should("not.exist");
        cy.contains("Please add some book to favorit on home page!")
            .should("be.visible")
            .click();
        cy.contains('Add to favorite').click()
        cy.getCountFavoritesBook().should("have.lengthOf", 1);
    });

    it("check books attribute", () => {
        cy.contains("Favorites").click();
        cy.get(".mt-3 .h-100").contains("Book Title").click();
        cy.get(".col-md-7 h2").should("have.text", "Book Title");
        cy.get(".col-md-7 p").then((elements) => {
            expect(elements[0]).to.have.text("Book description");
            expect(elements[1]).to.have.text("A.A. Author");
        });
    });
});
