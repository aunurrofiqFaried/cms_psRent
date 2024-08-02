function detailData(id_cs, id_member, userName, userAvatar) {
  const data = {
      id_cs: id_cs,
      id_member: id_member,
      username: userName,
      useravatar: userAvatar
  };
  localStorage.setItem('Chat', JSON.stringify(data));
  window.location.href = '../../dashboard/cs/message.html';
}

const userData = JSON.parse(localStorage.getItem('userData'));
if (userData) {
  document.addEventListener('DOMContentLoaded', function() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const id = userData.data.id_user
    const getData = () => {
    axios.get(`https://rentconsoleapi.yudho.online/service/group/${id}`)
      .then((response) => {
      console.log(response)
      let chat = response.data.data;
      let bucketChat = ``;
      if (chat.length > 0) {
        for (let i = 0; i < chat.length; i++) {
          let userAvatar = chat[i].users.length > 0 ? chat[i].users[0].avatar : 'null';
          let userName = chat[i].users.length > 0 ? chat[i].users[0].name : 'null';
          let id_member = chat[i].users.length > 1 ? chat[i].users[1].id_member : 'null';
          bucketChat += `
          <div class="container-chat" type="button" onclick="detailData('${chat[i].id_cs}','${id_member}','${userName}' ,'${userAvatar}')">
                <img src="${userAvatar}" alt="Avatar" class="img-review">
                <h5>${userName}</h5>
                <p class="last-message">${[chat[i].last_message]} </p>
                <span class="time-right">${[chat[i].update_at]}</span>
          </div>
            `
        }
      }else {
        bucketReview += ``
      }
      document.getElementById('listChat').innerHTML = bucketChat;
      })
      .catch((error) => {
        console.log(error)
      });
    }
    getData()
    
    setInterval(getData, 2000);
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
