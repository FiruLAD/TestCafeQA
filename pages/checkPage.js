import {Selector } from 'testcafe';

export default class cartPage {
    constructor () {
        this.checkHeader = Selector('.title');
        this.finishButton = Selector('#finish');
        this.orderfinishBanner = Selector('.complete-header');

    }




}