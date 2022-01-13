# Summery: 
There are 19 test cases.
1. A user cannot signup without providing first name.
2. A user cannot signup without providing a password.
3. A user cannot signup without providing first name and password.
4. A user cannot signup without providing a username.
5. A user cannot signup without providing username and password.
6. A user cannot signup without providing username and first name.
7. A user cannot signup without providing any information.
8. A user can signup successfully.
9. A user can signup successfully without providing last name.
10. A user cannot signup with an existing username.
11. A user can login successfully.
12. A user cannot login if he/she enter the wrong password.
13. A user cannot login if he/she enter the wrong username.
14. A user cannot login without providing username.
15. A user cannot login without providing password.
16. A user connot login without providing any information.
17. A user can successfully login with a username with the wrong casing.
18. A user cannot login with a password with the wrong casing.
19. A loged in user can successfully log out.

All the test will pass given a two new usernames expept A user cannot login with a password with the wrong casing. It turns out that the password field is case insensitive. were it should be case sensitive.

# File Descrptions:
1. `e2eTest.js` - End to end test for the application for signup, login, and logout.
2. `helpers.js` - Helper functions for the test.
3. `credentials.js` - Contains user credentials for the test.