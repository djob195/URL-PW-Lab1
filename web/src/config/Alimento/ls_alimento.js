import Alimentos from './content.json';

function getAlimentos()
{
    return JSON.parse(localStorage.getItem('Alimentos'));
}

function setAlimentos(alimentos)
{
    localStorage.setItem('Alimentos',JSON.stringify(alimentos));
}

export function startup()
{
    setAlimentos(Alimentos);
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

export function insertAlimento(alimento)
{
    let alimentos = getAlimentos();
    alimentos.push(alimento);
    console.log(alimentos);
    setAlimentos(alimentos);
    return {
            "ok":true,
            alimento
        };
}

export function deleteAlimento(id)
{
    let alimentos = getAlimentos();
    let alimento = alimentos.find(x => x._id === id);
    if(alimento === undefined)
    {
        return {
            "ok":false,
            err: {message: "No se ha encontrado el alimento"}
        };
    }
    else
    {
        alimentos = alimentos.filter(x => x._id !== id);
        setAlimentos(alimentos);
                return {
            "ok":true,
            alimento
        };
    }
}

export function getAlimento(id)
{
    let alimentos = getAlimentos();
    let alimento = alimentos.find(x => x._id === id);
    if(alimento === undefined)
    {
        return {
            "ok":false,
            err: {message: "No se ha encontrado el alimento"}
        };
    }
    else
    {
        return {
            "ok":true,
            alimento
        };
    }
}

export function updateAlimento(alimento)
{
    let alimentos = getAlimentos();
    let indexAlimento = alimentos.findIndex(x => x._id === alimento._id);
    if(indexAlimento === -1)
    {
        return {
            "ok":false,
            err: {message: "No se ha encontrado el alimento"}
        };
    }
    else
    {
        alimentos[indexAlimento] = alimento;
        setAlimentos(alimentos);
        return {
            "ok":true,
            alimento
        };
    }
}

