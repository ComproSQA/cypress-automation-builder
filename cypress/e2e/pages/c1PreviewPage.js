class c1PreviewPage{

    //Elements on the page

     activityLaunchArea = '#activityLaunch'

    //Functions/Actions

    previewComponentInC1(env,peUniqueCode,c1Env){
        if(env=='QA'){
            //cy.get(this.qaPreviewLink).click()
        }
        else if(env=='Stg'){
            //cy.get(this.stgPreviewLink).click()
        }
        else{
            //cy.get(this.prodPreviewLink).click()
            if(c1Env=='thor'){
                cy.visit(`https://micro-nemo.comprodls.com/learning-path/teacher/preview?productcode=${peUniqueCode}&stage=final`)
            }
            else if(c1Env=='qa'){
                cy.visit(`https://qa.cambridgeone.org/learning-path/teacher/preview?productcode=${peUniqueCode}&stage=final`)
            }    
            else if(c1Env=='rel'){
                cy.visit(`https://release.cambridgeone.org/learning-path/teacher/preview?productcode=${peUniqueCode}&stage=final`)
            }       
            else{
                cy.visit(`https://cambridgeone.org/learning-path/teacher/preview?productcode=${peUniqueCode}&stage=final`)
            }     
            // Verify that the navigation occurred
            cy.url().should('include', peUniqueCode);
            cy.get(this.activityLaunchArea).should('be.visible')
        }        
    }
            
}
export default c1PreviewPage;