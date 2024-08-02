const deleteData = async (order_id) => {
  const id = order_id
  await axios.delete(`https://rentconsoleapi.yudho.online/rent/payment?order_id=${order_id}`)
    .then((response) => {
      console.log(response);
      location.reload(true)
    })
    .catch((error) => {
      console.log(error);
    });
};

const userData = JSON.parse(localStorage.getItem('userData'));
if (userData) {
document.addEventListener('DOMContentLoaded', function() {
const getData = async () => {
await axios.get('https://rentconsoleapi.yudho.online/rent')
  .then((response) => {
    let bucket = ``;
    let rent = response.data.data;
    if (rent.length > 0) {
      for (let i = 0; i < rent.length; i++) {
        if (rent[i].user.avatar == null) {
          rent[i].user.avatar = "https://www.svgrepo.com/show/327465/person-circle.svg"
        }
        bucket += `
          <tr>
            <td><img src="${[rent[i].user.avatar]}" alt="Avatar" class="avatar"></td>
            <td>${rent[i].user.name}</td>
            <td>${rent[i].order_id}</td>
            <td><p>${rent[i].date.start} - ${rent[i].date.end}</p></td>
            <td>${rent[i].status}</td>
            <td>
              <button onclick="deleteData('${rent[i].order_id}')" type="button" class="btn btn-danger btn-sm">Delete</button>
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
getData()
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
