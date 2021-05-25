import loginPage from '../pages/loginPage'
import productsPage from '../pages/productsPage'
import cartPage from '../pages/cartPage'
import {CREDENTIALS} from '../data/constants'


const loginpage = new loginPage()
const productspage = new productsPage()
const cartpage = new cartPage()




fixture`Cart Feature Testing`
    .page `https://www.saucedemo.com/`;

test('Navigate to the shopping cart', async t => {
    await loginpage.login(CREDENTIALS.VALID_USERS.USERNAMES, CREDENTIALS.VALID_USERS.PASSWORD)
    await t.expect(productspage.productsHeader.exists).ok()
    await t.expect(productspage.productsHeader.innerText).eql('PRODUCTS')
    await productspage.cartClick()
    await t.expect(cartpage.cartHeader.exists).ok()
    await t.expect(cartpage.cartHeader.innerText).eql('YOUR CART')

});

test('Add a single item to the shopping cart', async t => {
    await loginpage.login(CREDENTIALS.VALID_USERS.USERNAMES, CREDENTIALS.VALID_USERS.PASSWORD)
    await t.expect(productspage.productsHeader.exists).ok()
    await t.expect(productspage.productsHeader.innerText).eql('PRODUCTS')
    let itemRandom = Math.floor(Math.random() * (await productspage.inventoryItems().count))
    const productName = await productspage.productToCart(itemRandom)
    await productspage.cartClick()
    await t.expect(cartpage.productItemName().innerText).eql(productName)

});

test('Add multiple items to the shopping cart', async t => {
    await loginpage.login(CREDENTIALS.VALID_USERS.USERNAMES, CREDENTIALS.VALID_USERS.PASSWORD)
    await t.expect(productspage.productsHeader.exists).ok()
    await t.expect(productspage.productsHeader.innerText).eql('PRODUCTS')
    let i
    let productNames = new Array(6)
    let productName
    let productToSelect = []
    let posProd
    let randomQty = Math.floor(Math.random() * (await productspage.inventoryItems().count))
    for(i=0; i<=randomQty; i++){
        productToSelect[i] = Math.floor(Math.random() * (await productspage.inventoryItems().count) - 2) + 2}
    let dup = [...new Set(productToSelect)];
    let k
    for(k=0; k<=dup.length-1; k++){
        posProd = dup[k]
        productName = await productspage.productToCart(posProd)
        productNames[k] = productName
    }
    await productspage.cartClick()
    let j =0
    for (i = 0; i <= dup.length -1; i++) {
        await t.expect(cartpage.productMultipleItemName().nth(j).find('.inventory_item_name').innerText).eql(productNames[i])
        j = j+1
    }

});