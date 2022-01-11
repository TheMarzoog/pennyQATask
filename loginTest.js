import { Selector } from "testcafe";


fixture `log In test`
    .page `https://www.reddit.com/login/?dest=https%3A%2F%2Fwww.reddit.com%2F`;

const userNameTxt = Selector("#loginUsername");
const pwdTxt = Selector("#loginPassword");
const loginBtn = Selector(".m-full-width");

const userName = "";
const pwd = "";

//TODO: Create a helper fuction for login.


test('A user can login successfully', async t => {
    await t
        .typeText(userNameTxt, userName, {paste:true})
        .typeText(pwdTxt, pwd, {paste:true})
        .click(loginBtn)
        .expect(Selector("._2BMnTatQ5gjKGK5OWROgaG").exists).ok();      
});

test('A user cannot login if he/she enter the wrong password', async t => {
    await t
        .typeText(userNameTxt, userName, {paste:true})
        .typeText(pwdTxt, "123456", {paste:true})
        .click(loginBtn)
        .expect(Selector(".login > .AnimatedForm__errorMessage").exists).ok();
});

