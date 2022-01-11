import { Selector } from "testcafe";
import { login } from "./helper";


fixture `log In test`
    .page `https://www.reddit.com/login/?dest=https%3A%2F%2Fwww.reddit.com%2F`;

const userName = "";
const pwd = "";    

test('A user can login successfully', async t => {
    await login({userName,pwd,t});
    await t.expect(Selector("._2BMnTatQ5gjKGK5OWROgaG").exists).ok();      
});

test('A user cannot login if he/she enter the wrong password', async t => {
    await login({userName,pwd,t});
    await t.expect(Selector(".login > .AnimatedForm__errorMessage").exists).ok();
});

