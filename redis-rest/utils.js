const localizationTime = () =>{
    return {
        dayNames: [
            'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom',
            'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'
        ],
        monthNames: [
            'Ene', 'Feb', 'Mar', 'Abril', 'Mayo', 'Junio', 'Julio', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        timeNames: [
            'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
        ]
    }
}

module.exports = {localizationTime};