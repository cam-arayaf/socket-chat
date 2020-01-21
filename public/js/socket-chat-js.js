let params = new URLSearchParams(window.location.search);
let ulUsers = document.querySelector('#ulUsers');

const renderUsers = people => {
    console.log(people);
    ulUsers.innerHTML = `<li><a href="javascript:void(0)" class="active">Chat: <span>${ params.get('room') }</span></a></li>`;
    people.forEach(person => ulUsers.innerHTML += `<li><a data-id="${ person.id }" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${ person.name } <small class="text-success">online</small></span></a></li>`);
}

//ulUsers.onclick = () => document.querySelectorAll('a[data-id]').forEach(value => value.onclick = () => console.log(value.dataset.id));

$('#ulUsers').on('click', 'a[data-id]', function() {
    console.log(this.dataset.id);
});