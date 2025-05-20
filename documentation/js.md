# JS Documentation

## Variable Naming & Indentation

```js
const usernameInput = document.getElementById("username");
const usernameErrorDisplay = document.getElementById("usernameError");
const passwordInput = document.getElementById("password");
const passwordErrorDisplay = document.getElementById("passwordError");
const rememberMeCheckbox = document.getElementById("rememberMe");
const loginButton = document.getElementById("submit");
```

## Function Naming & Modularity

```js
function saveToLocalStorage() {
    const username = localStorage.getItem('usernameDisplay');
    const encryptedUsernames = document.cookie.split('; ').find(x => x.startsWith('usernames'))?.split('=')[1];
    const usernames = encryptedUsernames ? JSON.parse(atob(encryptedUsernames)) : [];
    const userIndex = usernames.indexOf(username);

    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || [];
    const theme = userInfo[userIndex]?.theme || 'light';
    userInfo[userIndex] = { username, notes: allNotes, theme };

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    console.log('Notes saved to local storage');
    console.log(localStorage.getItem('userInfo'));
}
```

## Arrays & Objects Usage

```js
const userInfo = JSON.parse(localStorage.getItem('userInfo')) || [];
const theme = userInfo[userIndex]?.theme || 'light';
userInfo[userIndex] = { username, notes: allNotes, theme };
localStorage.setItem('userInfo', JSON.stringify(userInfo));
console.log('Notes saved to local storage');
console.log(localStorage.getItem('userInfo'));
```

## Array Methods

```js
const tags = Array.from(tagsContainer.getElementsByClassName('addedTag')).map(element => element.innerHTML.trim());
```

## Looping/Iteration

```js
tags.forEach(tag => {
    if (!tagsSearchContainer.querySelector(`#${tag}`)) {
        const tagDiv = document.createElement('div');
        tagDiv.classList.add('tagDiv');
        tagDiv.innerHTML = `
            <label for="${tag}">${tag}</label>
            <input type="checkbox" id="${tag}" value="${tag}" onclick="searchByTag('${tag}')"><br>
        `;
        tagsSearchContainer.appendChild(tagDiv);
    }
});
```

## JSON Data Handling

```js
let usernames = encryptedUsernames ? JSON.parse(atob(encryptedUsernames)) : [];
```

## Web Storage (local/session)

```js
localStorage.setItem('usernameDisplay', username);
```

## Saving/Retrieving User Data

```js
const username = rememberMeCookie.split('=')[1];
```

## Cookies with Expiry

```js
document.cookie = `usernames=${encryptedUsernames}; max-age=31536000; path=/`;
```

## DOM Manipulation

```js
noteInfo.innerHTML = `
    <h2>${note.title}</h2>
    <p>${note.content}</p>
    <div class="tags">
        ${note.tags.map(tag => `<div class="tag" style="width: fit-content;">${tag}</div>`).join('')}
    </div>
    <div class="noteDate">
        <img class="dateIcon" src="./assets/clockIcon.svg" alt="Date Icon" style="width: 20px;">
        <p class="noteDateText" style="display: none;">${note.datetime}</p>
    </div>
`;
```

## CSS Manipulation via JS

```js
noteDateText.style.display = 'block';
```

## Theme Preference

```js
if (theme === 'light') {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
} else if (theme === 'dark') {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
}
```

## Comments & Code Readability

```js
// set the cookies with the encrypted usernames and passwords
document.cookie = `usernames=${encryptedUsernames}; max-age=31536000; path=/`;
document.cookie = `passwords=${encryptedPasswords}; max-age=31536000; path=/`;
```

## Error Handling & Debugging

```js
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
```

## Regex Validation

```js
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
```

## Timer & Date Object

```js
const now = new Date();
const pad = n => n.toString().padStart(2, '0');
const datetime = `${now.getFullYear()}-${pad(Math.floor(now.getMonth() + 1))}-${pad(Math.floor(now.getDate()))} ${pad(Math.floor(now.getHours()))}:${pad(Math.floor(now.getMinutes()))}:${pad(Math.floor(now.getSeconds()))}`;
```

## Math, String, Random Methods

```js
const now = new Date();
const pad = n => n.toString().padStart(2, '0');
const datetime = `${now.getFullYear()}-${pad(Math.floor(now.getMonth() + 1))}-${pad(Math.floor(now.getDate()))} ${pad(Math.floor(now.getHours()))}:${pad(Math.floor(now.getMinutes()))}:${pad(Math.floor(now.getSeconds()))}`;
```

## Event Listeners & Shortcuts

```js
cancelPasswordButton.addEventListener('click', function() {
    profileInputContainer.innerHTML = "";
});
```

## Real-time Search & History

```js
function searchByText() {
    const searchText = searchInput.value.toLowerCase();
    if (searchText) {
        currentDisplay = allNotes;
        const checkedTags = Array.from(tagsSearchContainer.querySelectorAll('input[type="checkbox"]:checked')).map(tag => tag.value);
        checkedTags.forEach(tag => {
            searchByTag(tag);
        });

        currentDisplay = currentDisplay.filter(note => note.title.toLowerCase().includes(searchText) || note.content.toLowerCase().includes(searchText));
    } else {
        currentDisplay = allNotes;
        const checkedTags = Array.from(tagsSearchContainer.querySelectorAll('input[type="checkbox"]:checked')).map(tag => tag.value);
        checkedTags.forEach(tag => {
            searchByTag(tag);
        });
    }
    updateScreen();
}
```

## CRUD Functionality

```js
function editNote(note) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.display = 'block';

    const blur = document.createElement('div');
    blur.classList.add('blur');
    blur.style.display = 'block';
}
```

