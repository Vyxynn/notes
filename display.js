const notesContainer = document.getElementById('notesContainer');
const searchInput = document.getElementById('searchInput');
const tagsSearchContainer = document.getElementById('tagsSearchContainer');
const addNoteButton = document.getElementById('addNoteButton');

let currentDisplay = [];
let allNotes = [];

window.onload = function() {
    allNotes = loadFromLocalStorage();
    currentDisplay = allNotes;
    updateScreen();
    updateTagList();

    // get the username from localStorage
    const username = localStorage.getItem('usernameDisplay');
    if (!username) {
        // if the username is not found, redirect to the login page
        window.location.href = "index.html";
    }

    // check if the theme is set in localStorage
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        // if the theme is dark, add the dark class to the body and remove the light class
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    } else if (theme === 'dark') {
        // if the theme is light, add the light class to the body and remove the dark class
        document.body.classList.remove('light');
        document.body.classList.add('dark');
    }

    // if the theme is not set, set the default theme to light
    if (!theme) {
        localStorage.setItem('theme', 'light');
        document.body.classList.add('light');
    }
}

function updateTagList() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const tags = new Set();
    notes.forEach(note => note.tags.forEach(tag => tags.add(tag)));
    tagsSearchContainer.innerHTML = '';
    tags.forEach(tag => {
        // check if the tag is already in the tagsSearchContainer
        if (tagsSearchContainer.querySelector(`input[value="${tag}"]`)) {
            return;
        }
        const tagDiv = document.createElement('div');
        tagDiv.classList.add('tagSearch');
        tagDiv.innerHTML = `
            <label for="${tag}" style="width: fit-content;">${tag}</label>
            <input type="checkbox" id="${tag}" value="${tag}" onclick="searchByTag('${tag}')"><br>
        `;
        tagsSearchContainer.appendChild(tagDiv);
    });
}

function updateScreen() {
    notesContainer.innerHTML = '';
        currentDisplay.forEach(note => {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note');
            noteDiv.style.display = 'grid';
            noteDiv.style.gridTemplateColumns = '95% 5%';

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('noteButtonContainer');

            const editButton = document.createElement('button');
            editButton.classList.add('noteEditButton');
            editButton.innerHTML = `<img src="./assets/editIcon.svg" alt="Edit Note">`;

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('noteDeleteButton');
            deleteButton.innerHTML = `<img src="./assets/deleteIcon.svg" alt="Delete Note">`;

            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);

            const noteInfo = document.createElement('div');
            noteInfo.innerHTML = `
                <h2>${note.title}</h2>
                <p>${note.content}</p>
                <div class="tags">
                    ${note.tags.map(tag => `<div class="tag" style="width: fit-content;">${tag}</div>`).join('')}
                </div>
            `;

            noteDiv.appendChild(noteInfo);
            noteDiv.appendChild(buttonContainer);
            notesContainer.appendChild(noteDiv);

            // add event listeners to the edit and delete buttons
            editButton.addEventListener('click', function() {
                editNote(note);
            });
            deleteButton.addEventListener('click', function() {
                deleteNote(note);
            });
        });
    saveToLocalStorage();
}

function searchByTag(tag) {
    if(document.getElementById(tag).checked) {
        currentDisplay = currentDisplay.filter(note => note.tags.includes(tag));
    } else {
        currentDisplay = allNotes;
        searchByText();
    }
    updateScreen();
}

searchInput.addEventListener('input', function() {
    searchByText();
});

function searchByText() {
    const searchText = searchInput.value.toLowerCase();
    if (searchText) {
        currentDisplay = allNotes;
        // get all tags that are checked
        const checkedTags = Array.from(tagsSearchContainer.querySelectorAll('input[type="checkbox"]:checked')).map(tag => tag.value);
        checkedTags.forEach(tag => {
            searchByTag(tag);
        });

        currentDisplay = currentDisplay.filter(note => note.title.toLowerCase().includes(searchText) || note.content.toLowerCase().includes(searchText));
    }
    else {
        currentDisplay = allNotes;
        // get all tags that are checked
        const checkedTags = Array.from(tagsSearchContainer.querySelectorAll('input[type="checkbox"]:checked')).map(tag => tag.value);
        checkedTags.forEach(tag => {
            searchByTag(tag);
        });
    }
    updateScreen();
}