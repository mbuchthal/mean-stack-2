var dest = './public';
var src = './src';

module.exports = {
  javascript: {
    src: src + '/app/**/*.js',
    dest: dest + '/js/',
    entryPoint: src + '/webpack-entry.js',
    packedFile: 'packed.js'
  },
  sass: {
    src: src + "/sass/**/*.{sass,scss}",
    dest: dest + '/css/',
    settings: {
      indentedSyntax: true,
    }
  },
  server: {
    serverFile: '.server.js',
    livereload: true,
  },
  index: {
    src: src + '/app/index.html',
    dest: dest + '/',
  },
  partials: {
    src: [src + '/app/**/*.html', '!' + src + '/app/index.html'],
    dest: dest + '/partials/'
  },
  production: {
    cssSrc: dest + '/css/*.css',
    jsSrc: dest + '/*.js',
    dest: dest
  }
};
