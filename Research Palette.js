{
function Script(thisObj) {

var n=1, dropdown1_array = [];
while (n>0 && n<app.project.numItems) { //получаю список композиций
if (app.project.item(n) instanceof CompItem) {
    dropdown1_array.push(app.project.item(n).name)
    if (app.project.item(n++).name==!CompItem) break;
} else {n++}
}

function Build_UI(thisObj) {
var pal = (thisObj instanceof Panel) ? thisObj : new Window("palette", undefined, undefined, {resizeable: true}, orientation = "column",spacing= 10, margins= 16); 
if (pal != null) {
var res=
"group { \
    orientation: 'column', \
    text: StaticText {orientation: 'column', alignChildren: ['center','top'], spacing: 10, margins: 16}, \
    group1: Group { \
        text3: StaticText {}, \
        dropdown1: DropDownList {properties: { }, preferredSize:[100,20], }, \
        image1: Image {File: image1_imgString} \
        orientation: 'column', alignChildren: ['left', 'center'],spacing: 10, margins: 0, \
        edittext2: EditText {preferredSize:[45,20],alignment:['left', 'top']}, \
        button1: Button {text: 'Run',preferredSize: [173, 27]}, \
    } \
    }\
} \
";
var image1_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%C2%AE%C2%A2%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C3%89e%3C%00%00%01%07IDATx%C3%9A%C3%AC%C2%96%C3%BD%0D%C2%83%20%10%C3%85%C3%85t%00Fp%04Gh7p%04%C2%BBA%3B%C2%89%23t%C2%85n%C2%A0%1B%C3%98%11%C2%BA%C2%81n%40%1F%0D%C2%B4h%3DA%22%C3%B8G%7D%C3%89%C2%8B%17%14%7F%7C%C3%9C%11%C2%98%C2%80%C2%92%0D%C2%94%26%1B%C3%A9%60%C3%84W%C3%B8%11%C2%98%C2%97%C3%83%C3%95%3B%12_%1D%5Dz%C3%A2%C2%BB%1C%C3%A6%3ET%C3%89%C3%90%C2%B0tA%C2%A7%02%C3%AE%10%C2%B6p%C2%87%C3%B8%C3%A6%3B%00%C3%A7%19%C3%A3%5D%26%C2%A1%C3%A2WU%C3%A8%19%170'%C3%9A7%C3%89j%1E%1A%7C_%C3%98%C2%BE%0E%C2%981%C3%B6%C3%84%C3%A3%0C%C3%B7Fs%C2%A3J0%5Cr%19%C3%9Fr%C2%95%20Y%C2%B4rR3%C3%AF%C3%A1F%C2%AD%C2%809%C2%98Z%C3%96w%C2%B4%C3%A4Ru%5C%C3%83r%C2%B5%16%C3%81S%C3%8B%C2%8F%2B%C2%B8%C2%B4%40s%23%C3%83%C3%9D%C3%A1%C3%94%1E%C2%AB%C2%93I%C2%AB%C2%9C%C3%98%C3%ABVL%C2%AB%C2%A3%C3%A0%C3%A6%1EO%C2%82G%C3%90%01%C3%9C%02%C2%9D%C2%85%C3%8F%C2%82%09%C2%A8%C3%96%C3%85%01J%C3%82I%C2%B0%05%C3%AA%C2%A3%01%C2%9C%02%C2%B7%22%C2%8C%3Ep%13%C3%8C%22%5D%7D%C3%A4%C2%89w%C3%92%C2%99%1F%C3%B3%C3%AA3.%C2%BD%C2%84%C3%BD%C3%9Deo%07%C3%AF%C3%A0%1D%C2%BC%C2%9A%5E%02%0C%00u%C2%82%C2%98%3D%C3%8A%C2%8D%C3%B4%C2%B0%00%00%00%00IEND%C2%AEB%60%C2%82"; 
pal.add("image", undefined, File.decode(image1_imgString), {name: "image1"}); 

pal.grp= pal.add(res);
pal.layout.layout(true);
pal.grp.minimumSize= pal.grp.size;
pal.layout.resize();
pal.onResizing = pal.onResize = function () {this.layout.resize();}

var Q='Comp to Proceed';
pal.grp.group1.text3.text= 'Comp to Proceed'; 


var listItem= dropdown1_array;
for (var i=0; i<listItem.length; i++)
pal.grp.group1.dropdown1.add("item", listItem[i]);
pal.grp.group1.dropdown1.selection= 0;

pal.grp.group1.edittext2.onChange= function () {alert()}
pal.grp.group1.button1.onClick=  function onRun(){
    var Q= dropdown1_array[this.parent.parent.group1.dropdown1.selection.index];
    alert(Q);
}
}
return (pal);
}

    
    

// Build script panel
var myScriptPal = Build_UI(thisObj);
if (myScriptPal !== null) {
    if (myScriptPal instanceof Window) {
        myScriptPal.center();
        myScriptPal.show();
    } else {
        myScriptPal.layout.layout(true);
        myScriptPal.layout.resize();
    }
} else {
alert("Could not open the user interface.", scriptName);
}

        
    









app.beginUndoGroup('Research');




app.endUndoGroup();



}


// Execute script
Script(this);
}






