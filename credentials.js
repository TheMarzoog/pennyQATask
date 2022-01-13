export class User{
    constructor(userName, firstName, lastName, pwd){
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pwd = pwd
    }
}

export const newUser = new User("testpqa17", "test", "altest", "penny.2022");
export const userWithoutLName = new User("testqaq17", "test", "", "penny.2022");


