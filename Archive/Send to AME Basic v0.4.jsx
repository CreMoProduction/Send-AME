


app.beginUndoGroup('Send Render Queue');    //начало отмены действия Ctrl + Z

/*function DisableLayers() {           //отключаю видимость слоев
    var NumMax=numI=app.project.item(1).numLayers, n=1;
while (n>0 && n<NumMax+1) {    
    app.project.item(1).layer(n).enabled = false; 
    n++ 
    }
}*/ 

var RenderFolder=app.project.items.addFolder("Render"); //создаю папку
var nItem=1;
function CheckCompItem() {
    while (nItem>0 && nItem<1000) {       //проверяю индекс item который является CompItem
    if(app.project.item(nItem) instanceof CompItem && app.project.activeItem) {
        
    return nItem; 
    break; 
} else { 
    nItem++;     
}
}
} CheckCompItem ()

function GeneralFunction() {                     //ТЕЛО ГЛАВНОЙ ФУНКЦИИ
var CheckNumLayers=numI=app.project.activeItem.numLayers, n=CheckNumLayers, ChooseLayer;
while (n<CheckNumLayers+1 && n>0) {
    ChooseLayer = app.project.activeItem.layer(n);
    ChooseLayer.enabled = true;                                        //включаю видимость слоя

    var GetDuration;
    function DurationLayer() {                 //получаю длину слоя 
        var InPointLayer, OutPointLayer;
        InPointLayer=app.project.activeItem.layer(n).inPoint;
        OutPointLayer=app.project.activeItem.layer(n).outPoint;
        GetDuration=OutPointLayer-=InPointLayer;
        return GetDuration;
    }
    DurationLayer()
    /*--------------------*/
    var GetNameLayer= app.project.activeItem.layer(n).name;                   //получаю имя слоя
    var GetNameComp= GetNameLayer += ' Comp'                               //имя слоя + Comp

    var nI=1, Width, Height, PixelAspect, FrameRate;  
    function GetPropertiesToComp() {     //получаю свойства слоя через проверу его на Project пенеле   
             while (nI>0 && nI<1000) {
                 if (app.project.activeItem.layer(n).name==app.project.item(nI).name) {                           
        Width = app.project.item(nI).width;
        Height = app.project.item(nI).height;
        FrameRate = app.project.item(nI).frameRate;
        PixelAspect = app.project.item(nI).pixelAspect;
       break;
        }else {
            nI++;
        }
        
    } }
    GetPropertiesToComp()
    
//alert(Width+' '+Height+' '+Math.round(FrameRate)+' '+PixelAspect);

try {
    app.project.items.addComp(GetNameComp, Width, Height, PixelAspect, GetDuration, FrameRate);  //создаю композицию с именем "имя слоя Comp"
 
    function MoveToFolder() {
    var n=1;
    while (n>0 && n<1000) {
    if (GetNameComp==app.project.item(n).name) {     //перемещаю в папку композицию с именем "имя слоя Comp"
        app.project.item(n).parentFolder = RenderFolder;
        break;
    } else {
        n++;
    }}}
MoveToFolder();

}catch (CannotQueueLayer) {alert("Can't queue " +app.project.item(nI).name+"\n"+"Use Comps or Footages") // ERR. обработка ошибки в случае FrameRate=0
var ConfirmError=Window.confirm('Do you want to continue processing?');
} 
if (ConfirmError==false) {break;}

 
    var AVItemN=1, nItemQ=nItem+1;
    while (AVItemN>0 && AVItemN<app.project.numItems) {   
        if (app.project.item(AVItemN).name==GetNameComp)                //проверка если item = "Имя слоя Comp"
        {
        app.project.activeItem.layer(n).copyToComp(app.project.item(AVItemN));  //копирую слой "имя слоя" в композицию "имя слоя Comp"
        app.project.renderQueue.items.add(app.project.item(AVItemN));        //отправляю на рендер "имя слоя Comp" 

        break;
        
        }else {
            AVItemN++;
        }
    }
    
    n-=1; 

} 
/*-------------------*/
app.endUndoGroup(); //конец отмены действия Ctrl + Z

if (app.project.renderQueue.canQueueInAME == true)
    {
        
        //app.project.renderQueue.queueInAME(false);                     // Отправляю в AME
        alert('Layers were sent to AME');
    }
    else {
        alert("There are no queued item in the Render Queue.");
    }
}
GeneralFunction()