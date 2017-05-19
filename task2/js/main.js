'use strict'

let nameUser = document.getElementsByName('userName')[0],
	passwordUser = document.getElementsByName('password')[0],
	login = document.querySelector('input.login'),
	blockLogin = document.querySelector('div.login'),
	user1 = [];

var h1 = document.createElement('h1');

init();
  
login.addEventListener('click', checkUser);
  
function init() {
  	user1.push({
    	name: 'user1',
    	password: 'qwerty'
  	});

    localStorage.user1 = JSON.stringify(user1);
   
    // получаем куки
    var userCookie = getCookie();
   
    if (userCookie){
    	var account = isValidName(userCookie.name, userCookie.password);
    	if (account) {
    		successfully(account.name);
    		return;
    	}	
    }

    blockLogin.style.display = 'block';
}
  
function successfully(name) {
	blockLogin.style.display = 'none';
 	document.body.appendChild(h1);
 	h1.textContent = `Привет ${name}! Ты успешно зашёл в свой кабинет.`;
}

function errorAccount() {
	blockLogin.style.display = 'block';
	document.body.appendChild(h1);
	h1.textContent = "Не верно указан логин или пароль!";
	h1.style.color = 'red';
}

function getCookie() {
    var nameCookie = document.cookie.match(/userName=(\w+)/);
    if (nameCookie) {
      var pswCookie = document.cookie.match(/password=(\w+)/);
      if (pswCookie) {
        return {
          name: nameCookie[1],
          password: pswCookie[1]
        }
      }
    }
    return null;
}

function isValidName(name, psw) {
    var user1 = JSON.parse(localStorage.user1) || [];
    
    for (var i = 0, max = user1.length; i < max; i++) {
      var requireUser = user1[i];

      if (requireUser.name === name && requireUser.password === psw) {
        return requireUser;
      }
    }    
    return null;
}

function setCookie(name, psw) {
    var date = new Date();
    date.setSeconds(date.getSeconds() + 60);

    document.cookie = `userName=${name}; expires=${date.toUTCString()}`;
    document.cookie = `password=${psw}; expires=${date.toUTCString()}`;
}

function checkUser(e) {
    var account = isValidName(nameUser.value, passwordUser.value);   
    if (account) {
      setCookie(account.name, account.password);
      successfully(account.name);
    } else {
    	e.preventDefault();
    	errorAccount();
    }
}
