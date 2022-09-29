describe("Mounting components", () => {
  it("mounts", () => {
    cy.visit("http://localhost:3000");
    // cy.contains("UPLOAD").click();
    // cy.url().should("include", "/commands/actions");

    //  cy.get(".action-email")
    //    .type("fake@email.com") Type fake@email.com into the input
    //    .should("have.value", "fake@email.com");
  });
});

export {};

//  Scenario: 페이지 방문
// 	Given: 일반 사용자
// 	When: a user visits http://localhost:3000
// 	Then: they can see upload button
//  Then: they can see total image counts
//  Then: starts page with 1 and end page num is total image Counts / 5

//  Scenario: 이미지 전체 선택
// 	Given: 일반 사용자
// 	When: a user check checkAll btn
//  Then: show up delete btn
// 	Then: checked items count === image counts per page
//  Then: they can see total image counts
//  Then: starts page with 1 and end page num is total image Counts / 5

//  Scenario: 이미지 개별 선택
// 	Given: 일반 사용자
// 	When: a user check checkbtn on the sepcific image
//  Then: show up delete btn
// 	Then: checked items count === image counts per page
//  Then: they can see total image counts
//  Then: starts page with 1 and end page num is total image Counts / 5

//  Scenario: 전체 삭제
// 	Given: 일반 사용자
// 	When: a user check checkAll btn
//  Whne: a user click the delete btn
// 	Then: delete current page items
//  Then: total image counts === total image counts - 5
//  Then: end page num === end page num -1
