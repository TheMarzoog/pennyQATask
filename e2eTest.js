import { Selector } from "testcafe";
import { signup, login, mobileNav, userConfirmation } from "./helper";
import { User, newUser, userWithoutLName } from "./credentials";


/** 
 * the file have three fixtures:
 * 1. signup test - to test the signup functionality using different inputs.
 * 2. login test - to test the login functionality using different inputs.
 * 3. log out test - to test the logout functionality.
*/


fixture `Signup test`
    .page `https://www.edclub.com/signup`;

// Unsuccessful signup with missing values tests.

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

test('A user cannot signup without providing any information', async t => {
    let user = new User("", "", "", "");
    await signup({user, t});
    await t
        .expect(Selector("form > div:nth-of-type(1) > .inline-error").innerText).eql("Please provide first name.")
        .expect(Selector("div:nth-of-type(3) > .inline-error").innerText).eql("Please provide a username or email address.")
        .expect(Selector("div:nth-of-type(4) > .inline-error").innerText).eql("Please enter a password.");
});

// Successful signup tests.

test('A user can signup successfully', async t => {
    await signup({user:newUser, t});
    await userConfirmation({user:newUser, t}); 
});

test('A user can signup successfully without providing last name.', async t =>{
    await signup({user:userWithoutLName, t});
    await userConfirmation({user:userWithoutLName, t});
});
    
// Unsuccessful signup with existing username tests.
test('A user cannot signup with an existing username', async t => {
    await signup({user:newUser, t});
    await t.expect(Selector(".form-error-message").innerText).eql("That username/email is taken. Try another.");
});


fixture `log In test`
    .page `https://www.edclub.com/signin`;

// Successful login test.   
test('A user can login successfully', async t => {
    await login({
        userName: newUser.userName,
        pwd: newUser.pwd,
        t
    });
    await mobileNav(t);
    await userConfirmation({user:newUser, t});      
});


// Unsuccessful login tests with incorrect values.
test('A user cannot login if he/she enter the wrong password', async t => {
    await login({
        userName:newUser.userName,
        pwd:"123123",
        t
    });
    await t.expect(Selector(".form-error-message").innerText).eql("Username and/or Password is wrong.");
});

test('A user cannot login if he/she enter the wrong username', async t => {
    await login({
        userName:"username",
        pwd:newUser.pwd,
        t
    });
    await t.expect(Selector(".form-error-message").innerText).eql("Username and/or Password is wrong.");
});


// Unsuccessful login tests with missing values.
test('A user cannot login without providing username', async t => {
    await login({
        userName:"",
        pwd: newUser.pwd,
        t
    })
    await t.expect(Selector(".inline-error").innerText).eql("Enter username or email address.");
})

test('A user cannot login without providing password', async t => {
    await login({
        userName:newUser.userName,
        pwd: "",
        t
    })
    await t.expect(Selector(".form-error-message").innerText).eql("Username and/or Password is wrong.");
})

test('A user connot login without providing any information', async t => {
    await login({
        userName:"",
        pwd:"",
        t
    })
    await t.expect(Selector(".inline-error").innerText).eql("Enter username or email address.");
});

// Testing the case sensitivity of the username.
test('A user can successfully login with a username with the wrong casing', async t => {
    // changing the casing of the username.
    let userName = "";
    if (newUser.userName.toLowerCase() === newUser.userName) {
        userName = newUser.userName.toUpperCase();
    }
    else if (newUser.userName.toUpperCase() === newUser.userName) {
        userName = newUser.userName.toLowerCase();
    }
    else {
        userName = newUser.userName.toUpperCase();
    }

    await login({
        userName:userName,
        pwd: newUser.pwd,
        t
    });
    await mobileNav(t);
    await userConfirmation({user:newUser, t});
});

// Testing the case sensitivity of the password.
test('A user cannot login with a password with the wrong casing', async t => {
    // changing the casing of the password.
    let pwd = "";
    if (newUser.pwd.toLowerCase() === newUser.pwd) {
        pwd = newUser.pwd.toUpperCase();
    }
    else if (newUser.pwd.toUpperCase() === newUser.pwd) {
        pwd = newUser.pwd.toLowerCase();
    }
    else {
        pwd = newUser.pwd.toUpperCase();
    }

    await login({
        userName:newUser.userName,
        pwd: pwd,
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
        .click(Selector("[tabindex='34']")) //clicking on the username to show the logout button.
        .click(Selector("[tabindex='39']")) //logout
        .expect(Selector("h1").innerText).eql("Learn, teach, create!"); //conformation that the user has logged out.
});
