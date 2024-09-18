class umbrellaDetailsPage{

    //Elements on the page
    
    umbrellaProductTitle = '.page-title'
    noComponentsText = '[data-ui-view=""] > .alert'
    plusIcon = '.components-info .dropdown'
    componentOption = '.components-info .dropdown-menu [data-ng-click*="openProductsModal"]'
    searchComponentInSelectComponentPopup = '.form-group > .form-control'
    componentInPopup = '.list-group-item .info .ng-binding'
    addComponentButton = '.text-align-right > .btn'
    componentLinked = '[data-ng-model*="bundle"] .component'

    //Functions/Actions

    openUmbrellaProduct(umbrellaUniqueCode){        
        const selector = getSelector(umbrellaUniqueCode);
        function getSelector(attributeValue) {
            return `[title=${attributeValue}]`;
        }
        //cy.get(selector).contains(`${umbrellaUniqueCode}`).should('be.visible').then(($result)=>{
            cy.get(selector).should('be.visible').then(($result)=>{
                cy.get(selector).click();
            //cy.get(selector).contains(`${umbrellaUniqueCode}`).click(); //Click on the umbrella to open
        })
        cy.get(this.umbrellaProductTitle).should('contain.text',umbrellaUniqueCode); //Confirm if the same umbrella is opened
        cy.get(this.noComponentsText).should('be.visible'); //Confirm rendering of an element on the page
    }      
    
    linkComponent(peUniqueCode){
        cy.get(this.plusIcon).click()
        cy.get(this.componentOption).contains('Components').click()
        cy.get(this.searchComponentInSelectComponentPopup).type(`${peUniqueCode}{enter}`)
        cy.get(this.componentInPopup).contains(peUniqueCode).click()
        cy.get(this.addComponentButton).click()        
        cy.get(this.addComponentButton).should('not.be.visible')
        cy.get(this.componentLinked).should('have.id',peUniqueCode).should('be.visible')
    }

            
}
export default umbrellaDetailsPage;