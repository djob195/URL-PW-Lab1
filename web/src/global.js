// Configuración de pagineo
global.pageSize = 4;
global.dataByRow = 4;
global.colLength =  parseInt(12/global.dataByRow,10);

// Configuración de API
global.restApi = "http://redis-client-contr:8081/";
global.fakeFetch = "http://localhost/helloWorld.html";