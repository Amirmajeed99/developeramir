// console.log('wellcome to es6 classes');
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        // create an element;
        const row = document.createElement('tr');
        // insert coloumns
        row.innerHTML = `
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>${book.isbn}</td>
     <td><a href="#" class="delete">X</a></td>

    `;
        // appending row into the list 
        list.appendChild(row);
        // console.log(row);
    }
    showAlert(message, className) {
        //    creat element div
        const div = document.createElement('div');
        //adding class to it
        div.className = `alert ${className}`;
        //adding text to div
        div.appendChild(document.createTextNode(message));
        //   insert it into dom
        // getting parent ist
        const container = document.querySelector('.container');
        //getting form
        const form = document.querySelector('#book-form');
        // inserting alert
        container.insertBefore(div, form);

        // time out after 3s
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);

    }
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }

    }
    clearFields() {
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('isbn').value = "";
    }

}

//Local storaget class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;

    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function (book) {
            const ui = new UI();

            //add book to ui
            ui.addBookToList(book);
        });

    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn) {
        // console.log(isbn);
        const books = Store.getBooks();
        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//dom load event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

//event listeners
document.getElementById('book-form').addEventListener('submit', function (e) {
    // console.log('you clicked on submit button');
    // getting input fields values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
    //   console.log(title,author,isbn);


    //instantiate the book constructor
    const book = new Book(title, author, isbn);
    // console.log(book);

    // instanitiate UI constructor
    const ui = new UI();
    if (title === "" || author === "" || isbn === "") {
        // error message
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // add book to list
        ui.addBookToList(book);

        // add to Local storage
        Store.addBook(book);
        //show alert
        ui.showAlert('Book added! Sucessfully', 'sucess');
        // clear fields
        ui.clearFields();
    }

    e.preventDefault();
});
//add event listener for delete item
document.getElementById('book-list').addEventListener('click', function (e) {

    // console.log('123');

    // instanitiate ui 
    const ui = new UI();

    //delete book
    ui.deleteBook(e.target);

    //remove from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //show message
    ui.showAlert('Book removed', 'sucess');
    e.preventDefault();
})