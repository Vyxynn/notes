# CSS Documentation

## Global Reset & Box Model
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

## Use of CSS Variables
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --background-color: #f8f9fa;
    --text-color: #212529;
    --error-color: red;
}
```

## Organized CSS Structure
```css
/* search container */
```

## Responsive Design
```css
@media (max-width: 768px) {
    #popupFlex {
        flex-direction: column;
    }
    #popupFlex > * {
        width: 100%;
    }
    .popup {
        max-width: 90%;
    }
    #container {
        grid-template-columns: 100vw;
        grid-template-rows: 10vh 20vw 70vh;
        grid-template-areas:
            "search"
            "tags"
            "notes";
        height: 100vh;
    }
    #tagsSearchContainer,
    #notesContainer,
    #searchContainer {
        width: 100%;
        overflow-y: scroll;
    }
}
```

## Typography Styling
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Courier New', Courier, monospace;
}
```

## Color Scheme & Contrast
```css
button {
    width: 100%;
    height: 40px;
    background-color: var(--primary-color);
    color: var(--text-color);
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
```

## Flexbox/Grid Usage
```css
#container {
    display: grid;
    grid-template-columns: 1fr 10vw 80vw;
    height: 100vh;
    grid-template-rows: 10vh 90vh;
    grid-template-areas:
        "tags search search"
        "tags notes notes";
    gap: 0;
}
```

## Button & Input Styling
```css
input[type="text"],
input[type="email"],
input[type="password"],
textarea {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid var(--secondary-color);
    border-radius: 5px;
}
```

## Component Reusability
```css
.error {
    color: var(--error-color);
}
```

## CSS Transitions
```css
.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 5px;
    display: none;
    z-index: 1001;
    width: 800px;
    min-height: 200px;
    max-height: 80vh;
    overflow-y: auto;
    background-color: var(--background-color);
}
```

## Hover/Focus Effects
```css
#addNoteButton:hover {
    cursor: pointer;
    background-color: var(--secondary-color);
}
```

## Layout Containers
```css
#container {
    display: grid;
    grid-template-columns: 1fr 10vw 80vw;
    height: 100vh;
    grid-template-rows: 10vh 90vh;
    grid-template-areas:
        "tags search search"
        "tags notes notes";
    gap: 0;
}
```

## Layering with Z-Index
```css
.blur {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    z-index: 1000;
}
```

## Utility Classes
```css
.error {
    color: var(--error-color);
}
```

## Use of Pseudo-classes/Elements
```css
.note:first-child {
    word-wrap: break-word;
}
```

## Shadows & Borders
```css
#searchInput {
    padding: 10px;
    width: 75%;
    border: 1px solid var(--secondary-color);
    border-radius: 5px;
    font-size: 16px;
}
```

## Theme Customization
```css
.light {
    background-color: var(--light-background-color) !important;
    color: var(--light-color) !important;
}
.dark {
    background-color: var(--dark-background-color) !important;
    color: var(--dark-color) !important;
}
```

## Naming Conventions
```css
.note > .tags {
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 10px;
}
```

## Cleanliness & Commenting
```css
/* buttons */
#addNoteButton {
    /* bottom right of screen */
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--secondary-color);
}
```

