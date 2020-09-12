const postErrEl = document.querySelector('#search-err');
const searchFormHandler = async (event) => {
  try {
    event.preventDefault();

    const book_title = document.querySelector('input[name="book_title"]').value.trim();
    const author = document.querySelector('input[name="author"]').value.trim();
    console.log(book_title, author);
    if (!book_title || !author) {
      postErrEl.classList.remove('hide-before-error');
      postErrEl.classList.add('show-after-error');
      setTimeout(() => {
        postErrEl.classList.remove('show-after-error');
        postErrEl.classList.add('hide-before-error');
      }, 3000);
      throw new Error("Search field can't be empty.")
    }
    // const response = await fetch(`/book-search/q?=${book_title}&${author}`, {
    //   method: 'GET'
    //   // body: JSON.stringify(
    //   //   {
    //   //     book_title,
    //   //     author
    //   //   }
    //   // ),
    //   // headers: {
    //   //   'Content-Type': 'application/json'
    //   // }
    // });
    // if (response.ok) {
    //   // const json = await response.json();
    //   // document.location.reload();
    //   console.log("got the response");
    // }
    // // console.log("There was an error.");
    // console.log(response.statusText);
  } catch (error) {
    console.log(error);
  }
};
document.querySelector('.book-search-form').addEventListener('submit', searchFormHandler);