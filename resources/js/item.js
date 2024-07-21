function refreshPage(){
  window.location.reload();
} 
document.getElementById('formFile').addEventListener('change', function(event) {
      const file = event.target.files[0];

      if (!file) {
          document.getElementById('imagePreview').style.display = 'none';
          return;
      }

      // Validasi format file
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
          alert('Only JPG and PNG files are allowed!');
          event.target.value = ''; // Reset input file
          document.getElementById('imagePreview').style.display = 'none';
          return;
      }

      // Validasi ukuran file (maksimal 1MB)
      const maxSize = 1 * 1024 * 1024; // 1MB
      if (file.size > maxSize) {
          alert('File size must be less than 1MB!');
          event.target.value = ''; // Reset input file
          document.getElementById('imagePreview').style.display = 'none';
          return;
      }

      // Pratinjau gambar
      const reader = new FileReader();
      reader.onload = function(e) {
          const imagePreview = document.getElementById('imagePreview');
          imagePreview.src = e.target.result;
          imagePreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
  });

function uploadImage() {
      const fileInput = document.getElementById('formFile');
      const file = fileInput.files[0];

      if (!file) {
          alert('Please select a file!');
          return;
      }

      const userData = JSON.parse(localStorage.getItem('userData'));
      const dataUser = userData.data.id_user

      // Ambil data form lainnya
      const formData = new FormData();
      formData.append('image', file);

      const name = document.getElementById('name').value;
      const description = document.getElementById('deskripsi').value;
      const jenisConsole = document.getElementById('jenisConsole').value;
      const stock = document.getElementById('stock').value;
      const sewa = document.getElementById('sewa').value;

      formData.append('name', name);
      formData.append('deskripsi', description);
      formData.append('tipe', jenisConsole);
      formData.append('stock', stock);
      formData.append('harga', sewa);
      formData.append('id_user', dataUser);

      const uploadUrl = 'https://rentconsoleapi.yudho.online/item';

      axios.post(uploadUrl, formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
      .then(response => {
          console.log('URL gambar berhasil disimpan:', response.data);
          location.reload(true)
      })
      .catch(error => {
          console.error('Terjadi kesalahan:', error);
      });
  }
function editData(id) {
      const fileInput = document.getElementById('formFile');
      const file = fileInput.files[0];

      const formData = new FormData();
      if (file) {
          // Validasi format file
          const validTypes = ['image/jpeg', 'image/png'];
          if (!validTypes.includes(file.type)) {
              alert('Only JPG and PNG files are allowed!');
              return;
          }

          // Validasi ukuran file (maksimal 1MB)
          const maxSize = 1 * 1024 * 1024; // 1MB
          if (file.size > maxSize) {
              alert('File size must be less than 1MB!');
              return;
          }

          formData.append('image', file);
      }

      const name = document.getElementById('name').value;
      const description = document.getElementById('deskripsi').value;
      const jenisConsole = document.getElementById('jenisConsole').value;
      const sewa = document.getElementById('sewa').value;

      formData.append('name', name);
      formData.append('deskripsi', description);
      formData.append('tipe', jenisConsole);
      formData.append('harga', sewa);
      // formData.append('id_user', dataUser);

      const uploadUrl = `https://rentconsoleapi.yudho.online/item/${id}`;

      axios.put(uploadUrl, formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
      .then(response => {
          console.log('URL gambar berhasil disimpan:', response.data);
          location.reload(true)
      })
      .catch(error => {
          console.error('Terjadi kesalahan:', error);
      });
  }



const updateData = async (id, nama, gambar, jenis, deskripsi, stock, harga) => {
  document.getElementById('name').value = nama;
  document.getElementById('imagePreview').setAttribute('src', gambar);
  document.getElementById('deskripsi').value = deskripsi;
  document.getElementById('jenisConsole').value = jenis;
  document.getElementById('stock').value = stock;
  document.getElementById('stock').setAttribute('disabled', '');
  document.getElementById('sewa').value = harga;
  document.getElementById('buttonItem').innerText = 'Update';
  document.getElementById('buttonItem').setAttribute('onClick', `editData(${id})`);
}

function increseStock(id) {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const dataUser = userData.data.id_user

  axios.post(`https://rentconsoleapi.yudho.online/item/stock`, {
    id_user: dataUser,
    id_barang: id,
    stock: 1
  })
  .then((response) => {
    console.log(response);
    location.reload(true)
  })
  .catch((error) => {
    console.log(error);
  });
}

function decreseStock(id) {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const dataUser = userData.data.id_user

  axios.post(`https://rentconsoleapi.yudho.online/item/stock`, {
    id_user: dataUser,
    id_barang: id,
    stock: -1
  })
  .then((response) => {
    console.log(response);
    location.reload(true)
  })
  .catch((error) => {
    console.log(error);
  });
}

function detailData(id) {
  axios.get(`https://rentconsoleapi.yudho.online/item/single/${id}`)
  .then((response) => {
    console.log(response)
    localStorage.setItem('ItemDetail', JSON.stringify(response.data));
    window.location.href = '../../dashboard/item/itemDetail.html';
  })
  .catch((error) => {
    console.log(error);
    alert("Ndak bisa ambil data")
  })
}

const deleteData = async (uid) => {
  await axios.delete(`https://rentconsoleapi.yudho.online/item/${uid}`)
    .then((response) => {
      console.log(response);
      location.reload(true)
    })
    .catch((error) => {
      console.log(error);
      alert("Item Masih Di SEWA Pelanggan!")
    });
};

document.addEventListener('DOMContentLoaded', function() {
const getData = async () => {
await axios.get('https://rentconsoleapi.yudho.online/item')
  .then((response) => {
    let bucket = ``;
    let item = response.data.data;
    if (item.length > 0) {
      for (let i = 0; i < item.length; i++) {
        if (item[i].gambar_barang == null) {
          item[i].gambar_barang = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Playstation_logo_colour.svg/640px-Playstation_logo_colour.svg.png"
          // console.log(item[i].gambar_barang)
        }
        bucket += `
          <tr>
            <td><img src="${[item[i].gambar_barang]}" alt="Avatar" class="img-item"></td>
            <td>${item[i].nama_barang}</td>
            <td>Rp.${item[i].harga_sewa}</td>
            <td>
              <div class="input-group input-group-sm">
              <p class="d-flex justify-content-center">
              <span class="input-group-text me-1">Stock</span>
                <button class="btn btn-danger me-1" onclick="decreseStock('${item[i].id_barang}','${item[i].stock}')">-</button>
                <span class="input-group-text ">${item[i].stock}</span>
                <button class="btn btn-primary ms-1" onclick="increseStock('${item[i].id_barang}','${item[i].stock}')">+</button>
              </p>
              </div>
            </td>
            <td>
              <div class="btn-group btn-group-sm" role="group">
                <button onclick="detailData('${item[i].id_barang}')" type="button" class="btn btn-success">Detail</button>
                <button onclick="updateData('${item[i].id_barang}','${item[i].nama_barang}','${item[i].gambar_barang}','${item[i].jenis_barang}','${item[i].deskripsi_barang}','${item[i].stock}','${item[i].harga_sewa}')" type="button" class="btn btn-warning" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">Update</button>
                <button onclick="deleteData('${item[i].id_barang}')" type="button" class="btn btn-sm btn-danger">Delete</button>
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
getData()
// Ambil data pengguna dari localStorage
const userData = JSON.parse(localStorage.getItem('userData'));

if (userData) {
console.log(userData)
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
});