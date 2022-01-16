"use strict";
//
//This is a array of book Object this array contains all the book created
let myLibrary = [];

//This is a Book constructor to create Book Object
function Book(title, author, page, read) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.read = read;
}
//This is a method added to the prototype of the Book constructor wiches mean i will be able to use this method on any Book Object
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.page} pages, ${this.read}`;
};

//This function allow me to add book to the myLibrary Array each time a new book is called it will call the displayBook function to display it automatiquely
document.querySelector(".form-confirm-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const page = document.getElementById("page").value;
  const read = document.getElementById("read").value;
  const createBook = new Book(title, author, page, read);
  myLibrary.push(createBook);
  document.querySelector(".book-form").reset();
  displayBook();
});

//This function display the book on the page by looping trought myLibrary Array
function displayBook() {
  clearBook();
  for (let i = 0; i < myLibrary.length; i++) {
    const obj = `<div data-id="${i}" class="card h-100">
    <div class="card-body">
      <h5 class="card-title">${myLibrary[i].title}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><strong>Author:</strong> ${myLibrary[i].author}</li>
      <li class="list-group-item"><strong>Number of pages:</strong> ${myLibrary[i].page}</li>
      <li class="list-group-item"><strong>Status:</strong> ${myLibrary[i].read}</li>
    </ul>
    <div class="card-button">
        <button class="book-read-btn btn btn-primary">Read</button>
        <button class="btn btn-success">Edit</button>
        <button class="book-delete-btn btn btn-danger">Delete</button>
    </div>
  </div>`;
    document.querySelector(".book-container").insertAdjacentHTML("afterbegin", obj);
  }
  addEvent();
}

/**************************************************************************************************************/
//
function addEvent() {
  document.querySelectorAll(".book-delete-btn").forEach((btn) => {
    btn.addEventListener("click", deleteBook);
  });
  document.querySelectorAll(".book-read-btn").forEach((btn) => {
    btn.addEventListener("click", changeReadStatus);
  });
}

function deleteBook(e) {
  const index = e.currentTarget.closest(".card").dataset.id;
  myLibrary.splice(index, 1);
  displayBook();
}
function changeReadStatus(e) {
  const index = e.currentTarget.closest(".card").dataset.id;
  if (myLibrary[index].read == "Read") {
    myLibrary[index].read = "Not read yet";
  } else {
    myLibrary[index].read = "Read";
  }
  displayBook();
}
//
/**************************************************************************************************************/

// This function is used to clear the page when entering a new book to prevent duplication
function clearBook() {
  if (myLibrary.length > -1) {
    document.querySelector(".book-container").innerHTML = "";
  }
}
// This is the function for the overlay and book form opening and closing
function toggleOverlayAndForm() {
  const overlay = document.querySelector(".overlay");
  const bookForm = document.querySelector(".book-form");
  if (overlay.classList.contains("hidden") || bookForm.classList.contains("hidden")) {
    overlay.classList.remove("hidden");
    bookForm.classList.remove("hidden");
  } else {
    overlay.classList.add("hidden");
    bookForm.classList.add("hidden");
  }
}
document.querySelector(".add-new-book-btn").addEventListener("click", toggleOverlayAndForm);
document.querySelector(".form-cancel-btn").addEventListener("click", toggleOverlayAndForm);
//This display the book on page load
displayBook();
