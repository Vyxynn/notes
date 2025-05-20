# HTML Documentation

## Doctype & HTML Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A simple notes app with search and tag functionality.">
  <meta name="keywords" content="notes, app, search, tags, JavaScript">
  <link rel="icon" href="./assets/journal.svg" type="image/png">
  <title>Notes App - Login</title>
  <script defer src="login.js"></script>
  <link rel="stylesheet" href="login.css">
</head>
```

## `lang` Attribute
```html
<html lang="en">
```

## Meta Tags
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="A simple notes app with search and tag functionality.">
<meta name="keywords" content="notes, app, search, tags, JavaScript">
```

## Semantic Tags
```html
<section id="searchContainer">
  <input type="search" id="searchInput" placeholder="Search notes...">
</section>
```

## Headings Structure
```html
<h2>${note.title}</h2>
<p>${note.content}</p>
<div class="tags">
  ${note.tags.map(tag => `<div class="tag" style="width: fit-content;">${tag}</div>`).join('')}
</div>
<div class="noteDate">
  <img class="dateIcon" src="./assets/clockIcon.svg" alt="Date Icon" style="width: 20px;">
  <p class="noteDateText" style="display: none;">${note.datetime}</p>
</div>
```

## Alt Text for Images
```html
<img class="dateIcon" src="./assets/clockIcon.svg" alt="Date Icon" style="width: 20px;">
<img src="./assets/settingsIcon.svg" alt="Settings" width="50%" height="50%">
<img src="./assets/addIcon.svg" alt="Add Note" width="100%" height="100%">
```

## Navigation
```html
<label for="${tag}" style="width: fit-content;">${tag}</label>
<input type="checkbox" id="${tag}" value="${tag}" onclick="searchByTag('${tag}')"><br>
```

## Form Structure
```html
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
```

## Button & Input Elements
```html
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
```

## Anchor Tags
```js
window.location.href = "notes.html";
```

## External CSS/JS Links
```html
<script defer src="login.js"></script>
<link rel="stylesheet" href="login.css">
```

## Responsive Meta & Layout
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Comments
```html
<article id="notesContainer">
  <!-- This is where the notes will be displayed -->
</article>
```

## Indentation & Formatting
```html
<main id="container">
  <section id="searchContainer">
    <input type="search" id="searchInput" placeholder="Search notes...">
  </section>
</main>
```

## Favicon
```html
<link rel="icon" href="./assets/journal.svg" type="image/png">
```

## HTML Validation
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A simple notes app with search and tag functionality.">
  <meta name="keywords" content="notes, app, search, tags, JavaScript">
  <link rel="icon" href="./assets/journal.svg" type="image/png">

  <title>Notes App</title>

  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="theme.css">
  <script defer src="display.js"></script>
  <script defer src="add.js"></script>
  <script defer src="storage.js"></script>
  <script defer src="settings.js"></script>

  <link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js" async></script>
  <script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js" async></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js" async></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" />
</head>
<body>
  <main id="container">
    <section id="searchContainer">
      <input type="search" id="searchInput" placeholder="Search notes...">
    </section>

    <aside id="tagsSearchContainer">
      <nav class="tagSearch"></nav>
    </aside>

    <article id="notesContainer">
      <!-- This is where the notes will be displayed -->
    </article>

    <button id="settingsButton">
      <img src="./assets/settingsIcon.svg" alt="Settings" width="50%" height="50%">
    </button>

    <button id="addNoteButton">
      <img src="./assets/addIcon.svg" alt="Add Note" width="100%" height="100%">
    </button>
  </main>
</body>
</html>
```
