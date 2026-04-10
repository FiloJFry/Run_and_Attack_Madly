let DatiDiPosizione = new SaccoDiDati(0,100,100,100,false,false,false,false,false,false,true);
let RimaniQui = true;
let stavaattaccando;
let stavamuovendosi; 
let ComandoFuoco = 'Enter';
let ComandoRicarica = ' ';
let ComandoMuoviSu = 'ArrowUp';
let ComandoMuoviGiù = 'ArrowDown';
let ComandoSchiva = 'Shift';
let Comando0 = '0';
let Comando1 = "1";
let Comando2 = '2';
let Comando3 = '3';
let Boss = document.querySelector('#Nemico');
let ArmaInCanna = document.querySelector('#Arma');
let PersonaggioGiocabile = document.querySelector('#PGiocabile');
let Mirino = document.querySelector('#Mirino');
let PiuInfo = document.querySelector('#Info');
let AttaccoNemico = document.querySelector('#Attacco');
let BarraVita = document.querySelector('#Barra');
let hp = document.querySelector('#HP');
let BarraMischia = document.querySelector('#BarraMischia');
let PosizioneGiocatore = document.querySelector('#posG');
let PosizioneNemico = document.querySelector('#posA');
let Distanza = document.querySelector('#distanza');
let DistanzaAttaccoGiocatore = document.querySelector('#distanzaAG');
let Segnaposto1 = document.querySelector('#S1');
let Segnaposto2 = document.querySelector('#S2');
let RumoriArma = document.querySelector('#Rumori');
let FrasiNemico = document.querySelector('#Frasi');
let PannelloPausa = document.querySelector('#Pausa');
let PannelloConferma = document.querySelector('#Conferma');
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
    if(window.localStorage.getItem("MostraPosizioni") != null)
    {
        document.querySelector('#Info2').style.color = "white";
        BottonePosizioni.style.backgroundColor = 'green';
        BottonePosizioni.textContent = '√';
    }
    else
    {
        document.querySelector('#Info2').style.color = "transparent";
        BottonePosizioni.style.backgroundColor = 'red';
        BottonePosizioni.textContent = 'x';
    }
    if(window.localStorage.getItem("MostraSuoni") != null)
    {
        RumoriArma.style.color = "transparent";
        BottoneSuoni.style.backgroundColor = 'red';
        BottoneSuoni.textContent = 'x';
    }
    else
    {
        RumoriArma.style.color = "white";
        BottoneSuoni.style.backgroundColor = 'green';
        BottoneSuoni.textContent = '√';
    }
}
function Salva()
{   
    let Comandi = NomiComandi.map(C => PrendiComando(C));
    if(ControllaComandi(Comandi))
    {   
        Comandi.forEach((C,I) => {window.localStorage.setItem(NomiComandi[I],C)});
        AggiornaImpostazioni();
        NomiComandi.forEach(C => {AggiornaImmagineImpostazioni(C);});
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
    AggiornaImpostazioni();
    NomiComandi.forEach(C => {AggiornaImmagineImpostazioni(C);});
    PannelloOpzioni.close();
}
function AggiornaMirino(ArmaEquipaggiata,distanza)
{
    if(ArmaEquipaggiata.portata >= distanza && Mirino.style.color != "red")
    {
        Mirino.style.color = 'red';
    }
    else if(ArmaEquipaggiata.portata < distanza && Mirino.style.color != "white")
    {
        Mirino.style.color = 'white';
    }
}
function CambioArma(ArmaPresa,Spara,gap,DatiDiPosizione)
{
    ArmaInCanna.classList.add('VaiGiù');
    if(Spara != undefined){clearInterval(Spara); Spara = undefined;}
    if(gap != undefined){clearInterval(gap); gap = undefined;}
    DatiDiPosizione.InCarica = true;
    ArmaInCanna.addEventListener('animationend',(event) => {if(event.animationName == "vaiGiù") {{ArmaInCanna.classList.remove('VaiGiù');
    ArmaInCanna.classList.add('TornaSu');
    ArmaInCanna.setAttribute('src',`./Immagini/Armi/${ArmaPresa.nome}.jpg`);
    ArmaInCanna.addEventListener('animationend',(event) => {if(event.animationName == "tornaSu"){
    ArmaInCanna.classList.remove('TornaSu');
    Mirino.innerHTML = ArmaPresa.mirino;
    if(ArmaPresa.rateo != 45000)
    {
        PiuInfo.textContent = `${ArmaPresa.munizioni}|${ArmaPresa.inventario}`;
    } 
    else
    {
        PiuInfo.textContent = "";
    }
    DatiDiPosizione.InCarica = false;}
    },{once: true,});
    }}},{once: true,});
    return false;
}
function LampeggiaHP(colore)
{
    hp.style.backgroundColor = colore;
    setTimeout(() => {hp.style.backgroundColor = 'white'; hp.style.color = colore},300);
    setTimeout(() => {hp.style.backgroundColor = colore; hp.style.color = 'white'},600);
    setTimeout(() => {hp.style.backgroundColor = 'white'; hp.style.color = colore},900);
    setTimeout(() => {hp.style.backgroundColor = colore; hp.style.color = 'white'},1200);
    setTimeout(() => {hp.style.backgroundColor = 'blue'},1500);
}
function Preso(ArmaPresa,NemicoScelto,distanza,muny)
{
    if(ArmaPresa.portata >= distanza && muny)
    {
        NemicoScelto.vita = NemicoScelto.vita - ArmaPresa.danni;
        BarraVita.style.width = `${Math.pow(NemicoScelto.vita/NemicoScelto.maxvita,2)*30.875}vw`;
        BarraVita.style.right = `${15.4375*(1 - Math.pow(NemicoScelto.vita/NemicoScelto.maxvita,2))}vw`;
        return true;
    }
    else
    {
        return false;
    }
}
function Colpito(Protagonista,DatiDiPosizione,EccoloCheArriva)
{
    if(AttaccoNemico.style.color == NemicoScelto.coloreAttacco && DatiDiPosizione.distanzaAG <= 0 && !DatiDiPosizione.Schivando)
    {
        Protagonista.vita -= 1;
        hp.textContent = `HP: ${Protagonista.vita}`;
        LampeggiaHP('red');
    }
    if(DatiDiPosizione.distanzaAG == 0)
    {
        DatiDiPosizione.distanzaAG = DatiDiPosizione.distanza;
        AttaccoNemico.style.color = "transparent";
        AttaccoNemico.style.transform = `scale(${Math.max(10/DatiDiPosizione.distanzaAG,1)})`;
        DistanzaAttaccoGiocatore.textContent = `[Distanza Attacco - Giocatore]: ${DatiDiPosizione.distanzaAG}`; 
        clearInterval(EccoloCheArriva);
    }
}
function PausaRiprendi(DatiDiPosizione,NemicoScelto)
{   
    if(!DatiDiPosizione.InPausa)
    {
        DatiDiPosizione.InPausa = true;
        stavaattaccando = DatiDiPosizione.AllAttacco;
        stavamuovendosi = DatiDiPosizione.InMoto;
        ArmaInCanna.style.animationPlayState = "paused";
        BarraMischia.style.animationPlayState = "paused";
        PannelloPausa.showModal();
    }
    else
    {
        DatiDiPosizione.InPausa = false;
        if(stavaattaccando)
        {   
            DatiDiPosizione.AllAttacco = true;
            AttaccoNemico.style.color = NemicoScelto.coloreAttacco;
            NemicoScelto.Attacco(DatiDiPosizione); 
        }
        if(stavamuovendosi)
        {   
            NemicoScelto.Moto(DatiDiPosizione);
        }
        ArmaInCanna.style.animationPlayState = "running";
        BarraMischia.style.animationPlayState = "running";
        PannelloPausa.close();
    }
}
function Fine(Partita,DatiDiPosizione,MirID,Spara,vittoria,NemicoScelto)
{
        clearInterval(Partita);
        DatiDiPosizione.InPausa = true;
        document.querySelector('#Info2').style.color = "transparent";
        PiuInfo.style.color = "transparent";
        BarraMischia.style.backgroundColor = "transparent";
        document.querySelector('#PienBarraMischia').style.backgroundColor = "transparent";
        if(MirID != undefined)
        {
            clearInterval(MirID);
        }
        if(Spara != undefined)
        {
            clearInterval(Spara)
        }
        Mirino.style.color = "transparent";
        AttaccoNemico.style.color = "transparent";
        if(vittoria)
        {   
            document.querySelector('#SchermataPausa').style.color = "green";
            document.querySelector('#SchermataPausa').innerHTML = `VITTORIA! <button type = "button" id = "Riprendi" onclick = "event.stopPropagation(); PausaRiprendi(DatiDiPosizione,NemicoScelto);" style = "opacity: 0.5" disabled>Riprendi</button>
            <button type = "button" id = "Riprova" onclick = "if(!RimaniQui){RimaniQui = true;} PannelloConferma.showModal()">Riprova</button>
            <button type="button" id = "BottoneOpzioni" onclick="PannelloOpzioni.showModal();">Opzioni</button>
            <button type = "button" id = "Abbandona" onclick = "if(RimaniQui){RimaniQui = false;} PannelloConferma.showModal()">Gioca ancora</button>`;
            Boss.style.transform = `scale(1)`;
            Boss.src = `./Immagini/Animazioni/Animazione Vittoria ${NemicoScelto.nome}_1.jpg`;
            setTimeout(() =>{FrasiNemico.textContent = `${NemicoScelto.Frasi[2]}`; ArmaInCanna.src = `./Immagini/Animazioni/Animazione Vittoria contro ${NemicoScelto.nome}_1.jpg`;},500);
            if(window.localStorage.getItem(`${NemicoScelto.nome}`) == null || difficoltà > window.localStorage.getItem(`${NemicoScelto.nome}`))
            {
                window.localStorage.setItem(`${NemicoScelto.nome}`,`${difficoltà}`);
            }
            setTimeout(() => {ArmaInCanna.src = `./Immagini/Animazioni/Animazione Vittoria contro ${NemicoScelto.nome}_2.jpg`; Boss.src = `./Immagini/Animazioni/Animazione Vittoria ${NemicoScelto.nome}_2.jpg`;},1500);
            setTimeout(() => {PannelloPausa.showModal();},3000);
        }
        else
        {   
            document.querySelector('#SchermataPausa').style.color = "red";
            document.querySelector('#SchermataPausa').innerHTML = `Game Over <button type = "button" id = "Riprendi" onclick = "event.stopPropagation(); PausaRiprendi(DatiDiPosizione,NemicoScelto);" style = "opacity: 0.5" disabled>Riprendi</button>
            <button type = "button" id = "Riprova" onclick = "if(!RimaniQui){RimaniQui = true;} PannelloConferma.showModal()">Riprova</button>
            <button type="button" id = "BottoneOpzioni" onclick="PannelloOpzioni.showModal();">Opzioni</button>
            <button type = "button" id = "Abbandona" onclick = "if(RimaniQui){RimaniQui = false;} PannelloConferma.showModal()">Gioca ancora</button>`;
            ArmaInCanna.classList.add('slideOutDown');
            setTimeout(() =>{FrasiNemico.textContent = `${NemicoScelto.Frasi[2]}`},500);
            setTimeout(() => {ArmaInCanna.classList.remove('slideOutDown'); ArmaInCanna.classList.add('slideInUp'); ArmaInCanna.src = "./Immagini/Animazioni/Animazione Sconfitta.jpg"},500);
            setTimeout(() => {ArmaInCanna.classList.remove('slideInUp')},1000);
            setTimeout(() => {PannelloPausa.showModal();},3000);
        }
}
function Gioco(Protagonista,ShotgunEquipaggiato,AssaltoEquipaggiato,CecchinoEquipaggiato,MischiaEquipaggiata,NemicoScelto,DatiDiPosizione)
{
    let ArmaPresa = AssaltoEquipaggiato;
    Boss.setAttribute('src',`./Immagini/Nemici/${NemicoScelto.nome}.jpg`);
    ArmaInCanna.setAttribute('src',`./Immagini/Armi/${ArmaPresa.nome}.jpg`);
    Mirino.innerHTML = ArmaPresa.mirino;
    AttaccoNemico.textContent = NemicoScelto.attacco;
    PiuInfo.textContent = `${ArmaPresa.munizioni}|${ArmaPresa.inventario}`;
    NemicoScelto.velocità = Math.pow(1.5,difficoltà)*10;
    NemicoScelto.vita = Math.pow(1.2,difficoltà)*300000;
    NemicoScelto.maxvita = NemicoScelto.vita;
    Boss.style.transform = `scale(${10/Math.max(DatiDiPosizione.distanza,10)})`;
    AttaccoNemico.style.transform = `scale(${10/Math.max(DatiDiPosizione.distanzaAG,1)})`;
    Segnaposto1.style.transform = `scale(${10/Math.max(DatiDiPosizione.posG,10)})`;
    Segnaposto2.style.transform = `scale(${10/Math.max(200 - DatiDiPosizione.posG,10)})`;
    PosizioneGiocatore.textContent = `Posizione Giocatore: ${DatiDiPosizione.posG}`;
    PosizioneNemico.textContent = `Posizione Nemico: ${DatiDiPosizione.posA}`; 
    Distanza.textContent = `Distanza: ${DatiDiPosizione.distanza}`;
    DistanzaAttaccoGiocatore.textContent = `[Distanza Attacco - Giocatore]: ${DatiDiPosizione.distanzaAG}`;
    let Colpo = false;
    let Spara;
    let Partita;
    let MirID;
    let muny;
    let gap;
    let colpito;
    let risparo = true;
    let EccoloCheArriva;
    let Dotazione = [ShotgunEquipaggiato,AssaltoEquipaggiato,CecchinoEquipaggiato];
    AggiornaMirino(ArmaPresa,DatiDiPosizione.distanza);
    document.addEventListener('keydown', function(event) {if(!DatiDiPosizione.InPausa){
        switch(event.key)
        {
            case Comando0: 
            if(ArmaPresa != MischiaEquipaggiata && !DatiDiPosizione.InCarica)
            {
            Colpo = CambioArma(MischiaEquipaggiata,Spara,gap,risparo);
            risparo = true;
            ArmaPresa = MischiaEquipaggiata;
            if(MirID == undefined)
                {
                    AggiornaMirino(ArmaPresa,DatiDiPosizione.distanza);
                }
            }
            break;

            case Comando1:
                if(ArmaPresa != ShotgunEquipaggiato && !DatiDiPosizione.InCarica)
                {
            Colpo = CambioArma(ShotgunEquipaggiato,Spara,gap,risparo);
            risparo = true;
            ArmaPresa = ShotgunEquipaggiato;
            if(MirID == undefined)
                {
                    AggiornaMirino(ArmaPresa,DatiDiPosizione.distanza);
                }
            }
            break;

            case Comando2:
                if(ArmaPresa != AssaltoEquipaggiato && !DatiDiPosizione.InCarica)
                {
            Colpo = CambioArma(AssaltoEquipaggiato,Spara,gap,risparo);
            risparo = true;
            ArmaPresa = AssaltoEquipaggiato;
            if(MirID == undefined)
                {
                    AggiornaMirino(ArmaPresa,DatiDiPosizione.distanza);
                }
            }
            break;

            case Comando3:
                if(ArmaPresa != CecchinoEquipaggiato && !DatiDiPosizione.InCarica)
                {
            Colpo = CambioArma(CecchinoEquipaggiato,Spara,gap,risparo);
            risparo = true;
            ArmaPresa = CecchinoEquipaggiato;
            if(MirID == undefined)
                {
                    AggiornaMirino(ArmaPresa,DatiDiPosizione.distanza);
                }
            }
            break;

            case ComandoRicarica:
            if(ArmaPresa != MischiaEquipaggiata && !DatiDiPosizione.InCarica)
            {   
                if(Spara != undefined)
                {
                    clearInterval(Spara);
                    Spara = undefined;
                }
                if(gap != undefined)
                {
                    clearInterval(gap);
                    gap = undefined;
                    risparo = true;
                }
                ArmaPresa.Ricarica(DatiDiPosizione);
            }
            break;

            case ComandoSchiva:
                if(!DatiDiPosizione.Schivando && DatiDiPosizione.PuòSchivare)
                {  
                   Protagonista.Schiva(DatiDiPosizione); 
                }
            break;

            case ComandoFuoco:
            if(!Colpo && !DatiDiPosizione.InCarica && risparo)
            {   
                muny = ArmaPresa.munizioni > 0;
                ArmaPresa.Spara();
                colpito = Preso(ArmaPresa,NemicoScelto,DatiDiPosizione.distanza,muny);
                if(NemicoScelto.vita <= 0)
                {   
                    Fine(Partita,DatiDiPosizione,MirID,Spara,true,NemicoScelto);
                    return;
                }
                Colpo = true;
            if(ArmaPresa.altorateo)
            {   
                Spara = setInterval(() => {if(!DatiDiPosizione.InPausa){
                    muny = ArmaPresa.munizioni > 0;
                    ArmaPresa.Spara();
                    Preso(ArmaPresa,NemicoScelto,DatiDiPosizione.distanza,muny);
                    if(NemicoScelto.vita <= 0)
                    {   
                        Fine(Partita,DatiDiPosizione,MirID,Spara,true,NemicoScelto);
                        return;
                    }
            }},ArmaPresa.rateo + 100);
            }
            else
            {   
                risparo = false;
                let cont = 0;
                gap = setInterval(() => {if(!DatiDiPosizione.InPausa){cont += 10; if(cont >= ArmaPresa.rateo + 100){risparo = true;}}},10);
                if(ArmaPresa == MischiaEquipaggiata && colpito)
                {
                    Dotazione.forEach(A => {A.inventario = A.inventario + 3*A.maxmunizioni;});
                }
            }
        }
            break;

            case ComandoMuoviSu: 
                if(!DatiDiPosizione.Corri)
                {
                    PersonaggioGiocabile.classList.add('Scuoti');
                    DatiDiPosizione.Corri = true;
                    Protagonista.Muovi(true,DatiDiPosizione);
                    if(MirID == undefined)
                    {
                        MirID = setInterval(() => {AggiornaMirino(ArmaPresa,DatiDiPosizione.distanza); if(!DatiDiPosizione.Corri && !DatiDiPosizione.InMoto){clearInterval(MirID); MirID = undefined;}},10);
                    }
                }
            break;

            case ComandoMuoviGiù:
                if(!DatiDiPosizione.Corri)
                {
                    PersonaggioGiocabile.classList.add('Scuoti');
                    DatiDiPosizione.Corri = true;
                    Protagonista.Muovi(false,DatiDiPosizione);
                    if(MirID == undefined)
                    {
                        MirID = setInterval(() => {AggiornaMirino(ArmaPresa,DatiDiPosizione.distanza); if(!DatiDiPosizione.Corri && !DatiDiPosizione.InMoto){clearInterval(MirID); MirID = undefined;}},10);
                    }
                }
            break;
            }}
                else
                {
                switch(event.key)
                {
                    case ComandoMuoviSu:
                    case ComandoMuoviGiù:
                    DatiDiPosizione.Corri = false;
                    PersonaggioGiocabile.classList.remove('Scuoti');
                    break;

                    case ComandoFuoco:
                    Colpo = false;
                    if(ArmaPresa.altorateo)
                    {
                        if(Spara != undefined)
                        {
                            clearInterval(Spara);
                            Spara = undefined;
                        }
                    }
                    break;
                }}});
            document.addEventListener('keyup', function(event) {
                switch(event.key)
                {
                    case ComandoMuoviSu:
                    case ComandoMuoviGiù:
                    DatiDiPosizione.Corri = false;
                    PersonaggioGiocabile.classList.remove('Scuoti');
                    break;

                    case ComandoFuoco:
                    Colpo = false;
                    if(ArmaPresa.altorateo)
                    {
                        if(Spara != undefined)
                        {
                            clearInterval(Spara);
                            Spara = undefined;
                        }
                    }
                    break;
                }
            });
            document.addEventListener('click',() => {if(!DatiDiPosizione.InPausa){PausaRiprendi(DatiDiPosizione,NemicoScelto)}});
    Partita = setInterval(() => {
        /*if(Math.random() < 0.5 && !DatiDiPosizione.AllAttacco)
        {
            NemicoScelto.AllAttacco(DatiDiPosizione);
            EccoloCheArriva = setInterval(() => {if(!DatiDiPosizione.AllAttacco){Colpito(Protagonista,DatiDiPosizione,EccoloCheArriva); if(Protagonista.vita == 0){Fine(Partita,DatiDiPosizione,MirID,Spara,false,NemicoScelto);}}},10); 
        }
        else
        {   
            if(!DatiDiPosizione.InPausa)
            {
            NemicoScelto.Moto(DatiDiPosizione);
            if(MirID == undefined)
            {
                MirID = setInterval(() => {AggiornaMirino(ArmaPresa,DatiDiPosizione.distanza); if(!DatiDiPosizione.Corri && !DatiDiPosizione.InMoto){clearInterval(MirID); MirID = undefined;}},10);
            }
            }
        }*/
    },4000/difficoltà);
}
function VaiVaiVai()
{
    Nemici.forEach(N => {if(sessionStorage.getItem("Nemico scelto") == N.nome){NemicoScelto = N;}});
    Armi.forEach(A => {if(sessionStorage.getItem("ShotgunEquipaggiato") == A.nome){ShotgunEquipaggiato = A;} else if (sessionStorage.getItem("AssaltoEquipaggiato") == A.nome){AssaltoEquipaggiato = A;} else if (sessionStorage.getItem("CecchinoEquipaggiato") == A.nome){CecchinoEquipaggiato = A;}});
    Mischie.forEach(M => {if(sessionStorage.getItem("MischiaEquipaggiata") == M.nome){MischiaEquipaggiata = M;}})
    difficoltà = Number(sessionStorage.getItem("Difficoltà"));
    AggiornaImpostazioni();
    NomiComandi.forEach(C => {AggiornaImmagineImpostazioni(C);});
    Gioco(Protagonista,ShotgunEquipaggiato,AssaltoEquipaggiato,CecchinoEquipaggiato,MischiaEquipaggiata,NemicoScelto,DatiDiPosizione);
}
