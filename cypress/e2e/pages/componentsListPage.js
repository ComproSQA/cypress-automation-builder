class componentsListPage{

    //Elements on the page

     componentsTemplateTypeList = '.template-options-widget[role="option"]'
     componentsTemplateTypeChildList = '.builder-carousel-widget'
     componentsTemplateTypeHeaderList = '.carousel-header'
     uniqueCodeField = '#builder-form-field-id'
     cyYearDropdown = '#select2-chosen-1'
     cyYear = '//*[contains(@class,"select2-result-label")][contains(text(),"2018")]'
     programDropdown = '#select2-chosen-2'
     program = '//*[contains(@class,"select2-result-label")][contains(text(),"Default")]'
     titleField = '#builder-form-field-title'
     saveAndReturnButton = '.form-actions > :nth-child(2) > .btn'

    //Functions/Actions

    //Click on Practice Extra template
    clickOnComponentTemplate(componentType){
        cy.get(this.componentsTemplateTypeList).find(this.componentsTemplateTypeChildList).each(($el,index,$list)=>{
            var templateText=$el.find(this.componentsTemplateTypeHeaderList).text();            
            if(templateText.includes(componentType))
                {
                    cy.log("Component to be created = "+templateText);
                    cy.wrap($el).click()
                }
        })
    }
    enterPracticeExtraDetails(peUniqueCode){
        cy.get(this.uniqueCodeField).type(peUniqueCode);
        cy.get(this.cyYearDropdown).click();
        cy.xpath(this.cyYear).click();
        cy.get(this.programDropdown).click();
        cy.xpath(this.program).click();
        cy.get(this.titleField).type(peUniqueCode);
        cy.get(this.saveAndReturnButton).click();
    }    
    openTheComponent(componentTitle){
        const selector = getSelector(componentTitle)  
        function getSelector(title){
            return `//*[contains(@class,"list-group-item")]//*[text()="${title}"]`
        }              
        cy.xpath(selector).should('be.visible').then(($result)=>{
            cy.xpath(selector).click();
        })
    }
            
}
export default componentsListPage;