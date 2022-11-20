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

const containerBooks = document.querySelector('.containerBooks');

const form = document.querySelector('.myForm');
form.addEventListener("submit", (e) => {
    e.preventDefault();     // prevents page refreshing
    addBookToLibrary();
    displayForm();
});

const overlay = document.querySelector('.overlay');
overlay.addEventListener("click", displayForm);

const addButton = document.querySelector('.addBook');
addButton.addEventListener("click", displayForm);

// ==========================================================================
// 
// ==========================================================================

let myLibrary = [];

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

function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;
    let book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    displayBooks();
    resetPopup();
};

function resetPopup() {
    title.value = '';
    author.value = '';
    pages.value = '';
    isRead.checked = false;
};

function displayBooks() {
    containerBooks.innerHTML = '';      // Refresh the grid
    myLibrary.forEach(book => createCard(book));
};

function createCard(book) {
    const card = document.createElement('div.card');
    card.setAttribute('data-attribute', myLibrary.indexOf(book));

    const divTitle = document.createElement('div.title');
    const divAuthor = document.createElement('div.author');
    const divPages = document.createElement('div.pages');
    
    const statusBtn = document.createElement('button');
    if (book.isRead == true) {
        statusBtn.classList.add('statusBtn', 'read');
        statusBtn.innerText = 'Read';
    } else if (book.isRead == false) {
        statusBtn.classList.add('statusBtn', 'unread')
        statusBtn.textContent = 'Unread';
    };
    
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removeBtn');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', removeElement);
    
    divTitle.textContent = `"${book.title}"`;
    divAuthor.textContent = `${book.author}`;
    divPages.textContent = `${book.pages}`;
    
    containerBooks.append(card);
    card.append(divTitle, divAuthor, divPages, statusBtn, removeBtn);
};

function displayForm() {
    if (overlay.classList.contains('active')) {
        overlay.classList.remove('active')
        form.classList.remove('active')
    } else {
        overlay.classList.add('active')
        form.classList.add('active')
    }
};

function removeElement(e) {
    const element = e.target.parentElement;
    myLibrary.splice(element.getAttribute('data-attribute'), 1);
    element.remove();
};
