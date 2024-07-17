document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get user input
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send POST request to API
    axios.post('https://rentconsoleapi.yudho.online/person/login', {
        email: email,
        password: password
    })
    .then(function (response) {
        // Handle success
        if (response.data.data.role === 'user') {
            document.getElementById('errorMessage').innerText = 'Staff Only!!';
            // Tampilkan pesan atau lakukan tindakan lain jika role bukan admin
            return; // Keluar dari fungsi login jika role bukan admin
        }else {
            console.log('Login successful');
            console.log(response.data);
            localStorage.setItem('userData', JSON.stringify(response.data));
            window.location.href = 'dashboard/dashboard.html'; // You can access the response data here
        }
    })
    .catch(function (error) {
        // Handle error
        console.error('Login failed');
        console.error(error);
        document.getElementById('errorMessage').innerText = 'Login Gagal!!';
        // Example: Display an error message to the user
        // alert('Login failed. Please check your credentials.');
    });
});
