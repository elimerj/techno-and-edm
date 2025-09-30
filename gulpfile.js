/* Pasos para Gulp. 
Npm install -D gulp

dependencias para gulp
npm install -D gulp-sass
npm install -D gulp-plumber
npm install -D gulp-webp 
npm install -D gulp-imagemin@7.1.0 --esta version funciona ok, no bajar la nueva aun.(NO BAJAR LA NUEVA!!!!)

*/

//instalamos mas dependencias cssnano, autoprefixer postcss gulp-postcss
//instalamos un sourcemap otra dependencia
//instalamos terser , si, otra dependencia 

const {src, dest, watch, parallel} = require('gulp'); //requerimos gulp una vez instalado

//dependencia Sass/css/gulp
const sass = require('gulp-sass')(require('sass')); //Conectamos gulp con sass
const autoprefixer = require('autoprefixer'); // Se asegura que el codigo css se ejecute en el navegador que tu le digas
const cssnano = require('cssnano'); //comprime el codigo css
const postcss = require('gulp-postcss'); //tranforma el codigo css por medio de los dos arriba mencionados
const sourcemaps = require('gulp-sourcemaps'); //nos ayuda con el css en el sitio
//dependencia  Plumber
const plumber = require('gulp-plumber'); //requerimos plumber 

//dependencia imagenes mas livianas
const imagemin = require('gulp-imagemin'); //minifica las imagenes
const cache = require('gulp-cache');


//dependencia Imagenes webp
const webp = require('gulp-webp');

//dependencia imagenes avif
const avif = require('gulp-avif');

//javascript (mejorando el codigo con terser)
const terser = require('gulp-terser-js');

const paths = {
    scss : 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    images: 'src/img/**/*.*'
};



function css(done){
    
    return src(paths.scss)//Identificar el archivo css a compilar 
    .pipe(sourcemaps.init()) //inicializa el sourcemap con la  hoja de referencia css
    .pipe(plumber()) //evita que se detenga la ejecucion del gulp
    .pipe(sass()) //Compilar las funciones de sass
    .pipe(postcss([autoprefixer(),cssnano()])) //formatea el codigo css y lo mejora.
    .pipe(sourcemaps.write('.')) //ubicacion donde se guarda, se le coloca un punto para que sea la misma ubicacion que la de dest
    .pipe(dest('public/css'));  //Almacenarla en el disco duro


    //callback que avisa a gulp que llegamos al final.
    //Si no tienes un return puedes usar un   function a(done){ done()} al final de la function
}
//dependencia para convertir imagenes en webp

function versionWebp(){
    const options = {
        quality:50,
    }
    src(paths.images)
    .pipe(webp(options))
    .pipe(dest('public/img'));

    done();
}

function versionAvif(done){
    const options = {
        quality:50,
    }
    src(paths.images)
    .pipe(avif(options))
    .pipe(dest('public/img'));

    done();
}


function imagenes(done){
    const options = {
        optimizationLevel: 3

    }
    src(paths.images)
    .pipe(cache(imagemin(options)))
    .pipe(dest('public/img'));

    done();
}

function javascript(done){
    src(paths.js)
    .pipe(sourcemaps.init()) //inicializa el sourcemap con el archivo de referencia javascript
    .pipe(terser()) //mejoramos el javascript
    .pipe(sourcemaps.write('.'))  //ubicacion donde se guarda, se le coloca un punto para que sea la misma ubicacion que la de dest
    .pipe(dest('public/js'));
    done();
}

function dev(done){ //funcion para que gulp mire los cambios y los aplique al momento de guardar
    watch(paths.scss,css);
    watch(paths.js,javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(css,imagenes, versionWebp,versionAvif,javascript, dev);
