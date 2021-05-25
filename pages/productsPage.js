import {t, Selector } from 'testcafe';

export default class productsPage {
    constructor () {
        this.productsHeader = Selector('.title');
        this.burgerButton = Selector('#react-burger-menu-btn')
        this.logoutButton = Selector('#logout_sidebar_link')
        this.loginButton = Selector('#login-button');
        this.cartProductsItems = Selector('#shopping_cart_container');
        this.inventoryItems = Selector(".inventory_item");

    }


    async logout() {
        await t
              .click(this.burgerButton)
              .click(this.logoutButton)
              .expect(this.loginButton.exists).ok();
    }


      async cartClick() {
                 await t
                 .click(this.cartProductsItems);
}


       async productToCart(product) {
           const productToSelect = Selector('.inventory_item').nth(product).find('button')
           const productToSelectName = Selector('.inventory_item_name').nth(product)
           await t
               .click(productToSelect)

           return productToSelectName.innerText
    }


}