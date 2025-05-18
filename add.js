addNoteButton.addEventListener('click', function() {
    // create popup and blur background
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.display = 'block';

    const blur = document.createElement('div');
    blur.classList.add('blur');
    blur.style.display = 'block';

    let popupContent = `
    <div id="popupFlex">
        <div id="popupPreview">
            <h2>Preview</h2>
            <hr><br>
            <div class="note">
                <h2 id="previewTitle"></h2>
                <p id="previewContent"></p>
                <div id="previewTags">

                </div>
            </div>
        </div>

        <div id="popupCustomization">
            <h2>Add Note</h2>
            <hr>
            <div id="form">
                <label for="title">Title:</label><br>
                <input type="text" id="title" name="title"><br>

                <label for="content">Content:</label><br>
                <div id="editor-container"><div id="editor"></div></div>
                
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
            </div>
            
        </div>
    </div>
    `;

    popup.innerHTML = popupContent;

    document.body.appendChild(blur);
    document.body.appendChild(popup);

    // add event listeners to buttons
    const cancelButton = document.getElementById('cancelButton');
    const saveButton = document.getElementById('saveButton');
    const addTagButton = document.getElementById('addTagButton');
    const addTagInput = document.getElementById('addTagInput');
    const tagsContainer = document.getElementById('tagsContainer');

    const titleInput = document.getElementById('title');
    const previewTitle = document.getElementById('previewTitle');
    const previewContent = document.getElementById('previewContent');
    const previewTags = document.getElementById('previewTags');

    const quill = new Quill('#editor', {
        modules: {
            toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'video', 'link'],
            ],
        },
        placeholder: 'Compose an epic...',
        theme: 'snow', // or 'bubble'
    });

    titleInput.addEventListener('input', function() {
        if (titleInput.value) {
            previewTitle.innerHTML = titleInput.value;
        } else {
            previewTitle.innerHTML = '';
        }
    });

    quill.on('text-change', function() {
        const html = quill.root.innerHTML;
        if (html) {
            previewContent.innerHTML = html;
        }
    });

    cancelButton.addEventListener('click', function() {
        document.body.removeChild(popup);
        document.body.removeChild(blur);
    });

    addTagInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTagButton.click();
        }
    });

    addTagButton.addEventListener('click', function() {
        const tag = addTagInput.value.trim();
        if (tag) {
            const tagDiv = document.createElement('div');
            tagDiv.classList.add('addedTag');
            tagDiv.innerHTML = `
                ${tag}
            `;
            tagsContainer.appendChild(tagDiv);
            addTagInput.value = '';
        }

        // update preview tags
        const tags = tagsContainer.getElementsByClassName('addedTag');
        previewTags.innerHTML = '';
        Array.from(tags).forEach(element => {
            const tag = element.innerHTML.trim();
            const tagSpan = document.createElement('span');
            tagSpan.classList.add('tag');
            tagSpan.innerHTML = tag;
            previewTags.appendChild(tagSpan);
        });
    });

    // for each tag in the tagsContainer, add a click event listener
    tagsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('addedTag')) {
            // remove the tag from the tagsContainer
            const tagDiv = event.target;
            tagsContainer.removeChild(tagDiv);

            // update preview tags
            const tags = tagsContainer.getElementsByClassName('addedTag');
            previewTags.innerHTML = '';
            Array.from(tags).forEach(element => {
                const tag = element.innerHTML.trim();
                const tagSpan = document.createElement('span');
                tagSpan.classList.add('tag');
                tagSpan.innerHTML = tag;
                previewTags.appendChild(tagSpan);
            });
        }
    });

    saveButton.addEventListener('click', function() {
        console.log('Save button clicked');
        const title = titleInput.value;
        const content = quill.root.innerHTML;
        const tags = Array.from(tagsContainer.getElementsByClassName('addedTag')).map(element => element.innerHTML.trim());
        const note = { title, content, tags };
        addNote(note);
        document.body.removeChild(popup);
        document.body.removeChild(blur);
    });
});

function addNote(note) {
    console.log(note);
    allNotes.push(note);
    currentDisplay = allNotes;
    updateScreen();
    
    // update tags search
    const tags = note.tags;
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
}

