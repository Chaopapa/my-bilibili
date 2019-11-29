const proxy = require("http-proxy-middleware");

module.exports = function(app){
    console.log('代理了');
    app.use('/x',proxy({
        target:"http://api.bilibili.com",
        changeOrigin:true
    }));
}