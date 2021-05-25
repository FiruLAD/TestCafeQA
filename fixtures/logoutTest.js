import loginPage from '../pages/loginPage'
import productsPage from '../pages/productsPage'
import { CREDENTIALS } from '../data/constants'



const loginpage = new loginPage()
const productspage = new productsPage()




fixture`Logout Feature Testing`
    .page `https://www.saucedemo.com/`;

test('Logout from the home page', async t => {
    await loginpage.login(CREDENTIALS.VALID_USERS.USERNAMES, CREDENTIALS.VALID_USERS.PASSWORD)
    await t.expect(productspage.productsHeader.exists).ok()
    await t.expect(productspage.productsHeader.innerText).eql('PRODUCTS')
    await productspage.logout();
    await t.expect(loginpage.loginButton.exists).ok()


});