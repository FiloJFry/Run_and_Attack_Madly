let start;
let Controller;
let d;
window.addEventListener("gamepadconnected",() => 
{
    Controller = navigator.getGamepads()[0];
    d = `${Controller.id}`.split(' ')[0] == "DualSense";
    console.log("Controller connesso");
    AlternaControllerTastiera(true);
});
window.addEventListener("gamepaddisconnected",() => 
{
    Controller = undefined;
    console.log("Controller disconnesso");
    AlternaControllerTastiera(false);
});
function AlternaControllerTastiera(concon)
{
    if(concon)
    {
        document.removeEventListener('keydown',ComandiKeyDown);
        document.removeEventListener('keyup',ComandiKeyUp);
        document.removeEventListener('click',ClickPausa);
        ComandiController();
    }
    else
    {
        document.addEventListener('keydown',ComandiKeyDown);
        document.addEventListener('keyup',ComandiKeyUp);
        document.addEventListener('click',ClickPausa);
        cancelAnimationFrame(start);
        start = undefined;
    }
}