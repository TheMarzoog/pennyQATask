import { Selector } from "testcafe";
import { login } from "./helper";


const userName = "";
const pwd = ""; 


fixture `log In test`
    .page `https://www.reddit.com/login/?dest=https%3A%2F%2Fwww.reddit.com%2F`;

   
test('A user can login successfully', async t => {
    await login({userName, pwd, t});
    await t.expect(Selector("._2BMnTatQ5gjKGK5OWROgaG").exists).ok();      
});

test('A user cannot login if he/she enter the wrong password', async t => {
    await login({userName,pwd:"123123",t});
    await t.expect(Selector(".login > .AnimatedForm__errorMessage").innerText).eql("Incorrect username or password");
});


fixture `log out test`
    .page `https://www.reddit.com/login/?dest=https%3A%2F%2Fwww.reddit.com%2F`;

// TODO: fix the bug
test('A loged in user can successfully log out', async t => {
    await login({userName, pwd, t});
    await t
        .click(Selector(".-z42jjKOFdAdFhdJ8mmI4 [alt='User avatar']"))
        .click(Selector("body > div:nth-child(61) > div > a:nth-child(20)")) // clicking log out btn
        .expect(Selector("._2tU8R9NTqhvBrhoNAXWWcP").innerText).eql("Lon In"); // conforming the log out

});
