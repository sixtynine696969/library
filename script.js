let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    
    info = () => `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read'}`;
}

function addBookToLibrary(book) {
    myLibrary.push(book);

    const cardsContainer = document.querySelector('.cards');
    const index = myLibrary.length-1

    const cardHTML = fillCardTemplate.call(book, index);

    cardsContainer.innerHTML += cardHTML;

    addEvenets();
}

// test
testBook = new Book(
    'Harry Potter and the Order of the Phoenix',
    'J. K. Rowling',
    '766',
    true,
    )

addBookToLibrary(testBook);

testBook = new Book(
    'Harry Potter and the Goblet of Fire',
    'J. K. Rowling',
    '636',
    false,
    )

addBookToLibrary(testBook);

testBook = new Book(
    'Harry Potter and the Half-blood Prince',
    'J. K. Rowling',
    '607',
    true,
    )

addBookToLibrary(testBook);
// test

const addBookButton = document.querySelector('.add-btn');

addBookButton.addEventListener('click', () => {
    if (document.querySelector('form') !== null) return
    document.body.insertAdjacentHTML('beforeend', formHTML)

    // form
    const form = document.querySelector('form');
    const cancelButton = document.querySelector('form button.cancel');
    const submitButton = document.querySelector('form button.submit');

    cancelButton.addEventListener('click', () => {
        form.remove();
    })

    form.onsubmit = (e) => {
        e.preventDefault();
        const title = document.querySelector('#book-title');
        const titleError = document.querySelector('#book-title + span.error');
    
        const author = document.querySelector('input#book-author');
        const authorError = document.querySelector('input#book-author + span.error');
    
        const pages = document.querySelector('input#book-pages');
        const pagesError = document.querySelector('input#book-pages + span.error');
    
        const read = document.querySelector('input#book-read:checked') ? true : false
    
        if (title.validity.valid && author.validity.valid && pages.validity.valid) {
            const book = new Book(title.value, author.value, pages.value, read)
            addBookToLibrary(book);
            form.remove();
            return
        }
    
        if (!title.validity.valid) {
            titleError.textContent = title.validationMessage;
            titleError.classList.add('active');
        } else {
            titleError.textContent = ''
            titleError.classList.remove('active');
        }
    
        if (!author.validity.valid) {
            authorError.textContent = author.validationMessage;
            authorError.classList.add('active');
        } else {
            authorError.textContent = ''
            authorError.classList.remove('active');
        }
    
        if (!pages.validity.valid) {
            pagesError.textContent = pages.validationMessage;
            pagesError.classList.add('active');
        } else {
            pagesError.textContent = ''
            pagesError.classList.remove('active');
        }
    }    
})

function rebalance() {
    const cards = document.querySelectorAll('.card');

    for (let i = 0; i < myLibrary.length; ++i) {
        cards[i].setAttribute('data-library-index', i);
        cards[i].querySelectorAll('[data-library-index]').forEach(
            elem => elem.setAttribute('data-library-index', i)
            )
    }
}

function addEvenets() {
    // card buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    const toggleReadButtons = document.querySelectorAll('.toggle-read-btn');

    // for remove button
    removeButtons.forEach(removeBtn => {
        removeBtn.addEventListener('click', e => {
            const cardIndex = e.target.getAttribute('data-library-index');
            const card = document.querySelector(`[data-library-index="${cardIndex}"].card`)
            
            myLibrary.splice(cardIndex, 1);
            card.remove();
            rebalance();
        })
    })

    // for read toggle
    toggleReadButtons.forEach(toggleBtn => {
        toggleBtn.addEventListener('click', e => {
            const cardIndex = e.target.getAttribute('data-library-index');
            const cards = document.querySelectorAll('.card');

            // myLibrary[cardIndex].read ? myLibrary[cardIndex].read = false : myLibrary[cardIndex].read = true;
            if (myLibrary[cardIndex].read) {
                myLibrary[cardIndex].read = false;
            } else {
                myLibrary[cardIndex].read = true
            }
            cards[cardIndex].querySelector('.read').textContent = myLibrary[cardIndex].read ? 'Yes' : 'No';
        })
    })
}

function fillCardTemplate(index) { 
    return (
        `<div class="card" data-library-index=${index}>
            <div class="title-container">
                <span>Title:</span>
                <span class="title">${this.title}</span>
            </div>
            <div class="author-container">
                <span>Author:</span>
                <span class="author">${this.author}</span>
            </div>
            <div class="pages-container">
                <span>Pages:</span>
                <span class="pages">${this.pages}</span>
            </div>
            <div class="read-container">
                <span>Read:</span>
                <span class="read">${this.read ? 'Yes' : 'No'}</span>
            </div>
            <div class="card-buttons">
                <button type="button" class="remove-btn" data-library-index=${index}>Remove From Library</button>
                <button type="button" class="toggle-read-btn" data-library-index=${index}>Toggle read</button>
            </div>
        </div>`
    )
}

const formHTML = `<form action="" novalidate>
<p>
    <label for="book-title" class="input-field">
        <span>Title:</span>
        <input type="text" name="book-title" id="book-title" required>
        <span class="error"></span>
    </label>
</p>
<p>
    <label for="book-author" class="input-field">
        <span>Author:</span>
        <input type="text" name="book-author" id="book-author" required>
        <span class="error"></span>
    </label>
</p>
<p>
    <label for="book-pages" class="input-field">
        <span>Number Of Pages:</span>
        <input type="number" name="book-pages" id="book-pages" min=0 required>
        <span class="error"></span>
    </label>
</p>
<p>
    <label for="book-read">Have you read it?</label>
    <input type="checkbox" name="book-read" id="book-read">
</p>
<div class="buttons">
    <button class="submit">Submit</button>
    <button type="button" class="cancel"> Cancel</button>
</div>
</form>`