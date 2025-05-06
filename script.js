const notesContainer = document.getElementById('notesContainer');
const searchInput = document.getElementById('searchInput');
const tagsSearchContainer = document.getElementById('tagsSearchContainer');
const addNoteButton = document.getElementById('addNoteButton');

let currentDisplay = [];

window.onload = function() {
    getNotes();
    updateTagList();
}

function getNotes() {
    //get data from data.json
    currentDisplay = [];
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const notes = data.notes;
        notes.forEach(note => {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note');
            noteDiv.innerHTML = `
                <h2>${note.title}</h2>
                <p>${note.content}</p>
                <div class="tags">
                    ${note.tags.map(tag => `<div class="tag">${tag}</div>`).join('')}
                </div>
            `;
            currentDisplay.push(note);
            notesContainer.appendChild(noteDiv);
        });
        allNotes = notes;
    });
}

//gets every tag from data.json and displays them as a checkbox in tagsSearchContainer
function updateTagList() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const notes = data.notes;
            const tags = new Set();
            notes.forEach(note => note.tags.forEach(tag => tags.add(tag)));
            tagsSearchContainer.innerHTML = '';
            tags.forEach(tag => {
                //check if the tag is already in the tagsSearchContainer
                if (tagsSearchContainer.querySelector(`input[value="${tag}"]`)) {
                    return;
                }
                const tagDiv = document.createElement('div');
                tagDiv.classList.add('tagSearch');
                tagDiv.innerHTML = `
                    <label for="${tag}">${tag}</label>
                    <input type="checkbox" id="${tag}" value="${tag}" onclick="searchByTag('${tag}')"><br>
                `;
                tagsSearchContainer.appendChild(tagDiv);
        });
    });
}

function updateScreen() {
    notesContainer.innerHTML = '';
        currentDisplay.forEach(note => {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note');
            noteDiv.innerHTML = `
                <h2>${note.title}</h2>
                <p>${note.content}</p>
                <div class="tags">
                    ${note.tags.map(tag => `<div class="tag">${tag}</div>`).join('')}
                </div>
            `;
            notesContainer.appendChild(noteDiv);
        });
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

addNoteButton.addEventListener('click', function() {
    // create popup and blur background
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.display = 'block';

    const blur = document.createElement('div');
    blur.classList.add('blur');
    blur.style.display = 'block';

    let popupContent = `
        <h2>Add Note</h2>
        <label for="title">Title:</label><br>
        <input type="text" id="title" name="title"><br>
        <label for="content">Content:</label><br>
        <textarea id="content" name="content" style="resize: none;"></textarea><br>
        <label for="tags">Tags:</label><br>

        <div id="tagsContainer"></div>
        <div id="addTagContainer">
            <input type="text" id="addTagInput" placeholder="Add tag...">
            <button id="addTagButton">Add Tag</button>
        </div>

        <div id="buttonsContainer">
            <button id="cancelButton">Cancel</button>
            <button id="saveButton">Save</button>
        </div>

    `;

    popup.innerHTML = popupContent;

    document.body.appendChild(blur);
    document.body.appendChild(popup);
});
