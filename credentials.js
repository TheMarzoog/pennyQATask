export class User{
    constructor(userName, firstName, lastName, pwd){
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pwd = pwd
    }
}


export const oldUser = new User("testqap", "test", "altest", "penny.2022");


export const newUser = new User("testpqa3", "test", "altest", "penny.2022");


