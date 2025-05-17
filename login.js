const usernameInput = document.getElementById("username");
const usernameErrorDisplay = document.getElementById("usernameError");
const passwordInput = document.getElementById("password");
const passwordErrorDisplay = document.getElementById("passwordError");
const loginButton = document.getElementById("submit");
const rememberMeCheckbox = document.getElementById("rememberMe");

let usernameSave = "";

window.onload = function() {
    usernameInput.focus();
    usernameInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            passwordInput.focus();
        }
    });

    passwordInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            loginButton.click();
        }
    });

    usernameInput.textContent = "";
    passwordInput.textContent = "";
    usernameErrorDisplay.textContent = "";
    passwordErrorDisplay.textContent = "";
    usernameInput.value = "";
    passwordInput.value = "";

    // check if the username is saved in cookies
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
    }, {});
    if (cookies.username) {
        usernameInput.value = cookies.username;
        rememberMeCheckbox.checked = true;
    } else {
        rememberMeCheckbox.checked = false;
    }
}

loginButton.addEventListener("click", function() {
    // Clear previous error messages
    usernameErrorDisplay.textContent = "";
    passwordErrorDisplay.textContent = "";

    const username = usernameInput.value;
    const password = passwordInput.value;

    // at least 8 characters, contains at least: 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // at least 6 characters
    const userRegex = /^[a-zA-Z0-9]{6,}$/;

    try {
        if (!username) {
            throw new Error("Username is required");
        }

        if (!userRegex.test(username)) {
            throw new Error("Username must be at least 6 characters long and can only contain letters and numbers");
        }
    } catch (error) {
        usernameErrorDisplay.textContent = error.message;
    }

    try {
        if (!password) {
            throw new Error("Password is required");
        }

        if (!passRegex.test(password)) {
            throw new Error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
        }
    } catch (error) {
        passwordErrorDisplay.textContent = error.message;
    }

    // if there are no errors, save the username and password to cookies in an encrypted object, then redirect to the notes page
    if (username && password && userRegex.test(username) && passRegex.test(password)) {
        const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
            const [name, value] = cookie.split('=');
            acc[name] = value;
            return acc;
        }, {});

        let users = [];
        if (cookies.user) {
            users = JSON.parse(atob(cookies.user));
        }

        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            if (existingUser.password === password) {
                usernameSave = username;
                rememberMe();

                // save cookie of the location of the user of logged in user in the array of users
                const userIndex = users.indexOf(existingUser);
                document.cookie = `userIndex=${userIndex}; path=/; max-age=604800`;

                window.location.href = "notes.html";
                return;
            } else {
                passwordErrorDisplay.textContent = "Incorrect password";
                console.log("Incorrect password");
                return;
            }
        }

        users.push({ username, password });
        document.cookie = `user=${btoa(JSON.stringify(users))}; path=/; max-age=604800`;
        usernameSave = username;

        // save cookie of the location of the user of logged in user in the array of users
        const userIndex = users.indexOf(existingUser);
        document.cookie = `userIndex=${userIndex}; path=/; max-age=604800`;

        rememberMe();
        window.location.href = "notes.html";
    }
});

function rememberMe() {
    if (rememberMeCheckbox.checked) {
        // save the username to cookies
        document.cookie = `username=${usernameInput.value}; path=/; max-age=604800`;
    } else {
        // delete the username from cookies
        document.cookie = `username=; path=/; max-age=0`;
    }
}