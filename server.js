const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect((err,...args)=>{
    if (err ) {
        console.log('db connect error!');
    }
    else {
        console.log('db connect success!');
    }
});

const multer = require('multer');
const upload = multer({
    dest:'./upload'
});

app.get('/api/hello', (req, res) => {
    res.send({message:'hello expresss!!!'});
});

app.get('/api/customers', (req, res)=>{
    console.log('api customers called!!!!');
    connection.query(
        "select * from customer where isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
    
});


app.use('/image', express.static('./upload'));
app.post('/api/customers', upload.single('image'), (req, res)=>{
    let sql = 'insert into customer values (null,?,?,?,?,?, now(), 0)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    console.log(name);
    console.log(image);
    console.log(birthday);
    console.log(gender);
    console.log(job);

    let params = [image,name,birthday,gender,job];
    connection.query(sql,params, (err, rows, fields)=>{
        res.send(rows)
    });

});

app.delete('/api/customers/:id', (req, res)=>{
    let sql = 'update customer set isDeleted = 1 where id = ?';
    let params = [req.params.id];
    connection.query(sql,params, (err, rows, fields)=>{
        res.send(rows)
    });
});

app.listen(port,() => console.log('Listening ' + port));
