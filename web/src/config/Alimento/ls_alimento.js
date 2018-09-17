const startup = () =>
{
    import Alimentos from './content.json';
    localStorage.setItem('Alimentos',JSON.stringify(Alimentos)); 
}

const getAlimentos = () =>
{
    return JSON.parse(localStorage.getItem('Alimentos'));
}

const getPagineo = (start,length, draw) =>
{
    let alimentos = this.getAlimentos();
    let recordsFiltered = alimentos.length;
    alimentos = alimentos.slice(start, start + length);
    return {
        "ok":true,
        "dataTable":
        { 
            recordsFiltered,
            "data": alimentos
        }
    };
}