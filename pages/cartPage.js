import {t, Selector } from 'testcafe';

export default class cartPage {
    constructor () {
        this.checkoutButton = Selector('#checkout');
        this.nameType = Selector('#first-name');
        this.lastNameType = Selector('#last-name');
        this.postalCodeType = Selector('#postal-code');
        this.continueButton = Selector('#continue');
        this.cartHeader = Selector('.title');
        this.productMultipleItemName = Selector('.cart_item')
        this.productItemName = Selector('.inventory_item_name')
        this.errorMessage = Selector('h3[data-test="error"]')





    }


    async orderInformation(name, lastname, postalcode) {
        await t
            .click(this.checkoutButton)
            .typeText(this.nameType, name)
            .typeText(this.lastNameType, lastname)
            if(postalcode !== ''){
            await t.typeText(this.postalCodeType, postalcode)}}





}