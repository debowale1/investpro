import axios from 'axios';

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
    if(res.data.status === 'success'){
      alert('login success');
      window.setTimeout(() => {
        location.assign('/')
        }, 1000)
    }
  } catch (error) {
    alert(error.response.data)
  }
}
document.querySelector('.loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;

    login(email, password);
});