// ==============================
// Port
// ==============================
process.env.PORT =  process.env.PORT || 8081;

process.env.REST_API = process.env.REST_API || "http://localhost:8080/";
process.env.REDIS_PORT = process.env.REDIS_PORT || '6379';
process.env.REDIS_HOST = process.env.REDIS_HOST ||'localhost';


// ==============================
// Pagineo
// ==============================
process.env.DESDE = 0;
process.env.LIMITE = 5;

