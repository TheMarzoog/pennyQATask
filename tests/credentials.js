/**
 * This file contains the user credentials for the database by using Uers class.
 * There are two users:
 * 1. newUser - a user with all the required information.
 * 2. userWithoutLName - a user without the last name.
 */


export class User{
    constructor(userName, firstName, lastName, pwd){
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pwd = pwd
    }
}

export const newUser = new User("testpqa27", "test", "altest", "penny.2022");
export const userWithoutLName = new User("testqaq27", "test", "", "penny.2022");


