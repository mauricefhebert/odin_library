"use strict";
/**********************************************************************************************/
//Variable
/**********************************************************************************************/
let myLibrary = [];
const bookContainer = document.querySelector(".book-container");
const changeReadStatusBtn = document.querySelectorAll(".book-read-btn");
const overlay = document.querySelector(".overlay");
const bookForm = document.querySelector(".book-form");
const addNewBookBtn = document.querySelector(".add-new-book-btn");
const formConfirmBtn = document.querySelector(".form-confirm-btn");
const formCancelBtn = document.querySelector(".form-cancel-btn");
/**********************************************************************************************/
//constrcutor
/**********************************************************************************************/
function Book(title, author, page, read) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.read = read;
}
//Test book
const hp1 = new Book("Harry Potter 1", "J.K Rowling", 222, "Read");
const hp2 = new Book("Harry Potter 2", "J.K Rowling", 333, "Not read yet");
const hp3 = new Book("Harry Potter 3", "J.K Rowling", 443, "Read");
myLibrary.push(hp1, hp2, hp3);
/**********************************************************************************************/
//Static Method
/**********************************************************************************************/
function createBook() {
  const book = Object.create(Book.prototype);
  book.title = document.getElementById("title").value;
  book.author = document.getElementById("author").value;
  book.page = document.getElementById("page").value;
  book.read = document.getElementById("read").value;
  return book;
}

function addBookToLibrary(e) {
  e.preventDefault();
  myLibrary.push(createBook());
  bookForm.reset();
  displayBook();
}
formConfirmBtn.addEventListener("click", addBookToLibrary);

//Display the book on the page
function displayBook() {
  bookContainer.innerHTML = "";
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
              <button class="book-delete-btn btn btn-danger">Delete</button>
          </div>
        </div>`;
    bookContainer.insertAdjacentHTML("afterbegin", obj);
  }
  addEvent();
}
displayBook();

function deleteBook(e) {
  const bookIndex = e.currentTarget.closest(".card").dataset.id;
  myLibrary.splice(bookIndex, 1);
  displayBook();
}

//This function is used to add the event listener when a new book is created
function addEvent() {
  document.querySelectorAll(".book-delete-btn").forEach((btn) => {
    btn.addEventListener("click", deleteBook, false);
  });
  //Function to toggle the read status
  document.querySelectorAll(".book-read-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const bookIndex = e.currentTarget.closest(".card").dataset.id;
      myLibrary[bookIndex].toggleRead();
      displayBook();
    });
  });
}

/**********************************************************************************************/
//None Static Method
/**********************************************************************************************/
Book.prototype.toggleRead = function () {
  return this.read == "Read" ? (this.read = "Not read yet") : (this.read = "Read");
};
/**********************************************************************************************/
//Form Manager
/**********************************************************************************************/
function toggleOverlayAndForm(e) {
  e.preventDefault();
  overlay.classList.toggle("hidden");
  bookForm.classList.toggle("hidden");
}
addNewBookBtn.addEventListener("click", toggleOverlayAndForm);
formCancelBtn.addEventListener("click", toggleOverlayAndForm);
