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
        connection.query('select * from user', function (error, results, fields) {
            if (error) throw error;
            res.write(JSON.stringify(results));
            res.end();
            return results;
        });

    }
    else if (pathname == '/house_list') {
        connection.query('select * from house', function (error, results, fields) {
            if (error) throw error;
            res.write(JSON.stringify(results));
            res.end();
            return results;
        });

    }
    else if (pathname == '/regist') {
        connection.query('select * from user', function (error, results, fields) {
            if (error) throw error;
            for (let i = 0; i < results.length; i++) {
                if (results[i].user == params.user) {
                    res.end('false')
                    return results
                }
            }
            connection.query('insert into user (user,password,name,phone,email) value ("' + params.user + '","' + params.password + '","' + params.name + '","' + params.phone + '","' + params.email + '")', function (error, results, fields) {
                if (error) throw error;
                res.end('true');
                return results
            })
        })
    }
    else if (pathname == '/rank') {
        var uuid = require('node-uuid');
        connection.query('insert into house (id,location,price,tittle,city,provinces,area,landlord,timeLimit,img,phone,email,floor,room,userid) value ("' + uuid.v1() + '","' + params.location + '","' + params.price + '","' + params.tittle + '","' + params.city + '","' + params.provinces + '","' + params.area + '","' + params.landlord + '","' + params.time_limit + '","' + params.pic + '","' + params.phone + '","' + params.email + '","' + params.floor + '","' + params.room.toString() + '","' + params.userid + '")', function (error, results, fields) {
            if (error) throw error;
            res.end();
            return results
        })
    }
    else if (pathname == '/rankout') {
        connection.query('delete from house where id="' + params.id + '" ', function (error, results, fields) {
            if (error) throw error;
            res.write(JSON.stringify(results));
            res.end();
            return results;
        });

    }
    else if (pathname == '/re_personal') {
        connection.query('update user set password ="' + params.psw + '",name ="' + params.name + '",email="' + params.email + '",phone="' + params.phone + '" where user="' + params.user + '"', function (error, results, fields) {
            if (error) throw error;
            res.end();
            return results;
        })
    } else if (pathname == '/load') {
        connection.query('select * from user', function (error, results, fields) {
            if (error) throw error;
            var usertype;
            for (let i = 0; i < results.length; i++) {
                if (params.user == results[i].user && params.password == results[i].password) {
                    res.write('ture');
                    res.end();
                    return;
                }
            }
            res.write('false');
            res.end();
            return
        })
    } else if (pathname == '/getPersonal') {
        connection.query('select * from user', function (error, results, fields) {
            if (error) throw error;
            for (let i = 0; i < results.length; i++) {
                if (results[i].user == params.user) {
                    res.end(JSON.stringify(results[i]));
                }
            }
            return results;
        })

    }
    else if (pathname == '/getHouseList') {
        connection.query('select * from house', function (error, results, fields) {
            if (error) throw error;
            var myHouselist = [];
            for (let i = 0; i < results.length; i++) {
                if (results[i].userid == params.user) {
                    myHouselist.push(results[i])
                }
            }
            res.end(JSON.stringify(myHouselist));
            return results;
        })

    }
})
server.listen(8888, function () {
    console.log('8888启动成功')
})
