const Imagemin = require('imagemin');

new Imagemin().src('img/*.{gif,jpg,png,svg}').dest('refs/build/images').use(Imagemin.jpegtran({progressive: true})).run(
  function (err, files) {
    console.log(files[0]);
  });