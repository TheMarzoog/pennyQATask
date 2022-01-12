import { Selector } from "testcafe";

const userNameTxt = Selector("#email");
const pwdTxt = Selector("#password");
const loginBtn = Selector(".btn-main");


export const login = async({userName, pwd, t}) => {
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
        console.error(error)
    }
}