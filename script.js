// ==========================================================================
// Library
// ==========================================================================

// ==========================================================================
// TOC
// ==========================================================================

// - Classes
// - Init
// - UI

// ==========================================================================
// Classes
// ==========================================================================

class Book {

    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead; 
    };
    
    info() {
        if (isRead == true) {
            return `${this.title} by ${author}, ${pages} pages, already read`
        } else if (isRead == false) {
            return `${this.title} by ${author}, ${pages} pages, not read yet`
        };
    };

};

class Library {
    
    constructor() {
        this.library = [];
    }
    // this.library = [];
    
    addBookToLibrary() {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const isRead = document.getElementById('isRead').checked;
        let book = new Book(title, author, pages, isRead);
        this.library.push(book);
        this.displayBooks();
        resetPopup();
    };
    
    displayBooks() {
        containerBooks.innerHTML = '';      // Refresh the grid
        this.library.forEach(book => this.createCard(book));
    };
    
    changeStatus = (e) => {
        const element = e.target.parentElement;
        if (this.library[element.getAttribute('data-attribute')].isRead) {
            this.library[element.getAttribute('data-attribute')].isRead = false;
        } else if (!this.library[element.getAttribute('data-attribute')].isRead) {
            this.library[element.getAttribute('data-attribute')].isRead = true;
        }
        this.displayBooks();
    };
    
    removeElement = (e) => {
        const element = e.target.parentElement;
        this.library.splice(element.getAttribute('data-attribute'), 1);
        this.displayBooks();
    };
    
    createCard(book) {
        const card = document.createElement('div.card');
        card.setAttribute('data-attribute', this.library.indexOf(book));
        
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
        statusBtn.addEventListener('click', this.changeStatus);
        
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('removeBtn');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', this.removeElement);
        
        divTitle.textContent = `"${book.title}"`;
        divAuthor.textContent = `${book.author}`;
        divPages.textContent = `${book.pages}`;
        
        containerBooks.append(card);
        card.append(divTitle, divAuthor, divPages, statusBtn, removeBtn);
    };
};

// ==========================================================================
// Init
// ==========================================================================

const newLibrary = new Library();

// ==========================================================================
// UI
// ==========================================================================

const containerBooks = document.querySelector('.containerBooks');

const form = document.querySelector('.myForm');
form.addEventListener("submit", (e) => {
    e.preventDefault();     // prevents page refreshing
    newLibrary.addBookToLibrary();
    displayForm();
});

const overlay = document.querySelector('.overlay');
overlay.addEventListener("click", displayForm);

const addButton = document.querySelector('.addBook');
addButton.addEventListener("click", displayForm);

function displayForm() {
    if (overlay.classList.contains('active')) {
        overlay.classList.remove('active')
        form.classList.remove('active')
    } else {
        overlay.classList.add('active')
        form.classList.add('active')
    }
};

function resetPopup() {
    title.value = '';
    author.value = '';
    pages.value = '';
    isRead.checked = false;
};

