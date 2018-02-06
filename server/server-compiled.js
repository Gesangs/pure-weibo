var express = require('express');
var app = express();
var request = require('request');
var apiRoutes = express.Router();

apiRoutes.get('/toLong', function (req, res) {
    const shortUrl = req.query.url;
    console.log(shortUrl);
    let url = `https://api.weibo.com/2/short_url/expand.json?access_token=${req.query.ass}`;
    shortUrl.forEach((item, index) => {
        url += `&url_short=${item}`;
    });
    request.get({
        url
    }, function (error, response, body) {
        res.json(body);
    });
});

apiRoutes.get('/post_text', function (req, res) {
    const data = {
        access_token: req.query.access_token,
        status: req.query.status
    };
    request.post({
        url: "https://api.weibo.com/2/statuses/update.json",
        form: data,
        encoding: 'utf8'
    }, function (error, response, body) {
        if (response.statusCode == 200) {
            res.json(body);
        } else {
            console.log(body);
            console.log(response.statusCode);
        }
    });
});
apiRoutes.get('/post_image', function (req, res) {
    const data = {
        access_token: req.query.access_token,
        status: req.query.status,
        pic: req.query.pic
    };
    request.post({
        url: "https://api.weibo.com/2/statuses/upload.json",
        form: data,
        encoding: 'utf8'
    }, function (error, response, body) {
        if (response.statusCode == 200) {
            res.json(body);
        } else {
            console.log(body);
            console.log(response.statusCode);
        }
    });
});
apiRoutes.get('/repost', function (req, res) {
    const data = {
        access_token: req.query.access_token,
        id: req.query.id
    };
    request.post({
        url: "https://api.weibo.com/2/statuses/repost.json",
        form: data,
        encoding: 'utf8'
    }, function (error, response, body) {
        if (response.statusCode == 200) {
            res.json(body);
        } else {
            console.log(body);
            console.log(response.statusCode);
        }
    });
});
apiRoutes.get('/comment_create', function (req, res) {
    const data = {
        access_token: req.query.access_token,
        comment: req.query.comment,
        id: req.query.id
    };
    request.post({
        url: "https://api.weibo.com/2/comments/create.json",
        form: data,
        encoding: 'utf8'
    }, function (error, response, body) {
        if (response.statusCode == 200) {
            res.json(body);
        } else {
            console.log(body);
            console.log(response.statusCode);
        }
    });
});
apiRoutes.get('/reply_create', function (req, res) {
    const data = {
        access_token: req.query.access_token,
        comment: req.query.comment,
        id: req.query.id,
        cid: req.query.cid
    };
    request.post({
        url: "https://api.weibo.com/2/comments/reply.json",
        form: data,
        encoding: 'utf8'
    }, function (error, response, body) {
        if (response.statusCode == 200) {
            res.json(body);
        } else {
            console.log(body);
            console.log(response.statusCode);
        }
    });
});

apiRoutes.get('/shouquan', function (req, res) {
    const Code = req.query['0'];
    request.post({
        url: 'https://api.weibo.com/oauth2/access_token',
        form: {
            client_id: '1654230425',
            client_secret: '1819e114a616ed6d5fcb2385a443353c',
            grant_type: "authorization_code",
            redirect_uri: 'http://127.0.0.1:3000',
            code: Code
        },
        encoding: 'utf8'
    }, function (error, response, body) {
        if (response.statusCode == 200) {
            res.json(body);
            console.log(body);
        } else {
            console.log(response.statusCode);
        }
    });
});

app.use('/api', apiRoutes);

var port = 3001;

module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(port + '\n');
});
