

  const userData = JSON.parse(localStorage.getItem('userData'));

  if (userData) {
    document.addEventListener('DOMContentLoaded', function() {
      const detail = JSON.parse(localStorage.getItem('UserDetail'));
      console.log(detail)
      const id = detail.data.id_user
      const getDataDetail = async () => {
        await axios.get(`https://rentconsoleapi.yudho.online/person/single/${id}`)
          .then((response) => {
            let user = response.data.data;
            document.getElementById('avatar').setAttribute('src', user.avatar);
            document.getElementById('name').innerHTML = user.name
            document.getElementById('email').innerHTML = user.email
            document.getElementById('role').innerHTML = user.role
            document.getElementById('bookmark').innerHTML = user.bookmark_count
            document.getElementById('rent').innerHTML = user.rent_count
          })
          .catch((error) => {
            console.log(error)
            alert("Gangguan")
          });
      }
      getDataDetail()
    
    
      const getDataBookmark = async () => {
        await axios.get(`https://rentconsoleapi.yudho.online/person/bookmark/all?id_user=${id}`)
          .then((response) => {
            console.log(response)
            let bucket = ``;
            let item = response.data.data;
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
                    <td>${item[i].type}</td>
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
            document.getElementById('listBookmark').innerHTML = bucket;
          })
          .catch((error) => {
            console.log(error)
            let bucket = `
              <tr>
                <td colspan="3" class="text-center">
                  ${error.response.data.message}
                </td>
              </tr>`;
            document.getElementById('listBookmark').innerHTML = bucket;
          });
        }
      getDataBookmark()
    
      const getDataRent = async () => {
        await axios.get(`https://rentconsoleapi.yudho.online/person/rent/${id}`)
          .then((response) => {
            console.log(response)
            let bucket = ``;
            let item = response.data.data;
            if (item.length > 0) {
              for (let i = 0; i < item.length; i++) {
                let sewaDetail = ``;
                for (let j = 0; j < item[i].sewa.length; j++) {
                  sewaDetail += `
                    <option>${item[i].sewa[j].name} = ${item[i].sewa[j].quantity}</option>
                    `
                }
                bucket += `
                <tr>
                <td>${item[i].id_transaksi}</td>
                <td>Rp.${item[i].harga}</td>
                <td>${item[i].tanggal_sewa} - ${item[i].tanggal_kembali}</td>
                <td>${item[i].status}</td>
                <td>
                <select class="form-select" multiple aria-label="multiple select example" size="2">
                ${sewaDetail}
                </select>
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
            document.getElementById('listRent').innerHTML = bucket;
          })
          .catch((error) => {
            console.log(error)
            let bucket = `
              <tr>
                <td colspan="5" class="text-center">
                  ${error.response.data.message}
                </td>
              </tr>`;
            document.getElementById('listRent').innerHTML = bucket;
          });
        }
      getDataRent()
    })
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
