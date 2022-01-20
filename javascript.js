"use strict";
let myLibrary = [];
//Form and Overlay
const bookForm = document.querySelector(".book-form");
const formConfirmBtn = document.querySelector(".form-confirm-btn");
const formCancelBtn = document.querySelector(".form-cancel-btn");
const addNewBookBtn = document.querySelector(".add-new-book-btn");
const overlay = document.querySelector(".overlay");
//Book Form input
const title = document.getElementById("title");
const author = document.getElementById("author");
const page = document.getElementById("page");
const read = document.getElementById("read");
//Book container
const bookContainer = document.querySelector(".book-container");
//Book card selector
const changeReadStatusBtn = document.querySelectorAll(".book-read-btn");

class Book {
  constructor(title = "Unknown", author = "Unknown", page = 0, read = "Not read yet") {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
  }
  //Not Static Methode
  static toggleRead() {}
  //Static Methode
  static addBookToLibrary() {
    const book = new Book(title.value, author.value, page.value, read.value);
    myLibrary.push(book);
  }
  static addIdToBook() {
    myLibrary.forEach((book, i) => (book.id = i));
  }
  static deleteBook() {
    document.querySelectorAll(".book-delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        myLibrary.splice(Book.id, 1);
        Book.displayBook();
      });
    });
  }
  static displayBook() {
    bookContainer.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
      const obj = `<div class="card h-100">
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
    Book.deleteBook();
  }
}
Book.displayBook();

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  Book.addBookToLibrary();
  Book.addIdToBook();
  Book.displayBook();
  toggleOverlayAndForm();
  bookForm.reset();
});

//Form Manager
function toggleOverlayAndForm() {
  overlay.classList.toggle("hidden");
  bookForm.classList.toggle("hidden");
}
addNewBookBtn.addEventListener("click", toggleOverlayAndForm);
formCancelBtn.addEventListener("click", toggleOverlayAndForm);

//Add a id to a object inside of a array
//array.forEach((object, i) => (object.id = i));
