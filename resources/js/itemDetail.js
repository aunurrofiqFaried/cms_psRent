const tambahBundle = async (id) => {
  const id_game = id
  const detail = JSON.parse(localStorage.getItem('ItemDetail'));
  const ItemDetail = detail.data.id_item
  await axios.post(`https://rentconsoleapi.yudho.online/item/game/ps`, {
    id_game : id_game,
    id_barang : ItemDetail
  })
  .then((response) => {
    console.log(response);
    window.location.href = 'item.html';
    window.location.reload();
    window.location.href = 'itemDetail.html';
  })
  .catch((error) => {
    console.log(error);
    alert("Game Sudah Tersedia!")
  });
};

const deleteData = async (id_ps_game) => {
  await axios.delete(`https://rentconsoleapi.yudho.online/item/game/ps/erase?id_ps_game=${id_ps_game}`)
    .then((response) => {
      console.log(response);
      location.reload(true)
    })
    .catch((error) => {
      console.log(error);
    });
};

document.addEventListener('DOMContentLoaded', function() {
  const detail = JSON.parse(localStorage.getItem('ItemDetail'));
  
  const getDataDetail = async () => {
    const id = detail.data.id_item
    await axios.get(`https://rentconsoleapi.yudho.online/item/single/${id}`)
      .then((response) => {
        let item = response.data.data;
        console.log(item)
        document.getElementById('avatar').setAttribute('src', item.image);
        document.getElementById('judul').innerHTML = item.name
        document.getElementById('deskripsi').innerHTML = item.deskripsi
        document.getElementById('type').innerHTML = item.type
        document.getElementById('harga').innerHTML = item.price
        document.getElementById('stock').innerHTML = item.stock

        let bucketGame = ``;
        let game = item.all_game;
        if (game.length > 0) {
          for (let i = 0; i < game.length; i++) {
            if (game[i].image == null) {
              game[i].image = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Playstation_logo_colour.svg/640px-Playstation_logo_colour.svg.png"
              // console.log(item[i].gambar_barang)
            }
            bucketGame += `
              <tr>
                <td><img src="${[game[i].image]}" alt="Avatar" class="img-item"></td>
                <td>${game[i].name}</td>
                <td>${game[i].deskripsi}</td>
                <td>
                <button onclick="deleteData('${game[i].id_ps_game}')" type="button" class="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>`
          }
        }else {
          bucketGame += `
            <tr>
              <td colspan="3" class="text-center">
                Tidak Ada bundle Game
              </td>
            </tr>`
        }
        document.getElementById('listGame').innerHTML = bucketGame;
      
        let bucketRent = ``;
        let rent = item.all_rent;
        if (rent.length > 0) {
          for (let i = 0; i < rent.length; i++) {
            if (rent[i].avatar == null) {
              rent[i].avatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Playstation_logo_colour.svg/640px-Playstation_logo_colour.svg.png"
              // console.log(item[i].gambar_barang)
            }
            bucketRent += `
              <tr>
                <td><img src="${[rent[i].avatar]}" alt="Avatar" class="img-item"></td>
                <td>${rent[i].name}</td>
                <td>${rent[i].order_id}</td>
                <td>${rent[i].date.start}</td>
                <td>${rent[i].date.end}</td>
              </tr>`
          }
        }else {
          bucketRent += `
            <tr>
              <td colspan="5" class="text-center">
                Tidak Ada Rental
              </td>
            </tr>`
        }
        document.getElementById('listRent').innerHTML = bucketRent;

        let bucketReview = ``;
        let review = item.all_review;
        if (review.length > 0) {
          for (let i = 0; i < review.length; i++) {
            if (review[i].avatar == null) {
              review[i].avatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Playstation_logo_colour.svg/640px-Playstation_logo_colour.svg.png"
              // console.log(item[i].gambar_barang)
            }
            if (review[i].rate == 1) {
              review[i].rate = "\u2B50"
            } if (review[i].rate == 2) {
              review[i].rate = "\u2B50\u2B50"
            } if (review[i].rate == 3) {
              review[i].rate = "\u2B50\u2B50\u2B50"
            } if (review[i].rate == 4) {
              review[i].rate = "\u2B50\u2B50\u2B50\u2B50"
            } if (review[i].rate == 5) {
              review[i].rate = "\u2B50\u2B50\u2B50\u2B50\u2B50"
            }
            bucketReview += `
            <div class="container-chat">
                  <img src="${[review[i].avatar]}" alt="Avatar" class="img-review">
                  <h5>${[review[i].name]}</h5>
                  <p>${[review[i].message]} </p>
                  <span >${[review[i].rate]}</span>
                  <span class="time-right">${[review[i].review_at]}</span>
            </div>
              `
          }
        }else {
          bucketReview += ``
        }
        document.getElementById('listReview').innerHTML = bucketReview;

      })
      .catch((error) => {
        console.log(error)
      });
  }

  getDataDetail()

  const getDataGame = async () => {
    await axios.get('https://rentconsoleapi.yudho.online/item/game/all?page=1')
      .then((response) => {
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
                <td>
                  <div class="btn-group btn-group-sm" role="group" aria-label="Basic mixed styles example">
                    <button onclick="tambahBundle(${item[i].id})" type="button" class="btn btn-primary">Tambah</button>
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
        document.getElementById('game').innerHTML = bucket;
      })
      .catch((error) => {
        let bucket = `
          <tr>
            <td colspan="4" class="text-center">
              ${error.message="Gangguan..."}
            </td>
          </tr>`;
        document.getElementById('game').innerHTML = bucket;
      });
    }
    getDataGame()

    const userData = JSON.parse(localStorage.getItem('userData'));

    if (detail) {
    console.log(detail)
    } else {
      // Jika tidak ada data pengguna, redirect ke halaman login
      window.location.href = 'item.html'; // Ganti dengan halaman login yang sesuai
    }
    
    // Tambahkan event listener untuk tombol logout
    document.getElementById('logoutButton').addEventListener('click', function() {
              // Hapus data pengguna dari localStorage
      localStorage.removeItem('userData');
              // Redirect ke halaman login
      window.location.href = '../../login.html'; // Ganti dengan halaman login yang sesuai
    });
})