class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}

class UI {
    addBookToList(book){
        //Take book list element
    const list = document.getElementById('book-list')

    //Create TR
    const row = document.createElement('tr')

    //Insert Cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href = "#" class="delete">X</a></td>
    `

    list.appendChild(row)
    }

    showAlert(message, className){
        //Create Div
    const div = document.createElement('div')

    //Add class name
    div.className = `alert ${className}`;

    //Add text
    div.appendChild(document.createTextNode(message))

    //Get Parrent
    const container = document.querySelector('.container')

    const form = document.querySelector('#book-form')
    //Insert Alert
    container.insertBefore(div, form)

    //Disapper after 3s
    setTimeout(function(){
        document.querySelector('.alert').remove()
    }, 3000)

    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        const title = document.getElementById('title').value='',
        author = document.getElementById('author').value='',
        isbn = document.getElementById('isbn').value='';
    }
}

//Local Storage Class

class Store {


    //get Books
    static getBook(){
        let books;
        if (localStorage.getItem('books') === null){
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        } 
        return books
    }

      // display Book
      static displayBook(){
          const books = Store.getBook();

          books.forEach(function(book) {
                const ui = new UI;
        
            //Add book to ui
            ui.addBookToList(book)

          });
      }



    //add Book
    static addBook(book){
        const books = Store.getBook();

        books.push(book)

        localStorage.setItem('books', JSON.stringify(books))

    }

    //remove
    static remove (isbn){
        const books = Store.getBook();  
        
        books.forEach(function(book, index) {
            
            if(book.isbn === isbn){
                books.splice(index, 1)

            }
            localStorage.setItem('books', JSON.stringify(books))
      });

    }
}

//DOM LOAD EVENT
document.addEventListener('DOMContentLoaded', Store.displayBook);

//Event Listener for book list 
document.getElementById('book-form').addEventListener('submit', function(e){
    // Get form values
    const title = document.getElementById('title').value,
         author = document.getElementById('author').value,
         isbn = document.getElementById('isbn').value

         console.log(title)

    // Instiante the book
    const book = new Book(title, author, isbn);

    //Instiante the Ui
    const ui = new UI();

    //Validate! 

    if(title === ''||author === ''|| isbn === ''){
       //Error Message

       ui.showAlert('Please check all required fields', 'error')
    } else {
    
    //add book to the list
    ui.addBookToList(book)

    //add book to ls
    Store.addBook(book)

    //Show Success
    ui.showAlert('Book Added', 'success')
    
    //Clear Fields
    ui.clearFields()

    }

    e.preventDefault();
});


//Add Event Listenr for Delete button
document.getElementById('book-list').addEventListener('click', function(e){
        
    //Instiante the Ui
         const ui = new UI();

    //Run Function - delete
    ui.deleteBook(e.target);

    //Remove from LS
    Store.remove(e.target.parentElement.previousElementSibling.textContent);

    //Show Alert
    ui.showAlert("Book Removed", 'success')
})