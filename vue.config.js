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
};
