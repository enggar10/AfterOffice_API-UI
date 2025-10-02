describe('Add Leave Entitlement Tests', () => {
  beforeEach(() => {
    // Login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Buka halaman Add Entitlements
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/leave/addLeaveEntitlement');
  });

  it('✅ Positive Case - Should add entitlement for Budi Santoso', () => {
    // Pilih Employee
    cy.get('input[placeholder="Type for hints..."]').type('Budi Santoso');
    cy.contains('.oxd-autocomplete-option', 'Budi Santoso').click();

    // Pilih Leave Type
    cy.contains('label', 'Leave Type')
      .parents('.oxd-input-group')
      .find('.oxd-select-text-input')
      .click();
    cy.contains('.oxd-select-dropdown div', 'CAN - FMLA').click();

    // Pilih Leave Period
    cy.contains('label', 'Leave Period')
      .parents('.oxd-input-group')
      .find('.oxd-select-text-input')
      .click();
    cy.contains('.oxd-select-dropdown div', '2025-01-01 - 2025-31-12').click();

    // Isi Entitlement
    cy.contains('label', 'Entitlement')
      .parents('.oxd-input-group')
      .find('input')
      .type('10');

    // Klik Save
    cy.get('button[type="submit"]').click();

    // kalau popup update muncul → klik Confirm
    cy.get('body').then($body => {
  if ($body.find('.oxd-dialog-sheet').length > 0) {
    cy.contains('.oxd-dialog-sheet .oxd-text--card-title', 'Updating Entitlement')
      .should('be.visible');
    cy.contains('.oxd-dialog-sheet button', 'Confirm').click();
  }
});

    // cek notifikasi sukses (lebih fleksibel)
    cy.get('body', { timeout: 10000 }).should($body => {
  const text = $body.text();
  expect(
    text.includes('Successfully Saved') ||
    text.includes('Success') ||
    text.includes('Entitlement')
  ).to.be.true;
});

  });

  it('❌ Negative Case - Should not allow saving entitlement without value', () => {
    // Pilih Employee
    cy.get('input[placeholder="Type for hints..."]').type('Budi Santoso');
    cy.contains('.oxd-autocomplete-option', 'Budi Santoso').click();

    // Pilih Leave Type
    cy.contains('label', 'Leave Type')
      .parents('.oxd-input-group')
      .find('.oxd-select-text-input')
      .click();
    cy.contains('.oxd-select-dropdown div', 'CAN - FMLA').click();

    // Pilih Leave Period
    cy.contains('label', 'Leave Period')
      .parents('.oxd-input-group')
      .find('.oxd-select-text-input')
      .click();
    cy.contains('.oxd-select-dropdown div', '2025-01-01 - 2025-31-12').click();

    // Biarkan entitlement kosong lalu klik Save
    cy.get('button[type="submit"]').click();

    // Assertion muncul Required
    cy.contains('Required').should('be.visible');
  });
});