//-------------BASEMENT-------------

//---------проверяю кол-во слоев на таймлайне? путем изменения opacity до 2 и возвращение opacity на 100-------------

/*
var CheckNum=1;
function CheckLayersNum() {
try{

    while (CheckNum>0 && CheckNum<100) {
    app.project.item(1).layer(CheckNum).property("Opacity").setValue(2);
    app.project.item(1).layer(CheckNum).property("Opacity").setValue(100);
    CheckNum++;
    //if (app.project.item(1).layer(n))
    }
} catch(err) {
   
alert(CheckNum);
return CheckNum; 
    }

}
var CheckNumValue=CheckLayersNum();
alert(CheckNumValue);
*/
//-------------отключаю видимость слоев, путем catch (err)------------
/*
function DisableLayers() {          
    var n=1;
    while (n>0 && n<1000) {    
        try {
        app.project.item(1).layer(n).enabled = false; 
        n++ 
        } catch (err) {
            break;
        }
    }
    } 
    */

   /*function DisableLayers() {           //отключаю видимость слоев
    var NumMax=numI=app.project.item(1).numLayers, n=1;
while (n>0 && n<NumMax+1) {    
    app.project.item(1).layer(n).enabled = false; 
    n++ 
    }
}*/

    //--------------проверяю кол-во слоев (.numLayers) на таймлайне и отключаю их видимость------------
    /*
   var NumMax=numI=app.project.item(1).numLayers, n=1;
   while (n>0 && n<NumMax+1) {    
       
       app.project.item(1).layer(n).enabled = false; 
       n++ 
   }
       */

    //------------------------получаю свойства композиции----------
    /*
    var Width, Height, PixelAspect, FrameRate; 
function GetCompProperty () {

Width=app.project.item(1).width;  
Height=app.project.item(1).height;
PixelAspect=app.project.item(1).pixelAspect;
FrameRate=app.project.item(1).frameRate;  

return(Width);
return(Height);
return(PixelAspect);
return(FrameRate);
}
*/

//-------------------получаю длину слоя -----------------------------
/*
var GetDuration;
function DurationLayer() {    
var InPointLayer, OutPointLayer;
InPointLayer=app.project.activeItem.layer(1).inPoint;
OutPointLayer=app.project.activeItem.layer(1).outPoint;
GetDuration=OutPointLayer-=InPointLayer;

return GetDuration;
}
*/

//-----------------получаю ширину и высоту слоя в композиции через проверу их на Project пенеле------------------------
/*
var GetNameLayer = app.project.item(1).layer(1).name;  
var n=1, GetNameItem = app.project.item(n).name;
if (GetNameLayer=GetNameItem) {
app.project.item(n).width;
app.project.item(n).height;
alert(app.project.item(1).frameRate);
alert(app.project.item(1).pixelAspect);
}else {
    n++;
}
*/
//--------------------проверяю индекс item который является CompItem--------------------
/*
var nItem=1;
while (nItem>0 && nItem<1000) {       
app.project.item(nItem) instanceof CompItem ? nItem : nItem++;
break;
}
alert(nItem);
*/