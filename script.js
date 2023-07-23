let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
    this.info = () => `${title} by ${author}, ${pages} pages, ${read ? 'read' : 'not read'}`
}

function addBookToLibrary(book) {
    myLibrary.push(book);

    const cards = document.querySelector('.cards');
    const index = myLibrary.length-1

    const cardHTML = fillCardTemplate.call(book, index);

    cards.innerHTML += cardHTML;

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
    
    submitButton.addEventListener('click', e => {
        const title = document.querySelector('#book-title').value;
        const author = document.querySelector('input#book-author').value;
        const pages = document.querySelector('input#book-pages').value;
        const read = document.querySelector('input#book-read:checked') ? true : false
        form.remove();

        // console.log(title);console.log(author);console.log(pages);console.log(read);

        addBookToLibrary(new Book(title, author, pages, read))
    })
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
            rebalance(cardIndex)
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

const formHTML = `<form action="">
<p>
    <label for="book-title">Title:</label>
    <input type="text" name="book-title" id="book-title">
</p>
<p>
    <label for="book-author">Author:</label>
    <input type="text" name="book-author" id="book-author">
</p>
<p>
    <label for="book-pages">Number of pages:</label>
    <input type="number" name="book-pages" id="book-pages" min=0>
</p>
<p>
    <label for="book-read">Have you read it?</label>
    <input type="checkbox" name="book-read" id="book-read">
</p>
<div class="buttons">
    <button type="button" class="submit">Submit</button>
    <button type="button" class="cancel"> Cancel</button>
</div>
</form>`