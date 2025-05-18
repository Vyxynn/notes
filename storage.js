function saveToLocalStorage(){
    localStorage.setItem('notes', JSON.stringify(allNotes));
    console.log('Notes saved to local storage');
}

function loadFromLocalStorage() {
    console.log('Loading notes from local storage');
    const notes = localStorage.getItem('notes');
    if (notes) {
        return JSON.parse(notes);
    }
    return [];
}