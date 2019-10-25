if(sessionStorage.getItem('login')) auth(sessionStorage.getItem('login'));

function auth(l = ''){
    let password;
    if(l) password = l;
    else password = document.getElementById('password').value;
    const Http = new XMLHttpRequest();
    const url='/admin/login';
    Http.open("POST", url);
    Http.setRequestHeader('Content-type', 'application/json');
    Http.send(JSON.stringify({
        "password":password
    }));

    Http.onreadystatechange = (e) => {
        if(Http.readyState == 4 && Http.status == 200) {
            if(!Http.responseText){
                if(sessionStorage.getItem('login')) sessionStorage.removeItem('login');
                document.getElementById('err').innerText = 'Bad data';
                document.getElementById('err').style.display = 'flex'
            }else {
                document.body.innerHTML = Http.responseText;
                start();
                sessionStorage.setItem('login', password);
            }
        }else {
            document.getElementById('err').innerText = 'Query error';
            document.getElementById('err').style.display = 'flex'
        }
    }
}