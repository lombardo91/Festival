const {src, dest, watch, parallel} = require('gulp');
//requiere: extraer toda la funcionalidad de gulp 
//gulp: dependencia en el package.json 

// CSS------
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Imagenes -----
const cache = require('gulp-cache'); // npm i --save-dev gulp-cache
const imagemin = require('gulp-imagemin'); // npm i --save-dev gulp-imagemin@7.1.0
const webp = require('gulp-webp');
const avif = require('gulp-avif');
/*
function tarea(done){
    console.log('Hola Mundo');

    done();  //colkack - parafinalizar tarea / quita error en consola al ejecutar npx gulp NombreDeLaFuncion
}

exports.acaPongo = tarea;


//Si llamo la funcion desde aca es npx gulp NombreFuncion
//Si llamo desde package.json es npm run "nombreDelSrcipt"  
// ---> del otro lado del script : gulp NombreFuncion
*/
function css(done) {
    //identificar el archivo de SASS
    src('src/scss/**/*.scss')
        .pipe( plumber()) // evita que se detenga la ejecucion por errores
        //Compilarlo   //El Sass que traigo del package.json
        .pipe(sass() )
        //Almacenar el archivo
        .pipe(dest("build/css"))


    done(); //Callback avisa a Gulp cuando llegamos al final
}

// procesar imagenes y hacerlas mas ligeras 
function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }

    src('src/scss/img/**/*.{png,jpg}')
    .pipe( cache ( imagemin(opciones)))
    .pipe(dest("build/img"))

    done();
}

function versionWebp(done) {
    // Webp: toma opciones, vajamos la calidad de 100 a 50
    const opciones = {
        quality: 50   
    };

    src('src/scss/img/**/*.{png,jpg}') // {.....} ==> Busca, los formatos que le indique dentro de esas {}
        .pipe( webp(opciones))
        .pipe( dest("build/img"))

    done();
}

function versionAvif(done) {

    const opciones = {
        quality: 50   
    };

    src('src/scss/img/**/*.{png,jpg}') // {.....} ==> Busca, los formatos que le indique dentro de esas {}
        .pipe( avif(opciones))
        .pipe( dest("build/img"))

    done();
}

function javascript(done){
    src('src/js/**/*.js')
    .pipe(dest('build/js'));

    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css)
    // watch, deja siempre escuchando el archivo para detectar si sufre cambios
    watch('src/js/**/*.js', javascript)

    done();
}


exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);  // parallel: ejecuta funciones en simultaneo



//DEsde aca llamamos a las funciones con : npx gulp nombreDeLaFuncion
// Si lo llamo desde el package.json utilizo : npm run nombreDeLaFuncion
