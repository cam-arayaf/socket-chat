let socket = io();

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('Name and room are required');
}

let user = { name: params.get('name'), room: params.get('room') };

socket.on('connect', () => {
    console.log('Connected to server');
    socket.emit('enterToChat', user, (resp) => {
        renderUsers(resp);
    });
});

socket.on('disconnect', () => {
    console.log('Connection refused');
});

socket.on('createMessage', (message) => {
    renderMessages(message, false);
    scrollBottom();
});

socket.on('listPeople', (people) => {
    renderUsers(people);
});

socket.on('privateMessage', (message) => {
    console.log('Private Message:', message);
});