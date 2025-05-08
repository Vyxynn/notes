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