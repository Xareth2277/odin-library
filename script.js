// ==========================================================================
// Library
// ==========================================================================

// ==========================================================================
// TOC
// ==========================================================================

// - 

// ==========================================================================
// 
// ==========================================================================

const form = document.querySelector('#my-form');
const addButton = document.querySelector('.addBook');
addButton.addEventListener("click", displayForm);

// ==========================================================================
// 
// ==========================================================================

let myLibrary = [];

addBookToLibrary('hurr', 'dur', 11, true);
addBookToLibrary('szur', 'dur', 10, true);

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function() {
        if (isRead == true) {
            return `${this.title} by ${author}, ${pages} pages, already read`
        } else if (isRead == false) {
            return `${this.title} by ${author}, ${pages} pages, not read yet`
        };
    };
};

function getInfo(){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').value;
    addBookToLibrary(title, author, pages, isRead);
};

function addBookToLibrary(title, author, pages, isRead) {
    let book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
};

function displayBooks() {
    myLibrary.forEach(book => createCard(book));
};

function createCard(book) {
    const containerBooks = document.querySelector('.containerBooks');
    const card = document.createElement('div.card');
    const divTitle = document.createElement('div.title');
    const divAuthor = document.createElement('div.author');
    const divPages = document.createElement('div.pages');
    divTitle.textContent = `"${book.title}"`;
    divAuthor.textContent = `${book.author}`;
    divPages.textContent = `${book.pages}`;
    containerBooks.append(card);
    card.append(divTitle, divAuthor, divPages);
};

function displayForm() {
    if(form.hasAttribute('hidden')) {
        form.removeAttribute('hidden');
    } else {
        form.setAttribute('hidden', '');
    }
};

displayBooks();

