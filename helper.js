import { Selector } from "testcafe";


export const signup = async({user, t}) => {
    
    const firstNamtTxt = Selector("#firstname");
    const lastNameTxt = Selector("#lastname");
    const userNameTxt = Selector("#email");
    const pwdTxt = Selector("#password");
    const signupBtn = Selector(".btn-main");

    await t
        .click(Selector(".__CC_primary_button")) //Accepting all the cookies
        .typeText(firstNamtTxt, user.firstName, {paste:true})
        .typeText(lastNameTxt, user.lastName, {paste:true})
        .typeText(userNameTxt, user.userName, {paste:true})
        .typeText(pwdTxt, user.pwd, {paste:true})
        .click(signupBtn);
}




export const login = async({userName, pwd, t}) => {
    
    const userNameTxt = Selector("#email");
    const pwdTxt = Selector("#password");
    const loginBtn = Selector(".btn-main");
    
    await t
        .click(Selector(".__CC_primary_button")) //Accepting all the cookies
        .typeText(userNameTxt, userName, {paste:true})
        .typeText(pwdTxt, pwd, {paste:true})
        .click(loginBtn)
};

export const mobileNav = async t => {
    try {
        await t.click(Selector(".navbar-toggle"))
    } catch (error) {
        // no need to log it
        // console.error(error)
    }
}

export const userConfirmation = async({user, t}) => {
    await t
        .click(Selector("[tabindex='34']")) // click on userName to show profile option
        .click(Selector("[tabindex='35']")) // clicking on profile
        .expect(Selector("#username").value).eql(user.userName)
        .expect(Selector("#fname").value).eql(user.firstName)
        .expect(Selector("#lname").value).eql(user.lastName);
}