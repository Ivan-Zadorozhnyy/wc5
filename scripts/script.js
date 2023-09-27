class Book {
    constructor(title, authors, numberOfPages, isRead, isFavorite) {
        this.title = title;
        this.authors = authors;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
        this.isFavorite = isFavorite;
    }

    markAsRead() {
        this.isRead = true;
    }

    toggleFavorite() {
        this.isFavorite = !this.isFavorite;
    }
}

class Bookshelf {
    constructor(books = []) {
        this.books = books;
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(book) {
        const index = this.books.indexOf(book);
        if (index !== -1) {
            this.books.splice(index, 1);
        }
    }

    getUnreadBooks() {
        return this.books.filter(book => !book.isRead);
    }

    getFavBooks() {
        return this.books.filter(book => book.isFavorite);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const shelf = new Bookshelf();

    function addBookToShelf() {
        const title = document.getElementById('title').value;
        const authors = document.getElementById('authors').value;
        const numberOfPages = document.getElementById('numberOfPages').value;
        const isRead = document.getElementById('isRead').checked;
        const isFavorite = document.getElementById('isFavorite').checked;

        if (title && authors && numberOfPages) {
            const book = new Book(title, authors, parseInt(numberOfPages), isRead, isFavorite);
            shelf.addBook(book);

            document.getElementById('bookForm').reset();

            updateBookList();
        } else {
            alert('Please fill out all the fields.');
        }
    }

    function updateBookList() {
        const bookList = document.getElementById('bookList');
        bookList.innerHTML = '';

        shelf.books.forEach((book, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${book.title} by ${book.authors} 
                <span>${book.isRead ? '[Want to Read]' : ''}</span>
                <span>${book.isFavorite ? '[Favorite]' : ''}</span>
            `;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.onclick = function() {
                shelf.removeBook(book);
                updateBookList();
            };
            li.appendChild(removeBtn);
            bookList.appendChild(li);
        });
    }

    window.addBookToShelf = addBookToShelf;
});
