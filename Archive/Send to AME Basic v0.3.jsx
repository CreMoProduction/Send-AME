


app.beginUndoGroup('Send Render Queue');    //начало отмены действия Ctrl + Z

/*function DisableLayers() {           //отключаю видимость слоев
    var NumMax=numI=app.project.item(1).numLayers, n=1;
while (n>0 && n<NumMax+1) {    
    app.project.item(1).layer(n).enabled = false; 
    n++ 
    }
}*/ 

var RenderFolder=app.project.items.addFolder("Render"); //создаю папку
var nItem=1, ProceedCompNameBeforeFolderMove;
function CheckCompItem() {
while (nItem>0 && nItem<1000) {       //проверяю индекс item который является CompItem
    if(app.project.item(nItem) instanceof CompItem) {
        ProceedCompNameBeforeFolderMove=app.project.item(nItem).name;
    return nItem; 
    break; 
} else { 
    nItem++;     
}
}
}
CheckCompItem ()
alert(ProceedCompNameBeforeFolderMove);

var CheckNumLayers=numI=app.project.item(nItem).numLayers, n=CheckNumLayers, ChooseLayer;
while (n<CheckNumLayers+1 && n>0) {
    ChooseLayer = app.project.item(nItem).layer(n);
    ChooseLayer.enabled = true;                                        //включаю видимость слоев

    var GetDuration;
    function DurationLayer() {                 //получаю длину слоя 
        var InPointLayer, OutPointLayer;
        InPointLayer=app.project.item(nItem).layer(n).inPoint;
        OutPointLayer=app.project.item(nItem).layer(n).outPoint;
        GetDuration=OutPointLayer-=InPointLayer;
        return GetDuration;
    }
    DurationLayer()
    /*--------------------*/
    var GetNameLayer= app.project.item(nItem).layer(n).name;                   //получаю имя слоя
    var GetNameComp= GetNameLayer += ' Comp'                               //имя слоя + Comp

    var nI=2, Width, Height, PixelAspect, FrameRate;  
    function GetPropertiesToComp() {     //получаю свойства слоя через проверу его на Project пенеле   
      while (nI>0 && nI<1000) {
    if (app.project.item(nItem).layer(n).name==app.project.item(nI).name) {                 
        Width = app.project.item(nI).width;
        Height = app.project.item(nI).height;
        FrameRate = app.project.item(nI).frameRate;
        PixelAspect = app.project.item(nI).pixelAspect;
       break;
        }else {
            nI++;
        }
    } 
    }
    GetPropertiesToComp()


    app.project.items.addComp(GetNameComp, Width, 1080, PixelAspect, GetDuration, FrameRate);  //создаю композицию с именем "имя слоя Comp"
    /*
    function MoveToFolder() {
    var n=1;
    while (n>0 && n<1000) {
    if (GetNameComp==app.project.item(n).name) {     //перемещаю в папку
        
        app.project.item(n).parentFolder = RenderFolder;
        break;
    } else {
        n++;
    }}}
MoveToFolder();
*/

    
    var AVItemN=1;
    while (AVItemN>0 && AVItemN<app.project.numItems) {   
        if (app.project.item(AVItemN).name==GetNameComp)                //проверка если item = "Имя слоя Comp"
        {
        app.project.item(nItem).layer(n).copyToComp(app.project.item(AVItemN));  //копирую слой "имя слоя" в композицию "имя слоя Comp"
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

