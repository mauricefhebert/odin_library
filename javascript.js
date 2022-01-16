"use strict";
let myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
const bookContainer = document.querySelector(".book-container");
const changeReadStatusBtn = document.querySelectorAll(".book-read-btn");
const overlay = document.querySelector(".overlay");
const bookForm = document.querySelector(".book-form");
const addNewBookBtn = document.querySelector(".add-new-book-btn");
const formConfirmBtn = document.querySelector(".form-confirm-btn");
const formCancelBtn = document.querySelector(".form-cancel-btn");
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
formConfirmBtn.addEventListener("click", addBookToLibrary);
//Change the read status of the book
Book.prototype.changeReadStatus = function () {
  this.read == "Read" ? (this.read = "Not read yet") : (this.read = "Read");
  saveToLocalStorage();
  displayBook();
};

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
            <button class="btn btn-success">Edit</button>
            <button class="book-delete-btn btn btn-danger">Delete</button>
        </div>
      </div>`;
    bookContainer.insertAdjacentHTML("afterbegin", obj);
  }
}
/********************************************************************************************/
//LocalStorage section
function saveToLocalStorage() {
  if (localStorage.getItem("myLibrary") == null) localStorage.setItem("myLibrary", "[]");
  myLibrary.push(createBook());
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}
function deleteFromLocalStorage(e) {
  const index = e.currentTarget.closest(".card").dataset.id;
  myLibrary = myLibrary.splice(index, 1);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  displayBook();
}
//Form section
function toggleOverlayAndForm() {
  overlay.classList.toggle("hidden");
  bookForm.classList.toggle("hidden");
}
addNewBookBtn.addEventListener("click", toggleOverlayAndForm);
formCancelBtn.addEventListener("click", toggleOverlayAndForm);
displayBook();
