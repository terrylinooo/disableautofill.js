/**
 * For development purpose only.
 * We'd like to start a Express web server for quickly developing.
 * Page can be viewed at http://127.0.0.1:8000
 */
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./../webpack.config');

var port = 8000;
var app = express();
var compiler = webpack(config);

app.use(express.static(process.cwd()));
app.set('views', process.cwd());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));


app.get('/', function (req, res) {
	let results = JSON.stringify(req.query, null, 4);
	res.render(path.join(__dirname, 'index.ejs'), {
        results: results
    });
});

app.get('/jquery', function (req, res) {
	let results = JSON.stringify(req.query, null, 4);
	res.render(path.join(__dirname, 'index.jquery.ejs'), {
        results: results
    });
});

app.listen(port, '0.0.0.0', function (err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Listening at http://0.0.0.0:%s', port);
});