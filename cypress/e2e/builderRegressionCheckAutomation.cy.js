/// <reference types="Cypress" />

describe('Builder Regression Test',function(){

    //Adding global data
    var umbrellaUniqueCode = "cqa_umbrella_"+Math.random().toString(36).substring(2, 8); //Generate unique umbrella code
    var peUniqueCode = "cqa_pe_"+Math.random().toString(36).substring(2, 8); //Generate unique Practice Extra component code
    //var umbrellaUniqueCode = "cqa_umbrella_0e0pk8"
    //var peUniqueCode = "cqa_tt_pe_do_not_change_ankur_20"
        
    beforeEach('Adding code required to be executed before each test',()=>{
         //run on Thor
        cy.visit("https://asgard-thor-builder.comprodls.com/", {
            onBeforeLoad: (win) => {
              win.fetch = null;
            }
          });
        //cy.visit(""); //run on QA
        //cy.visit(""); //run on REL
        cy.get('.form-control').type('builder-thor-pub1'); //Enter builder login org
        cy.get('.btn-inverse').click(); //Click on login button
        //cy.visit('https://asgard-thor-assets.comprodls.com/builder-identity/index.html?client=CUP_BUILDER&redirectSignIn=https%3A%2F%2Fasgard-thor-builder.comprodls.com%2F&page=signin', { failOnStatusCode: false })
        cy.get('#login-user').should('be.visible').then(($result)=>{
            cy.get('#login-user').type('anil_admin') //Enter username
        })
        cy.get('#login-pass').type('Compro11') //Enter password
        cy.get('#login-mfa-btn').click(); //Click on login button
    })

    it('Create an umbrella product with unique code starting from "cqa"', function(){
        
        cy.get('.hidden-sm').click(); //Show sidebar
        cy.get(':nth-child(2) > .collapsed').click(); //Open Products option
        cy.get('#sidebar-products > :nth-child(2) > .ng-binding').click(); //Open Umbrella Products page
        cy.get('.hidden-sm').click(); //Hide sidebar
        
        cy.get('.fw-light-bold > .label').click(); //Open Create Umbrella Product drop-down
        cy.get('#builder-form-field-id').type(umbrellaUniqueCode); //Enter unique code
        cy.get('#builder-form-field-title').type(umbrellaUniqueCode); //Enter title
        cy.get('.tooltip-wrapper > .btn').click(); //Click on Save button
        
        //Creating xpath for the above created umbrella present on the page
        const xpath1 = `//*[contains(@title,"${umbrellaUniqueCode}")]`;
        //Wait for the above created umbrella product to be visible and then click on it
        cy.xpath(xpath1).should('be.visible').then(($result)=>{
            cy.xpath(xpath1).click();  
        })
        cy.get('.page-title').should('contain.text',umbrellaUniqueCode);
        cy.get('[data-ui-view=""] > .alert').should('be.visible');
    
    })

    it('Create a component with a unique code starting from "cqa"', function(){        
        //Open sidebar
        cy.get('.hidden-sm').should('be.visible').then(($result)=>{
            cy.get('.hidden-sm').click();
        }) 
        cy.get(':nth-child(2) > .collapsed').click(); //Open Products option
        cy.get('#sidebar-products > :nth-child(3) > .ng-binding').click(); //Open Components option
        cy.get('.hidden-sm').click(); //Hide sidebar
        
        cy.get('.slick-current > .builder-carousel-widget').click(); //Click on Practice Extra template
        cy.get('#builder-form-field-id').type(peUniqueCode); //Enter unique component code
        cy.get('#select2-chosen-1').click(); //Open CY Year drop-down
        cy.xpath('//*[@id="select2-result-label-5"][contains(text(),"2018")]').click(); //Select 2018 as CY year from drop-down
        cy.get('#select2-chosen-2').click(); //Open Program drop-down
        cy.xpath('//*[@id="select2-result-label-15"][contains(text(),"Default")]').click(); //Select Default as Program from drop-down
        cy.get('#builder-form-field-title').type(peUniqueCode); //Enter Component title
        cy.get('.form-actions > :nth-child(2) > .btn').click(); //Click on Save and return
        
        //cy.get('.form-control').type(peUniqueCode); //Search the component

        //Wait for the searched component to appear and click on it
        cy.xpath(`//*[contains(@class,"list-group-item")]//*[text()="${peUniqueCode}"]`).should('be.visible').then(($result)=>{
            cy.xpath(`//*[contains(@class,"list-group-item")]//*[text()="${peUniqueCode}"]`).click();
        })
        cy.xpath('//*[contains(@class,"editable-text-container")]//*[contains(@placeholder,"Specify Folder Title")]').type('Unit 1{enter}');
        cy.get('.item-container > .list-group-item > .info > .icon').click(); //Enter unit
        cy.xpath('//*[contains(@class,"editable-text-container")]//*[contains(@placeholder,"Specify Folder Title")]').type('Lesson A{enter}');
        cy.get('.item-container > .list-group-item > .info > .icon').click(); //Enter lesson

        cy.get('.dropdown-toggle > .fa').click(); //Open drop-down to select LO type
        cy.xpath('//*[@id="widget-item-list"]//*[contains(text(),"Productive Skill")]').click();
        cy.xpath('//*[contains(@class,"editable-text-container")]//*[contains(@placeholder,"Specify Productive Skill Title")]').type('Productive Skill 1');
        cy.get('#richtext-editor-instructions').type('Test Instructions');
        cy.get('.widget > .text-center > .btn-inverse').click(); //Click Apply

        cy.get('.dropdown-toggle > .fa').click(); //Open drop-down to select LO type
        cy.xpath('//*[@id="widget-item-list"]//*[contains(text(),"Activity, Scoreable")]').click();
        cy.get('.ml-lg > .btn').click(); //Select from library
        cy.get('.form-group > .form-control').type('r22_scorableA_V8.zip{enter}'); //Search for the scorable activity
        cy.xpath('//*[contains(text(),"r22_scorableA_V8.zip")][contains(@ng-class,"assetName")]//..//..//..//*[contains(@class,"icon")]').click(); //Select activity
        cy.get('.text-align-right > .btn').click();
        cy.get('.widget > .text-center > .btn-inverse').click(); //Click Apply

        cy.get('.dropdown-toggle > .fa').click(); //Open drop-down to select LO type
        cy.xpath('//*[@id="widget-item-list"]//*[contains(text(),"Activity, Non-Scoreable")]').click(); //Select Non-Scorable type
        cy.get('.ml-lg > .btn').click(); //Select from library
        cy.get('.form-group > .form-control').type('EV_OP_INT_cqa_non_socorable.zip{enter}'); //Search for the scorable activity
        cy.xpath('//*[contains(text(),"EV_OP_INT_cqa_non_socorable.zip")][contains(@ng-class,"assetName")]//..//..//..//*[contains(@class,"icon")]').click(); //Select activity
        cy.get('.text-align-right > .btn').click();
        cy.get('.widget > .text-center > .btn-inverse').click();
    
    })
})
