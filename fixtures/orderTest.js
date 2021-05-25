import loginPage from '../pages/loginPage'
import productsPage from '../pages/productsPage'
import cartPage from '../pages/cartPage'
import checkPage from '../pages/checkPage'
import {CREDENTIALS, ORDERINFO, ORDERINFO_ERROR_MESSAGES} from '../data/constants'


const loginpage = new loginPage()
const productspage = new productsPage()
const cartpage = new cartPage()
const checkpage = new checkPage()




fixture`Order Feature Testing`
    .page `https://www.saucedemo.com/`;

 test('Continue with missing mail information', async t => {
     await loginpage.login(CREDENTIALS.VALID_USERS.USERNAMES, CREDENTIALS.VALID_USERS.PASSWORD)
     await t.expect(productspage.productsHeader.exists).ok()
     await t.expect(productspage.productsHeader.innerText).eql('PRODUCTS')
     await productspage.productToCart(1)
     await productspage.cartClick()
     await cartpage.orderInformation(ORDERINFO.VALID_ORDERINFO.FIRSTNAME, ORDERINFO.VALID_ORDERINFO.LASTNAME, ORDERINFO.INVALID_ORDERINFO.POSTALCODES)
     await t.click(cartpage.continueButton)
     await t.expect(cartpage.errorMessage.exists).ok()
     await t.expect(cartpage.errorMessage.innerText).eql(ORDERINFO_ERROR_MESSAGES.ERROR_MESSAGES)

 });

test('Fill user´s information', async t => {
    await loginpage.login(CREDENTIALS.VALID_USERS.USERNAMES, CREDENTIALS.VALID_USERS.PASSWORD)
    await t.expect(productspage.productsHeader.exists).ok()
    await t.expect(productspage.productsHeader.innerText).eql('PRODUCTS')
    await productspage.productToCart(1)
    await productspage.cartClick()
    await cartpage.orderInformation(ORDERINFO.VALID_ORDERINFO.FIRSTNAME, ORDERINFO.VALID_ORDERINFO.LASTNAME, ORDERINFO.VALID_ORDERINFO.POSTALCODE)
    await t.click(cartpage.continueButton)
    await t.expect(checkpage.checkHeader.innerText).eql('CHECKOUT: OVERVIEW')

});

test('Final order items', async t => {
    await loginpage.login(CREDENTIALS.VALID_USERS.USERNAMES, CREDENTIALS.VALID_USERS.PASSWORD)
    await t.expect(productspage.productsHeader.exists).ok()
    await t.expect(productspage.productsHeader.innerText).eql('PRODUCTS')
    let i
    let productNames = new Array(6)
    let productName
    let productToSelect = []
    let posProd
    let randomQty = Math.floor(Math.random() * (await productspage.inventoryItems().count))
    for (i = 0; i <= randomQty; i++) {
        productToSelect[i] = Math.floor(Math.random() * (await productspage.inventoryItems().count) - 2) + 2
    }
    let dup = [...new Set(productToSelect)];
    let k
    for (k = 0; k <= dup.length - 1; k++) {
        posProd = dup[k]
        productName = await productspage.productToCart(posProd)
        productNames[k] = productName
    }
    await productspage.cartClick()
    await cartpage.orderInformation(ORDERINFO.VALID_ORDERINFO.FIRSTNAME, ORDERINFO.VALID_ORDERINFO.LASTNAME, ORDERINFO.VALID_ORDERINFO.POSTALCODE)
    await t.click(cartpage.continueButton)
    let j = 0
    for (i = 0; i <= dup.length -1; i++) {
        await t.expect(cartpage.productMultipleItemName().nth(j).find('.inventory_item_name').innerText).eql(productNames[i])
        j = j + 1
    }
});

test('Complete a purchase', async t => {
    await loginpage.login(CREDENTIALS.VALID_USERS.USERNAMES, CREDENTIALS.VALID_USERS.PASSWORD)
    await t.expect(productspage.productsHeader.exists).ok()
    await t.expect(productspage.productsHeader.innerText).eql('PRODUCTS')
    await productspage.productToCart(1)
    await productspage.cartClick()
    await cartpage.orderInformation(ORDERINFO.VALID_ORDERINFO.FIRSTNAME, ORDERINFO.VALID_ORDERINFO.LASTNAME, ORDERINFO.VALID_ORDERINFO.POSTALCODE)
    await t.click(cartpage.continueButton)
    await t.expect(checkpage.checkHeader.innerText).eql('CHECKOUT: OVERVIEW')
    await t.click(checkpage.finishButton())
    await t.expect(checkpage.orderfinishBanner.exists).ok()
    await t.expect(checkpage.orderfinishBanner.innerText).eql('THANK YOU FOR YOUR ORDER')

});

