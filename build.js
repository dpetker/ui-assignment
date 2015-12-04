var jspm = require('jspm');

//create self-executing bundle
jspm.bundleSFX('js/main.js', 'bundle.js', { mangle: false, separateCSS: true }).then(function () {
    console.log('built bundle.js');
});
