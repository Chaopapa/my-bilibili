const proxy = require("http-proxy-middleware");

module.exports = function(app){
    console.log('代理了');
    app.use('/api',proxy({
        target:"http://localhost:8080",
        changeOrigin:true
    }));
}