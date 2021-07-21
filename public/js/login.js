const login = async (email, password) => {
  // alert(`${email} ${password}`);
  try {
    const res = await axios({
      method: 'post',
      url: 'http://127.0.0.1:9005/api/v1/users/login',
      data: {
        email,
        password
      }
    })
    console.log(res)
  } catch (error) {
    console.log(error.response.data)
  }
}
document.querySelector('.loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;

    login(email, password);
});