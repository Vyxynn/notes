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
        </div>
    </div>

    <div class="theme">
        <h3>Theme</h3>
        <div class="themeOptions">
            <label for="lightTheme">Light</label>
            <input type="radio" id="lightTheme" name="theme" value="light" ${localStorage.getItem('theme') === 'light' ? 'checked' : ''}>
            <label for="darkTheme">Dark</label>
            <input type="radio" id="darkTheme" name="theme" value="dark" ${localStorage.getItem('theme') === 'dark' ? 'checked' : ''}>
        </div>
    </div>

    <div class="settingsButtons">
        <button id="closePopup">Close</button>
        <button id="saveSettings">Save</button>
    </div>
    `;

    popup.innerHTML = popupContent;

    const usernameDisplay = popup.querySelector('#usernameDisplay');

    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
    }, {});
    const usernameSave = cookies.username;

    if (usernameSave) {
        usernameDisplay.textContent = usernameSave;
    } else {
        usernameDisplay.textContent = 'No username saved';
    }

    document.body.appendChild(blur);
    document.body.appendChild(popup);
});

