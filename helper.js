import { Selector } from "testcafe";

const userNameTxt = Selector("#loginUsername");
const pwdTxt = Selector("#loginPassword");
const loginBtn = Selector(".m-full-width");


export const login = async({userName, pwd, t}) => {
    await t
        .typeText(userNameTxt, userName, {paste:true})
        .typeText(pwdTxt, pwd, {paste:true})
        .click(loginBtn)
};