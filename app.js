//Book Constructor

function Book (title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//Function Constructor

function UI(){}




//function add book to the list
UI.prototype.addBookToList = function(book){

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

//Error MEssage

UI.prototype.showAlert = function (message, className){

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

//Delete Book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

//Clear Function
UI.prototype.clearFields = function(){

    const title = document.getElementById('title').value='',
         author = document.getElementById('author').value=''
         isbn = document.getElementById('isbn').value='';

}

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

    //Run Function
    ui.deleteBook(e.target);

    //Show Alert
    ui.showAlert("Book Removed", 'success')
})