function editNote(note) {
    console.log(note);
    
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.display = 'block';

    const blur = document.createElement('div');
    blur.classList.add('blur');
    blur.style.display = 'block';

    let popupContent = `
    <div id="popupFlex">
        <div id="popupPreview">
            <h2>Preview</h2>
            <hr><br>
            <div class="note">
                <h2 id="previewTitle"></h2>
                <p id="previewContent"></p>
                <div id="previewTags">

                </div>
            </div>
        </div>

        <div id="popupCustomization">
            <h2>Add Note</h2>
            <hr>
            <div id="form">
                <label for="title">Title:</label><br>
                <input type="text" id="title" name="title"><br>

                <label for="content">Content:</label><br>
                <div id="editor-container"><div id="editor"></div></div>
                
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
            </div>
            
        </div>
    </div>
    `;

    popup.innerHTML = popupContent;

    document.body.appendChild(blur);
    document.body.appendChild(popup);

    // add event listeners to buttons
    const cancelButton = document.getElementById('cancelButton');
    const saveButton = document.getElementById('saveButton');
    const addTagButton = document.getElementById('addTagButton');
    const addTagInput = document.getElementById('addTagInput');
    const tagsContainer = document.getElementById('tagsContainer');

    const titleInput = document.getElementById('title');
    const previewTitle = document.getElementById('previewTitle');
    const previewContent = document.getElementById('previewContent');
    const previewTags = document.getElementById('previewTags');

    const quill = new Quill('#editor', {
        modules: {
            toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'video', 'link'],
            ],
        },
        theme: 'snow', // or 'bubble'
    });

    document.getElementById('title').value = note.title;
    quill.root.innerHTML = note.content;
    note.tags.forEach(tag => {
        const tagDiv = document.createElement('div');
        tagDiv.classList.add('addedTag');
        tagDiv.innerHTML = `
            ${tag}
        `;
        tagsContainer.appendChild(tagDiv);
    });

    previewTitle.innerHTML = note.title;
    previewContent.innerHTML = note.content;
    Array.from(note.tags).forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.classList.add('tag');
        tagSpan.innerHTML = tag;
        previewTags.appendChild(tagSpan);
    });

    quill.on('text-change', function() {
        const html = quill.root.innerHTML;
        if (html) {
            previewContent.innerHTML = html;
        }
    });

    titleInput.addEventListener('input', function() {
        if (titleInput.value) {
            previewTitle.innerHTML = titleInput.value;
        } else {
            previewTitle.innerHTML = '';
        }
    });

    cancelButton.addEventListener('click', function() {
        document.body.removeChild(popup);
        document.body.removeChild(blur);
    });

    addTagInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTagButton.click();
        }
    });

    addTagButton.addEventListener('click', function() {
        const tag = addTagInput.value.trim();
        if (tag) {
            const tagDiv = document.createElement('div');
            tagDiv.classList.add('addedTag');
            tagDiv.innerHTML = `
                ${tag}
            `;
            tagsContainer.appendChild(tagDiv);
            addTagInput.value = '';
        }

        // update preview tags
        const tags = tagsContainer.getElementsByClassName('addedTag');
        previewTags.innerHTML = '';
        Array.from(tags).forEach(element => {
            const tag = element.innerHTML.trim();
            const tagSpan = document.createElement('span');
            tagSpan.classList.add('tag');
            tagSpan.innerHTML = tag;
            previewTags.appendChild(tagSpan);
        });
    });

    // for each tag in the tagsContainer, add a click event listener
    tagsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('addedTag')) {
            // remove the tag from the tagsContainer
            const tagDiv = event.target;
            tagsContainer.removeChild(tagDiv);

            // update preview tags
            const tags = tagsContainer.getElementsByClassName('addedTag');
            previewTags.innerHTML = '';
            Array.from(tags).forEach(element => {
                const tag = element.innerHTML.trim();
                const tagSpan = document.createElement('span');
                tagSpan.classList.add('tag');
                tagSpan.innerHTML = tag;
                previewTags.appendChild(tagSpan);
            });
        }
    });

    saveButton.addEventListener('click', function() {
        const title = titleInput.value;
        const content = quill.root.innerHTML;
        const tags = Array.from(tagsContainer.getElementsByClassName('addedTag')).map(element => element.innerHTML.trim());
        const updatedNote = { title, content, tags };
        
        // update the note in the allNotes array
        const index = allNotes.findIndex(n => n.title === note.title && n.content === note.content);
        if (index !== -1) {
            allNotes[index] = updatedNote;
            currentDisplay = allNotes;
            updateScreen();
            updateTagList();
            saveToLocalStorage();
        }

        document.body.removeChild(popup);
        document.body.removeChild(blur);
    });
}

function deleteNote(note) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const username = localStorage.getItem('usernameDisplay');
    const userIndex = userInfo.findIndex(user => user.username === username);

    if (userIndex !== -1) {
        const notes = userInfo[userIndex].notes;
        const index = notes.findIndex(n => n.title === note.title && n.content === note.content);

        if (index !== -1) {
            notes.splice(index, 1);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            console.log('Note deleted');
        } else {
            console.log('Note not found');
        }
    } else {
        console.log('User not found');
    }

    allNotes = loadFromLocalStorage();
    currentDisplay = allNotes;
    updateScreen();
    updateTagList();
}
