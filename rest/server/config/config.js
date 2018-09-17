// ==============================
// Port
// ==============================
process.env.PORT =  process.env.PORT || 3000;

// ==============================
// Entorno
// ==============================
process.env.NODE_ENV = process.env.NODE_ENV  || 'dev';
    
// ==============================
// Base de datos
// ==============================
process.env.URLDB = process.env.URLDB || 'mongodb://administrador:administrador1@ds251362.mlab.com:51362/comidalab0';

// ==============================
// Pagineo
// ==============================
process.env.DESDE = 0;
process.env.LIMITE = 5;
