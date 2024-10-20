document.getElementById('add-note-btn').addEventListener('click', addNote);

function addNote() {
    const noteTitle = document.getElementById('note-title').value;
    const noteText = document.getElementById('note-text').value;

    if (noteText.trim() !== "" || noteTitle.trim() !== "") {
        const noteContainer = document.getElementById('notes-container');

        const newNote = document.createElement('div');
        newNote.classList.add('note');

        if (noteTitle.trim() !== "") {
            const noteTitleElement = document.createElement('h3');
            noteTitleElement.innerText = noteTitle;
            newNote.appendChild(noteTitleElement);
        }

        const noteContent = document.createElement('p');
        noteContent.innerText = noteText;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'X';
        deleteButton.addEventListener('click', () => {
            noteContainer.removeChild(newNote);
        });

        newNote.appendChild(noteContent);
        newNote.appendChild(deleteButton);
        noteContainer.appendChild(newNote);

        document.getElementById('note-title').value = "";
        document.getElementById('note-text').value = "";
    } else {
        alert("Please enter a title or note content.");
    }
}
function visit_home() {
    window.open("./home.html", "_self");
}
function visit_git() {
    window.open("https://github.com/YashK435/Prodash-v2.git", "_self");
}
function visit_drawing() {
    window.open("./drawing-board.html", "_self");
}
function visit_notes() {
    window.open("./Notes.html", "_self");
}
function visit_weather() {
    window.open("./weather.html", "_self");
}
function visit_todo() {
    window.open("./todo.html", "_self");
}
function visit_subs() {
    window.open("./Subscription.html", "_self");
}
function subscribed() {
    const checkTrue = sessionStorage.getItem("subscription");
    console.log(sessionStorage.getItem("subscription"))
    return checkTrue === "true";
}
function visit_finance() {
    if (subscribed()) {
        window.location.href = "finance.html";
    } else {
        window.location.href = "Subscription.html";
    }
}
function visit_habit() {
    if (subscribed()) {
        window.location.href = "habit.html";
    } else {
        window.location.href = "Subscription.html";
    }
}
