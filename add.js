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
                <div class="tags">

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
    const boldButton = document.getElementById('boldButton');
    const italicButton = document.getElementById('italicButton');
    const underlineButton = document.getElementById('underlineButton');

    const titleInput = document.getElementById('title');
    const previewTitle = document.getElementById('previewTitle');
    const editorInput = document.getElementById('editor');
    const previewContent = document.getElementById('previewContent');
    const previewTags = document.getElementById('previewTags');
    let oldContent = "";

    titleInput.addEventListener('input', function() {
        if (titleInput.value) {
            previewTitle.innerHTML = titleInput.value;
        } else {
            previewTitle.innerHTML = '';
        }
    });

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

    quill.on('text-change', function() {
        const html = quill.root.innerHTML;
        console.log(html);
        if (html) {
            previewContent.innerHTML = html;
        }
    });

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

