let MostraPosizioni = window.localStorage.getItem("MostraPosizioni") != null;
let MostraSuoni = window.localStorage.getItem("MostraSuoni") == null;
let filtro = window.localStorage.getItem("Filtro");
let PannelloOpzioni = document.querySelector('#Opzioni');
let BottoneSalva = document.querySelector('#Salva');
let BottonePosizioni = document.querySelector('#MostraLePosizioni');
let BottoneSuoni = document.querySelector('#MostraISuoni');
let BottoneFiltro = document.querySelector("#Filtro");
let SCBottone = document.querySelector("#SelettoreController");
let BottoneInversione = document.querySelector('#BottoneInversione');
let NomiComandi = ['ComandoFuoco','ComandoRicarica','ComandoMuoviSu','ComandoMuoviGiù','ComandoSchiva','Comando0','Comando1','Comando2','Comando3','ComandoSuperFuoco','ComandoAlterna'];
let ComandiXbox = ['A','B','X','Y','LB','RB','LT','RT','VIEW / SELECT / BACK','MENÙ / START','LS','RS','↑','↓','←','→'];
let ComandiPS = ['✕','◯','▢','△','L1','R1','L2','R2','SHARE / CREATE','OPTIONS','L3','R3','↑','↓','←','→'];
let ComandiNintendo = ['B','A','Y','X','L','R','ZL','ZR','-','+','>L<','>R<','↑','↓','←','→'];
let PannelloTutorial = document.querySelector('#Tutorial');
let FiltroColore = document.querySelector("#filtroColore");
let ImmagineComandiController = document.querySelectorAll("select.Controller");
let c = window.localStorage.getItem("MarcaController");
let inv = window.localStorage.getItem("inv") != null;
let SelettoreZonaMorta = document.querySelector("#ZonaMorta");
let SelettoreVibrazioneController = document.querySelector("#VibrazioneController");
let SelettoreVibrazioneGrilletti = document.querySelector("#VibrazioneGrilletti");
function AggiornaTesto(sComando)
{
    if(window.localStorage.getItem(sComando) != null)
    {    
        window.localStorage.getItem(sComando) != " "? document.querySelector(`#${sComando}`).textContent = window.localStorage.getItem(sComando) : document.querySelector(`#${sComando}`).textContent = "Space";
    }
}
function AggiornaImmagineImpostazioni(sComando,t)
{
    if(window.localStorage.getItem(sComando) != null && t)
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
    else if(window.localStorage.getItem(sComando) != null)
    {
        document.querySelector(`select[name = ${sComando}]`).value = window.localStorage.getItem(sComando);
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

            case "ComandoSuperFuoco":
            document.querySelector(`select[name = ${sComando}]`).value = "Backspace";
            break;

            case "ComandoAlterna":
            document.querySelector(`select[name = ${sComando}]`).value = "AltGraph";
            break;

            case "PF":
            document.querySelector(`select[name = ${sComando}]`).value = "7";
            break;

            case "PR":
            document.querySelector(`select[name = ${sComando}]`).value = "2";
            break;

            case "PS":
            document.querySelector(`select[name = ${sComando}]`).value = "1";
            break;

            case "P0":
            document.querySelector(`select[name = ${sComando}]`).value = "13";
            break;

            case "P1":
            document.querySelector(`select[name = ${sComando}]`).value = "14";
            break;

            case "P2":
            document.querySelector(`select[name = ${sComando}]`).value = "12";
            break;

            case "P3":
            document.querySelector(`select[name = ${sComando}]`).value = "15";
            break;

            case "PsF":
            document.querySelector(`select[name = ${sComando}]`).value = "6";
            break;

            case "PA":
            document.querySelector(`select[name = ${sComando}]`).value = "4";
            break;

            case "PP":
            document.querySelector(`select[name = ${sComando}]`).value = "9";
            break;
        }
    }
}
function PrendiComando(sComando,t)
{
    let Comando;
    if(t)
    {
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
    }
    else
    {
        Comando = document.querySelector(`select[name = ${sComando}]`).value;
    }
    return Comando;
}
function ControllaComandi(Comandi)
{
    let setaccio = Comandi.filter(C => C != null);
    return new Set(setaccio).size == setaccio.length;
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
function DisegnaTasti()
{
    switch(c)
    {
        case "PlayStation":
        ImmagineComandiController.forEach(C => {Array.from(C.options).forEach(O => {O.textContent = ComandiPS[O.value];});});
        break;

        case "Nintendo":
        ImmagineComandiController.forEach(C => {Array.from(C.options).forEach(O => {O.textContent = ComandiNintendo[O.value];});});
        break;

        default:
        ImmagineComandiController.forEach(C => {Array.from(C.options).forEach(O => {O.textContent = ComandiXbox[O.value];});});
        break;
    }
}
function Filtra(filtro)
{   
    if(FiltroColore != null)
    {
        filtro != null? FiltroColore.innerHTML = `*{filter: grayscale(${100/filtro}%); -webkit-filter: grayscale(${100/filtro}%);}` : FiltroColore.innerHTML = `*{filter: none; -webkit-filter: none;}`;
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
    if(filtro != null)
    {
        window.localStorage.getItem("Filtro") == 1? BottoneFiltro.textContent = "Bianco e nero" : BottoneFiltro.textContent = "Flashback";
    }
    else
    {
        BottoneFiltro.textContent = "Predefinito";
    }
    if(window.localStorage.getItem("#ZM") != null){SelettoreZonaMorta.value = window.localStorage.getItem("#ZM");}
    if(window.localStorage.getItem("#VC") != null){SelettoreVibrazioneController.value = window.localStorage.getItem("#VC")*100;}
    if(window.localStorage.getItem("#VG") != null){SelettoreVibrazioneGrilletti.value = window.localStorage.getItem("#VG")*100;}
    if(c != null)
    {
        if(c == "PlayStation")
        {
            SCBottone.textContent = "PlayStation";
            SCBottone.style.color = 'white';
            SCBottone.style.backgroundColor = 'blue';
            DisegnaTasti();
        }
        else
        {
            SCBottone.textContent = "Nintendo";
            SCBottone.style.color = 'white';
            SCBottone.style.backgroundColor = 'red';
            DisegnaTasti();
        }
    }
    else
    {
        SCBottone.textContent = "PlayStation";
        SCBottone.style.color = 'black';
        SCBottone.style.backgroundColor = 'green';
        DisegnaTasti();
    }
}
function AggiornaTesti()
{   
    if(FiltroColore != null)
    {
        NomiComandi.forEach(T => {AggiornaTesto(T);});
    }
    NomiComandi.forEach(I => {AggiornaImmagineImpostazioni(I,true);});
    ImmagineComandiController.forEach(I => {AggiornaImmagineImpostazioni(I.name,false);});
    AggiornaBottoniImpostazioni();
}
function AggiornaImpostazioni()
{   
    window.localStorage.getItem("ComandoFuoco") != null? ComandoFuoco = window.localStorage.getItem("ComandoFuoco") : ComandoFuoco = "Enter";
    window.localStorage.getItem("ComandoRicarica") != null? ComandoRicarica = window.localStorage.getItem("ComandoRicarica") : ComandoRicarica = " ";
    window.localStorage.getItem("ComandoMuoviSu") != null? ComandoMuoviSu = window.localStorage.getItem("ComandoMuoviSu") : ComandoMuoviSu = "ArrowUp";
    window.localStorage.getItem("ComandoMuoviGiù") != null? ComandoMuoviGiù = window.localStorage.getItem("ComandoMuoviGiù") : ComandoMuoviGiù = "ArrowDown";
    window.localStorage.getItem("ComandoSchiva") != null? ComandoSchiva = window.localStorage.getItem("ComandoSchiva") : ComandoSchiva = "Shift";
    window.localStorage.getItem("Comando0") != null? Comando0 = window.localStorage.getItem("Comando0") : Comando0 = "0";
    window.localStorage.getItem("Comando1") != null? Comando1 = window.localStorage.getItem("Comando1") : Comando1 = "1";
    window.localStorage.getItem("Comando2") != null? Comando2 = window.localStorage.getItem("Comando2") : Comando2 = "2";
    window.localStorage.getItem("Comando3") != null? Comando3 = window.localStorage.getItem("Comando3") : Comando3 = "3";
    window.localStorage.getItem("ComandoSuperFuoco") != null? ComandoSuperFuoco = window.localStorage.getItem("ComandoSuperFuoco") : ComandoSuperFuoco = "Backspace";
    window.localStorage.getItem("ComandoAlterna") != null? ComandoAlterna = window.localStorage.getItem("ComandoAlterna") : ComandoAlterna = "AltGraph";
    window.localStorage.getItem("PF") != null? PF = window.localStorage.getItem("PF") : PF = 7;
    window.localStorage.getItem("PR") != null? PR = window.localStorage.getItem("PR") : PR = 2;
    window.localStorage.getItem("inv") != null? AM = 3 : AM = 1;
    window.localStorage.getItem("PS") != null? PS = window.localStorage.getItem("PS") : PS = 1;
    window.localStorage.getItem("P0") != null? P0 = window.localStorage.getItem("P0") : P0 = 13;
    window.localStorage.getItem("P1") != null? P1 = window.localStorage.getItem("P1") : P1 = 14;
    window.localStorage.getItem("P2") != null? P2 = window.localStorage.getItem("P2") : P2 = 12;
    window.localStorage.getItem("P3") != null? P3 = window.localStorage.getItem("P3") : P3 = 15;
    window.localStorage.getItem("PsF") != null? PsF = window.localStorage.getItem("PsF") : PsF = 6;
    window.localStorage.getItem("PA") != null? PA = window.localStorage.getItem("PA") : PA = 4;
    window.localStorage.getItem("PP") != null? PP = window.localStorage.getItem("PP") : PP = 9;
    window.localStorage.getItem("ZM") != null? ZM = window.localStorage.getItem("ZM") : ZM = 0.2;
    window.localStorage.getItem("VC") != null? VC = window.localStorage.getItem("VC")/100 : VC = 1.0;
    window.localStorage.getItem("VG") != null? VG = window.localStorage.getItem("VG")/100 : VG = 1.0;
    if(MostraPosizioni && Giocando)
    {
        PosizioneGiocatore.textContent = `Posizione Giocatore: ${posG}`;
        PosizioneNemico.textContent = `Posizione Nemico: ${posA}`; 
        Distanza.textContent = `Distanza: ${distanza}`;
        DistanzaAttaccoGiocatore.textContent = `[Distanza Attacco - Giocatore]: ${distanzaAG}`;
    }
    else
    {
        LePosizioni.querySelectorAll("h4").forEach(D => {D.textContent = "";});
    }
    NomiComandi.forEach(I => {AggiornaImmagineImpostazioni(I,true);});
    ImmagineComandiController.forEach(C => {AggiornaImmagineImpostazioni(C.name,false);})
    AggiornaBottoniImpostazioni();
}
function Salva()
{   
    let ComandiTastiera = NomiComandi.map(C => PrendiComando(C,true));
    let ComandiController = Array.from(ImmagineComandiController).map(I => PrendiComando(I.name,false));
    if(ControllaComandi(ComandiTastiera) && ControllaComandi(ComandiController))
    {   
        ComandiTastiera.forEach((C,I) => {if(C != null){window.localStorage.setItem(NomiComandi[I],C)}});
        ComandiController.forEach((C,I) => {if(C != null){window.localStorage.setItem(Array.from(ImmagineComandiController)[I].name,C)}});
        MostraPosizioni? window.localStorage.setItem("MostraPosizioni",MostraPosizioni) : window.localStorage.removeItem("MostraPosizioni");
        !MostraSuoni? window.localStorage.setItem("MostraSuoni",MostraSuoni) : window.localStorage.removeItem("MostraSuoni");
        filtro != null? window.localStorage.setItem("Filtro",filtro) : window.localStorage.removeItem("Filtro");
        inv? window.localStorage.setItem("inv",inv) : window.localStorage.removeItem("inv");
        SelettoreZonaMorta.value != 0.2? window.localStorage.setItem(SelettoreZonaMorta.value,"ZM") : window.localStorage.removeItem("ZM");
        SelettoreVibrazioneController.value != 100? window.localStorage.setItem(SelettoreVibrazioneController.value,"VC") : window.localStorage.removeItem("VC");
        SelettoreVibrazioneGrilletti.value != 100? window.localStorage.setItem(SelettoreVibrazioneGrilletti.value,"VG") : window.localStorage.removeItem("VG");
        FiltroColore == null? AggiornaImpostazioni() : AggiornaTesti();
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
    ImmagineComandiController.forEach(I => {window.localStorage.removeItem(I.name);});
    window.localStorage.removeItem("MostraPosizioni");
    window.localStorage.removeItem("MostraSuoni");
    window.localStorage.removeItem("Filtro");
    window.localStorage.removeItem("inv");
    window.localStorage.removeItem("ZM");
    window.localStorage.removeItem("VC");
    window.localStorage.removeItem("VG");
    filtro = null;
    MostraPosizioni = false;
    MostraSuoni = true;
    inv = false;
    Filtra(filtro);
    FiltroColore == null? AggiornaImpostazioni() : AggiornaTesti();
    PannelloOpzioni.close();
}