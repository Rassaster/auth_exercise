const newRegister = async () => {
  let jsonBody = JSON.stringify({
    username: Register_DOM_Nodes.new_username.value,
    name: Register_DOM_Nodes.new_name.value,
    lastname: Register_DOM_Nodes.new_lastname.value,
    email: Register_DOM_Nodes.new_email.value,
    age: Register_DOM_Nodes.new_password.value,
    password: Register_DOM_Nodes.new_registrationButton.value
  });
  let response = await fetch('http://localhost:3000/register', {
    method : 'POST',
    headers : {
      "Content-Type": "application/json"
    },
    body: jsonBody
  })
  console.log(response);
  if (response.status === 201) {
    sessionStorage.setItem('Username', Register_DOM_Nodes.new_username.value);
    location.assign('./login.html')
  }
}
Register_DOM_Nodes.new_registrationButton.addEventListener('click', ()=>{
  newRegister();
});