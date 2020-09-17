const loginErrEl = document.querySelector('#login-err');
const deleteFormHandler = async (event) => {
  try {
    event.preventDefault();
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    //console.log(username, password);
    if (!username || !password) {
      Promise.resolve()
      .then(
        () => {
          loginErrEl.classList.remove('hide-before-error');
          loginErrEl.classList.add('show-after-error');
        }
      ).then(
        () => {
          setTimeout
          (
            () => {
              loginErrEl.classList.remove('show-after-error');
              loginErrEl.classList.add('hide-before-error');
            }, 3000
          );
        }
      )
      .catch(err => {
        console.log(err);
      });
    }
    const response = await fetch('/delete-account/delete', {
      method: 'DELETE',
      body: JSON.stringify(
        {
          username,
          password
        }
      ),
      headers: {'Content-Type': 'application/json'}
    });
    if (response.ok) {
      document.location.replace('/');
      return;
    } else {
      console.log("There was an error");
      Promise.resolve()
      .then(
        () => {
          loginErrEl.classList.remove('hide-before-error');
          loginErrEl.classList.add('show-after-error');
        }
      ).then(
        () => {
          setTimeout
          (
            () => {
              loginErrEl.classList.remove('show-after-error');
              loginErrEl.classList.add('hide-before-error');
            }, 3000
          );
        }
      )
      .catch(err => {
        console.log(err);
      });
    } 
  } catch (error) {
    console.log(error);
  }
};
document.querySelector('.login-form').addEventListener('submit', deleteFormHandler);