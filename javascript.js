"use strict";
const bookForm = document.querySelector(".book-form");
const overlay = document.querySelector(".overlay");
const bookContainer = document.querySelector(".book-container");
const bookFormConfirm = document.querySelector(".form-confirm-btn");
const changeReadStatusBtn = document.querySelectorAll(".book-read-btn");
let myLibrary = [];
//Book constructor
function Book(title, author, page, read) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.read = read;
}
//Create a new book item
function createBook() {
  const book = Object.create(Book.prototype);
  book.title = document.getElementById("title").value;
  book.author = document.getElementById("author").value;
  book.page = document.getElementById("page").value;
  book.read = document.getElementById("read").value;
  if (book.title == "" || book.author == "" || book.page == "" || book.read == "") {
    alert("One or more field are empty");
    return false;
  } else return book;
}
//addBookToLibrary
function addBookToLibrary() {
  saveToLocalStorage();
}
bookFormConfirm.addEventListener("click", addBookToLibrary);
//Change the read status of the book
Book.prototype.changeReadStatus = function () {
  this.read == "Read" ? (this.read = "Not read yet") : (this.read = "Read");
  saveToLocalStorage();
  displayBook();
};
//Delete Book
function addEvent() {
  //Delete book from library
  document.querySelectorAll(".book-delete-btn").forEach((btn) => {
    btn.addEventListener("click", deleteFromLocalStorage);
  });
}

//Display the book on the page
function displayBook() {
  const book = JSON.parse(localStorage.getItem("myLibrary"));
  bookContainer.innerHTML = "";
  for (let i = 0; i < book.length; i++) {
    const obj = `<div data-id="${i}" class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${book[i].title}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><strong>Author:</strong> ${book[i].author}</li>
          <li class="list-group-item"><strong>Number of pages:</strong> ${book[i].page}</li>
          <li class="list-group-item"><strong>Status:</strong> ${book[i].read}</li>
        </ul>
        <div class="card-button">
            <button class="book-read-btn btn btn-primary">Read</button>
            <button class="btn btn-success">Edit</button>
            <button class="book-delete-btn btn btn-danger">Delete</button>
        </div>
      </div>`;
    bookContainer.insertAdjacentHTML("afterbegin", obj);
  }
  addEvent();
}
/********************************************************************************************/
//LocalStorage management
function saveToLocalStorage() {
  const book = createBook();
  if (localStorage.getItem("myLibrary") == null) localStorage.setItem("myLibrary", "[]");
  let oldData = JSON.parse(localStorage.getItem("myLibrary"));
  oldData.push(book);
  localStorage.setItem("myLibrary", JSON.stringify(oldData));
}
function deleteFromLocalStorage(e) {
  const index = e.currentTarget.closest(".card").dataset.id;
  let oldData = JSON.parse(localStorage.getItem("myLibrary"));
  oldData = oldData.splice(index, 1);
  localStorage.setItem("myLibrary", JSON.stringify(oldData));
  displayBook();
}
//Form toggle
function toggleOverlayAndForm(e) {
  e.preventDefault();
  overlay.classList.toggle("hidden");
  bookForm.classList.toggle("hidden");
}
document.querySelector(".add-new-book-btn").addEventListener("click", toggleOverlayAndForm);
document.querySelector(".form-cancel-btn").addEventListener("click", toggleOverlayAndForm);
displayBook();
