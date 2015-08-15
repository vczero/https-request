var https = require('https');
var querystring = require('querystring');

module.exports = function(options, headers, form, callback){
	//callback(error, result)
	//处理请求参数
	var options = {
		hostname: options.hostname,
		port: options.port || 443,
		path: options.path || '/',
		method: options.method || 'GET',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};

	//处理请求头
	if(headers){
		for(var i in headers){
			options.headers[i] = headers[i];
		}
	}
	//处理数据
	var data = null;
	if(form && typeof form === 'object'){
		data = querystring.stringify(form);
		options.headers['Content-Length'] = data.length;
	}
	
	if(form && typeof form === 'string'){
		data = form;
		options.headers['Content-Length'] = data.length;
	}
	
	//处理请求
	var dataStr = '';
	var request = https.request(options, function(response) {
		
		response.on('data', function(buffer) {
			dataStr = dataStr + buffer.toString();
		});
		response.on('end', function() {
			callback(null, dataStr);
		});
	});	

	if(data){
		request.write(data);
	}
	request.end();

	request.on('error', function(e) {
		callback(e, null);
	});
	
};
