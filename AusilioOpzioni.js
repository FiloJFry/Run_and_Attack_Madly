let MostraPosizioni = window.localStorage.getItem("MostraPosizioni") != null;
let MostraSuoni = window.localStorage.getItem("MostraSuoni") == null;
let filtro = window.localStorage.getItem("Filtro");
let PannelloOpzioni = document.querySelector('#Opzioni');
let BottoneSalva = document.querySelector('#Salva');
let BottonePosizioni = document.querySelector('#MostraLePosizioni');
let BottoneSuoni = document.querySelector('#MostraISuoni');
let BottoneFiltro = document.querySelector("#Filtro");
let NomiComandi = ['ComandoFuoco','ComandoRicarica','ComandoMuoviSu','ComandoMuoviGiù','ComandoSchiva','Comando0','Comando1','Comando2','Comando3'];
let PannelloTutorial = document.querySelector('#Tutorial');
let FiltroColore = document.querySelector("#filtroColore");
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
function AlternaSiONo(bottone,sì)
{
    if(sì)
    {
        bottone.style.backgroundColor = "green";
        bottone.textContent = "√";
    }
    else
    {
        bottone.style.backgroundColor = "red";
        bottone.textContent = "x";
    }
}
function Filtra(filtro)
{   
    if(FiltroColore != null)
    {
    if(filtro != null)
    {   
        FiltroColore.innerHTML = `*{filter: grayscale(${100/filtro}%); -webkit-filter: grayscale(${100/filtro}%);}`;
    }
    else
    {
        FiltroColore.innerHTML = `*{filter: none; -webkit-filter: none;}`;
    }
    }
    else
    {
    if(filtro == 1)
    {
        Elementi.forEach(E => {E.classList.remove("MezzoFiltro"); E.classList.add("Filtro");});
    }
    else if(filtro == 2)
    {
        Elementi.forEach(E => {E.classList.remove("Filtro"); E.classList.add("MezzoFiltro");});
    }
    else
    {
        Elementi.forEach(E => {E.classList.remove("Filtro"); E.classList.remove("MezzoFiltro");});
    }
    }
}
function AggiornaBottoniImpostazioni()
{
    AlternaSiONo(BottonePosizioni,MostraPosizioni);
    AlternaSiONo(BottoneSuoni,MostraSuoni);
    if(window.localStorage.getItem("Filtro") != null)
    {
        if(window.localStorage.getItem("Filtro") == 1)
        {
            BottoneFiltro.textContent = "Bianco e nero";
        }
        else
        {
            BottoneFiltro.textContent = "Flashback";
        }
    }
    else
    {
        BottoneFiltro.textContent = "Predefinito";
    }
}
function AggiornaTesti()
{   
    if(FiltroColore != null)
    {
        NomiComandi.forEach(T => {AggiornaTesto(T);});
    }
    NomiComandi.forEach(I => {AggiornaImmagineImpostazioni(I);});
    AggiornaBottoniImpostazioni();
}
function AggiornaImpostazioni()
{   
    if(window.localStorage.getItem("ComandoFuoco") != null)
    {
        ComandoFuoco = window.localStorage.getItem("ComandoFuoco");
    }
    else
    {
        ComandoFuoco = "Enter";
    }
    if(window.localStorage.getItem("ComandoRicarica") != null)
    {
        ComandoRicarica = window.localStorage.getItem("ComandoRicarica");
    }
    else
    {
        ComandoRicarica = " ";
    }
    if(window.localStorage.getItem("ComandoMuoviSu") != null)
    {
        ComandoMuoviSu = window.localStorage.getItem("ComandoMuoviSu");
    }
    else
    {
        ComandoMuoviSu = "ArrowUp";
    }
    if(window.localStorage.getItem("ComandoMuoviGiù") != null)
    {
        ComandoMuoviGiù = window.localStorage.getItem("ComandoMuoviGiù");
    }
    else
    {
        ComandoMuoviGiù = "ArrowDown";
    }
    if(window.localStorage.getItem("ComandoSchiva") != null)
    {
        ComandoSchiva = window.localStorage.getItem("ComandoSchiva");
    }
    else
    {
        ComandoSchiva = "Shift";
    }
    if(window.localStorage.getItem("Comando0") != null)
    {
        Comando0 = window.localStorage.getItem("Comando0");
    }
    else
    {
        Comando0 = "0";
    }
    if(window.localStorage.getItem("Comando1") != null)
    {
        Comando1 = window.localStorage.getItem("Comando1");
    }
    else
    {
        Comando1 = "1";
    }
    if(window.localStorage.getItem("Comando2") != null)
    {
        Comando2 = window.localStorage.getItem("Comando2");
    }
    else
    {
        Comando2 = "2";
    }
    if(window.localStorage.getItem("Comando3") != null)
    {
        Comando3 = window.localStorage.getItem("Comando3");
    }
    else
    {
        Comando3 = "3";
    }
    if(window.localStorage.getItem("MostraPosizioni") != null && Giocando)
    {
        document.querySelector('#Info2').style.color = "white";
    }
    else
    {
        document.querySelector('#Info2').style.color = "transparent";
    }
    if(window.localStorage.getItem("MostraSuoni") != null)
    {
        RumoriArma.style.color = "transparent";
    }
    else if(Giocando)
    {
        RumoriArma.style.color = "white";
    }
    AggiornaBottoniImpostazioni();
}
function Salva()
{   
    let Comandi = NomiComandi.map(C => PrendiComando(C));
    if(ControllaComandi(Comandi))
    {   
        Comandi.forEach((C,I) => {window.localStorage.setItem(NomiComandi[I],C)});
        if(MostraPosizioni)
        {
            window.localStorage.setItem("MostraPosizioni",MostraPosizioni);
        }
        else
        {
            window.localStorage.removeItem("MostraPosizioni");
        }
        if(!MostraSuoni)
        {
            window.localStorage.setItem("MostraSuoni",MostraSuoni);
        }
        else
        {
            window.localStorage.removeItem("MostraSuoni");
        }
        if(filtro != null)
        {
            window.localStorage.setItem("Filtro",filtro);
        }
        else
        {
            window.localStorage.removeItem("Filtro");
        }
        if(FiltroColore == null)
        {
            AggiornaImpostazioni();
        }
        else
        {
            AggiornaTesti();
        }
        PannelloOpzioni.close();
    }
    else
    {   
        BottoneSalva.textContent = "Comandi non validi";
        BottoneSalva.classList.add('animated','Scuoti');
        setTimeout(() => {BottoneSalva.textContent = "Salva"; BottoneSalva.classList.remove('animated','Scuoti');},1000);
    }
}
function Reset()
{
    NomiComandi.forEach(N => {window.localStorage.removeItem(N);});
    window.localStorage.removeItem("MostraPosizioni");
    window.localStorage.removeItem("MostraSuoni");
    window.localStorage.removeItem("Filtro");
    filtro = null;
    Filtra(filtro);
    if(FiltroColore == null)
    {
        AggiornaImpostazioni();
    }
    else
    {
        AggiornaTesti();
    }
    PannelloOpzioni.close();
}
