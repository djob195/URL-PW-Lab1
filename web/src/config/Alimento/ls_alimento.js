import Alimentos from './content.json';

function getAlimentos()
{
    return JSON.parse(localStorage.getItem('Alimentos'));
}

export function startup()
{
    localStorage.setItem('Alimentos',JSON.stringify(Alimentos)); 
}

export function getPagineo(start, length)
{
    let alimentos = getAlimentos();
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