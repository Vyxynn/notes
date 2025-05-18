const usernameInput = document.getElementById("username");
const usernameErrorDisplay = document.getElementById("usernameError");
const passwordInput = document.getElementById("password");
const passwordErrorDisplay = document.getElementById("passwordError");
const rememberMeCheckbox = document.getElementById("rememberMe");
const loginButton = document.getElementById("submit");

window.onload = function() {
    usernameInput.value = "";
    passwordInput.value = "";
    usernameErrorDisplay.innerText = "";
    passwordErrorDisplay.innerText = "";

    // check if the rememberMe cookie exists
    const rememberMeCookie = document.cookie.split('; ').find(x => x.startsWith('rememberMe'));
    if (rememberMeCookie) {
        // if it exists, get the username from the cookie
        const username = rememberMeCookie.split('=')[1];
        usernameInput.value = username;
        rememberMeCheckbox.checked = true;
    } else {
        // if it does not exist, set the checkbox to false
        rememberMeCheckbox.checked = false;
    }
}

loginButton.addEventListener("click", function(event) {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    usernameErrorDisplay.innerText = validateUsername(username);
    passwordErrorDisplay.innerText = validatePassword(password);

    if (usernameErrorDisplay.innerText === "" && passwordErrorDisplay.innerText === "") {
        // store the username to localStorage called 'usernameDisplay'
        localStorage.setItem('usernameDisplay', username);

        // get the usernames and passwords from cookies
        let encryptedUsernames = document.cookie.split('; ').find(x => x.startsWith('usernames'))?.split('=')[1];
        let encryptedPasswords = document.cookie.split('; ').find(x => x.startsWith('passwords'))?.split('=')[1];
        let usernames = encryptedUsernames ? JSON.parse(atob(encryptedUsernames)) : [];
        let passwords = encryptedPasswords ? JSON.parse(atob(encryptedPasswords)) : [];

        // if the cookies exist, check if the username is already in the list
        if (usernames && passwords) {
            const userIndex = usernames.indexOf(username);
            if (userIndex !== -1) {
                // if the username is already in the list, check if the password matches
                if (passwords[userIndex] === password) {
                    // if the password matches, redirect to the notes page
                    rememberMeSave();
                    window.location.href = "notes.html";
                } else {
                    // if the password does not match, show an error message
                    passwordErrorDisplay.innerText = "Incorrect password";
                }
            } else {
                // if the username is not in the list, add it to the list
                usernames.push(username);
                passwords.push(password);
                rememberMeSave();

                // encrypt the usernames and passwords
                encryptedUsernames = btoa(JSON.stringify(usernames));
                encryptedPasswords = btoa(JSON.stringify(passwords));

                // set the cookies with the encrypted usernames and passwords
                document.cookie = `usernames=${encryptedUsernames}; max-age=31536000; path=/`;
                document.cookie = `passwords=${encryptedPasswords}; max-age=31536000; path=/`;

                // redirect to the notes page
                window.location.href = "notes.html";
            }
        }
    }
});

function validateUsername(username) {
    // regex to check if username is at least 6 characters long
    const usernameRegex = /^[a-zA-Z0-9]{6,}$/;

    try {
        if (!username) {
            throw new Error("No username provided");
        }

        if (!usernameRegex.test(username)) {
            throw new Error("Username must be at least 6 characters long and can only contain letters and numbers");
        }
    } catch (error) {
        return error.message;
    }
    return "";
}

function validatePassword(password) {
    // regex to check if password is at least 8 characters long, contains at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    try {
        if (!password) {
            throw new Error("No password provided");
        }

        if (!passwordRegex.test(password)) {
            throw new Error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
        }
    } catch (error) {
        return error.message;
    }
    return "";
}

function rememberMeSave() {
    if (rememberMeCheckbox.checked) {
        // save the username to cookies called 'rememberMe', not encrypted
        const username = usernameInput.value;
        document.cookie = `rememberMe=${username}; max-age=31536000; path=/`;
    } else {
        // delete the cookie
        document.cookie = "rememberMe=; max-age=0; path=/";
    }
}