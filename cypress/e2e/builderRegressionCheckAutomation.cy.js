/// <reference types="Cypress" />
import dashboardPage from "./pages/dashboardPage";
import loginPage from "./pages/loginPage";
import umbrellaListPage from "./pages/umbrellaListPage";
import umbrellaDetailsPage from "./pages/umbrellaDetailsPage";
import componentsListPage from "./pages/componentsListPage";
import componentDetailsPage from "./pages/componentDetailsPage";
import c1PreviewPage from "./pages/c1PreviewPage";

describe('Builder Regression Test',function(){

    //Adding global data
    var umbrellaUniqueCode = "cqa_umbrella_"+Math.random().toString(36).substring(2, 8); //Generate unique umbrella code
    var peUniqueCode = "cqa_pe_"+Math.random().toString(36).substring(2, 8); //Generate unique Practice Extra component code
    //var umbrellaUniqueCode = "cqa_umbrella_pi55bk"
    //var peUniqueCode = "cqa_pe_a1cayh"
    // var scorableActivity = "r22_scorableA_V8.zip"
    // var nonScorableActivity = "EV_OP_INT_cqa_non_socorable.zip"
    var environment = "thor"    
    
    beforeEach('Adding code required to be executed before each test',()=>{        
        cy.fixture(environment).then(function(data){
            //this.data=data
            //run on Thor
            cy.visit(data.url, {
            //cy.visit(this.data.url, {
                onBeforeLoad: (win) => {
                win.fetch = null;
                }
            });
            //cy.visit(""); //run on QA
            //cy.visit(""); //run on REL
            var loginPageObject = new loginPage()
            //loginPageObject.loginIntoBuilder(environment,this.data.org,this.data.username,this.data.password); 
            loginPageObject.loginIntoBuilder(environment,data.org,data.username,data.password);         
        })
    })
        

    it('Create an umbrella product with unique code starting from "cqa"', function(){
        
        var dashboardPagePbject = new dashboardPage();
        dashboardPagePbject.clickOptionFromSidebar('Bundles'); //Open Umbrella Products page from Sidebar
        var umbrellaListPageObject = new umbrellaListPage()
        umbrellaListPageObject.createUmbrellaProduct(umbrellaUniqueCode)
        var umbrellaDetailsPageObject = new umbrellaDetailsPage()
        umbrellaDetailsPageObject.openUmbrellaProduct(umbrellaUniqueCode)        
    })

    it('Create a PE component with a unique code starting from "cqa"', function(){  
        
        var dashboardPagePbject = new dashboardPage();
        dashboardPagePbject.clickOptionFromSidebar('Courses');      
        var componentsListPageObject = new componentsListPage();
        componentsListPageObject.clickOnComponentTemplate("Practice Extra")
        componentsListPageObject.enterPracticeExtraDetails(peUniqueCode) //Enter Practice Extra Meta details
        componentsListPageObject.openTheComponent(peUniqueCode)
        var componentDetailsPageObject = new componentDetailsPage();
        componentDetailsPageObject.createLpFolders("Unit 1","Lesson A")
        componentDetailsPageObject.addActivity("Productive Skill","Productive Skill 1")
        cy.fixture(environment).then(function(data){
            componentDetailsPageObject.addActivity("Activity, Scoreable",data.scorableActivity)
            componentDetailsPageObject.addActivity("Activity, Non-Scoreable",data.nonScorableActivity) 
        })
        componentDetailsPageObject.waitForChangesToBeSaved()
    })

    it('Link the component with umbrella', function(){  
        var dashboardPagePbject = new dashboardPage();
        dashboardPagePbject.clickOptionFromSidebar('Bundles'); //Open Umbrella Products page from Sidebar        
        var umbrellaDetailsPageObject = new umbrellaDetailsPage()
        umbrellaDetailsPageObject.openUmbrellaProduct(umbrellaUniqueCode)
        umbrellaDetailsPageObject.linkComponent(peUniqueCode)
    })

    it('Ingest/Promote the component', function(){  
        var dashboardPagePbject = new dashboardPage();
        dashboardPagePbject.clickOptionFromSidebar('Courses');      
        var componentsListPageObject = new componentsListPage();
        componentsListPageObject.openTheComponent(peUniqueCode)
        var componentDetailsPageObject = new componentDetailsPage();       
        componentDetailsPageObject.ingestPromoteComponent()
    })    
})
