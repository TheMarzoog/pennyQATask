import { Selector } from "testcafe";

// The file contains four helper functions: signup, login, mobileNav and userConfirmation.


export const signup = async({user, t}) => {

    /**
     * This function is used to signup a user.
     * @param {User} user - a User object that contains the user information.
     * @param {TestController} t - a TestController object.
     */
    
    //Selecting the nessesary elements.
    const firstNamtTxt = Selector("#firstname");
    const lastNameTxt = Selector("#lastname");
    const userNameTxt = Selector("#email");
    const pwdTxt = Selector("#password");
    const signupBtn = Selector(".btn-main");

    //Accepting all the cookies
    try{
        await t.click(Selector(".__CC_primary_button")); 
    }catch(e){
        console.log("No cookies found");
    }

    //Entering the user information if it is provided.
    if(user.firstName.length > 0) await t.typeText(firstNamtTxt, user.firstName, {paste:true});
    if(user.lastName.length > 0) await t.typeText(lastNameTxt, user.lastName, {paste:true});
    if(user.userName.length > 0) await t.typeText(userNameTxt, user.userName, {paste:true});
    if(user.pwd.length > 0) await t.typeText(pwdTxt, user.pwd, {paste:true});
    
    //Clicking the signup button.
    await t.click(signupBtn);
};


export const login = async({userName, pwd, t}) => {
    /**
     * This function is used to login a user.
     * @param {String} userName - a string that contains the user name.
     * @param {String} pwd - a string that contains the password.
     */
    
    //Selecting the nessesary elements.
    const userNameTxt = Selector("#email");
    const pwdTxt = Selector("#password");
    const loginBtn = Selector(".btn-main");
    
    //Accepting all the cookies
    try{
        await t.click(Selector(".__CC_primary_button")); 
    }catch(e){
        console.log("No cookies found");
    }

    //Entering the user information if it is provided.
    if(userName.length > 0) await t.typeText(userNameTxt, userName, {paste:true});
    if(pwd.length > 0) await t.typeText(pwdTxt, pwd, {paste:true});

    //Clicking the login button.
    await t.click(loginBtn);
};

export const mobileNav = async t => {
    /**
     * This function is used to open the mobile navigation.
     * @param {TestController} t - a TestController object.
     */
    try {
        await t.click(Selector(".navbar-toggle"))
    } catch (e) {
        console.log("No mobile nav found");
    }
};

export const userConfirmation = async({user, t}) => {
    /**
     * This function is used to confirm the user information.
     * @param {User} user - a User object that contains the user information.
     * @param {TestController} t - a TestController object.
     */
    await t
        .click(Selector("[tabindex='34']")) //click on userName to show profile option
        .click(Selector("[tabindex='35']")) //clicking on profile
        //checking the user information.
        .expect(Selector("#username").value).eql(user.userName)
        .expect(Selector("#fname").value).eql(user.firstName)
        .expect(Selector("#lname").value).eql(user.lastName);
};