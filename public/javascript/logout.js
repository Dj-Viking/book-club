const logout = async () => {
  try {
    const windowLoc = window.location.toString().split('/');
    const id = windowLoc[windowLoc.length - 1];
    const response = await fetch('/api/users/logout', {
      method: 'post',
      body: JSON.stringify(
        {
          post_id: id
        }
      ),
      headers: {'Content-Type': 'application/json'}
    });
    response.ok ? document.location.replace('/') : console.log("There was an error."); console.log(response.statusText);
  } catch (error) {
    console.log(error);
  }
};
document.querySelector('#logout')
.addEventListener('click', logout);