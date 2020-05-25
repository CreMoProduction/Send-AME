{
function Script(thisObj) {
    var ame= new Object();
    ame.scriptName = "Send to AME";
    ame.scriptTitle= ame.scriptName+ " v1.0";
    ame.strQueueComp= " AME";
    



    
// DIALOG
// ======
    function Script_buildUI(thisObj) {
    var palette = (thisObj instanceof Panel) ? thisObj : new Window("palette", undefined, undefined, {resizeable: true}); 
        palette.text = "Batch Render"; 
        palette.orientation = "column"; 
        palette.alignChildren = ["center","top"]; 
        palette.spacing = 10; 
        palette.margins = 16; 
    
    // GROUP1
    // ======
    var group1 = palette.add("group", undefined, {name: "group1"}); 
        group1.orientation = "row"; 
        group1.alignChildren = ["left","center"]; 
        group1.spacing = 10; 
        group1.margins = 0; 
    
    var image1_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%C2%AE%C2%A2%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C3%89e%3C%00%00%01%07IDATx%C3%9A%C3%AC%C2%96%C3%BD%0D%C2%83%20%10%C3%85%C3%85t%00Fp%04Gh7p%04%C2%BBA%3B%C2%89%23t%C2%85n%C2%A0%1B%C3%98%11%C2%BA%C2%81n%40%1F%0D%C2%B4h%3DA%22%C3%B8G%7D%C3%89%C2%8B%17%14%7F%7C%C3%9C%11%C2%98%C2%80%C2%92%0D%C2%94%26%1B%C3%A9%60%C3%84W%C3%B8%11%C2%98%C2%97%C3%83%C3%95%3B%12_%1D%5Dz%C3%A2%C2%BB%1C%C3%A6%3ET%C3%89%C3%90%C2%B0tA%C2%A7%02%C3%AE%10%C2%B6p%C2%87%C3%B8%C3%A6%3B%00%C3%A7%19%C3%A3%5D%26%C2%A1%C3%A2WU%C3%A8%19%170'%C3%9A7%C3%89j%1E%1A%7C_%C3%98%C2%BE%0E%C2%981%C3%B6%C3%84%C3%A3%0C%C3%B7Fs%C2%A3J0%5Cr%19%C3%9Fr%C2%95%20Y%C2%B4rR3%C3%AF%C3%A1F%C2%AD%C2%809%C2%98Z%C3%96w%C2%B4%C3%A4Ru%5C%C3%83r%C2%B5%16%C3%81S%C3%8B%C2%8F%2B%C2%B8%C2%B4%40s%23%C3%83%C3%9D%C3%A1%C3%94%1E%C2%AB%C2%93I%C2%AB%C2%9C%C3%98%C3%ABVL%C2%AB%C2%A3%C3%A0%C3%A6%1EO%C2%82G%C3%90%01%C3%9C%02%C2%9D%C2%85%C3%8F%C2%82%09%C2%A8%C3%96%C3%85%01J%C3%82I%C2%B0%05%C3%AA%C2%A3%01%C2%9C%02%C2%B7%22%C2%8C%3Ep%13%C3%8C%22%5D%7D%C3%A4%C2%89w%C3%92%C2%99%1F%C3%B3%C3%AA3.%C2%BD%C2%84%C3%BD%C3%9Deo%07%C3%AF%C3%A0%1D%C2%BC%C2%9A%5E%02%0C%00u%C2%82%C2%98%3D%C3%8A%C2%8D%C3%B4%C2%B0%00%00%00%00IEND%C2%AEB%60%C2%82"; 
    var image1 = group1.add("image", undefined, File.decode(image1_imgString), {name: "image1"}); 
    
    // GROUP2
    // ======
    var group2 = group1.add("group", undefined, {name: "group2"}); 
        group2.orientation = "row"; 
        group2.alignChildren = ["left","center"]; 
        group2.spacing = 10; 
        group2.margins = [0,0,0,0]; 
    
    // GROUP3
    // ======
    var group3 = group2.add("group", undefined, {name: "group3"}); 
        group3.orientation = "row"; 
        group3.alignChildren = ["left","center"]; 
        group3.spacing = 10; 
        group3.margins = [298,0,0,0]; 
        group3.alignment = ["left","bottom"]; 
    
    var statictext1 = group3.add("statictext", undefined, undefined, {name: "statictext1"}); 
        statictext1.enabled = false; 
        statictext1.text = "."; 
    
    var button1 = group3.add("button", undefined, undefined, {name: "button1"}); 
        button1.text = "About"; 
        button1.justify = "right"; 
        button1.onClick= onAboutFunction;
    
    // GROUP4
    // ======
    var group4 = palette.add("group", undefined, {name: "group4"}); 
        group4.orientation = "row"; 
        group4.alignChildren = ["left","center"]; 
        group4.spacing = 10; 
        group4.margins = 0; 
    
    // GROUP5
    // ======
    var group5 = group4.add("group", undefined, {name: "group5"}); 
        group5.orientation = "column"; 
        group5.alignChildren = ["left","center"]; 
        group5.spacing = 10; 
        group5.margins = 0; 
    
    // PANEL1
    // ======
    var panel1 = group5.add("panel", undefined, undefined, {name: "panel1"}); 
        panel1.text = "General Settings"; 
        panel1.orientation = "column"; 
        panel1.alignChildren = ["fill","top"]; 
        panel1.spacing = 10; 
        panel1.margins = [10,30,10,18]; 
    
    // GROUP6
    // ======
    var group6 = panel1.add("group", undefined, {name: "group6"}); 
        group6.orientation = "column"; 
        group6.alignChildren = ["right","center"]; 
        group6.spacing = 10; 
        group6.margins = 0; 
    
    // GROUP7
    // ======
    var group7 = group6.add("group", undefined, {name: "group7"}); 
        group7.orientation = "row"; 
        group7.alignChildren = ["left","center"]; 
        group7.spacing = 10; 
        group7.margins = 0; 
    
    var statictext2 = group7.add("statictext", undefined, undefined, {name: "statictext2"}); 
        statictext2.text = "Comp to Proceed"; 
    
    var dropdown1_array = ['none','-'], n=1; 
    while (n>0 && n<app.project.numItems) {           //получаю список композиций
        if (app.project.item(n) instanceof CompItem) {
            dropdown1_array.push(app.project.item(n).name)
            if (app.project.item(n++).name==!CompItem) break;
        } else {n++}
        }
    dropdown1 = group7.add("dropdownlist", undefined, undefined, {name: "dropdown1", items: dropdown1_array}); 
        dropdown1.selection = 0; 
        dropdown1.onChange=onProceedCompIndex

        
    
    // GROUP8
    // ======
    var group8 = group6.add("group", undefined, {name: "group8"}); 
        group8.orientation = "row"; 
        group8.alignChildren = ["left","center"]; 
        group8.spacing = 10; 
        group8.margins = 0; 
    
    var statictext3 = group8.add("statictext", undefined, undefined, {name: "statictext3"}); 
        statictext3.text = "Queue Elements"; 
    
    var dropdown2_array = ["All Layers","Enabled Layers"]; 
    var dropdown2 = group8.add("dropdownlist", undefined, undefined, {name: "dropdown2", items: dropdown2_array}); 
        dropdown2.selection = 0; 
    
    // GROUP9
    // ======
    var group9 = panel1.add("group", undefined, {name: "group9"}); 
        group9.orientation = "column"; 
        group9.alignChildren = ["right","center"]; 
        group9.spacing = 10; 
        group9.margins = 0; 
    
    // GROUP10
    // =======
    var group10 = group9.add("group", undefined, {name: "group10"}); 
        group10.orientation = "row"; 
        group10.alignChildren = ["center","center"]; 
        group10.spacing = 10; 
        group10.margins = 0; 
    
    var statictext4 = group10.add("statictext", undefined, undefined, {name: "statictext4"}); 
        statictext4.text = "Time Span"; 
    
    var dropdown3_array = ["Work Area Only","Lenght of Media"]; 
    var dropdown3 = group10.add("dropdownlist", undefined, undefined, {name: "dropdown3", items: dropdown3_array}); 
        dropdown3.selection = 0; 
    
    // GROUP11
    // =======
    var group11 = group9.add("group", undefined, {name: "group11"}); 
        group11.orientation = "row"; 
        group11.alignChildren = ["left","center"]; 
        group11.spacing = 10; 
        group11.margins = 0; 
    
    var statictext5 = group11.add("statictext", undefined, undefined, {name: "statictext5"}); 
        statictext5.text = "Link Element"; 
    
    var dropdown4_array = ["None","Layer 1","Layer 2","Layer 3","Layer 4"]; 
    var dropdown4 = group11.add("dropdownlist", undefined, undefined, {name: "dropdown4", items: dropdown4_array}); 
        dropdown4.selection = 0; 
    
    // PANEL1
    // ======
    var divider1 = panel1.add("panel", undefined, undefined, {name: "divider1"}); 
        divider1.alignment = "fill"; 
    
    // GROUP12
    // =======
    var group12 = panel1.add("group", undefined, {name: "group12"}); 
        group12.orientation = "column"; 
        group12.alignChildren = ["fill","center"]; 
        group12.spacing = 5; 
        group12.margins = 0; 
    
    // GROUP13
    // =======
    var group13 = group12.add("group", undefined, {name: "group13"}); 
        group13.orientation = "row"; 
        group13.alignChildren = ["left","center"]; 
        group13.spacing = 10; 
        group13.margins = 0; 
    
    var checkbox1 = group13.add("checkbox", undefined, undefined, {name: "checkbox1"}); 
        checkbox1.text = "Save all Comps"; 
    
    // GROUP14
    // =======
    var group14 = group12.add("group", undefined, {name: "group14"}); 
        group14.orientation = "row"; 
        group14.alignChildren = ["left","center"]; 
        group14.spacing = 10; 
        group14.margins = 0; 
    
    var statictext6 = group14.add("statictext", undefined, undefined, {name: "statictext6"}); 
        statictext6.text = "D:/Project_1/RenderFolder"; 
    
    // GROUP15
    // =======
    var group15 = group4.add("group", undefined, {name: "group15"}); 
        group15.orientation = "column"; 
        group15.alignChildren = ["left","center"]; 
        group15.spacing = 10; 
        group15.margins = 0; 
    
    // GROUP16
    // =======
    var group16 = group15.add("group", undefined, {name: "group16"}); 
        group16.orientation = "row"; 
        group16.alignChildren = ["left","center"]; 
        group16.spacing = 10; 
        group16.margins = 0; 
    
    // PANEL2
    // ======
    var panel2 = group16.add("panel", undefined, undefined, {name: "panel2"}); 
        panel2.text = "Label Settings"; 
        panel2.orientation = "column"; 
        panel2.alignChildren = ["left","top"]; 
        panel2.spacing = 10; 
        panel2.margins = 10; 
    
    // GROUP17
    // =======
    var group17 = panel2.add("group", undefined, {name: "group17"}); 
        group17.orientation = "column"; 
        group17.alignChildren = ["right","center"]; 
        group17.spacing = 10; 
        group17.margins = 0; 
    
    // GROUP18
    // =======
    var group18 = group17.add("group", undefined, {name: "group18"}); 
        group18.orientation = "row"; 
        group18.alignChildren = ["left","center"]; 
        group18.spacing = 10; 
        group18.margins = 0; 
    
    var statictext7 = group18.add("statictext", undefined, undefined, {name: "statictext7"}); 
        statictext7.text = "Label Layers"; 
    
    var dropdown5_array = ["None","-","Red","Pink","Yellow",""]; 
    var dropdown5 = group18.add("dropdownlist", undefined, undefined, {name: "dropdown5", items: dropdown5_array}); 
        dropdown5.selection = 0; 
    
    // GROUP19
    // =======
    var group19 = group17.add("group", undefined, {name: "group19"}); 
        group19.orientation = "row"; 
        group19.alignChildren = ["left","center"]; 
        group19.spacing = 10; 
        group19.margins = 0; 
    
    var statictext8 = group19.add("statictext", undefined, undefined, {name: "statictext8"}); 
        statictext8.text = "Suffix Name"; 
    
    var edittext1 = group19.add('edittext {properties: {name: "edittext1", readonly: false}}'); 
        edittext1.preferredSize.width = 84; 
    
    // GROUP20
    // =======
    var group20 = group15.add("group", undefined, {name: "group20"}); 
        group20.orientation = "row"; 
        group20.alignChildren = ["left","center"]; 
        group20.spacing = 10; 
        group20.margins = 0; 
    
    // PANEL3
    // ======
    var panel3 = group20.add("panel", undefined, undefined, {name: "panel3"}); 
        panel3.text = "Resize Queue Comp using"; 
        panel3.orientation = "column"; 
        panel3.alignChildren = ["left","top"]; 
        panel3.spacing = 10; 
        panel3.margins = [17,15,72,10]; 
    
    var radiobutton1 = panel3.add("radiobutton", undefined, undefined, {name: "radiobutton1"}); 
        radiobutton1.text = "Scale Factor"; 
        radiobutton1.value = true; 
    
    var radiobutton2 = panel3.add("radiobutton", undefined, undefined, {name: "radiobutton2"}); 
        radiobutton2.text = "Comp Width"; 
    
    var radiobutton3 = panel3.add("radiobutton", undefined, undefined, {name: "radiobutton3"}); 
        radiobutton3.text = "Comp Height"; 
    
    var edittext2 = panel3.add('edittext {properties: {name: "edittext2"}}'); 
        edittext2.text = "1080"; 
        edittext2.preferredSize.width = 73; 
        edittext2.alignment = ["left","top"]; 
    
    // GROUP21
    // =======
    var group21 = palette.add("group", undefined, {name: "group21"}); 
        group21.orientation = "column"; 
        group21.alignChildren = ["center","center"]; 
        group21.spacing = 10; 
        group21.margins = 0; 
    
    var checkbox2 = group21.add("checkbox", undefined, undefined, {name: "checkbox2"}); 
        checkbox2.text = "Send to Adobe Media Encoder"; 
        Checkbox2Value=checkbox2.value;
    
    var button2 = group21.add("button", undefined, undefined, {name: "button2"}); 
        button2.text = "Queue"; 
        button2.preferredSize.width = 173; 
        button2.preferredSize.height = 27;
        button2.onClick = onQueueFunction;
         
    
    // GROUP22
    // =======
    var group22 = palette.add("group", undefined, {name: "group22"}); 
        group22.orientation = "row"; 
        group22.alignChildren = ["left","center"]; 
        group22.spacing = 10; 
        group22.margins = [0,14,0,0]; 
    
    var progressbar1 = group22.add("progressbar", undefined, undefined, undefined, undefined, {name: "slider1"}); 
        progressbar1.minvalue = 0; 
        progressbar1.maxvalue = 100; 
        progressbar1.value = 15; 
        progressbar1.preferredSize.width = 280; 
        progressbar1.preferredSize.height = 7; 
    
    var statictext9 = group22.add("statictext", undefined, undefined, {name: "statictext9"}); 
        statictext9.text = "15%"; 
    
    // GROUP23
    // =======
    var group23 = palette.add("group", undefined, {name: "group23"}); 
        group23.orientation = "row"; 
        group23.alignChildren = ["left","center"]; 
        group23.spacing = 0; 
        group23.margins = 0; 
    
    var statictext10 = group23.add("statictext", undefined, undefined, {name: "statictext10"}); 
        statictext10.text = "Create: Comp 14 "; 
        statictext10.preferredSize.height = 15; 

    return palette;
    }

    var nProceedCompIndex = 1;
    function onProceedCompIndex() {               //получаю index для dropdownlist 
        while (nProceedCompIndex>0 && nProceedCompIndex<6) {
            if (app.project.item(nProceedCompIndex).name==[this.parent.dropdown1.selection]) { //alert(nI+' Congrats!')
            return(nProceedCompIndex)
        }   else {
            nProceedCompIndex++;
        }      
    }  }


    function GeneralFunction() { 
app.beginUndoGroup('Send Render Queue');    //начало отмены действия Ctrl + Z


var nItem=1;
function CheckCompItem() {
    while (nItem>0 && nItem<1000) {       //проверяю индекс item который является CompItem
    if(app.project.item(nItem) instanceof CompItem && app.project.item(nProceedCompIndex)) {
        
    return nItem; 
    break; 
} else { 
    nItem++;     
}
}
} CheckCompItem ()
//////////////ТЕЛО ГЛАВНОЙ ФУНКЦИИ
var CheckNumLayers=numI=app.project.item(nProceedCompIndex).numLayers, n=CheckNumLayers, ChooseLayer;
while (n<CheckNumLayers+1 && n>0) {
    ChooseLayer = app.project.item(nProceedCompIndex).layer(n);
    ChooseLayer.enabled = true;                                        //включаю видимость слоя

    var GetDuration;
    function DurationLayer() {                 //получаю длину слоя 
        var InPointLayer, OutPointLayer;
        InPointLayer=app.project.item(nProceedCompIndex).layer(n).inPoint;
        OutPointLayer=app.project.item(nProceedCompIndex).layer(n).outPoint;
        GetDuration=OutPointLayer-=InPointLayer;
        return GetDuration;
    }
    DurationLayer()
    
    var GetNameLayer= app.project.item(nProceedCompIndex).layer(n).name;                   //получаю имя слоя
    var GetNameComp= GetNameLayer += ame.strQueueComp;                               //имя слоя + Comp

    var Width, Height, PixelAspect, FrameRate;  
    function GetPropertiesToComp() {     //получаю свойства слоя через проверу его на Project пенеле  
        var nI=nProceedCompIndex; 
             while (nI>0 && nI<1000) {
                 if (app.project.item(nProceedCompIndex).layer(n).name==app.project.item(nI).name) {                           
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
    
                         
        app.project.items.addComp(GetNameComp, Width, Height, PixelAspect, GetDuration, FrameRate);  //создаю композицию с именем "имя слоя Comp"



    var AVItemN=1, nItemQ=nProceedCompIndex;
    while (AVItemN>0 && AVItemN<app.project.numItems) {   
        if (app.project.item(AVItemN).name==GetNameComp)                //проверка если item = "Имя слоя Comp"
        {
        app.project.item(nItemQ).layer(n).copyToComp(app.project.item(AVItemN));  //копирую слой "имя слоя" в композицию "имя слоя Comp"
        app.project.renderQueue.items.add(app.project.item(AVItemN));        //отправляю на рендер "имя слоя Comp" 

        break;
        
        }else {
            AVItemN++;
        }
    }

    n--; 

}

    function MoveToFolder() {
    var RenderFolder=app.project.items.addFolder("Render");     //создаю папку
    for (var n=1; n<app.project.numItems; n++) {                       //перемещаю в папку композицию с именем "имя слоя Comp"
    app.project.item(n).name.indexOf(ame.strQueueComp)!== -1 ? app.project.item(n).parentFolder = RenderFolder : {}    
        }}
MoveToFolder();

/////////////
app.endUndoGroup(); //конец отмены действия Ctrl + Z

if (app.project.renderQueue.canQueueInAME == true)
    { if (checkbox2.value== true){
        app.project.renderQueue.queueInAME(false);                     // Отправляю в AME
        alert('Layers were sent to AME');
    }
    }
    else {
        alert("There are no queued item in the Render Queue.");
    }
    }


//ОБРАБОТКА EVENT CALLBACKS  
function onAboutFunction() {
    alert(Checkbox2Value);   
}
function onQueueFunction() {
    GeneralFunction();
}





function isSecurityPrefSet(){
    var securitySetting = app.preferences.getPrefAsLong("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY");
    return (securitySetting == 1);
}
 
    // Build script panel
    var myScriptPal = Script_buildUI(thisObj);
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
    
    
    //}

}


    // Execute script
Script(this);
}