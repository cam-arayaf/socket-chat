let socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('Name and room are required');
}

let user = { name: params.get('name'), room: params.get('room') };

socket.on('connect', () => {
    console.log('Connected to server');
    socket.emit('enterToChat', user, (resp) => {
        console.log('Connected people:', resp);
    });
});

socket.on('disconnect', () => {
    console.log('Connection refused');
});

socket.on('createMessage', (message) => {
    console.log('Server:', message);
});

socket.on('listPeople', (people) => {
    console.log('New connected people:', people);
});

socket.on('privateMessage', (message) => {
    console.log('Private Message:', message);
});