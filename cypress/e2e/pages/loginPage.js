class loginPage{

    //Elements on the page

    builderLoginOrg = '.login-section .form-control' //builder org login field
    loginButton1 = '.btn-inverse' //login button on builder org page
    username = '#login-user'
    password = '#login-pass'
    loginButton2 = '#login-mfa-btn' //login button


    //Functions/Actions

    loginIntoBuilder(env,org,username,password){
        if(env=="thor"){
            cy.get(this.builderLoginOrg, { timeout: 10000 }).should('be.enabled').should('be.visible').type(org); //Enter builder login org
            cy.get(this.loginButton1).click(); //Click on login button
            //cy.visit('https://asgard-thor-assets.comprodls.com/builder-identity/index.html?client=CUP_BUILDER&redirectSignIn=https%3A%2F%2Fasgard-thor-builder.comprodls.com%2F&page=signin', { failOnStatusCode: false })
            cy.get(this.username).should('be.visible').then(($result)=>{
                cy.get(this.username).type(username) //Enter username
            })
            cy.get(this.password).type(password) //Enter password
            cy.get(this.loginButton2).click(); //Click on login button
        }
        else{
            cy.get(this.loginButton1).click(); //Click on login button
            //cy.visit('https://asgard-thor-assets.comprodls.com/builder-identity/index.html?client=CUP_BUILDER&redirectSignIn=https%3A%2F%2Fasgard-thor-builder.comprodls.com%2F&page=signin', { failOnStatusCode: false })
            cy.get(this.username).should('be.visible').then(($result)=>{
                cy.get(this.username).type(username) //Enter username
            })
            cy.get(this.password).type(password) //Enter password
            cy.get(this.loginButton2).click(); //Click on login button
        }
        
    }

}
export default loginPage;