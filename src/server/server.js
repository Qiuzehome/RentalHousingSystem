var mysql = require('./mysql');
var connection = mysql.connection;
var http = require('http');
var url = require('url')
var querystring = require('querystring')
var server = http.createServer();
connection.connect();
server.on('request', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var arg = url.parse(req.url).query;
    var params = querystring.parse(arg);

    if (pathname == '/') {
        console.log('收到请求/')
        connection.query('select * from user', function (error, results, fields) {
            if (error) throw error;
            res.write(JSON.stringify(results));
            res.end();
            return results;
        });

    }
    else if (pathname == '/house_list') {
        console.log('收到请求/house_list')
        connection.query('select * from house', function (error, results, fields) {
            if (error) throw error;
            res.write(JSON.stringify(results));
            res.end();
            return results;
        });

    }
    else if (pathname == '/regist') {
        connection.query('insert into user (user,password,name,phone,email) value ("' + params.user + '","' + params.password + '","' + params.name + '","' + params.phone + '","' + params.email + '")', function (error, results, fields) {
            if (error) throw error;
            res.end();
            return results
        })

    }
    else if (pathname == '/rank') {
        var uuid = require('node-uuid');
        connection.query('insert into house (id,location,price,tittle,city,provinces,area,landlord,timeLimit,img,phone,email,floor,room) value ("' + uuid.v1() + '","' + params.location + '","' + params.price + '","' + params.tittle + '","' + params.city + '","' + params.provinces + '","' + params.area + '","' + params.user + '","' + params.time_limit + '","' + params.pic + '","' + params.phone + '","' + params.email + '","' + params.floor + '","' + params.room.toString() + '")', function (error, results, fields) {
            if (error) throw error;
            res.end();
            return results
        })
    }
    else if (pathname == '/rankout') {
        connection.query('delete from house where id="'+params.id+'" ', function (error, results, fields) {
            if (error) throw error;
            res.write(JSON.stringify(results));
            res.end();
            return results;
        });

    }
    else if (pathname == '/re_personal') {
        connection.query('update user set password ="' + params.psw + '",name ="' + params.name + '",email="' + params.email + '",phone="' + params.phone + '" where user="' + params.user + '"', function (error, results, fields) {
            if (err) throw error;
            res.end();
            return results;
        })
    }

})
server.listen(8888, function () {
    console.log('8888启动成功')
})
