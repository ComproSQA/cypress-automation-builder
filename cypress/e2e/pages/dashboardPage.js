class dashboardPage{

    //Elements on the page

    showHideSidebarMenu = '.hidden-sm'
    productsOption = ':nth-child(2) > .collapsed'
    umbrellaProductsOption = '#sidebar-products > :nth-child(2) > .ng-binding'

    //Functions/Actions

    clickOptionFromSidebar(option){
        cy.get(this.showHideSidebarMenu).click(); //Show sidebar
        cy.get(this.productsOption).click(); //Open Products option
        function getSelector(optionToBeSelected){
            return `#sidebar-products [data-title='${optionToBeSelected}']`
        }
        const selector = getSelector(option)
        cy.get(selector).click(); //Open Umbrella Products page
        //cy.get(this.umbrellaProductsOption).click(); //Open Umbrella Products page
        cy.get(this.showHideSidebarMenu).click(); //Hide sidebar
    }
    

}
export default dashboardPage;