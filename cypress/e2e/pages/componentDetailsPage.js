class componentDetailsPage{

    //Elements on the page

     enterFolderNameField = '//*[contains(@class,"editable-text-container")]//*[contains(@placeholder,"Specify Folder Title")]'
     folderIcon = '.item-container > .list-group-item > .info > .icon'
     selectLoTypeDropdown = '.dropdown-toggle > .fa'
     psTitleField = '//*[contains(@class,"editable-text-container")]//*[contains(@placeholder,"Specify Productive Skill Title")]'
     psInstructionsField = '#richtext-editor-instructions'
     applyButton = '.widget > .text-center > .btn-inverse'
     launchLibraryButton = '.ml-lg > .btn'
     searchLibraryInSelectActivityPopup = '.form-group > .form-control'
     activitySelectionCheckboxInSelectActivityPopup = '//*[contains(text(),"r22_scorableA_V8.zip")][contains(@ng-class,"assetName")]//..//..//..//*[contains(@class,"icon")]'
     addActivityButtonInSelectActivityPopup = '.text-align-right > .btn'
     listItemSelectActivityFromLibrary = '.asset-list-widget .list-group li[class*="list-group-item"]:nth-child(1)'
     byStatusFilter = '[data-ng-if*="facets-by-status"] [data-ng-class*="facet.status"]'
     
     finalizeForReleaseLink = '.worlflow-options [data-ng-click*="finalize"]'
     finalizeAndIngestOkButton = '.builder-modal [type="button"][data-ng-click*="submit"]'
     ingestionStatusOnPage = '[role="alert"] [data-ng-if*="publish-info"]'
     lpChangesSavedText = `.last-updated-message [data-ng-if*="'saved'"]`
     toggleRightPanelButton = '.navbar-right [data-ng-if*="activateRightPanel"] [data-sn-action*="toggle-right-panel"]'
     qaPreviewLink = '.environment-1 [data-ng-if*="version"]'
     promoteToStgButton = '.environment-2 .publish-button'
     stgPreviewLink = '.environment-2 [data-ng-if*="version"]'
     promoteToProdButton = '.environment-3 .publish-button'
     prodPreviewLink = '.environment-3 [data-ng-if*="version"]'

    //Functions/Actions

    createLpFolders(UNIT,LESSON){
        cy.xpath(this.enterFolderNameField).type(`${UNIT}{enter}`);
        cy.get(this.folderIcon).click(); //Enter unit
        cy.xpath(this.enterFolderNameField).type(`${LESSON}{enter}`);
        cy.get(this.folderIcon).click(); //Enter lesson
    }    
    addActivity(activityType,activityName){
        cy.get(this.selectLoTypeDropdown).click();
        const selector = getSelector(activityType)
        function getSelector(LO_TYPE){
            return `//*[@id="widget-item-list"]//*[contains(text(),"${LO_TYPE}")]`
        }
        cy.xpath(selector).click();
        if(activityType=="Productive Skill"){
            cy.xpath(this.psTitleField).type(activityName);
            cy.get(this.psInstructionsField).type('Test Instructions');            
        }
        if(activityType=="Activity, Scoreable"){
            cy.get(this.launchLibraryButton).click(); //Select from library
            //cy.get(this.listItemSelectActivityFromLibrary).should('be.visible')
            //cy.get(this.byStatusFilter).contains('Success').click();
            //cy.get(this.listItemSelectActivityFromLibrary).scrollIntoView().should('be.visible')
            cy.get(this.searchLibraryInSelectActivityPopup).type(`${activityName}{enter}`); //Search for the scorable activity
            /*cy.get(this.listItemSelectActivityFromLibrary).then($el => {
                if ($el.is(':visible')) {} else {
                    cy.get(this.searchLibraryInSelectActivityPopup).clear().type(`${activityName}{enter}`); //Search for the scorable activity
                  // Handle the case where the element is not visible
                }
            });*/         
            const selector = getSelector(activityName)
            function getSelector(NAME){
                return `//*[contains(text(),"${NAME}")][contains(@ng-class,"assetName")]//..//..//..//*[contains(@class,"icon")]`
            }
            cy.xpath(selector).scrollIntoView().click(); //Select activity
            cy.get(this.addActivityButtonInSelectActivityPopup).click();
        }
        if(activityType=="Activity, Non-Scoreable"){
            cy.get(this.launchLibraryButton).click(); //Select from library
            //cy.get(this.listItemSelectActivityFromLibrary).should('be.visible')
            //cy.get(this.byStatusFilter).contains('Success').click();
            //cy.get(this.listItemSelectActivityFromLibrary).scrollIntoView().should('be.visible')
            cy.get(this.searchLibraryInSelectActivityPopup).type(`${activityName}{enter}`); //Search for the non scorable activity            
            const selector = getSelector(activityName)
            function getSelector(NAME){
                //return `//*[contains(text(),"${NAME}")][contains(@ng-class,"assetName")]//..//..//..//*[contains(@class,"icon")]`
                return `//*[contains(text(),"${NAME}")][contains(@ng-class,"assetName")][1]//..//..//..//*[contains(@class,"icon")]`
            }
            cy.xpath(selector).scrollIntoView().click(); //Select activity
            cy.get(this.addActivityButtonInSelectActivityPopup).click();
        }
        cy.get(this.applyButton).click();
    }
    waitForChangesToBeSaved(){
        cy.get(this.lpChangesSavedText).should('contain.text','All changes saved')
    }
    ingestPromoteComponent(){        
        //cy.get(this.lpChangesSavedText).should('have.text','All changes saved').then(()=>{
        cy.get(this.finalizeForReleaseLink).click()
        cy.get(this.finalizeAndIngestOkButton).click()
        cy.get(this.ingestionStatusOnPage).should('contain.text','Ingestion/Promotion of a product is currently in process')
        cy.get(this.toggleRightPanelButton).click()
               
        cy.get(this.qaPreviewLink).invoke('text').then((qaVersion)=>{
            if(qaVersion=='―'){
                // Simulate setting the variable asynchronously
                setTimeout(() => {
                    qaVersion = '1';
                }, 120000); // Change this to the time your variable takes to get the value
                
                // Wrap the variable in a Cypress command
                /*cy.wrap(null).should(() => {
                    expect(qaVersion).to.equal('1');
                });*/
            }
            else{
                setTimeout(() => {
                    var qaVersionNum = Number(qaVersion);
                    qaVersionNum = qaVersionNum+1;
                }, 120000); // Change this to the time your variable takes to get the value
                
                // Wrap the variable in a Cypress command
                /*cy.wrap(null).should(() => {
                    expect(qaVersionNum).to.equal(qaVersionNum+1);
                });*/
            }
        })        
        cy.get(this.promoteToStgButton).click()
        cy.get(this.finalizeAndIngestOkButton).click()
        //const stgVersion = cy.get(this.stgPreviewLink).text()
        cy.get(this.stgPreviewLink).invoke('text').then((stgVersion)=>{
            if(stgVersion=='―'){
                setTimeout(() => {
                    stgVersion = '1';
                }, 120000); // Change this to the time your variable takes to get the value
            }
            else{
                setTimeout(() => {
                    var stgVersionNum = Number(stgVersion);
                    stgVersionNum = stgVersionNum+1;
                }, 120000); // Change this to the time your variable takes to get the value
            }
        })
        cy.get(this.promoteToProdButton).click()
        cy.get(this.finalizeAndIngestOkButton).click()
        /*cy.get(this.prodPreviewLink).invoke('text').then((prodVersion)=>{
            if(prodVersion=='―'){
                setTimeout(() => {
                    prodVersion = '1';
                }, 120000); // Change this to the time your variable takes to get the value
            }
            else{
                setTimeout(() => {
                    var prodVersionNum = Number(prodVersion);
                    prodVersionNum = prodVersionNum+1;
                }, 120000); // Change this to the time your variable takes to get the value
            }
        })*/
        cy.get(this.prodPreviewLink).invoke('text').then((prodVersion) => {
            if (prodVersion === '―') {
                // Retry until the product version changes
                cy.wait(120000); // Wait 2 minutes for the version to change
                cy.get(this.prodPreviewLink).invoke('text').then((updatedVersion) => {
                    if (updatedVersion === '―') {
                        // If it's still '―', set it to '1'
                        updatedVersion = '1';
                    }
                    // Do something with the updated version
                    cy.log('Version after wait: ' + updatedVersion);
                });
            } else {
                cy.wait(120000); // Wait for 2 minutes
                cy.get(this.prodPreviewLink).invoke('text').then((newProdVersion) => {
                    let prodVersionNum = Number(newProdVersion);
                    prodVersionNum += 1;
                    cy.log('Incremented version: ' + prodVersionNum);
                });
            }
        });            
    }
    
            
}
export default componentDetailsPage;