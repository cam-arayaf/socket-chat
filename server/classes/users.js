class Users {
    constructor() {
        this.people = [];
    }

    addPerson(id, name, room) {
        return this.people[this.people.push({ id, name, room }) - 1];
    }

    getPerson(id) {
        return this.people.filter(person => person.id === id)[0];
    }

    getPeople() {
        return this.people;
    }

    getPeopleByRoom(room) {
        return this.people.filter(person => person.room === room);
    }

    deletePerson(id) {
        let deletePerson = this.getPerson(id);
        this.people = this.people.filter(person => person.id !== id);
        return deletePerson;
    }
}

module.exports = { Users };