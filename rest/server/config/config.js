// ==============================
// Port
// ==============================
process.env.PORT =  process.env.PORT || 8081;

// ==============================
// Entorno
// ==============================
process.env.NODE_ENV = process.env.NODE_ENV  || 'dev';
    
// ==============================
// Base de datos
// ==============================
process.env.URLDB = process.env.URLDB || 'mongodb://localhost:27017/web';

// ==============================
// Pagineo
// ==============================
process.env.DESDE = 0;
process.env.LIMITE = 5;
