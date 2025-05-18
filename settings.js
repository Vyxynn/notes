const settingsButton = document.getElementById('settingsButton');

settingsButton.addEventListener('click', function() {
    const popup = document.createElement('div');
    popup.className = 'popup';
    
    popup.style.display = 'block';

    const blur = document.createElement('div');
    blur.className = 'blur';
    blur.style.display = 'block';

    let popupContent;
    popupContent = `
    <h2>Settings</h2>

    <div class="profile">
        <h3>Profile</h3>
        <div class="profileInfo">
            <label for="username">Username: <span id="usernameDisplay"></span></label>

            <div class="profileInputContainer"></div>

            <div class="profileButtons">
                <button id="changeUsername">Change Username</button>
                <button id="changePassword">Change Password</button>
                <button id="deleteAccount">Delete Account</button>
            </div>
        </div>
    </div>

    <div class="theme">
        <h3>Theme</h3>
        <div class="themeOptions">
            <label for="lightTheme">Light</label>
            <input type="radio" id="lightTheme" name="theme" value="light">
            <label for="darkTheme">Dark</label>
            <input type="radio" id="darkTheme" name="theme" value="dark">
        </div>
    </div>

    <div class="settingsButtons">
        <button id="closePopup">Close</button>
    </div>
    `;

    popup.innerHTML = popupContent;

    const usernameDisplay = popup.querySelector('#usernameDisplay');

    // Get the username from localStorage
    const username = localStorage.getItem('usernameDisplay');
    if (username) {
        usernameDisplay.innerText = username;
    } else {
        usernameDisplay.innerText = 'No username found';
    }

    const lightThemeRadio = popup.querySelector('#lightTheme');
    const darkThemeRadio = popup.querySelector('#darkTheme');

    // Get the theme from localStorage
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        lightThemeRadio.checked = true;
    } else if (theme === 'dark') {
        darkThemeRadio.checked = true;
    }

    lightThemeRadio.addEventListener('change', function() {
        if (lightThemeRadio.checked) {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    });

    darkThemeRadio.addEventListener('change', function() {
        if (darkThemeRadio.checked) {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Close popup button
    const closePopupButton = popup.querySelector('#closePopup');
    closePopupButton.addEventListener('click', function() {
        popup.style.display = 'none';
        blur.style.display = 'none';
        document.body.removeChild(blur);
        document.body.removeChild(popup);
    });

    const profileInputContainer = popup.querySelector('.profileInputContainer');

    // Change username button
    const changeUsernameButton = popup.querySelector('#changeUsername');
    changeUsernameButton.addEventListener('click', function() {
        const html = `
        <label for="newUsername">New Username:</label>
        <input type="text" id="newUsername" placeholder="Enter new username">
        <button id="saveUsername">Save</button>
        <button id="cancelUsername">Cancel</button>

        <div class="errorContainer">
            <p class="error" id="usernameError"></p>
        </div>
        `;

        profileInputContainer.innerHTML = html;

        // Save username button
        const saveUsernameButton = profileInputContainer.querySelector('#saveUsername');
        saveUsernameButton.addEventListener('click', function() {
            const newUsername = profileInputContainer.querySelector('#newUsername').value;
            
            const usernameErrorDisplay = profileInputContainer.querySelector('#usernameError');
            usernameErrorDisplay.innerText = validateUsername(newUsername);

            // If no error, save the new username
            if (usernameErrorDisplay.innerHTML === "") {
                let username = localStorage.getItem('usernameDisplay');

                // update the username in the rememberMe cookie
                const rememberMeCookie = document.cookie.split('; ').find(x => x.startsWith('rememberMe'));
                if (rememberMeCookie) {
                    document.cookie = `rememberMe=${newUsername}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
                }

                // update the username in localStorage
                localStorage.setItem('usernameDisplay', newUsername);

                // update the username in the profile display
                usernameDisplay.innerText = newUsername;

                // clear the input fields
                profileInputContainer.querySelector('#newUsername').value = "";
                usernameErrorDisplay.innerText = "";

                // remove the input fields
                profileInputContainer.innerHTML = "";

                // update the username in the encypted 'usernames' cookie
                let encryptedUsernames = document.cookie.split('; ').find(x => x.startsWith('usernames'))?.split('=')[1];
                let usernames = encryptedUsernames ? JSON.parse(atob(encryptedUsernames)) : [];
                const userIndex = usernames.indexOf(username);
                usernames[userIndex] = newUsername;
                encryptedUsernames = btoa(JSON.stringify(usernames));
                document.cookie = `usernames=${encryptedUsernames}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;

                // remove the input fields
                profileInputContainer.innerHTML = "";
            }
        });

        // Cancel button
        const cancelUsernameButton = profileInputContainer.querySelector('#cancelUsername');
        cancelUsernameButton.addEventListener('click', function() {
            profileInputContainer.innerHTML = "";
        });
    });

    // change password button
    const changePasswordButton = popup.querySelector('#changePassword');
    changePasswordButton.addEventListener('click', function() {
        const html = `
        <label for="newPassword">New Password:</label>
        <input type="password" id="newPassword" placeholder="Enter new password">
        <button id="savePassword">Save</button>
        <button id="cancelPassword">Cancel</button>

        <div class="errorContainer">
            <p class="error" id="passwordError"></p>
        </div>
        `;

        profileInputContainer.innerHTML = html;

        // Save password button
        const savePasswordButton = profileInputContainer.querySelector('#savePassword');
        savePasswordButton.addEventListener('click', function() {
            const newPassword = profileInputContainer.querySelector('#newPassword').value;
            
            const passwordErrorDisplay = profileInputContainer.querySelector('#passwordError');
            passwordErrorDisplay.innerText = validatePassword(newPassword);

            // If no error, save the new password
            if (passwordErrorDisplay.innerHTML === "") {
                // get the index of the username in the encrypted 'usernames' cookie
                let encryptedUsernames = document.cookie.split('; ').find(x => x.startsWith('usernames'))?.split('=')[1];
                let usernames = encryptedUsernames ? JSON.parse(atob(encryptedUsernames)) : [];
                const username = localStorage.getItem('usernameDisplay');
                const userIndex = usernames.indexOf(username);

                // save the old password
                let encryptedPasswords = document.cookie.split('; ').find(x => x.startsWith('passwords'))?.split('=')[1];
                let passwords = encryptedPasswords ? JSON.parse(atob(encryptedPasswords)) : [];
                console.log(passwords);
                const oldPassword = passwords[userIndex];

                // update the password in the 'passwords' cookie
                passwords[userIndex] = newPassword;
                console.log(passwords);
                encryptedPasswords = btoa(JSON.stringify(passwords));
                document.cookie = `passwords=${encryptedPasswords}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
            }
        });

        // Cancel button
        const cancelPasswordButton = profileInputContainer.querySelector('#cancelPassword');
        cancelPasswordButton.addEventListener('click', function() {
            profileInputContainer.innerHTML = "";
        });
    });

    //delete account button
    const deleteAccountButton = popup.querySelector('#deleteAccount');
    deleteAccountButton.addEventListener('click', function() {
        const html = `
        <p>Are you sure you want to delete your account?</p>
        <button id="confirmDelete">Yes</button>
        <button id="cancelDelete">No</button>
        `;

        profileInputContainer.innerHTML = html;

        // Confirm delete button
        const confirmDeleteButton = profileInputContainer.querySelector('#confirmDelete');
        confirmDeleteButton.addEventListener('click', function() {
            // save the username
            let username = localStorage.getItem('usernameDisplay');
            
            // get the index of the username in the encrypted 'usernames' cookie
            let encryptedUsernames = document.cookie.split('; ').find(x => x.startsWith('usernames'))?.split('=')[1];
            let usernames = encryptedUsernames ? JSON.parse(atob(encryptedUsernames)) : [];
            const userIndex = usernames.indexOf(username);
            
            // if 'rememberMe' cookie exists, delete it
            const rememberMeCookie = document.cookie.split('; ').find(x => x.startsWith('rememberMe'));
            if (rememberMeCookie) {
                document.cookie = `rememberMe=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            }

            // remove usernameDisplay from localStorage
            localStorage.removeItem('usernameDisplay');

            // remove the username from the encrypted 'usernames' cookie
            usernames.splice(userIndex, 1);
            encryptedUsernames = btoa(JSON.stringify(usernames));
            document.cookie = `usernames=${encryptedUsernames}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;

            // remove the password from the encrypted 'passwords' cookie
            let encryptedPasswords = document.cookie.split('; ').find(x => x.startsWith('passwords'))?.split('=')[1];
            let passwords = encryptedPasswords ? JSON.parse(atob(encryptedPasswords)) : [];
            passwords.splice(userIndex, 1);
            encryptedPasswords = btoa(JSON.stringify(passwords));
            document.cookie = `passwords=${encryptedPasswords}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;

            // redirect to the login page
            window.location.href = "index.html";
        });

        // Cancel delete button
        const cancelDeleteButton = profileInputContainer.querySelector('#cancelDelete');
        cancelDeleteButton.addEventListener('click', function() {
            profileInputContainer.innerHTML = "";
        });
    }); 

    document.body.appendChild(blur);
    document.body.appendChild(popup);
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