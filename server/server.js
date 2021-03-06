var express = require('express')
var app = express();
var request = require('request');
var apiRoutes = express.Router()

const checkMiaopai = /\"videoSrc\":\"([^"]+)\"/;
const checkWeiboVideo = /list=([^"]+)\"/;

apiRoutes.get('/getVideo', function(req, res) {
    const shortUrl = req.query.url;
    let result;
    request.get({
        url: decodeURIComponent(shortUrl)
    },function(error, response, body) {
        let videoSrc;
        if(videoSrc = body.match(checkMiaopai)) {
            result = {
                video: videoSrc[0].replace(checkMiaopai, "$1")
            }
        } else if(videoSrc = body.match(checkWeiboVideo)) {
            result = {
                video: decodeURIComponent(videoSrc[0].replace(checkWeiboVideo, "$1"))
            }
        } else {
            result = shortUrl
        }
        res.json(result)
    })
})

apiRoutes.get('/post_text', function(req, res) {
    const data = {
        access_token: req.query.access_token,
        status: req.query.status
    }
    request.post({
        url: "https://api.weibo.com/2/statuses/update.json",
        form: data,
        encoding:'utf8'
    },
    function(error, response, body){
        if(response.statusCode == 200){
            res.json(body)
        }else{
            console.log(body)
            console.log(response.statusCode);
        }
    })
})
apiRoutes.get('/post_image', function(req, res) {
    const data = {
        access_token: req.query.access_token,
        status: req.query.status,
        pic: req.query.pic
    }
    request.post({
        url: "https://api.weibo.com/2/statuses/upload.json",
        form: data,
        encoding:'utf8'
    },
    function(error, response, body){
        if(response.statusCode == 200){
            res.json(body)
        }else{
            console.log(body)
            console.log(response.statusCode);
        }
    })
})
apiRoutes.get('/repost', function(req, res) {
    const data = {
        access_token: req.query.access_token,
        id: req.query.id
    }
    request.post({
        url: "https://api.weibo.com/2/statuses/repost.json",
        form: data,
        encoding:'utf8'
    },
    function(error, response, body){
        if(response.statusCode == 200){
            res.json(body)
        }else{
            console.log(body)
            console.log(response.statusCode);
        }
    })
})

apiRoutes.get('/comments', function(req, res) {
    const data = {
        access_token: req.query.access_token,
        comment: req.query.comment,
        id: req.query.id
    }
    const cid = req.query.cid;
    if(cid)
        Object.assign(data, {cid})
    request.post({
        url: `https://api.weibo.com/2/comments/${cid ? "reply" : "create"}.json`,
        form: data,
        encoding:'utf8'
    },
    function(error, response, body){
        if(response.statusCode == 200){
            res.json(body)
        }else{
            console.log(body)
            console.log(response.statusCode);
        }
    })
})

apiRoutes.get('/comments/info', function(req, res) {
    request.get({
        url: req.query[0]
    },
    function(error, response, body){
        res.json(JSON.parse(body))
        if(response.statusCode !== 200){
            console.log(body)
            console.log(response.statusCode);
        }
    })
})

apiRoutes.get('/favorites', function(req, res) {
    const data = {
        access_token: req.query.access_token,
        id: req.query.id
    }
    const url = `https://api.weibo.com/2/favorites/${req.query.isfavorited === "true" ? "destroy" : "create"}.json`
    request.post({
        url,
        form: data,
        encoding:'utf8'
    },
    function(error, response, body){
        res.json(body)
        if(response.statusCode !== 200){
            console.log(body)
            console.log(response.statusCode);
        }
    })
})


apiRoutes.get('/shouquan', function(req, res) {
    const Code = (req.query)['0']
    request.post(
        {
            url:'https://api.weibo.com/oauth2/access_token',
            form:{
                client_id: '1654230425',
                client_secret: '1819e114a616ed6d5fcb2385a443353c',
                grant_type: "authorization_code",
                redirect_uri: 'http://127.0.0.1:3000',
                // redirect_uri: 'http://weibo.gesangs.com',
                code: Code
            },
            encoding:'utf8'
        },
        function(error, response, body){
            if(response.statusCode == 200){
                res.json(body)
                console.log(body)
            }else{
                console.log(response.statusCode);
                console.log(body)
            }
        }
    );
})


app.use('/api', apiRoutes)
// app.use(express.static('./build'))
// var port = 4396;
var port = 3001;

module.exports = app.listen(port, function(err) {
    if(err) {
        console.log(err)
        return
    }
    console.log(port+'\n')
})