// ==============================
// Port
// ==============================
process.env.PORT =  process.env.PORT || 8080;

// ==============================
// Entorno
// ==============================
process.env.NODE_ENV = process.env.NODE_ENV  || 'dev';
    
// ==============================
// Base de datos
// ==============================
process.env.URLDB = process.env.URLDB || 'mongodb://admin:123456A@ds255253.mlab.com:55253/web2';

// ==============================
// Pagineo
// ==============================
process.env.DESDE = 0;
process.env.LIMITE = 5;
