function start() {
    const Http = new XMLHttpRequest();
    const url='/admin/orders';
    Http.open("POST", url);
    Http.setRequestHeader('Content-type', 'application/json');
    Http.send(JSON.stringify({
        "password":sessionStorage.getItem('login')
    }));

    Http.onreadystatechange = (e) => {
        if(Http.readyState == 4 && Http.status == 200) {
            let res = JSON.parse(Http.responseText);
            if(res['err']){
                setTimeout(()=>{
                    window.location.reload();
                }, 200);
            }else {
               for(let i = res.length - 1; i >= 0;i--){
                   add(res[i]);
               }
            }
        }
    }
}

function logout() {
    sessionStorage.removeItem('login');
    window.location.reload();
}

function add(obj) {
    document.getElementById('list').innerHTML += `<li class="list-item" id="`+ obj.id +`">
        <div class="cont">
            <div style="flex-grow: 1">`+ obj.name +`</div>
            <div style="flex-grow: 1">`+ obj.phone +`</div>
            <div class="deleter" onclick="removeRecord('`+ obj.id +`')">Delete</div>
        </div>
    </li>`;
}

function removeRecord(number) {
    if(confirm('Are you sure you want to delete?')){
        const Http = new XMLHttpRequest();
        const url='/admin/delete';
        Http.open("POST", url);
        Http.setRequestHeader('Content-type', 'application/json');
        Http.send(JSON.stringify({
            "password":sessionStorage.getItem('login'),
            "id":number
        }));

        document.getElementById(number).remove();
    }
}

function change_password() {
    let newPassword = prompt('Enter a new password');
    if(newPassword){
        let conf = confirm('Вы уверенны, что хотите изменить пароль на: ' + newPassword + ' ?');
        if(conf){
            const Http = new XMLHttpRequest();
            const url='/admin/c_password';
            Http.open("POST", url);
            Http.setRequestHeader('Content-type', 'application/json');
            Http.send(JSON.stringify({
                "password":sessionStorage.getItem('login'),
                "new_password":newPassword
            }));

            Http.onreadystatechange = (e) => {
                if(Http.readyState == 4 && Http.status == 200) {
                    let res = JSON.parse(Http.responseText);
                    if(res['err']){
                        alert(Http.responseText['err']);
                    }else {
                        alert('Password changed to: ' + res['new_password']);
                        sessionStorage.setItem('login', res['new_password']);
                        window.location.reload();
                    }
                }
            }
        }
    }
}