function incorrectInput(element) {
    const Parent = document.querySelector(`.textbox.${element}`);
    let elementIcon = Parent.querySelector('.im');
    let elementUnderline = Parent.querySelector('.underline');
    let elementInput = Parent.querySelector('input');
    let inputLabel = Parent.querySelector('label');
    let titleCased = element.toString().slice(0, 1).toUpperCase() + element.toString().slice(1);

    if (!document.querySelector('#title-incorrect')) {
        document.querySelector('#title-incorrect').textContent(`${titleCased} Incorrect`);
    } else {
        let incorrectEl = document.createElement('h3');
        incorrectEl.textContent(`${titleCased} Incorrect`);
        incorrectEl.setAttribute('id', 'title-incorrect');
        document.querySelector('.login-provider').insertAdjacentElement('afterend');
    }

    elementUnderline.classList.add('incorrect');
    inputLabel.classList.add('incorrect');
    elementIcon.classList.add('incorrect');

    setTimeout(() => {
        elementUnderline.classList.remove('incorrect');
        inputLabel.classList.remove('incorrect');
        elementIcon.classList.remove('incorrect');
        elementInput.classList.remove('incorrect');
        elementInput.setAttribute('style', '');
    }, 820);
    elementInput.style.borderColor = 'red';
    elementInput.style.animation = 'shake';
}

/* Firebase - Typically used here  for signing in using providers */
const firebaseConfig = {
    apiKey            : 'AIzaSyAw-zFeGnwfSiET2gZrZaVZebnZyajeR4Q',
    authDomain        : 'high-thrills.firebaseapp.com',
    projectId         : 'high-thrills',
    storageBucket     : 'high-thrills.appspot.com',
    messagingSenderId : '365192472687',
    appId             : '1:365192472687:web:cea4c3c565845ce5ae459a',
    measurementId     : 'G-2DJXH2BFMT'
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const googleAuth = new firebase.auth.GoogleAuthProvider();
const facebookAuth = new firebase.auth.FacebookAuthProvider();

/* END */

// Google Sign-in
document.querySelector('[data-auth-provider=google]').onclick = () => {
    auth
        .signInWithPopup(googleAuth)
        .then(async user => {
            alert(user.user.displayName + ' has signed in using google');
        })
        .catch(err => console.error(err));
};

// Facebook Sign-in
document.querySelector('[data-auth-provider=facebook]').onclick = () => {
    auth
        .signInWithPopup(facebookAuth)
        .then(user => {
            console.log(user.user);
            alert(user + ' has signed in using facebook');
        })
        .catch(err => console.error(err));
};

document.querySelector('form').onsubmit = e => {
    e.preventDefault();
    let username = document.querySelector('#user-name').value;
    let password = document.querySelector('#user-pass').value;

    let loginEntry = {
        username : username,
        password : password
    };

    let http = new XMLHttpRequest();
    let url = window.location.origin + '/login';

    http.open('POST', url, true);

    http.setRequestHeader('Content-Type', 'application/json');

    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200) {
            alert('Successfully Signed in');
        }
    };

    http.send(JSON.stringify(loginEntry));
};

// auth.onAuthStateChanged(user => {
//     if (user) {
//         user.getIdToken(true).then(idToken => {
//             let http = new XMLHttpRequest();
//             let url = window.location.origin + '/login';
//         })
//     }
// })

// When an enter key is pressed in the password,
// it will click the sign in button
document.querySelector('#user-pass').addEventListener('keypress', function(e) {
    if (e.key == 'Enter') document.querySelector('#signin-btn').click();
});

// When the home button is clicked, it will
// redirect to origin url
document.querySelector('#back-btn').onclick = () => (window.location.href = window.location.origin);
