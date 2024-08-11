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
        document.getElementById('errorMessage').innerText = 'Failed Login!';
        document.getElementById('forgetMessage').innerText = 'Forget Password!';
    });
});

document.getElementById('chagePassForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get user input
    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;
    const repassword = document.getElementById('repassword').value;

    if (password !== repassword) {
        document.getElementById("Message").innerText = "Passwords do not match!";
        return;
    }
    // Send POST request to API
    axios.put('https://rentconsoleapi.yudho.online/other/password', {
        email: email,
        password: password
    })
    .then((response) => {
        console.log(response)
        document.getElementById("Message").innerText = "Password changed successfully!";
        document.getElementById("Message").style.color = 'blue';
    })
    .catch((error) => {
        console.error(error);
        document.getElementById("Message").innerText = "Failed to change password!";
    });
});
