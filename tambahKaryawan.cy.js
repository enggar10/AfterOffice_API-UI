describe('Tambah Karyawan Baru', () => {
  const baseURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
  const adminUser = "Admin";
  const adminPass = "admin123";
  const newEmpFirst = "Budi";
  const newEmpLast = "Santoso";

  it('Positive Case - Tambah Karyawan Baru', () => {
    cy.visit(baseURL);

    // Login Admin
    cy.get('input[name="username"]').type(adminUser);
    cy.get('input[name="password"]').type(adminPass);
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');

    // Go to PIM > Add Employee
    cy.contains('PIM').click();
    cy.contains('Add Employee').click();

    cy.get('input[name="firstName"]').type(newEmpFirst);
    cy.get('input[name="lastName"]').type(newEmpLast);
    cy.get('button[type="submit"]').click();

    // Assertion
    cy.get('h6').should('contain', 'Personal Details');
  });

  it('Negative Case - Tambah Karyawan tanpa nama', () => {
    cy.visit(baseURL);

    // Login Admin
    cy.get('input[name="username"]').type(adminUser);
    cy.get('input[name="password"]').type(adminPass);
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    
    cy.contains('PIM').click();
    cy.contains('Add Employee').click();
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-group__message').should('contain', 'Required');
  });
});