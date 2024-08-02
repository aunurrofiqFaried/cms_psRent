document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get user input
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send POST request to API
    axios.post('https://rentconsoleapi.yudho.online/person/login', {
        email: email,
        password: password
    })
    .then(function (response) {
        if (response.data.data.role === 'user') {
            document.getElementById('errorMessage').innerText = 'Staff Only!!';
            return;
        }else {
            console.log('Login successful');
            console.log(response.data);
            localStorage.setItem('userData', JSON.stringify(response.data));
            window.location.href = 'dashboard/dashboard.html';
        }
    })
    .catch(function (error) {
        console.error('Login failed');
        console.error(error);
        document.getElementById('errorMessage').innerText = 'Login Gagal!!';
    });
});
