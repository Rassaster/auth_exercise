const authenticate_login = async () => {
  let jsonBody = JSON.stringify({
    username: LogIn_DOM_Nodes.usernameInput.value,
    password: LogIn_DOM_Nodes.passwordInput.value
  });
  let response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonBody
  })
  if (response.status === 200) {
    sessionStorage.setItem('Username', LogIn_DOM_Nodes.usernameInput.value);
    console.log(response);
    // location.assign('./welcome.html');
  } else if (response.status === 401) {
    alert('Wrong password.')
    console.log(response)
  }
}
LogIn_DOM_Nodes.authenticateButton.addEventListener('click', () => {
  authenticate_login();
});
LogIn_DOM_Nodes.registrationButton.addEventListener('click', () => {
  location.assign('register.html')
})