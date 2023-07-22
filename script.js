let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
    this.info = () => `${title} by ${author}, ${pages} pages, ${read ? 'read' : 'not read'}`
}

function addBookToLibrary() {

}

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
    })
})

// const card = `<div class="card">
// <div class="title-container">
//     <span>Title:</span>
//     <span class="title">${}</span>
// </div>
// <div class="author-container">
//     <span>Author:</span>
//     <span class="author">${}</span>
// </div>
// <div class="pages-container">
//     <span>Pages:</span>
//     <span class="pages">${}</span>
// </div>
// <div class="read-container">
//     <span>Read:</span>
//     <span class="read">${}</span>
// </div>
// </div>`

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