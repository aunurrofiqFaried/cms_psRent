const deleteDataItem = (id_barang) => {
  axios.delete(`https://apirentalps.yudho.online/item/${id_barang}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
const getDataItem = async () => {
await axios.get('https://rentconsoleapi.yudho.online/item')
  .then((response) => {
    console.log(response.data)
    let bucket = ``;
    let item = response.data.data;
    if (item.length > 0) {
      for (let i = 0; i < item.length; i++) {
        bucket += `
        <div class="col">
          <div class="card mt-3 mb-3 shadow rounded">
            <img src="${item[i].gambar_barang}" class="card-img-top" alt="..." style="width:259px;">
            <div class="card-body">
              <h5 class="card-title">${item[i].jenis_barang}</h5>
              <p class="card-text" style="font-size: small;">${item[i].deskripsi_barang}</p>
              <p class="card-text" style="font-size: smaller;">Stock : <b>${item[i].stock}</b> | Harga/Hari : <b>Rp.${item[i].harga_sewa}</b></p>
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button type="button" class="btn btn-danger" onclick="deleteDataItem(${item[i].id_barang})">Delete</button>
                <button type="button" class="btn btn-warning">Update</button>
              </div>
            </div>
          </div>
        </div>
        `
      }
    }else {
      bucket += `
        <h1 class="text-center">
            Data Tidak Ada Anjayyy
        </h1>`
    }
    document.getElementById('result').innerHTML = bucket;
  })
  .catch((error) => {
    let bucket = `
      <h1>
        ${error.message="Gangguan..."}
      </h1>`;
    document.getElementById('result').innerHTML = bucket;
  });
}
getDataItem()

