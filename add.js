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
            <hr>
            <div id="previewTitle">Title</div>
            <div id="previewContent">Content</div>
            <div id="previewTags">Tags</div>
        </div>

        <div id="popupCustomization">
            <h2>Add Note</h2>
            <hr>
            <label for="title">Title:</label><br>
            <input type="text" id="title" name="title"><br>

            <label for="content">Content:</label><br>
            <textarea id="content" name="content" style="resize: none; overflow: hidden;" oninput="this.style.height = 'auto'; this.style.height = (this.scrollHeight) + 'px';"></textarea><br>
            <div id="textButtonContainer">
                <button id="boldButton">B</button>
                <button id="italicButton">I</button>
                <button id="underlineButton">U</button>
            </div>
            
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
    const boldButton = document.getElementById('boldButton');
    const italicButton = document.getElementById('italicButton');
    const underlineButton = document.getElementById('underlineButton');
    const content = document.getElementById('content');

    cancelButton.addEventListener('click', function() {
        document.body.removeChild(popup);
        document.body.removeChild(blur);
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
    });

    // for each tag in the tagsContainer, add a click event listener
    tagsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('addedTag')) {
            // remove the tag from the tagsContainer
            const tagDiv = event.target;
            tagsContainer.removeChild(tagDiv);
        }
    });
});

/*
<h2>${note.title}</h2>
<p>${note.content}</p>
<div class="tags">
    ${note.tags.map(tag => `<div class="tag">${tag}</div>`).join('')}
</div>
*/