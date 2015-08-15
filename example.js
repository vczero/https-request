var httpsRequest = require('https-request');

var options = {
    hostname: 'www.baidu.com',
    path: '/'
};

var header = null; //可以是需要传递的json对象
var form = null; //可以是json对象或者字符串

httpsRequest(options, header, form, function(err, data){
    if(!err){
        console.log(data);
    }else{
        console.log(err);
    }
});