'use strict'

let nameUser = document.getElementsByName('userName')[0],
	login = document.querySelector('.login'),
	blockLogin = document.querySelector('div.login');

var h1 = document.createElement('h1');
var input = document.createElement('input');

function addLS(e) {
	var newName = nameUser.value;
 	localStorage.setItem('nameUser', newName);
}
function checkLS(e) {
	if (nameUser.value = localStorage.nameUser){
		blockLogin.style.display = 'none';
		document.body.appendChild(h1);
		h1.textContent = `Привет ${nameUser.value} !`;
		document.body.appendChild(input);
		input.setAttribute('type', "submit");
		input.setAttribute('value', 'Выйти');
		input.classList.add('logout');
	}
}
function logoutUser(e) {
	localStorage.removeItem('nameUser');
	blockLogin.style.display = 'block';
	document.body.removeChild(h1);
	document.body.removeChild(input);
}

login.addEventListener('click', addLS);
window.addEventListener('load', checkLS);
input.addEventListener('click', logoutUser);


