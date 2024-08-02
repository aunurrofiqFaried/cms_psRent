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

      formData.append('name', name);
      formData.append('deskripsi', description);
      formData.append('id_user', dataUser);

      const uploadUrl = 'https://rentconsoleapi.yudho.online/forum';

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

function editData(id_forum) {
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

formData.append('name', name);
formData.append('deskripsi', description);

const uploadUrl = `https://rentconsoleapi.yudho.online/forum/${id_forum}`;

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

const updateData = async (id_forum, name,deskripsi) => {
  document.getElementById('name').value = name;
  document.getElementById('deskripsi').value = deskripsi;
  document.getElementById('buttonForum').innerText = 'Update';
  document.getElementById('buttonForum').setAttribute('onClick', `editData(${id_forum})`);
}

const deleteData = async (id_forum) => {
  await axios.delete(`https://rentconsoleapi.yudho.online/forum/${id_forum}`)
    .then((response) => {
      location.reload(true)
    })
    .catch((error) => {
      alert(error.response.data.message)
    });
};

const userData = JSON.parse(localStorage.getItem('userData'));
if (userData) {
document.addEventListener('DOMContentLoaded', function() {
const getData = async () => {
await axios.get('https://rentconsoleapi.yudho.online/forum')
  .then((response) => {
    let bucket = ``;
    let item = response.data.data;
    console.log(item)
    let jumlah = item.length
    console.log(jumlah) 
    if (item.length > 0) {
      for (let i = 0; i < item.length; i++) {
        if (item[i].image == null) {
          item[i].image = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Playstation_logo_colour.svg/640px-Playstation_logo_colour.svg.png"
          // console.log(item[i].image)
        }
        bucket += `
          <tr>
            <td><img src="${[item[i].image]}" alt="Avatar" class="img-item"></td>
            <td>${item[i].name}</td>
            <td>${item[i].deskripsi}</td>
            <td>
              <div class="btn-group btn-group-sm" role="group" aria-label="Basic mixed styles example">
                <button onclick="updateData('${item[i].id_forum}','${item[i].name}','${item[i].deskripsi}')" type="button" class="btn btn-warning" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">Update</button>
                <button onclick="deleteData(${item[i].id_forum})" type="button" class="btn btn-danger">Delete</button>
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
});
} else {
  window.location.href = '../../login.html'; 
}
// Tambahkan event listener untuk tombol logout
document.getElementById('logoutButton').addEventListener('click', function() {
          // Hapus data pengguna dari localStorage
  localStorage.removeItem('userData');
          // Redirect ke halaman login
  window.location.href = '../../login.html';
});
