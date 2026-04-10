let MostraPosizioni = false;
let MostraSuoni = true;
let PannelloOpzioni = document.querySelector('#Opzioni');
let BottoneSalva = document.querySelector('#Salva');
let BottonePosizioni = document.querySelector('#MostraLePosizioni');
let BottoneSuoni = document.querySelector('#MostraISuoni');
let NomiComandi = ['ComandoFuoco','ComandoRicarica','ComandoMuoviSu','ComandoMuoviGiù','ComandoSchiva','Comando0','Comando1','Comando2','Comando3'];
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
function AggiornaTesti()
{   
    NomiComandi.forEach(T => {AggiornaTesto(T);});
    NomiComandi.forEach(I => {AggiornaImmagineImpostazioni(I);});
    if(window.localStorage.getItem('MostraPosizioni') != null)
    {
        BottonePosizioni.style.backgroundColor = 'green';
        BottonePosizioni.textContent = '√';
    }
    if(window.localStorage.getItem('MostraSuoni') != null)
    {
        BottoneSuoni.style.backgroundColor = 'red';
        BottoneSuoni.textContent = 'x';
    }
}
function Salva()
{   
    let Comandi = NomiComandi.map(C => PrendiComando(C));
    if(ControllaComandi(Comandi))
    {   
        Comandi.forEach((C,I) => {window.localStorage.setItem(NomiComandi[I],C)});
        window.location.reload();
    }
    else
    {   
        BottoneSalva.textContent = "Comandi non validi";
        BottoneSalva.classList.add('Scuoti');
        setTimeout(() => {BottoneSalva.textContent = "Salva"; BottoneSalva.classList.remove('Scuoti');},1000);
    }
}
function Reset()
{
    NomiComandi.forEach(N => {window.localStorage.removeItem(N);});
    window.localStorage.removeItem("MostraPosizioni");
    window.localStorage.removeItem("MostraSuoni");
    window.location.reload();
}