function AggiornaTesto(sComando)
{
    if(window.localStorage.getItem(sComando) != null) 
    {    
        if(window.localStorage.getItem(sComando) != " ")
        {
            document.querySelector(`#${sComando}`).textContent = window.localStorage.getItem(sComando);
        }
        else
        {
            document.querySelector(`#${sComando}`).textContent = "Space";
        }
    }
}
function AggiornaImmagineImpostazioni(sComando)
{
    if(window.localStorage.getItem(sComando) != null)
    {
        if(window.localStorage.getItem(sComando).length == 1 && window.localStorage.getItem(sComando) != " ")
        {
            document.querySelector(`input[name = ${sComando}]`).value = window.localStorage.getItem(sComando);
        }
        else
        {
            document.querySelector(`select[name = ${sComando}]`).value = window.localStorage.getItem(sComando);
        }
    }
    else
    {
        switch(sComando)
        {
            case "ComandoFuoco":
            document.querySelector(`select[name = ${sComando}]`).value = "Enter";
            break;

            case "ComandoRicarica":
            document.querySelector(`select[name = ${sComando}]`).value = " ";
            break;

            case "ComandoMuoviSu":
            document.querySelector(`select[name = ${sComando}]`).value = "ArrowUp";
            break;

            case "ComandoMuoviGiù":
            document.querySelector(`select[name = ${sComando}]`).value = "ArrowDown";
            break;

            case "ComandoSchiva":
            document.querySelector(`select[name = ${sComando}]`).value = "Shift";
            break;

            case "Comando0":
            document.querySelector(`input[name = ${sComando}]`).value = "0";
            break;

            case "Comando1":
            document.querySelector(`input[name = ${sComando}]`).value = "1";
            break;

            case "Comando2":
            document.querySelector(`input[name = ${sComando}]`).value = "2";
            break;

            case "Comando3":
            document.querySelector(`input[name = ${sComando}]`).value = "3";
            break;
        }
    }
}
function PrendiComando(sComando)
{
    let Comando; 
    if(document.querySelector(`input[name = ${sComando}]`).value == "")
    { 
        if(document.querySelector(`select[name = ${sComando}]`).value == "")
        {  
            Comando = null;
        }
        else
        {
            Comando = document.querySelector(`select[name = ${sComando}]`).value;
        }
    }
    else
    {
        Comando = document.querySelector(`input[name = ${sComando}]`).value;
    }
    return Comando;
}
function ControllaComandi(Comandi)
{
    let setaccio = Comandi.filter(C => C != null);
    return new Set(setaccio).size === setaccio.length;
}
