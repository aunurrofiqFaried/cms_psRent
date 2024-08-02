const id = JSON.parse(localStorage.getItem('Chat'));
const id_cs = (id.id_cs)
const id_member = (id.id_member)
const username = (id.username)
const useravatar = (id.useravatar)
document.getElementById('imgProfile').setAttribute('src', useravatar);
document.getElementById('name').innerHTML = username;

const kirimChat = async () => {
  let chat = document.getElementById("chat").value
  await axios.post(`https://rentconsoleapi.yudho.online/service/group/message`, {
    id_cs: id_cs,
    id_member: id_member,
    message: chat
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

  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    document.addEventListener('DOMContentLoaded', function() {
    const Chat = JSON.parse(localStorage.getItem('Chat'));
    const id_cs = (Chat.id_cs)
      const getData = () => {
      axios.get(`https://rentconsoleapi.yudho.online/service/group/messages/${id_cs}`)
        .then((response) => {
        let chat = response.data.data;
        console.log(chat)
        let bucketChat = ``;
        if (chat.length > 0) {
          for (let i = chat.length - 1; i >= 0; i--) {
            bucketChat += `
            <div class="container-chat">
              <h6>${[chat[i].name]} :</h6>
              <p class="last-message">${[chat[i].message]} </p>
              <span class="time-right">${[chat[i].send_at]}</span>
            </div>
            `
          }
        }else {
          bucketReview += ``
        }
        document.getElementById('listChat').innerHTML = bucketChat;

        var listChat = document.getElementById('listChat');
        listChat.scrollTop = listChat.scrollHeight;
        })
        .catch((error) => {
          console.log(error)
        });
      }
      getData()

      setInterval(getData, 2000);
    });
  } else {
    window.location.href = '../../login.html';
  }

  // Tambahkan event listener untuk tombol logout
  document.getElementById('logoutButton').addEventListener('click', function() {
            // Hapus data pengguna dari localStorage
    localStorage.removeItem('userData');
            // Redirect ke halaman login
    window.location.href = '../../login.html'; // Ganti dengan halaman login yang sesuai
  });
