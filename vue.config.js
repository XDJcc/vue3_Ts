// vue.config.js
let version = "";
(function () {
    const d = new Date();
    const yy = d.getFullYear().toString().slice(2);
    const MM =
        d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
    const DD = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
    const h = d.getHours() >= 10 ? d.getHours() : "0" + d.getHours();
    const mm = d.getMinutes() >= 10 ? d.getMinutes() : "0" + d.getMinutes();
    version = yy + MM + DD + h + mm;
    return version;
})();

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/vue3_Ts/" : "/",
    outputDir: `./dist`, //生成打包文件的目录 （会清除上一次的文件）
    assetsDir: `./${version}`, //打包编译后的静态资源所在的目录位置
    indexPath: "index.html", //生成的index.html 文件所在的位置
    filenameHashing: true, //静态文件文件名哈希
    devServer: {
        // host: "192.168.110.77",
        // host: "192.168.31.10",
        host: "localhost",
        port: 8912,
        proxy: {
            "/api": {
                target: "https://autumnfish.cn/", //要请求的域名
                pathRewrite: {"^/api": "/"}, //通过pathRewrite重写地址，将前缀 '/api' 转为  '/'
                changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
            },
            "/community-admin-api": {
                target: `https://fengweiyun.iyuetiao.com/community-admin-api/`,//要请求的域名
                changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {"^/community-admin-api": "/"}, //通过pathRewrite重写地址，将前缀 '/api' 转为  '/'
            },
            "/system-api": {
                target: `https://61.152.127.11/fc-api/`,//要请求的域名
                changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {"^/system-api": "/"}, //通过pathRewrite重写地址，将前缀 '/api' 转为  '/'
            },
        },
    },
};
