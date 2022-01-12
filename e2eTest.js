import { Selector } from "testcafe";
import { login, mobileNav, userConfirmation } from "./helper";
import { oldUser } from "./credentials";


fixture `log In test`
    .page `https://www.edclub.com/signin`;

   
test('A user can login successfully', async t => {
    await login({
        userName: oldUser.userName,
        pwd: oldUser.pwd,
        t
    });
    await mobileNav(t);
    await t
        .click(Selector("[tabindex='34']")) 
        .click(Selector("[tabindex='35']")); // profile
    await userConfirmation({
        user:oldUser,
        t
    });      
});

test('A user cannot login if he/she enter the wrong password', async t => {
    await login({
        userName:oldUser.userName,
        pwd:"123123",
        t
    });
    await t.expect(Selector(".form-error-message").innerText).eql("Username and/or Password is wrong.");
});


fixture `log out test`
    .page `https://www.edclub.com/signin`;

test('A loged in user can successfully log out', async t => {
    await login({
        userName: oldUser.userName,
        pwd: oldUser.pwd,
        t
    });
    await mobileNav(t);
    await t
        .click(Selector("[tabindex='34']"))
        .click(Selector("[tabindex='39']"))
        .expect(Selector("h1").innerText).eql("Learn, teach, create!");
});
