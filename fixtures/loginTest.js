import loginPage from '../pages/loginPage'
import productsPage from '../pages/productsPage'
import { CREDENTIALS } from '../data/constants'
import { LOGIN_ERROR_MESSAGES } from '../data/constants'



const loginpage = new loginPage()
const productspage = new productsPage()




fixture`Login Feature Testing`
    .page `https://www.saucedemo.com/`;

test('Login with a valid user', async t => {
    await loginpage.login(CREDENTIALS.VALID_USERS.USERNAMES, CREDENTIALS.VALID_USERS.PASSWORD)
    await t.expect(productspage.productsHeader.exists).ok()
    await t.expect(productspage.productsHeader.innerText).eql('PRODUCTS')

});



test('Login with an invalid user', async t => {
    await loginpage.login(CREDENTIALS.INVALID_USERS.USERNAMES, CREDENTIALS.INVALID_USERS.PASSWORDS);
    await t.expect(loginpage.loginInvalidMessage.exists).ok()
    await t.expect(loginpage.loginInvalidMessage.innerText).eql(LOGIN_ERROR_MESSAGES.ERROR_MESSAGES)
});




