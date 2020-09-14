const signupErrEl = document.querySelector('#signup-err');
const signupFormHandler = async (event) => {
  try {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    console.log(username);
    console.log(password);
    
    if (!username || !password || password.length <= 3) {
      Promise.resolve()
      .then(
        () => {
          signupErrEl.classList.remove('hide-before-error');
          signupErrEl.classList.add('show-after-error');
        }
      ).then(
        () => {
          setTimeout(
            () => {
              signupErrEl.classList.remove('show-after-error');
              signupErrEl.classList.add('hide-before-error');
            }, 3000
          );
        }
      )
      .catch(err => {
        console.log(err);
      });
    }
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(
        {
          username: username,
          password: password
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {

      document.location.replace('/my-library');
    } else {
      console.log("There was an error."); 
      console.log(response.statusText);
      response.json().then(json => console.log(json)); 
    }
  } catch (error) {
    console.log(error);
  }
};
document.querySelector('.signup-form')
.addEventListener('submit', signupFormHandler);

const loginErrEl = document.querySelector('#login-err');
const loginFormHandler = async (event) => {
  try {
    event.preventDefault();
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    if (!username || !password) {
      Promise.resolve()
      .then(
        () => {
          loginErrEl.classList.remove('hide-before-error');
          loginErrEl.classList.add('show-after-error');
        }
      ).then(
        () => {
          setTimeout(
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
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(
        {
          username: username,
          password: password
        }
      ),
      headers: {'Content-Type': 'application/json'}
    });
    if (response.ok) {
      document.location.replace('/my-library')
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
          setTimeout(
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
document.querySelector('.login-form')
.addEventListener('submit', loginFormHandler);