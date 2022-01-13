import { Selector } from "testcafe";
import { signup, login, mobileNav, userConfirmation } from "./helper";
import { User, newUser, userWithoutLName } from "./credentials";



fixture `Signup test`
    .page `https://www.edclub.com/signup`;

test('A user cannot signup without providing first name.', async t => {
    let user = new User(newUser.userName, "", "altest", "penny.2022");
    await signup({user, t});
    await t.expect(Selector("form > div:nth-of-type(1) > .inline-error").innerText).eql("Please provide first name.");
});

test('A user cannot signup without providing a password.', async t => {
    let user = new User(newUser.userName, "test", "altest", "");
    await signup({user, t});
    await t.expect(Selector("div:nth-of-type(4) > .inline-error").innerText).eql("Please enter a password.");
});

test('A user cannot signup without providing first name and password.', async t => {
    let user = new User(newUser.userName, "", "altest", "");
    await signup({user, t});
    await t
        .expect(Selector("form > div:nth-of-type(1) > .inline-error").innerText).eql("Please provide first name.")
        .expect(Selector("div:nth-of-type(4) > .inline-error").innerText).eql("Please enter a password.");
});

test('A user cannot signup without providing a username', async t => {
    let user = new User("", "test", "altest", "penny.2022");
    await signup({user, t});
    await t.expect(Selector("div:nth-of-type(3) > .inline-error").innerText).eql("Please provide a username or email address.");
});

test('A user cannot signup without providing username and password', async t => {
    let user = new User("", "test", "altest", "");
    await signup({user, t});
    await t
        .expect(Selector("div:nth-of-type(4) > .inline-error").innerText).eql("Please enter a password.")
        .expect(Selector("div:nth-of-type(3) > .inline-error").innerText).eql("Please provide a username or email address.");
});

test('A user cannot signup without providing username and first name', async t => {
    let user = new User("", "", "altest", "penny.2022");
    await signup({user, t});
    await t
        .expect(Selector("form > div:nth-of-type(1) > .inline-error").innerText).eql("Please provide first name.")
        .expect(Selector("div:nth-of-type(3) > .inline-error").innerText).eql("Please provide a username or email address.");
});

test('A user can signup successfully', async t => {
    await signup({user:newUser, t});
    await userConfirmation({user:newUser, t}); 
});

test('A user can signup successfully without providing last name.', async t =>{
    await signup({user:userWithoutLName, t});
    await userConfirmation({user:userWithoutLName, t});
});
    
test('A user cannot signup with an existing username', async t => {
    await signup({user:newUser, t});
    await t.expect(Selector(".form-error-message").innerText).eql("That username/email is taken. Try another.");
});



test('A user cannot signup without providing any information', async t => {
    let user = new User("", "", "", "");
    await signup({user, t});
    await t
        .expect(Selector("form > div:nth-of-type(1) > .inline-error").innerText).eql("Please provide first name.")
        .expect(Selector("div:nth-of-type(3) > .inline-error").innerText).eql("Please provide a username or email address.")
        .expect(Selector("div:nth-of-type(4) > .inline-error").innerText).eql("Please enter a password.");
});



fixture `log In test`
    .page `https://www.edclub.com/signin`;

   
test('A user can login successfully', async t => {
    await login({
        userName: newUser.userName,
        pwd: newUser.pwd,
        t
    });
    await mobileNav(t);
    await userConfirmation({user:newUser, t});      
});

test('A user cannot login if he/she enter the wrong password', async t => {
    await login({
        userName:newUser.userName,
        pwd:"123123",
        t
    });
    await t.expect(Selector(".form-error-message").innerText).eql("Username and/or Password is wrong.");
});


fixture `log out test`
    .page `https://www.edclub.com/signin`;

test('A loged in user can successfully log out', async t => {
    await login({
        userName: newUser.userName,
        pwd: newUser.pwd,
        t
    });
    await mobileNav(t);
    await t
        .click(Selector("[tabindex='34']"))
        .click(Selector("[tabindex='39']")) //logout
        .expect(Selector("h1").innerText).eql("Learn, teach, create!");
});
