let params = new URLSearchParams(window.location.search);
let name = params.get('name');
let room = params.get('room');

let ulUsers = document.querySelector('#ulUsers');
let txtRoom = document.querySelector('#txtRoom');
let formSend = document.querySelector('#formSend');
let txtMessage = document.querySelector('#txtMessage');
let ulChatbox = document.querySelector('#ulChatbox');

const renderUsers = people => {
    let html = `<li><a href="javascript:void(0)" class="active">Chat: <span>${ room }</span></a></li>`;
    people.forEach(person => {
        html += '<li>';
        html += `<a data-id="${ person.id }" href="javascript:void(0)">`;
        html += '<img src="assets/images/users/1.jpg" alt="user-img" class="img-circle">';
        html += `<span>${ person.name }<small class="text-success">online</small></span>`;
        html += '</a>';
        html += '</li>';
    });
    ulUsers.innerHTML = html;
    txtRoom.innerText = room;
    document.querySelectorAll('a[data-id]').forEach(value => value.onclick = () => console.log(value.dataset.id));
}

const renderMessages = (person, i) => {
    let html = '';
    let date = new Date(person.date);
    let time = `${ date.getHours() }:${ date.getMinutes() }`;
    let adminClass = person.name === 'Admin' ? 'danger' : 'info';
    if (i) {
        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += `<h5>${ person.name }</h5>`;
        html += `<div class="box bg-light-inverse">${ person.message }</div>`;
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += `<div class="chat-time">${ time }</div>`;
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn">';
        if (person.name !== 'Admin') html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        html += '<div class="chat-content">';
        html += `<h5>${ person.name }</h5>`;
        html += `<div class="box bg-light-${ adminClass }">${ person.message }</div>`;
        html += '</div>';
        html += `<div class="chat-time">${ time }</div>`;
        html += '</li>';
    }
    ulChatbox.innerHTML += html;
}

const scrollBottom = () => {
    let ulChatboxJq = $('#ulChatbox');
    let newMessage = ulChatboxJq.children('li:last-child');
    let clientHeight = ulChatboxJq.prop('clientHeight');
    let scrollTop = ulChatboxJq.prop('scrollTop');
    let scrollHeight = ulChatboxJq.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight() || 0;
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) ulChatboxJq.scrollTop(scrollHeight);
}

formSend.addEventListener('submit', event => {
    event.preventDefault();
    if (txtMessage.value.trim().length === 0) return;
    socket.emit('createMessage', { name, message: txtMessage.value.trim() }, resp => {
        txtMessage.value = '';
        txtMessage.focus();
        renderMessages(resp, true);
        scrollBottom();
    });
});