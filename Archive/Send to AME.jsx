


app.beginUndoGroup('Send Render Queue');    //начало отмены действия Ctrl + Z

var Width, Height, PixelAspect, FrameRate; //получаю свойства композиции
function GetCompProperty () {

Width=app.project.item(1).width;  
Height=app.project.item(1).height;
PixelAspect=app.project.item(1).pixelAspect;
FrameRate=app.project.item(1).frameRate;  
}
 

/*function DisableLayers() {           //отключаю видимость слоев
    var NumMax=numI=app.project.item(1).numLayers, n=1;
while (n>0 && n<NumMax+1) {    
    app.project.item(1).layer(n).enabled = false; 
    n++ 
    }
}*/

var CheckNumLayers=numI=app.project.item(1).numLayers, n=CheckNumLayers, ChooseLayer;
while (n<CheckNumLayers+1 && n>0) {
    ChooseLayer = app.project.item(1).layer(n);
    ChooseLayer.enabled = true;                                        //включаю видимость слоя
    ChooseLayer.solo = true;      }                                     //включаю соло слоя

    var GetDuration;
function DurationLayer() {                 //получаю длину слоя 
var InPointLayer, OutPointLayer;
InPointLayer=app.project.activeItem.layer(1).inPoint;
OutPointLayer=app.project.activeItem.layer(1).outPoint;
GetDuration=OutPointLayer-=InPointLayer;
return GetDuration;
}

GetCompProperty ()
DurationLayer()

    var GetName= app.project.item(1).layer(n).name;                   //получаю имя слоя
    var GetNameComp= GetName += ' Comp'                               //имя слоя + Comp
    app.project.items.addComp(GetNameComp, Width, Height, PixelAspect, GetDuration, FrameRate);  //создаю композицию с именем "имя слоя Comp"
    
    var ItemN=1;
    while (ItemN>0 && ItemN<1000) {   
        if (app.project.item(ItemN).name==GetNameComp)                //проверка если item = "Имя слоя Comp"
        {
        app.project.item(1).layer(n).copyToComp(app.project.item(ItemN));  //копирую слой "имя слоя" в композицию "имя слоя Comp"
        app.project.renderQueue.items.add(app.project.item(ItemN));        //отправляю на рендер "имя слоя Comp" 

        break;
        
        }else {
            ItemN++;
        }
    }
    n-=1;


app.endUndoGroup(); //конец отмены действия Ctrl + Z

if (app.project.renderQueue.canQueueInAME == true)
    {
        
        //app.project.renderQueue.queueInAME(false);                     // Отправляю в AME
        alert('Media were sent to AME');
    }
    else {
        alert("There are no queued item in the Render Queue.");
}

