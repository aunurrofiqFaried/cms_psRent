const saveData = async () => {
  let nameForm = document.getElementById("name").value
  let emailForm = document.getElementById("email").value
  await axios.post(`https://rentconsoleapi.yudho.online/person`, {
    name: nameForm,
    email: emailForm
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
};

const deleteDataUser = async (uid) => {
  await axios.delete(`https://rentconsoleapi.yudho.online/person${uid}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getDataUser = async () => {
await axios.get('https://rentconsoleapi.yudho.online/person/?filter=user')
  .then((response) => {
    let bucket = ``;
    let user = response.data.data;
    if (user.length > 0) {
      for (let i = 0; i < user.length; i++) {
        if (user[i].avatar == null) {
          user[i].avatar = "https://www.svgrepo.com/show/327465/person-circle.svg"
          console.log(user[i].avatar)
        }
        bucket += `
          <tr>
            <td><img src="${[user[i].avatar]}" alt="Avatar" class="avatar"></td>
            <td>${user[i].name}</td>
            <td>${user[i].email}</td>
            <td>
              <div class="btn-group btn-group-sm" role="group" aria-label="Basic mixed styles example">
                <button onclick="deleteDataUser(${user[i].uid})" type="button" class="btn btn-danger">Delete</button>
                <button  type="button" class="btn btn-warning">Update</button>
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
