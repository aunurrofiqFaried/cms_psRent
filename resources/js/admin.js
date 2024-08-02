const saveData = async () => {
  let emailForm = document.getElementById("email").value
  let nameForm = document.getElementById("name").value
  let passwordForm = document.getElementById("password").value
  await axios.post(`https://rentconsoleapi.yudho.online/person/register/admin`, {
    email: emailForm,
    name: nameForm,
    password: passwordForm
  })
  .then((response) => {
    console.log(response);
    location.reload(true)
  })
  .catch((error) => {
    console.log(error);
    alert(error.response.data.message)
  });
};

const deleteDataAdmin = async (uid) => {
  const id = uid
  await axios.delete(`https://rentconsoleapi.yudho.online/person/${id}`)
    .then((response) => {
      console.log(response);
      location.reload(true)
    })
    .catch((error) => {
      console.log(error);
    });
};


// Ambil data pengguna dari localStorage
const userData = JSON.parse(localStorage.getItem('userData'));
if (userData) {
  document.addEventListener('DOMContentLoaded', function() {
    const getDataUser = async () => {
    await axios.get('https://rentconsoleapi.yudho.online/person/?filter=admin')
      .then((response) => {
        let bucket = ``;
        let user = response.data.data;
        if (user.length > 0) {
          for (let i = 0; i < user.length; i++) {
            if (user[i].avatar == null) {
              user[i].avatar = "https://www.svgrepo.com/show/327465/person-circle.svg"
              // console.log(user[i].avatar)
            }
            bucket += `
              <tr>
                <td><img src="${[user[i].avatar]}" alt="Avatar" class="avatar"></td>
                <td>${user[i].name}</td>
                <td>${user[i].email}</td>
                <td>
                  <div class="btn-group btn-group-sm" role="group" aria-label="Basic mixed styles example">
                    <button onclick="deleteDataAdmin(${user[i].uid})" type="button" class="btn btn-danger">Delete</button>
                  </div>
                </td>
              </tr>`
          }
        }else {
          bucket += `
            <tr>
              <td colspan="4" class="text-center">
                Data Tidak Ada
              </td>
            </tr>`
        }
        document.getElementById('result').innerHTML = bucket;
      })
      .catch((error) => {
        let bucket = `
          <tr>
            <td colspan="4" class="text-center">
              ${error.message="Gangguan..."}
            </td>
          </tr>`;
        document.getElementById('result').innerHTML = bucket;
      });
    }
    getDataUser()
  });
} else {
  // Jika tidak ada data pengguna, redirect ke halaman login
  window.location.href = '../../login.html'; // Ganti dengan halaman login yang sesuai
}

// Tambahkan event listener untuk tombol logout
document.getElementById('logoutButton').addEventListener('click', function() {
          // Hapus data pengguna dari localStorage
  localStorage.removeItem('userData');
          // Redirect ke halaman login
  window.location.href = '../../login.html'; // Ganti dengan halaman login yang sesuai
});