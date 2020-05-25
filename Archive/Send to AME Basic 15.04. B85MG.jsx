{
function Script(thisObj) {
    var ame= new Object();
    ame.scriptName = "Send to AME";
    ame.scriptTitle= ame.scriptName+ " 0.45";
    ame.strQueueComp= " AME";
    
    var dropdown1_array = [];
    function Dropdown1_Array() {  //получаю список композиций для dropdown1 
        var n=1;
            while (n>0 && n<app.project.numItems) {           
                if (app.project.item(n) instanceof CompItem && app.project.item(n).name.indexOf(ame.strQueueComp)== -1) {
                    dropdown1_array.push(app.project.item(n).name)
                    if (app.project.item(n++).name==!CompItem) break;
                } else {n++}
                } 
        }
        Dropdown1_Array()      
    dropdown2_array= ["All Layers","Enabled Layers"];
    dropdown3_array = ["In/Out (Length)","Work Area Only"];
    dropdown4_array = [];
    dropdown5_array = ["Red","Yellow","Aqua","Pinl","Lavander","Peach","Sea Foam","Blue","Green","Purple","Orange","Brown","Fuchsia","Cyan","Sandstorm","Dark Greem","None"];
    //"Red","Yellow","Aqua","Pinl","Lavander","Peach","Sea Foam","Blue","Green","Purple","Orange","Brown","Fuchsia","Cyan","Sandstorm","Dark Greem","-","none"
    
// DIALOG
// ======
    function Script_buildUI(thisObj) {
    var pal = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Batch Render", undefined, {resizeable: true}, orientation = "column", alignChildren = ["center","top"], spacing= 10, margins= 16); 
    if (pal != null) {
        var res=
        "group { \
            orientation: 'column', \
            group1: Group { \
                orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: 0, \
                image1: Image {file: ''} \
                group2: Group { \
                    orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: [0,0,0,0], \
                    group3: Group { \
                        orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: [298,0,0,0], alignment: ['left','bottom'], \
                        text1: StaticText {text: ' ', enabled: false}, \
                        button1: Button {text: 'About', justify: 'right'}, \
                    } \
                } \
            } \
            group4: Group { \
                orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: 0, \
                group5: Group{ \
                    orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: 0, \
                    panel1: Panel { orientation: 'column', alignChildren:'right', margins: [10,30,10,18], \
                    text: 'General Settings', \
                    group6: Group { \
                        orientation: 'column', alignChildren: ['right', 'center'], spacing: 10, margins: 0, \
                        group7: Group { \
                            orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: 0, \
                            text3: StaticText {text:'Comp to Proceed'}, \
                            dropdown1: DropDownList {properties: { }, preferredSize:[130,20] }, \
                        } \
                        group8: Group { \
                            orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: 0, \
                            text4: StaticText {text:'Queue Elements'}, \
                            dropdown2: DropDownList {properties: {}, preferredSize:[130,20] }, \
                        } \
                    } \
                    group9: Group { \
                        orientation: 'column', alignChildren: ['right', 'center'], spacing: 10, margins: 0, \
                        group10: Group { \
                            orientation: 'row', alignChildren: ['center', 'center'], spacing: 10, margins: 0, \
                            text4: StaticText {text:'Time Span'}, \
                            dropdown3: DropDownList {properties: {}, preferredSize: [130,20]}, \
                        } \
                        group11: Group { \
                            orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: 0, \
                            text5: StaticText {text:'Link Element'}, \
                            dropdown4: DropDownList {properties: {}, preferredSize:[130,20]}, \
                        } \
                    }\
                    group12: Group { \
                        orientation: 'column', alignChildren: ['fill', 'center'], spacing: 5, margins: 0, \
                        group13: Group { \
                            orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: 0, \
                            checkbox1: Checkbox {text: 'Save all Comps', value:false}, \
                            button2: Button {text: 'Open'}, \
                        } \
                        group14: Group { \
                            orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: 0, \
                            text6: StaticText {text:'D:/Project_1/RenderFolder'}, \
                        } \
                    } \
                } \
            } \
            group15: Group { \
                orientation: 'column', alignChildren: ['left', 'center'], spacing: 10, margins: 0, \
                group16: Group { \
                    orientation: 'column', alignChildren: ['left', 'center'], spacing: 10, margins: 0, \
                    panel2: Panel { \
                        text: 'Label Settings', \
                        group17: Group { \
                            orientation: 'column', alignChildren: ['right', 'center'], spacing: 10, margins: 0, \
                            group18: Group { \
                                orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: 0, \
                                text7: StaticText {text:'Label Layers'},\
                                dropdown5: DropDownList {properties: {}, preferredSize:[100,20] }, \
                            } \
                            group19: Group { \
                                orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: 0, \
                                text8: StaticText {text:'Suffix Name'},\
                                edittext1: EditText {preferredSize:[84, 20]}, \
                                group20: Group { \
                                    orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: 0, \
                                } \
                            } \
                        } \
                    } \
                    panel3: Panel { orientation: 'column', alignChildren:'left',\
                    text: 'Resize Queue Comp using', spacing: 10, margins: [17,15,72,10], \
                    radiobutton1: RadioButton {text: 'Scale Factor'}, \
                    radiobutton2: RadioButton {text: 'Comp Width'}, \
                    radiobutton3: RadioButton {text: 'Comp Height'}, \
                    edittext2: EditText {preferredSize:[73,20],alignment:['left', 'top']}, \
                    } \
                } \
            } \
        } \
        group21: Group { \
            orientation: 'column', alignChildren: ['center', 'center'], spacing: 10, margins: 0, \
            checkbox2: Checkbox {text: 'Send to Adobe Media Encoder'}, \
            button3: Button {text: 'Queue',preferredSize: [173, 27]}, \
            button4: Button {text: 'TEST Run',preferredSize: [173, 27]}, \
            group22: Group { \
                orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: [0,14,0,0], \
                progressbar1: Progressbar {minvalue: 0, maxvalue: 100, value: 15, preferredSize: [280, 7]}, \
            } \
        } \
    } \
    ";
    
    pal.grp= pal.add(res);
    pal.layout.layout(true);
    pal.grp.minimumSize= pal.grp.size;
    pal.layout.resize();
    pal.onResizing = pal.onResize = function () {this.layout.resize();}
//=============================
    pal.grp.group1.group2.group3.button1.onClick= function onAboutFunction() {
        alert(this.parent.parent.group1.checkbox1.value);   
    } 

    function DropDown1List() { //добавляю в dropdown1 композиции из dropdown1_array
    var listItem= dropdown1_array; 
    for (var i=0; i<listItem.length; i++)
    pal.grp.group4.group5.panel1.group6.group7.dropdown1.add("item", listItem[i]);
    pal.grp.group4.group5.panel1.group6.group7.dropdown1.selection= 0;
}
    DropDown1List()

    function DropDown2List() { //добавляю в dropdown2 опции из dropdown2_array
        var listItem= dropdown2_array; 
        for (var i=0; i<listItem.length; i++)
        pal.grp.group4.group5.panel1.group6.group8.dropdown2.add("item", listItem[i]);
        pal.grp.group4.group5.panel1.group6.group8.dropdown2.selection= 0;
    }
    DropDown2List()
        
    function DropDown3List() { //добавляю в dropdown3 композиции из dropdown_array
        var listItem= dropdown3_array; 
        for (var i=0; i<listItem.length; i++)
        pal.grp.group4.group5.panel1.group9.group10.dropdown3.add("item", listItem[i]);
        pal.grp.group4.group5.panel1.group9.group10.dropdown3.selection= 0;

    }
    DropDown3List()

    function DropDown4List() { //добавляю в dropdown3 композиции из dropdown_array
        var listItem= dropdown4_array; 
        for (var i=0; i<listItem.length; i++)
        //pal.grp.group4.group5.panel1.group9.group10.dropdown3.add("item", listItem[i]);
        //pal.grp.group4.group5.panel1.group9.group10.dropdown3.selection= 0;

    }
    //DropDown4List()

    function DropDown5List() { //добавляю в dropdown3 композиции из dropdown_array
        var listItem= dropdown5_array; 
        for (var i=0; i<listItem.length; i++)
        pal.grp.group4.group15.group16.panel2.group17.group18.dropdown5.add("item", listItem[i]);
        pal.grp.group4.group15.group16.panel2.group17.group18.dropdown5.selection=16;
        

    }
    DropDown5List()
        


    // GROUP3
   
    
    pal.grp.group21.button3.onClick= onQueueFunction;    //Queue кнопка

    pal.grp.group21.button4.onClick= TEST_Run;         //TEST_Run         
    
    function TEST_Run() {
        
        alert( this.parent.parent.group15.group16.panel2.group17.group18.dropdown5.selection.index );
        //this.parent.parent.group4.group5.panel1.group6.group7.dropdown1.selection
    }

    // GROUP7 
    
    }
    return (pal);
}


    

    function onQueueFunction() { 

        var nProceedCompIndex =1,Dropdown1Selection=dropdown1_array[this.parent.parent.group4.group5.panel1.group6.group7.dropdown1.selection.index];
        function onProceedCompIndex() {               //получаю index для dropdownlist 
            while (nProceedCompIndex>0 && nProceedCompIndex<6) {
                if (app.project.item(nProceedCompIndex).name == Dropdown1Selection) {
                return(nProceedCompIndex)
            }   else {
                nProceedCompIndex++;
            }      
        } } 
        onProceedCompIndex()
        app.beginUndoGroup('Send Render Queue');    //начало отмены действия Ctrl + Z
        var nItem=1
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
        if (this.parent.parent.group4.group5.panel1.group6.group8.dropdown2.selection.index==0) {
        while (n<CheckNumLayers+1 && n>0) {
            ChooseLayer = app.project.item(nProceedCompIndex).layer(n);
            ChooseLayer.enabled = true;                                        //включаю видимость слоя
            GeneralOperation()
                n--; 
            }
        } else {
            while (n<CheckNumLayers+1 && n>0) {
                if (app.project.item(nProceedCompIndex).layer(n).active==true) {
                GeneralOperation() 
                } else {
                }
                   n--; 
               } 
            }
    function GeneralOperation() {
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
        }
    function MoveToFolder() {
    var RenderFolder=app.project.items.addFolder("Render");     //создаю папку
    for (var n=1; n<app.project.numItems; n++) {                       //перемещаю в папку композицию с именем "имя слоя Comp"
    app.project.item(n).name.indexOf(ame.strQueueComp)!== -1 ? app.project.item(n).parentFolder = RenderFolder : {}    
        }}
MoveToFolder();

/////////////
app.endUndoGroup(); //конец отмены действия Ctrl + Z

if (app.project.renderQueue.canQueueInAME == true){ 
    if (this.parent.parent.group21.checkbox2.value== true){
        app.project.renderQueue.queueInAME(false);                     // Отправляю в AME
        alert('Layers were sent to AME');
    }
    }
    else {
        alert("There are no queued item in the Render Queue.");
    }
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