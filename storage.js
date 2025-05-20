function saveToLocalStorage(){
    // get the username from localStorage, get the userIndex from the 'usernames' cookie
    const username = localStorage.getItem('usernameDisplay');
    const encryptedUsernames = document.cookie.split('; ').find(x => x.startsWith('usernames'))?.split('=')[1];
    const usernames = encryptedUsernames ? JSON.parse(atob(encryptedUsernames)) : [];
    const userIndex = usernames.indexOf(username);

    // get the current userInfo from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || [];

    // update the userInfo to contain the new allNotes
    const theme = userInfo[userIndex]?.theme || 'light';
    userInfo[userIndex] = {username, notes: allNotes, theme};

    // save the new userInfo to localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    console.log('Notes saved to local storage');
    console.log(localStorage.getItem('userInfo'));
}

function loadFromLocalStorage() {
    console.log('Loading notes from local storage');
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || [];
    const username = localStorage.getItem('usernameDisplay');
    const userIndex = userInfo.findIndex(user => user.username === username);
    if (userIndex === -1) {
        return [];
    }
    console.log('User index:', userIndex);
    console.log(userInfo);
    return userInfo[userIndex].notes;
}
