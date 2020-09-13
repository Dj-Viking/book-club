const searchErrEl = document.querySelector('#search-err');
const searchFormHandler = async (event) => {
  try {
    event.preventDefault();
    //using HTML get form in the book-search.handlebars!
    const book_title = document.querySelector('input[name="book_title"]').value.trim();
    const author = document.querySelector('input[name="author"]').value.trim();
    console.log(book_title, author);
    if (!book_title || !author) {
      searchErrEl.classList.remove('hide-before-error');
      searchErrEl.classList.add('show-after-error');
      setTimeout(() => {
        searchErrEl.classList.remove('show-after-error');
        searchErrEl.classList.add('hide-before-error');
      }, 3000);
      throw new Error("Search field can't be empty.")
    }
  } catch (error) {
    console.log(error);
  }
};
document.querySelector('#search-submit-btn').addEventListener('click', searchFormHandler);