describe("Search for players", () => {
  it("Returns match history, rank, level, and other match information", () => {
    cy.intercept("/api/search?name=Cole&tag=cat", {
      fixture: "cole-user.json",
    });
    cy.intercept("/api/matches?name=Cole&tag=cat", {
      fixture: "cole-matches.json",
    });

    cy.visit("http://localhost:3000/");

    cy.get("input#player-name").type("Cole");

    cy.get("input#player-tag").type("cat");

    cy.get('[data-test-id="search-link"]').click();

    cy.get('[data-test-id="peak-rank"]').contains("Diamond 1");

    cy.get('[data-test-id="profile-image"]').should(
      "have.attr",
      "src",
      "https://media.valorant-api.com/playercards/599d0cdb-43cf-29f1-8c12-908d4c084180/smallart.png"
    );

    cy.get('[data-test-id="profile-name"]').contains("Cole #cat");

    cy.get('[data-test-id="profile-level"]').contains("116");
  });
});
