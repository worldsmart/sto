const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
let admins = require('./admin/users');
const fs = require('fs');
const crypto = require('crypto');
const forceSsl = require('express-force-ssl');

const app = express();

const port = 80;

app.use(forceSsl);
app.use(bodyparser.json());
app.use(express.static('./static'));
app.use(express.static('./admin/login_v10'));


app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'main.html'));
});

app.get('/about_us', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'about_us.html'));
});

app.get('/contacts', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'contacts.html'));
});

app.get('/photo_gallery', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'photo_gallery.html'));
});

app.get('/prices', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'prices.html'));
});

app.get('/services', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'services.html'));
});

app.get('/services_3D_wheel_alignment', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'services_3D_wheel_alignment.html'));
});

app.get('/services_body_repair', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'services_body_repair.html'));
});

app.get('/services_computer_diagnostics', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'services_computer_diagnostics.html'));
});

app.get('/services_deteyling', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'services_deteyling.html'));
});

app.get('/services_locksmith_work', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'services_locksmith_work.html'));
});

app.get('/services_minibus_repair', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'services_minibus_repair.html'));
});

app.get('/services_painting', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'services_painting.html'));
});

app.get('/services_tire_fitting', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'services_tire_fitting.html'));
});

app.get('/services_turnkey_car', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'services_turnkey_car.html'));
});

app.get('/admin', (req, res)=>{
    res.sendFile(path.join(__dirname, 'admin', 'login.html'));
});

app.post('/admin/login', (req,res)=>{
    if(admins.password == req.body.password) res.sendFile(path.join(__dirname, 'admin', 'board.html'));
    else res.send('');
});

app.post('/admin/c_password', (req,res)=>{
    if(admins.password == req.body.password) {
        fs.writeFile(path.join(__dirname, 'admin', 'users.json'), '{"password":"'+ req.body.new_password +'"}', (err)=>{
            if(!err) res.json({'new_password':req.body.new_password});
            else res.json({'err':'server error'});
        });
    }
    else res.json({'err':'server error'});
});

app.post('/admin/orders', (req,res)=>{
    if(admins.password == req.body.password) {
        fs.readFile(path.join(__dirname, 'admin', 'orders.txt'), 'utf8', (err,data)=>{
            data = data.split('#$@@34hj');
            data.splice(0,1);
            for(let i = 0;i < data.length; i++){
                data[i] = JSON.parse(data[i]);
            }
            res.json(data);
        });
    }
    else res.json({'err':'bad password'});
});

app.post('/admin/delete', (req,res)=>{
    if(admins.password == req.body.password) {
        fs.readFile(path.join(__dirname, 'admin', 'orders.txt'), 'utf8', (err,data)=>{
            let find = data.match(new RegExp('\\n#\\$@@34hj.*' + req.body.id + '"}\\n$','m'));
            if(find){
                fs.writeFileSync(path.join(__dirname, 'admin', 'orders.txt'), data.replace(find[0], ''));
            }
            res.json({});
        });
    }
    else res.json({'err':'bad password'});
});

app.post('/ordercall', (req,res)=>{
    if(req.body.name && req.body.phone){
        fs.appendFileSync(path.join(__dirname, 'admin', 'orders.txt'), '\n#$@@34hj{"name":"'+ req.body.name +'","phone":"'+ req.body.phone +'","id":"'+ crypto.randomBytes(15).toString('hex')+'"}\n' );
        res.json({});
    }
});

app.get('*', (req, res)=>{
    res.send('Cannot get: page 404');
});


app.listen(port, ()=>{
    console.log('http Server started on port ' + port);
});

const https = require('https');
const privateKey  = fs.readFileSync(path.join(__dirname, 'cert', 'private.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'cert', 'certificate.crt'), 'utf8');
const ca = fs.readFileSync(path.join(__dirname, 'cert', 'ca_bundle.crt'), 'utf8');

const credentials = {key: privateKey, cert: certificate, ca: ca};

const portS = 443;

https.createServer(credentials, app).listen(portS,()=>{
    console.log('https Server started on port ' + portS);
});