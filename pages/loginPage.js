import {t, Selector } from 'testcafe';

export default class loginPage {
    constructor () {
        this.userName = Selector('#user-name');
        this.passWord = Selector('#password');
        this.loginButton = Selector('#login-button');
        this.loginInvalidMessage = Selector('h3[data-test="error"]')
    }


    async login(user, password) {
        await t
              .typeText(this.userName, user)
              .typeText(this.passWord, password)
              .click(this.loginButton)
    }

}