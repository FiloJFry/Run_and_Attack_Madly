let VRag;
let posG = 0;
let posA = 100;
let distanza = 100;
let distanzaAG = 100;
let Corri = false;
let Schivando = false;
let PuòSchivare = true;
let InMoto = false;
let AllAttacco = false;
let AltAttacco = false;
let InPausa = false;
let InCarica = false;
let RimaniQui = true;
let ComandoFuoco = window.localStorage.getItem("ComandoFuoco") || 'Enter';
let ComandoRicarica = window.localStorage.getItem("ComandoRicarica") || ' ';
let ComandoSuperFuoco = window.localStorage.getItem("ComandoSuperFuoco") || "Backspace";
let ComandoAlterna = window.localStorage.getItem("ComandoAlterna") || "AltGraph";
let ComandoMuoviSu = window.localStorage.getItem("ComandoMuoviSu") || 'ArrowUp';
let ComandoMuoviGiù = window.localStorage.getItem("ComandoMuoviGiù") || 'ArrowDown';
let ComandoSchiva = window.localStorage.getItem("ComandoSchiva") || 'Shift';
let Comando0 = window.localStorage.getItem("Comando0") || '0';
let Comando1 = window.localStorage.getItem("Comando1") || "1";
let Comando2 = window.localStorage.getItem("Comando2") || '2';
let Comando3 = window.localStorage.getItem("Comando3") || '3';
let PF = window.localStorage.getItem("PF") || 7;
let PR = window.localStorage.getItem("PR") || 2;
let PsF = window.localStorage.getItem("PsF") || 6;
let PA = window.localStorage.getItem("PA") || 4;
let PS = window.localStorage.getItem("PS") || 1;
let P0 = window.localStorage.getItem("P0") || 13;
let P1 = window.localStorage.getItem("P1") || 14;
let P2 = window.localStorage.getItem("P2") || 12;
let P3 = window.localStorage.getItem("P3") || 15;
let PP = window.localStorage.getItem("PP") || 9;
let AM;
let pr = true;
let G1 = true;
let G2 = true;
let ZM = window.localStorage.getItem("ZM") || 0.2;
let VC = window.localStorage.getItem("VC") || 1.0;
let VG = window.localStorage.getItem("VG") || 1.0;
window.localStorage.getItem('inv') != null? AM = 3 : AM = 1;
let Spara;
let Partita;
let Colpo = false;
let gap;
let risparo = true;
let cambio = false;
let Giocando = true;
let ric;
let danni = 0;
let conto;
let ArmaPresa;
let Boss = document.querySelector('#Nemico');
let ArmaInCanna = document.querySelector('#Arma');
let PersonaggioGiocabile = document.querySelector('#PGiocabile');
let Mirino = document.querySelector('#Mirino');
let PiuInfo = document.querySelector('#Munizioni');
let NomeDellEstensione = document.querySelector('#NomEstensione');
let AttaccoNemico = document.querySelector('#Attacco');
let BarraVita = document.querySelector('#Barra');
let hp = document.querySelector('#HP');
let PBMischia = document.querySelector("#PienBarraMischia");
let BarraMischia = document.querySelector('#BarraMischia');
let AmmoEstensione = document.querySelector("#AmmoEstensione");
let LePosizioni = document.querySelector('#Info2');
let PosizioneGiocatore = document.querySelector('#posG');
let PosizioneNemico = document.querySelector('#posA');
let Distanza = document.querySelector('#distanza');
let DistanzaAttaccoGiocatore = document.querySelector('#distanzaAG');
let Segnaposto1 = document.querySelector('#S1');
let Segnaposto2 = document.querySelector('#S2');
let RumoriArma = document.querySelector('#Rumori');
let FrasiNemico = document.querySelector('#Frasi');
let SalvezzInfo = document.querySelector("#SalvezzInfo");
let Countdown = document.querySelector("#Countdown");
let PannelloPausa = document.querySelector('#Pausa');
let PannelloConferma = document.querySelector('#Conferma');
let Sfondo = document.querySelector("body");
let FiguraMischia = document.querySelector("#Mischia");
let FiguraShotgun = document.querySelector("#Shotgun");
let FiguraAssalto = document.querySelector("#Assalto");
let FiguraCecchino = document.querySelector("#Cecchino");
let Elementi = [Boss,ArmaInCanna,Mirino,PiuInfo,AttaccoNemico,BarraVita,hp,PBMischia,BarraMischia,PosizioneGiocatore,PosizioneNemico,Distanza,DistanzaAttaccoGiocatore,Segnaposto1,Segnaposto2,RumoriArma,FrasiNemico,SalvezzInfo,Countdown,AmmoEstensione,NomeDellEstensione,PannelloConferma,PannelloPausa,PannelloOpzioni,FiguraAssalto,FiguraCecchino,FiguraMischia,FiguraShotgun];
const VAI = new Event("Riprendi");
const LEVA = new Event("pop");
let poi;
let NemicoInMoto;
let NemicoAllAttacco; 
let NemicoAltAttacco;
let n;
let m;
function ScaricaImmaginiArma(a)
{
    new Image().src = `./Immagini/Armi/${a.nome}.jpg`;
    new Image().src = `./Immagini/Armi/${a.nome}_attaccando.jpg`;
    new Image().src = `./Immagini/Armi/${a.nome}_${a.Estensione.Mod1[0]}.jpg`;
    new Image().src = `./Immagini/Armi/${a.nome}_${a.Estensione.Mod2[0]}.jpg`;
    new Image().src = `./Immagini/Ricarica/${a.nome}_ricarica1.jpg`;
    new Image().src = `./Immagini/Ricarica/${a.nome}_ricarica2.jpg`;
}
function ScaricaImmagini(m,s,a,c,n)
{
    [s,a,c].forEach(A => {ScaricaImmaginiArma(A)});
    new Image().src = `./Immagini/Armi/${m}.jpg`;
    new Image().src = `./Immagini/Armi/${m}_attaccando.jpg`;
    new Image().src = `./Immagini/Nemici/${n}.jpg`;
    new Image().src = `./Immagini/Nemici/${n}_attaccando.jpg`;
}
function AggiornaMirino()
{   
    if(ArmaPresa.Estensione != null)
    {
        if(Math.max(ArmaPresa.portata,ArmaPresa.Estensione.portata) >= distanza)
    {
        if(ArmaPresa.portata < ArmaPresa.Estensione.portata)
        {
            if(ArmaPresa.portata >= distanza)
            {   
                if(Mirino.style.color != "purple")
                {
                    Mirino.style.color = 'purple';
                }
            }
            else if(ArmaPresa.Estensione.portata >= distanza && Mirino.style.color != "blue")
            {
                Mirino.style.color = 'blue';
            }
        }
        else
        {
            if(ArmaPresa.Estensione.portata >= distanza)
            {   
                if(Mirino.style.color != "purple")
                {
                    Mirino.style.color = 'purple';
                }
            }
            else if(ArmaPresa.portata >= distanza && Mirino.style.color != "red")
            {
                Mirino.style.color = 'red';
            }
        }
    }
    else if(Mirino.style.color != "white")
    {
        Mirino.style.color = "white";
    }
    }
    else
    {
        if(ArmaPresa.portata >= distanza && Mirino.style.color != "red")
        {
            Mirino.style.color = 'red';
        }
        else if(Mirino.style.color != "white")
        {
            Mirino.style.color = "white";
        }
    }
}
function Pulisci()
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
    }
}
function Preso(ArmaEquipaggiata)
{
    if(ArmaEquipaggiata.portata >= distanza)
    {
        NemicoScelto.vita = NemicoScelto.vita - ArmaEquipaggiata.danni;
        BarraVita.style.width = `${Math.pow(NemicoScelto.vita/NemicoScelto.maxvita,2)*30.875}vw`;
        BarraVita.style.right = `${15.4375*(1 - Math.pow(NemicoScelto.vita/NemicoScelto.maxvita,2))}vw`;
        if(NemicoScelto.vita <= 0)
        {
            Fine(true);
        }
        if(AltAttacco)
        {
            danni += ArmaEquipaggiata.danni;
            if(danni >= ric)
            {
                Sfondo.dispatchEvent(LEVA);
            }
        }
        return true;
    }
    else
    {
        return false;
    }
}
function Colpito()
{ 
        if(!Schivando)
        {
            Protagonista.vita -= 1;
            hp.textContent = `HP: ${Protagonista.vita}`;
            hp.classList.add("LampeggiaHP");
            hp.addEventListener('animationend',() => {hp.classList.remove("LampeggiaHP");},{once: true,});
            if(Controller && !d){Controller.vibrationActuator.playEffect("dual-rumble",{duration: 500, strongMagnitude: VC*1.0, weakMagnitude: VC*1.0});}
            if(Protagonista.vita <= 0)
        {
            Fine(false);
        }
        }
        distanzaAG = distanza;
        AttaccoNemico.style.color = "transparent";
        AttaccoNemico.style.transform = `scale(${10/Math.max(distanzaAG,10)})`;
        DistanzaAttaccoGiocatore.textContent = `[Distanza Attacco - Giocatore]: ${distanzaAG}`;
}
function SuperColpito()
{       
    if(ric > danni && !Schivando)
    {
        Protagonista.vita -= 1;
        hp.textContent = `HP: ${Protagonista.vita}`;
        hp.classList.add("LampeggiaHP");
        hp.addEventListener('animationend',() => {hp.classList.remove("LampeggiaHP");},{once: true,});
        if(Controller && !d){Controller.vibrationActuator.playEffect("dual-rumble",{duration: 500, strongMagnitude: VC*1.0, weakMagnitude: VC*1.0});}
        if(Protagonista.vita <= 0)
        {
            Fine(false);
        }
    }
    Sfondo.classList.remove("Sfondone");
    Boss.setAttribute('src',`./Immagini/Nemici/${NemicoScelto.nome}.jpg`);
    if(Giocando){FrasiNemico.textContent = "";}
    danni = 0;
    AltAttacco = false;
}
function PausaRiprendi()
{   
    if(!InPausa)
    {
        InPausa = true;
        ArmaInCanna.style.animationPlayState = "paused";
        BarraMischia.style.animationPlayState = "paused";
        PersonaggioGiocabile.style.animationPlayState = "paused";
        hp.style.animationPlayState = "paused";
        Sfondo.style.animationPlayState = "paused";
        PannelloPausa.showModal();
    }
    else
    {
        InPausa = false;
        ArmaInCanna.style.animationPlayState = "running";
        BarraMischia.style.animationPlayState = "running";
        PersonaggioGiocabile.style.animationPlayState = "running";
        hp.style.animationPlayState = "running";
        Sfondo.style.animationPlayState = "running";
        clearTimeout(poi);
        document.dispatchEvent(VAI);
        PannelloPausa.close();
    }
}
function Fine(vittoria)
{       
        InPausa = true;
        Giocando = false;
        clearInterval(Partita);
        document.removeEventListener('keydown',ComandiKeyDown);
        document.removeEventListener('keyup',ComandiKeyUp);
        document.removeEventListener('click',ClickPausa);
        cancelAnimationFrame(start);
        PersonaggioGiocabile.classList.remove('Scuoti','Schivata');
        ArmaInCanna.classList.remove('TornaSu','VaiGiù');
        Elementi.forEach(E => {E.style.opacity = 0;});
        ArmaInCanna.style.opacity = 1;
        Boss.style.opacity = 1;
        document.querySelector("#PienBarra").style.opacity = 0;
        FrasiNemico.style.opacity = 1;
        PannelloPausa.style.opacity = 1;
        PannelloConferma.style.opacity = 1;
        Pulisci();
        if(vittoria)
        {   
            document.querySelector('#SchermataPausa').style.color = "green";
            document.querySelector('#SchermataPausa').innerHTML = `VITTORIA! <button type = "button" id = "Riprendi" onclick = "event.stopPropagation(); PausaRiprendi(NemicoScelto);" style = "opacity: 0.5" disabled>Riprendi</button>
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
            setTimeout(() => {ArmaInCanna.src = `./Immagini/Animazioni/Animazione Vittoria contro ${NemicoScelto.nome}_2.jpg`; Boss.src = `./Immagini/Animazioni/Animazione Vittoria ${NemicoScelto.nome}_2.jpg`; RumoriArma.textContent = "";},1500);
        }
        else
        {   
            document.querySelector('#SchermataPausa').style.color = "red";
            document.querySelector('#SchermataPausa').innerHTML = `Game Over <button type = "button" id = "Riprendi" onclick = "event.stopPropagation(); PausaRiprendi(NemicoScelto);" style = "opacity: 0.5" disabled>Riprendi</button>
            <button type = "button" id = "Riprova" onclick = "if(!RimaniQui){RimaniQui = true;} PannelloConferma.showModal()">Riprova</button>
            <button type="button" id = "BottoneOpzioni" onclick="PannelloOpzioni.showModal();">Opzioni</button>
            <button type = "button" id = "Abbandona" onclick = "if(RimaniQui){RimaniQui = false;} PannelloConferma.showModal()">Gioca ancora</button>`;
            ArmaInCanna.classList.add('VaiGiù');
            setTimeout(() =>{FrasiNemico.textContent = `${NemicoScelto.Frasi[1]}`},500);
            setTimeout(() => {ArmaInCanna.classList.remove('VaiGiù'); ArmaInCanna.classList.add('TornaSu'); ArmaInCanna.src = "./Immagini/Animazioni/Animazione Sconfitta.jpg";},500);
            setTimeout(() => {ArmaInCanna.classList.remove('TornaSu'); RumoriArma.textContent = "";},1000);
        }
        setTimeout(() => {PannelloPausa.showModal();},3000);
}
function ComandiKeyDown()
{
if(!InPausa){
        switch(event.key)
        {
            case Comando0: 
            if(ArmaPresa != MischiaEquipaggiata && !InCarica)
            {   
                FiguraMischia.style.opacity = 1;
                setTimeout(() => {FiguraMischia.style.opacity = 0.5},200);
                risparo = true;
                Colpo = Protagonista.CambioArma(MischiaEquipaggiata);
                ArmaPresa = MischiaEquipaggiata;
            }
            break;

            case Comando1:
            if(ArmaPresa != ShotgunEquipaggiato && !InCarica)
            {   
                FiguraShotgun.style.opacity = 1;
                setTimeout(() => {FiguraShotgun.style.opacity = 0.5},200);
                risparo = true;
                Colpo = Protagonista.CambioArma(ShotgunEquipaggiato);
                ArmaPresa = ShotgunEquipaggiato;
            }
            break;

            case Comando2:
            if(ArmaPresa != AssaltoEquipaggiato && !InCarica)
            {   
                FiguraAssalto.style.opacity = 1;
                setTimeout(() => {FiguraAssalto.style.opacity = 0.5},200);
                risparo = true;
                Colpo = Protagonista.CambioArma(AssaltoEquipaggiato);
                ArmaPresa = AssaltoEquipaggiato;
            }
            break;

            case Comando3:
            if(ArmaPresa != CecchinoEquipaggiato && !InCarica)
            {   
                FiguraCecchino.style.opacity = 1;
                setTimeout(() => {FiguraCecchino.style.opacity = 0.5},200);
                risparo = true;
                Colpo = Protagonista.CambioArma(CecchinoEquipaggiato);
                ArmaPresa = CecchinoEquipaggiato;
            }
            break;

            case ComandoRicarica:
            if(ArmaPresa != MischiaEquipaggiata && !InCarica)
            {   
                Pulisci();
                risparo = true;
                ArmaPresa.Ricarica();
            }
            break;

            case ComandoAlterna:
            if(!cambio)
            {
                ArmaPresa.Estensione.Scambia();
            }
            break;

            case ComandoSchiva:
                if(PuòSchivare)
                {  
                   Protagonista.Schiva(); 
                }
            break;

            case ComandoFuoco:
            if(!Colpo && !InCarica && risparo)
            {   
                ArmaPresa.Fuoco();
            }
            break;

            case ComandoSuperFuoco:
            if(!Colpo && !InCarica && risparo)
            {   
                ArmaPresa.Estensione.SuperFuoco();
            }
            break;

            case ComandoMuoviSu: 
                if(!Corri)
                {
                    PersonaggioGiocabile.classList.add('Scuoti');
                    Corri = true;
                    Protagonista.Muovi(true);
                }
            break;

            case ComandoMuoviGiù:
                if(!Corri)
                {
                    PersonaggioGiocabile.classList.add('Scuoti');
                    Corri = true;
                    Protagonista.Muovi(false);
                }
            break;
            }}
                else
                {
                switch(event.key)
                {
                    case ComandoMuoviSu:
                    case ComandoMuoviGiù:
                    Corri = false;
                    break;

                    case ComandoFuoco:
                    ArmaPresa.Arresta();
                    break;

                    case ComandoSuperFuoco:
                    ArmaPresa.Estensione.SuperArresta();
                    break;

                    case ComandoAlterna:
                    cambio = false;
                    break;
                }}
}
function ComandiKeyUp()
{
    switch(event.key)
    {
        case ComandoMuoviSu:
        case ComandoMuoviGiù:
        Corri = false;
        break;

        case ComandoFuoco:
        ArmaPresa.Arresta();
        break;

        case ComandoSuperFuoco:
        ArmaPresa.Estensione.SuperArresta();
        break;

        case ComandoAlterna:
        cambio = false;
        break;
    }
}
function ClickPausa()
{
    if(!InPausa){PausaRiprendi()};
}
function ComandiController()
{   
    Controller = navigator.getGamepads()[0];
    if(!Controller)
    {
        return;
    }
    if(Math.abs(Controller.axes[AM]) >= ZM && !InPausa)
    {   
        if(!Corri)
        {
            PersonaggioGiocabile.classList.add('Scuoti');
            Corri = true;
            Controller.axes[AM] < 0 ? Protagonista.Muovi(true) : Protagonista.Muovi(false);  
        }
    }
    else
    {   
        if(Corri)
        {
            Corri = false;
        }
    }
    if(Controller.buttons[P2].pressed && ArmaPresa != AssaltoEquipaggiato && !InCarica && !InPausa)
    {   
        FiguraAssalto.style.opacity = 1;
        setTimeout(() => {FiguraAssalto.style.opacity = 0.5},200);
        risparo = true;
        Colpo = Protagonista.CambioArma(AssaltoEquipaggiato);
        ArmaPresa = AssaltoEquipaggiato;
    }
    if(Controller.buttons[P0].pressed && ArmaPresa != MischiaEquipaggiata && !InCarica && !InPausa)
    {   
        FiguraMischia.style.opacity = 1;
        setTimeout(() => {FiguraMischia.style.opacity = 0.5},200);
        risparo = true;
        Colpo = Protagonista.CambioArma(MischiaEquipaggiata);
        ArmaPresa = MischiaEquipaggiata;
    }
    if(Controller.buttons[P1].pressed && ArmaPresa != ShotgunEquipaggiato && !InCarica && !InPausa)
    {   
        FiguraShotgun.style.opacity = 1;
        setTimeout(() => {FiguraShotgun.style.opacity = 0.5},200);
        risparo = true;
        Colpo = Protagonista.CambioArma(ShotgunEquipaggiato);
        ArmaPresa = ShotgunEquipaggiato;
        
    }
    if(Controller.buttons[P3].pressed && ArmaPresa != CecchinoEquipaggiato && !InCarica && !InPausa)
    {   
        FiguraCecchino.style.opacity = 1;
        setTimeout(() => {FiguraCecchino.style.opacity = 0.5},200);
        risparo = true;
        Colpo = Protagonista.CambioArma(CecchinoEquipaggiato);
        ArmaPresa = CecchinoEquipaggiato;
    }
    if(Controller.buttons[PR].pressed && ArmaPresa != MischiaEquipaggiata && !InCarica && !InPausa)
    {  
        Pulisci();
        risparo = true;
        ArmaPresa.Ricarica();
    }
    if(Controller.buttons[PS].pressed && PuòSchivare && !InPausa)
    {
        Protagonista.Schiva(); 
    }
    if(Controller.buttons[PF].pressed && G1 && !InPausa)
    {   
        if(G2 && Controller.buttons[PsF].pressed)
        {
            G2 = false; 
            ArmaPresa.Estensione.SuperArresta();
        }
        if(!Colpo && !InCarica && risparo)
        {   
            ArmaPresa.Fuoco();
        }
    }
    else if(!Controller.buttons[PF].pressed)
    {   
        if(Colpo)
        {   
            if(!Controller.buttons[PsF].pressed)
            {
                ArmaPresa.Arresta();
            }
            G1 = true;
        }
    }
    if(Controller.buttons[PsF].pressed && G2 && !InPausa)
    {   
        if(G1 && Controller.buttons[PF].pressed)
        {
            G1 = false; 
            ArmaPresa.Arresta();
        }
        if(!Colpo && !InCarica && risparo)
        {   
            ArmaPresa.Estensione.SuperFuoco();
        }
    }
    else if(!Controller.buttons[PsF].pressed)
    {  
        if(Colpo)
        {   
            if(!Controller.buttons[PF].pressed)
            {
                ArmaPresa.Estensione.SuperArresta();
            }
            G2 = true;
        }
    }
    if(Controller.buttons[PA].pressed && !InPausa)
    {
        if(!cambio)
        {
            ArmaPresa.Estensione.Scambia();
            cambio = true;
        }
    }
    else
    {
        if(cambio)
        {
            cambio = false;
        }
    }
    if(Controller.buttons[PP].pressed)
    {   
        if(pr)
        {
            PausaRiprendi();
            pr = false;
        }
    }
    else  
    {   
        if(!pr)
        {
            pr = true;
        }
    }
    start = requestAnimationFrame(ComandiController);
}
function Gioco()
{   
    ArmaPresa = AssaltoEquipaggiato;
    Boss.setAttribute('src',`./Immagini/Nemici/${NemicoScelto.nome}.jpg`);
    ArmaInCanna.setAttribute('src',`./Immagini/Armi/${ArmaPresa.nome}.jpg`);
    Mirino.innerHTML = ArmaPresa.mirino;
    AttaccoNemico.textContent = NemicoScelto.attacco;
    PiuInfo.textContent = `${ArmaPresa.munizioni}|${ArmaPresa.inventario}`;
    AmmoEstensione.textContent = `${ArmaPresa.Estensione.cariche}/${ArmaPresa.Estensione.maxcariche}`;
    NemicoScelto.velocità = Math.pow(1.5,difficoltà)*10;
    NemicoScelto.vita = Math.pow(1.2,difficoltà)*250000;
    NemicoScelto.maxvita = NemicoScelto.vita;
    Boss.style.transform = `scale(${10/Math.max(distanza,10)})`;
    AttaccoNemico.style.transform = `scale(${10/Math.max(distanzaAG,1)})`;
    Segnaposto1.style.transform = `scale(${10/Math.max(posG,10)})`;
    Segnaposto2.style.transform = `scale(${10/Math.max(200 - posG,10)})`;
    NomeDellEstensione.textContent = `${ArmaPresa.Estensione.nome}`;
    Sfondo.style.setProperty("--attaccolore",NemicoScelto.coloreAttacco);
    AggiornaMirino();
    ric = NemicoScelto.maxvita*0.02;
    AlternaControllerTastiera(Controller);
    Partita = setInterval(() => {
        document.removeEventListener("Riprendi",NemicoAllAttacco,{once: true,});
        document.removeEventListener("Riprendi",NemicoAltAttacco,{once: true,});
        document.removeEventListener("Riprendi",NemicoInMoto,{once: true,});
        let disc = Math.random()*Math.max(30,Math.min(distanza,60))/40 - Math.sqrt(Protagonista.vita)/(Math.trunc(Math.sqrt(Protagonista.vita))*10);
        if(disc < 0.6)
        {   
            if(!AllAttacco && (distanza > NemicoScelto.velocità || (PuòSchivare && distanza/NemicoScelto.velocità > 0.1)) && (disc > 0.12 || AltAttacco))
            {   
                if(!InPausa)
                {   
                    if(n < 3)
                    {
                        n++;
                        NemicoScelto.AllAttacco();
                    }
                    else
                    {
                        n = 0;
                        NemicoScelto.Moto();
                    } 
                }
                else
                {
                    document.addEventListener("Riprendi",NemicoAllAttacco,{once: true,});
                }
            }
            else if(!AltAttacco)
            {   
                if(!InPausa)
                {
                    if(m < 3)
                    {
                        m++;
                        NemicoScelto.AltAttacco();
                    }
                    else
                    {
                        m = 0;
                        NemicoScelto.Moto();
                    } 
                }
                else
                {
                    document.addEventListener("Riprendi",NemicoAltAttacco,{once: true,});
                }
            }
        }
        else if(!InMoto)
        {   
            if(!InPausa)
            {
                NemicoScelto.Moto();
            }
            else
            {
                document.addEventListener("Riprendi",NemicoInMoto,{once: true,});
            }
        }
    },VRag);
}
function VaiVaiVai()
{
    Nemici.forEach(N => {if(sessionStorage.getItem("Nemico scelto") == N.nome){NemicoScelto = N;}});
    Armi.forEach(A => {if(sessionStorage.getItem("ShotgunEquipaggiato") == A.nome){ShotgunEquipaggiato = A;} else if (sessionStorage.getItem("AssaltoEquipaggiato") == A.nome){AssaltoEquipaggiato = A;} else if (sessionStorage.getItem("CecchinoEquipaggiato") == A.nome){CecchinoEquipaggiato = A;}});
    Mischie.forEach(M => {if(sessionStorage.getItem("MischiaEquipaggiata") == M.nome){MischiaEquipaggiata = M;}})
    difficoltà = Number(sessionStorage.getItem("Difficoltà"));
    VRag = 4000/difficoltà;
    AggiornaImpostazioni();
    NomiComandi.forEach(C => {AggiornaImmagineImpostazioni(C);});
    ScaricaImmagini(MischiaEquipaggiata.nome,ShotgunEquipaggiato,AssaltoEquipaggiato,CecchinoEquipaggiato,NemicoScelto.nome);
    FiguraMischia.querySelector('img').src = `Immagini/Anteprime/${MischiaEquipaggiata.nome}_anteprima.jpg`;
    FiguraShotgun.querySelector('img').src = `Immagini/Anteprime/${ShotgunEquipaggiato.nome}_anteprima.jpg`;
    FiguraAssalto.querySelector('img').src = `Immagini/Anteprime/${AssaltoEquipaggiato.nome}_anteprima.jpg`;
    FiguraCecchino.querySelector('img').src = `Immagini/Anteprime/${CecchinoEquipaggiato.nome}_anteprima.jpg`;
    Filtra(filtro);
    NemicoInMoto = NemicoScelto.Moto.bind(NemicoScelto);
    NemicoAllAttacco = NemicoScelto.AllAttacco.bind(NemicoScelto);
    NemicoAltAttacco = NemicoScelto.AltAttacco.bind(NemicoScelto);
    Gioco();
}