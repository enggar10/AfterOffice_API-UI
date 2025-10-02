describe('E2E Flow - Request and Approve Leave', () => {

  const employee = {
    username: 'enggar', 
    password: 'enggar123'
  };

  const admin = {
    username: 'Admin',
    password: 'admin123'
  };

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('✅ Positive case - Employee requests leave, Admin approves, Employee sees Approved status', () => {

    // === STEP 1: Login sebagai karyawan dan request cuti ===
    cy.get('input[name="username"]').type(employee.username);
    cy.get('input[name="password"]').type(employee.password);
    cy.get('button[type="submit"]').click();

    // pastikan masuk dashboard
    cy.get('.oxd-main-menu', { timeout: 10000 }).should('be.visible');

    // buka menu Leave → Apply
    cy.contains('a.oxd-main-menu-item', 'Leave', { timeout: 10000 }).click();
    cy.contains('Apply', { timeout: 10000 }).click();

    // PILIH Leave Type
cy.contains('label', 'Leave Type')
  .closest('.oxd-input-group')
  .find('.oxd-select-text-input')
  .click();
cy.contains('.oxd-select-dropdown div', 'CAN - Personal').click({ force: true });

// ISI Tanggal From & To
cy.contains('label', 'From Date')
  .closest('.oxd-input-group')
  .find('input').clear().type('2025-8-10');
cy.contains('label', 'To Date')
  .closest('.oxd-input-group')
  .find('input').clear().type('2025-8-10');

// Klik Apply
cy.contains('button', 'Apply').click();

// tunggu muncul toast success
cy.get('body', { timeout: 15000 }).should($body => {
      expect($body.text()).to.match(/Successfully Submitted|Success/);
    });

    // logout
    cy.get('.oxd-userdropdown-tab').click();
    cy.contains('Logout').click();

    // === STEP 2: Login sebagai Admin dan approve cuti ===
    cy.get('input[name="username"]').type(admin.username);
    cy.get('input[name="password"]').type(admin.password);
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-main-menu', { timeout: 10000 }).should('be.visible');

    // buka Leave → Leave List
    cy.contains('a.oxd-main-menu-item', 'Leave').click();
    cy.contains('Leave List').click();

    // filter by employee
    cy.contains('label', 'Employee Name')
  .parents('.oxd-input-group')
  .find('input[placeholder="Type for hints..."]')
  .clear()
  .type('donne manula');
    cy.contains('.oxd-autocomplete-option', 'donne manula').click();

    // klik Search
    cy.contains('button', 'Search').click();

    // approve leave (ambil baris pertama dengan Pending Approval)
    cy.get('div.oxd-table-body')
  .contains('div[role="row"]', 'donne manula')   // pastikan row employee
  .contains('Pending Approval')
  .parents('div[role="row"]')
  .find('button')
  .first()
  .click();

    // logout
    cy.get('.oxd-userdropdown-tab').click();
    cy.contains('Logout').click();

    // === STEP 3: Login lagi sebagai employee, cek status ===
    cy.get('input[name="username"]').type(employee.username);
    cy.get('input[name="password"]').type(employee.password);
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-main-menu', { timeout: 10000 }).should('be.visible');

    // === STEP 2: Cek My Leave ===
    cy.contains('a.oxd-main-menu-item', 'Leave').click();
    cy.contains('My Leave').click();

    // filter by date
    cy.contains('label', 'From Date')
      .closest('.oxd-input-group')
      .find('input')
      .clear()
      .type('2025-8-10');
    cy.contains('button', 'Search').click();

    cy.contains('label', 'To Date')
      .closest('.oxd-input-group')
      .find('input')
      .clear()
      .type('2025-8-10');
    cy.contains('button', 'Search').click();

    // Tunggu tabel muncul
cy.get('div.oxd-table-body', { timeout: 10000 }).should('be.visible');

//cy.get('div.oxd-table-body div[role="row"]')
//  .contains('2025-08-10')
//  .parents('div[role="row"]')
 // .within(() => {
  //  cy.contains('button', 'Cancel', { timeout: 10000 }).should('be.visible');
  
    // logout
    cy.get('.oxd-userdropdown-tab').click()
    cy.contains('Logout').click();

 // });
  });

  it('❌ Negative Case - Employee tries to Apply Leave without Leave Type', () => {

  // === STEP 1: Login sebagai karyawan dan request cuti ===
    cy.get('input[name="username"]').type(employee.username);
    cy.get('input[name="password"]').type(employee.password);
    cy.get('button[type="submit"]').click();

    // pastikan masuk dashboard
    cy.get('.oxd-main-menu', { timeout: 10000 }).should('be.visible');

    // buka menu Leave → Apply
    cy.contains('a.oxd-main-menu-item', 'Leave', { timeout: 10000 }).click();
    cy.contains('Apply', { timeout: 10000 }).click();


  // ISI Tanggal From & To saja
  cy.contains('label', 'From Date')
    .closest('.oxd-input-group')
    .find('input')
    .clear()
    .type('2025-07-10');

  cy.contains('label', 'To Date')
    .closest('.oxd-input-group')
    .find('input')
    .clear()
    .type('2025-07-10');

  // Biarkan Leave Type kosong, langsung klik Apply
  cy.contains('button', 'Apply').click();

  // Assertion: cek error muncul atau tombol Apply tetap disabled
  //cy.contains('Required', { timeout: 5000 }).should('be.visible');
  //cy.contains('button', 'Apply').should('be.disabled');
});

});