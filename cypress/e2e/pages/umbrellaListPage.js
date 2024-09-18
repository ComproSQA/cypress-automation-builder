class umbrellaListPage{

    //Elements on the page

    createUmbrellaDropdown = '.fw-light-bold > .label'
    enterUniqueCodeField = '#builder-form-field-id'
    enterTitleField = '#builder-form-field-title'
    saveButton = '.tooltip-wrapper > .btn' 

    //Functions/Actions

    createUmbrellaProduct(umbrellaUniqueCode){
        cy.get(this.createUmbrellaDropdown).click(); //Open Create Umbrella Product drop-down
        cy.get(this.enterUniqueCodeField).type(umbrellaUniqueCode); //Enter unique code
        cy.get(this.enterTitleField).type(umbrellaUniqueCode); //Enter title
        cy.get(this.saveButton).click(); //Click on Save button
    }
            
}
export default umbrellaListPage;