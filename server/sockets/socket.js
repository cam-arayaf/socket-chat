const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');
const users = new Users();

io.on('connection', (client) => {
    client.on('enterToChat', (data, callback) => {
        if (!data.name || !data.room) return callback({ err: true, message: 'Name and room are required' });
        client.join(data.room);
        users.addPerson(client.id, data.name, data.room);
        client.broadcast.to(data.room).emit('listPeople', users.getPeopleByRoom(data.room));
        client.broadcast.to(data.room).emit('createMessage', createMessage('Admin', `${ data.name } entered the chat`));
        callback(users.getPeopleByRoom(data.room));
    });

    client.on('createMessage', (data, callback) => {
        let person = users.getPerson(client.id);
        let message = createMessage(person.name, data.message);
        client.broadcast.to(person.room).emit('createMessage', message);
        callback(message);
    });

    client.on('disconnect', () => {
        let deletePerson = users.deletePerson(client.id);
        client.broadcast.to(deletePerson.room).emit('createMessage', createMessage('Admin', `${ deletePerson.name } left the chat`));
        client.broadcast.to(deletePerson.room).emit('listPeople', users.getPeopleByRoom(deletePerson.room));
    });

    client.on('privateMessage', (data) => {
        let person = users.getPerson(client.id);
        client.broadcast.to(data.to).emit('privateMessage', createMessage(person.name, data.message));
    });
});