class c1Page{

    //Elements on the page

     loginButton = '[qid="home-2"]'
     usernameField = '#gigya-login-form input[name="username"]'
     passwordField = '#gigya-login-form input[name="password"]'
     login = '#gigya-login-form [type="submit"]'
     myLibraryTab = '#myLibrary'
     searchBox = '[qid="t-lib-s-inpt-1"]'
     showMoreLink = '//*[@qid="t-lib-cm-btn-3"]//*[text()="Show more"]'
     viewDetailsLink = '[qid="t-lib-cm-link-6"]'
     component = '.umbrella-components .link[tabindex="0"]'
     component1 = '[qid="pView-3-0"]'
     psActivity = '#activityLaunch .content-cup-pskill'
     endedClassesDropdown = '#Ended-Classes-Section'
     endedClassesDropdown1 = '[qid="tDashboard-47"]'

    //Functions/Actions

    loginIntoC1(usernameC1,passwordC1){
        cy.get(this.loginButton).click()
        cy.get(this.usernameField).type(usernameC1)
        cy.get(this.passwordField).type(passwordC1)
        cy.get(this.login).click()
    }

    goToLibrary(){
        cy.get(this.myLibraryTab).click()        
    }

    searchAndLaunchProduct(umbrellaUniqueCode){
        cy.get(this.searchBox).type(`${umbrellaUniqueCode}{enter}`);
        const selector = getSelector(umbrellaUniqueCode)
            function getSelector(UMBRELLNAME){
                return `//*[@qid="t-lib-s-dd-1"]//*[text()="${UMBRELLNAME}"]`
            }
        cy.xpath(selector).scrollIntoView().click(); //Select product            
        cy.xpath(this.showMoreLink).click();
        cy.get(this.viewDetailsLink).click()
        cy.get(this.component).click()
        cy.get(this.psActivity).should('be.visible')
    }   
    
    waitForEndedClassesDropdown(env){
        if(env=='rel' || env=='prod'){
            cy.get(this.endedClassesDropdown1).should('be.visible')            
        }
        else{
            cy.get(this.endedClassesDropdown).should('be.visible')            
        }        
    }

    launchComponentOnProductDetailsPage(env){
        if(env=='rel' || env=='prod'){            
            cy.get(this.component1).should('be.visible').click();
            cy.get(this.psActivity).should('be.visible')
        }
        else{
            cy.get(this.component).should('be.visible').click();
            cy.get(this.psActivity).should('be.visible')            
        }        
    }
}
export default c1Page;