document.addEventListener('DOMContentLoaded', function() {
  const getDataUser = async () => {
  await axios.get('https://rentconsoleapi.yudho.online/person/?filter=user')
  .then((response) => {
    let user = response.data.data
    let jumlahUser = user.length
    document.getElementById("userJumlah").innerHTML = jumlahUser;
    console.log(jumlahUser)
  })
  .catch((error) => {
    let bucket = `
      ${error.message="Gangguan..."}
      `;
    alert(bucket)
    // document.getElementById('result').innerHTML = bucket;
  });
}
getDataUser()

const getDataItem = async () => {
  await axios.get('https://rentconsoleapi.yudho.online/item')
  .then((response) => {
    let item = response.data.data
    let jumlahItem = item.length
    document.getElementById("itemJumlah").innerHTML = jumlahItem;
    console.log(jumlahItem)
  })
  .catch((error) => {
    let bucket = `
      ${error.message="Gangguan..."}
      `;
    alert(bucket)
    // document.getElementById('result').innerHTML = bucket;
  });
}
getDataItem()

const getDataRent = async () => {
  await axios.get('https://rentconsoleapi.yudho.online/rent')
  .then((response) => {
    let rent = response.data.data
    let jumlahRent = rent.length
    document.getElementById("rentJumlah").innerHTML = jumlahRent;
    console.log(jumlahRent)
  })
  .catch((error) => {
    let bucket = `
      ${error.message="Gangguan..."}
      `;
    alert(bucket)
    // document.getElementById('result').innerHTML = bucket;
  });
}
getDataRent()

const getDataForum = async () => {
  await axios.get('https://rentconsoleapi.yudho.online/forum/1')
  .then((response) => {
    let forum = response.data.data
    let jumlahForum = forum.length
    document.getElementById("forumJumlah").innerHTML = jumlahForum;
    console.log(jumlahForum)
  })
  .catch((error) => {
    let bucket = `
      ${error.message="Gangguan..."}
      `;
    alert(bucket)
    // document.getElementById('result').innerHTML = bucket;
  });
}
getDataForum()

    // Ambil data pengguna dari localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
        // Tampilkan data pengguna di halaman
        let name = userData.data.name
        document.getElementById("name").innerHTML = name;
        // const userDataContainer = document.getElementById('userData');
        
    } else {
        // Jika tidak ada data pengguna, redirect ke halaman login
        window.location.href = '../login.html'; // Ganti dengan halaman login yang sesuai
    }

    // Tambahkan event listener untuk tombol logout
    document.getElementById('logoutButton').addEventListener('click', function() {
        // Hapus data pengguna dari localStorage
        localStorage.removeItem('userData');
        // Redirect ke halaman login
        window.location.href = '../login.html'; // Ganti dengan halaman login yang sesuai
    });
});