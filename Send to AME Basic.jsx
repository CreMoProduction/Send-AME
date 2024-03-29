{
function Script(thisObj) {
    var ame= new Object();
    ame.scriptName = "Batch Render Manager";
    ame.scriptTitle= ame.scriptName+ " 0.7 30/04/20 B85";
    ame.strQueueComp= "AME";
    ame.strFolder= "Render";
    ame.strAEVersion= "After Effects CC 2015.3 or later.";
    
    var dropdown1_array = [];
    function Dropdown1_Array() {  //получаю список композиций для dropdown1 
        var n=1;
            while (n>0 && n<app.project.numItems+1) {           
                if (app.project.item(n) instanceof CompItem && app.project.item(n).name.indexOf(ame.strQueueComp)== -1) {
                    dropdown1_array.push(app.project.item(n).name)
                    if (app.project.item(n++).name==!CompItem) break;
                } else {n++}
                } 
        } 
        Dropdown1_Array()      
    dropdown2_array= ["All Layers","Enabled Layers"];
    dropdown3_array = ["In/Out (Length)","Work Area"];
    dropdown4_array = ["None",];
    function Dropdown4_Array() {  //получаю список композиций для dropdown4 
        var n=1;
            while (n>0 && n<app.project.numItems+1) {           
                if (app.project.item(n) instanceof CompItem && app.project.item(n).name.indexOf(ame.strQueueComp)== -1 ) {
                    dropdown4_array.push(app.project.item(n).name)
                    if (app.project.item(n++).name==!CompItem) break;
                } else {n++}
                } 
        }
        Dropdown4_Array()
    dropdown4_1_array= ["Add","Alpha Add","Classic Color Burn","Classic Color Dodge","Classic Difference","Color","Color Burn","Color Dodge","Dancing Dissolve","Darken","Darker Color","Difference","Dissolve","Divide","Exclusion","Hard Light","Hard Mix","Hue","Lighten","Lighter Color","Linear Burn","Linear Dodge","Linear Light","Luminescent Premul","Luminosity","Multiply","Normal","Overlay","Pin Light","Saturation","Screen","Subtract","Silhouette Alpha","Silhouette Luma","Soft Light","Stencil Alpha","Stencil Luma","Subtract","Vivid Light"];
    dropdown4_1_blending_array=[BlendingMode.ADD,BlendingMode.ALPHA_ADD,BlendingMode.CLASSIC_COLOR_BURN,BlendingMode.CLASSIC_COLOR_DODGE,BlendingMode.CLASSIC_DIFFERENCE,BlendingMode.COLOR,BlendingMode.COLOR_BURN,BlendingMode.COLOR_DODGE,BlendingMode.DANCING_DISSOLVE,BlendingMode.DARKEN,BlendingMode.DARKER_COLOR,BlendingMode.DIFFERENCE,BlendingMode.DISSOLVE,BlendingMode.DIVIDE,BlendingMode.EXCLUSION,BlendingMode.HARD_LIGHT,BlendingMode.HARD_MIX,BlendingMode.HUE,BlendingMode.LIGHTEN,BlendingMode.LIGHTER_COLOR,BlendingMode.LINEAR_BURN,BlendingMode.LINEAR_DODGE,BlendingMode.LINEAR_LIGHT,BlendingMode.LUMINESCENT_PREMUL,BlendingMode.LUMINOSITY,BlendingMode.MULTIPLY,BlendingMode.NORMAL,BlendingMode.OVERLAY,BlendingMode.PIN_LIGHT,BlendingMode.SATURATION,BlendingMode.SCREEN,BlendingMode.SUBTRACT,BlendingMode.SILHOUETE_ALPHA,BlendingMode.SILHOUETTE_LUMA,BlendingMode.SOFT_LIGHT,BlendingMode.STENCIL_ALPHA,BlendingMode.STENCIL_LUMA,BlendingMode.SUBTRACT,BlendingMode.VIVID_LIGHT];
    dropdown5_array = ["None","Red","Yellow","Aqua","Pink","Lavander","Peach","Sea Foam","Blue","Green","Purple","Orange","Brown","Fuchsia","Cyan","Sandstorm","Dark Green", "Don't Label"];

    
// DIALOG
// ======
    var pal;
    function Script_buildUI(thisObj) {
    pal = (thisObj instanceof Panel) ? thisObj : new Window("palette", ame.scriptName, undefined, {resizeable: true}, orientation = "column", alignChildren = ["center","top"], spacing= 10, margins= 16); 
    if (pal != null) {
        var res=
        "group { \
            orientation: 'column', \
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
                            text4: StaticText {text:'Queue Item'}, \
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
                            text5: StaticText {text:'Link Comp'}, \
                            dropdown4: DropDownList {properties: {}, preferredSize:[130,20]}, \
                        } \
                        group12: Group { \
                            orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: 0, enabled: false, \
                            text5: StaticText {text:'Blending Mode'}, \
                            dropdown4_1: DropDownList {properties: {}, preferredSize:[130,20]}, \
                        } \
                    }\
                    group12: Group { \
                        orientation: 'column', alignChildren: ['fill', 'center'], spacing: 5, margins: 0, \
                        group13: Group { \
                            orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: 0, \
                        } \
                    } \
                } \
            } \
            group15: Group { \
                orientation: 'column', alignChildren: ['left', 'center'], spacing: 10, margins: 0, \
                group16: Group { \
                    orientation: 'column', alignChildren: ['left', 'center'], spacing: 5, margins: 0, \
                    panel2: Panel { \
                        text: 'Label Settings', alignChildren: ['left', 'top'],\
                        group17: Group { \
                            orientation: 'column', alignChildren: ['right', 'center'], spacing: 10, margins: 0, \
                            group18: Group { \
                                orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: 0, \
                                text7: StaticText {text:'Label Layers'},\
                                dropdown5: DropDownList {properties: {}, preferredSize:[90,20] }, \
                            } \
                            group19: Group { \
                                orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: 0, \
                                text8: StaticText {text:'Suffix Name'},\
                                edittext1: EditText {preferredSize:[90, 20]}, \
                            } \
                        } \
                    } \
                    panel3: Panel { orientation: 'column', alignChildren:'left',\
                    text: 'Resize Queue Comp using', spacing: 6, margins: [17,15,92,10], \
                    radiobutton1: RadioButton {text: 'Scale Factor', value: true,}, \
                    radiobutton2: RadioButton {text: 'Comp Width'}, \
                    radiobutton3: RadioButton {text: 'Comp Height'}, \
                    edittext2: EditText {preferredSize:[45,20],alignment:['left', 'top']}, \
                    } \
                } \
            } \
        } \
        groupN: Group{ \
        orientation: 'column', alignChildren:'left', spacing: 4, \
        checkbox1: Checkbox {text: 'Save all Queue Comps', value:false}, \
        group14: Group { \
                            orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: 0, enabled: false, \
                            text9: StaticText {text:'Output Folder:'},\
                            edittext3: StaticText {preferredSize:[230,20], truncate: middle, }, \
                            button2: Button {text: 'Browse...', preferredSize:[90,20]}, \
                        } \
        } \
        divider1: Panel {name: 'divider', preferredSize: [460,0]} \
        group21: Group { \
            orientation: 'column', alignChildren: ['center', 'center'], spacing: 10, margins: [0,5,0,0], \
            checkbox2: Checkbox {text: 'Send to Adobe Media Encoder', helpTip: 'Requires "+ame.strAEVersion +"'}, \
            button3: Button {text: 'Queue',preferredSize: [173, 27]}, \
        } \
        group22: Group { \
                orientation: 'row', alignChildren: ['left', 'center'], spacing: 10, margins: [0,14,0,0], \
                progressbar1: Progressbar {minvalue: 0, preferredSize: [280, 7]}, \
            } \
    } \
    ";

    var group1 = pal.add("group", undefined, {name: "group1"}); 
        group1.orientation = "row"; 
        group1.alignChildren = ["left","center"]; 
        group1.spacing = 10; 
        group1.margins = 0; 

        function strImageSrc() {
    var image1_imgString = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\u00B1\x00\x00\x00-\b\x06\x00\x00\x00\u00E1\u008D\u008A\u00FD\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x00\nOiCCPPhotoshop ICC profile\x00\x00x\u00DA\u009DSgTS\u00E9\x16=\u00F7\u00DE\u00F4BK\u0088\u0080\u0094KoR\x15\b RB\u008B\u0080\x14\u0091&*!\t\x10J\u0088!\u00A1\u00D9\x15Q\u00C1\x11EE\x04\x1B\u00C8\u00A0\u0088\x03\u008E\u008E\u0080\u008C\x15Q,\f\u008A\n\u00D8\x07\u00E4!\u00A2\u008E\u0083\u00A3\u0088\u008A\u00CA\u00FB\u00E1{\u00A3k\u00D6\u00BC\u00F7\u00E6\u00CD\u00FE\u00B5\u00D7>\u00E7\u00AC\u00F3\u009D\u00B3\u00CF\x07\u00C0\b\f\u0096H3Q5\u0080\f\u00A9B\x1E\x11\u00E0\u0083\u00C7\u00C4\u00C6\u00E1\u00E4.@\u0081\n$p\x00\x10\b\u00B3d!s\u00FD#\x01\x00\u00F8~<<+\"\u00C0\x07\u00BE\x00\x01x\u00D3\x0B\b\x00\u00C0M\u009B\u00C00\x1C\u0087\u00FF\x0F\u00EAB\u0099\\\x01\u0080\u0084\x01\u00C0t\u00918K\b\u0080\x14\x00@z\u008EB\u00A6\x00@F\x01\u0080\u009D\u0098&S\x00\u00A0\x04\x00`\u00CBcb\u00E3\x00P-\x00`'\x7F\u00E6\u00D3\x00\u0080\u009D\u00F8\u0099{\x01\x00[\u0094!\x15\x01\u00A0\u0091\x00 \x13e\u0088D\x00h;\x00\u00AC\u00CFV\u008AE\x00X0\x00\x14fK\u00C49\x00\u00D8-\x000IWfH\x00\u00B0\u00B7\x00\u00C0\u00CE\x10\x0B\u00B2\x00\b\f\x000Q\u0088\u0085)\x00\x04{\x00`\u00C8##x\x00\u0084\u0099\x00\x14F\u00F2W<\u00F1+\u00AE\x10\u00E7*\x00\x00x\u0099\u00B2<\u00B9$9E\u0081[\b-q\x07WW.\x1E(\u00CEI\x17+\x146a\x02a\u009A@.\u00C2y\u0099\x192\u00814\x0F\u00E0\u00F3\u00CC\x00\x00\u00A0\u0091\x15\x11\u00E0\u0083\u00F3\u00FDx\u00CE\x0E\u00AE\u00CE\u00CE6\u008E\u00B6\x0E_-\u00EA\u00BF\x06\u00FF\"bb\u00E3\u00FE\u00E5\u00CF\u00ABp@\x00\x00\u00E1t~\u00D1\u00FE,/\u00B3\x1A\u0080;\x06\u0080m\u00FE\u00A2%\u00EE\x04h^\x0B\u00A0u\u00F7\u008Bf\u00B2\x0F@\u00B5\x00\u00A0\u00E9\u00DAW\u00F3p\u00F8~<<E\u00A1\u0090\u00B9\u00D9\u00D9\u00E5\u00E4\u00E4\u00D8J\u00C4B[a\u00CAW}\u00FEg\u00C2_\u00C0W\u00FDl\u00F9~<\u00FC\u00F7\u00F5\u00E0\u00BE\u00E2$\u00812]\u0081G\x04\u00F8\u00E0\u00C2\u00CC\u00F4L\u00A5\x1C\u00CF\u0092\t\u0084b\u00DC\u00E6\u008FG\u00FC\u00B7\x0B\u00FF\u00FC\x1D\u00D3\"\u00C4Ib\u00B9X*\x14\u00E3Q\x12q\u008ED\u009A\u008C\u00F32\u00A5\"\u0089B\u0092)\u00C5%\u00D2\u00FFd\u00E2\u00DF,\u00FB\x03>\u00DF5\x00\u00B0j>\x01{\u0091-\u00A8]c\x03\u00F6K'\x10Xt\u00C0\u00E2\u00F7\x00\x00\u00F2\u00BBo\u00C1\u00D4(\b\x03\u0080h\u0083\u00E1\u00CFw\u00FF\u00EF?\u00FDG\u00A0%\x00\u0080fI\u0092q\x00\x00^D$.T\u00CA\u00B3?\u00C7\b\x00\x00D\u00A0\u0081*\u00B0A\x1B\u00F4\u00C1\x18,\u00C0\x06\x1C\u00C1\x05\u00DC\u00C1\x0B\u00FC`6\u0084B$\u00C4\u00C2B\x10B\nd\u0080\x1Cr`)\u00AC\u0082B(\u0086\u00CD\u00B0\x1D*`/\u00D4@\x1D4\u00C0Qh\u0086\u0093p\x0E.\u00C2U\u00B8\x0E=p\x0F\u00FAa\b\u009E\u00C1(\u00BC\u0081\t\x04A\u00C8\b\x13a!\u00DA\u0088\x01b\u008AX#\u008E\b\x17\u0099\u0085\u00F8!\u00C1H\x04\x12\u008B$ \u00C9\u0088\x14Q\"K\u00915H1R\u008AT UH\x1D\u00F2=r\x029\u0087\\F\u00BA\u0091;\u00C8\x002\u0082\u00FC\u0086\u00BCG1\u0094\u0081\u00B2Q=\u00D4\f\u00B5C\u00B9\u00A87\x1A\u0084F\u00A2\x0B\u00D0dt1\u009A\u008F\x16\u00A0\u009B\u00D0r\u00B4\x1A=\u008C6\u00A1\u00E7\u00D0\u00ABh\x0F\u00DA\u008F>C\u00C70\u00C0\u00E8\x18\x073\u00C4l0.\u00C6\u00C3B\u00B18,\t\u0093c\u00CB\u00B1\"\u00AC\f\u00AB\u00C6\x1A\u00B0V\u00AC\x03\u00BB\u0089\u00F5c\u00CF\u00B1w\x04\x12\u0081E\u00C0\t6\x04wB a\x1EAHXLXN\u00D8H\u00A8 \x1C$4\x11\u00DA\t7\t\x03\u0084Q\u00C2'\"\u0093\u00A8K\u00B4&\u00BA\x11\u00F9\u00C4\x18b21\u0087XH,#\u00D6\x12\u008F\x13/\x10{\u0088C\u00C47$\x12\u0089C2'\u00B9\u0090\x02I\u00B1\u00A4T\u00D2\x12\u00D2F\u00D2nR#\u00E9,\u00A9\u009B4H\x1A#\u0093\u00C9\u00DAdk\u00B2\x079\u0094, +\u00C8\u0085\u00E4\u009D\u00E4\u00C3\u00E43\u00E4\x1B\u00E4!\u00F2[\n\u009Db@q\u00A4\u00F8S\u00E2(R\u00CAjJ\x19\u00E5\x10\u00E54\u00E5\x06e\u00982AU\u00A3\u009AR\u00DD\u00A8\u00A1T\x115\u008FZB\u00AD\u00A1\u00B6R\u00AFQ\u0087\u00A8\x134u\u009A9\u00CD\u0083\x16IK\u00A5\u00AD\u00A2\u0095\u00D3\x1Ah\x17h\u00F7i\u00AF\u00E8t\u00BA\x11\u00DD\u0095\x1EN\u0097\u00D0W\u00D2\u00CB\u00E9G\u00E8\u0097\u00E8\x03\u00F4w\f\r\u0086\x15\u0083\u00C7\u0088g(\x19\u009B\x18\x07\x18g\x19w\x18\u00AF\u0098L\u00A6\x19\u00D3\u008B\x19\u00C7T071\u00EB\u0098\u00E7\u0099\x0F\u0099oUX*\u00B6*|\x15\u0091\u00CA\n\u0095J\u0095&\u0095\x1B*/T\u00A9\u00AA\u00A6\u00AA\u00DE\u00AA\x0BU\u00F3U\u00CBT\u008F\u00A9^S}\u00AEFU3S\u00E3\u00A9\t\u00D4\u0096\u00ABU\u00AA\u009DP\u00EBS\x1BSg\u00A9;\u00A8\u0087\u00AAg\u00A8oT?\u00A4~Y\u00FD\u0089\x06Y\u00C3L\u00C3OC\u00A4Q\u00A0\u00B1_\u00E3\u00BC\u00C6 \x0Bc\x19\u00B3x,!k\r\u00AB\u0086u\u00815\u00C4&\u00B1\u00CD\u00D9|v*\u00BB\u0098\u00FD\x1D\u00BB\u008B=\u00AA\u00A9\u00A19C3J3W\u00B3R\u00F3\u0094f?\x07\u00E3\u0098q\u00F8\u009CtN\t\u00E7(\u00A7\u0097\u00F3~\u008A\u00DE\x14\u00EF)\u00E2)\x1B\u00A64L\u00B91e\\k\u00AA\u0096\u0097\u0096X\u00ABH\u00ABQ\u00ABG\u00EB\u00BD6\u00AE\u00ED\u00A7\u009D\u00A6\u00BDE\u00BBY\u00FB\u0081\x0EA\u00C7J'\\'Gg\u008F\u00CE\x05\u009D\u00E7S\u00D9S\u00DD\u00A7\n\u00A7\x16M=:\u00F5\u00AE.\u00AAk\u00A5\x1B\u00A1\u00BBDw\u00BFn\u00A7\u00EE\u0098\u009E\u00BE^\u0080\u009ELo\u00A7\u00DEy\u00BD\u00E7\u00FA\x1C}/\u00FDT\u00FDm\u00FA\u00A7\u00F5G\fX\x06\u00B3\f$\x06\u00DB\f\u00CE\x18<\u00C55qo<\x1D/\u00C7\u00DB\u00F1QC]\u00C3@C\u00A5a\u0095a\u0097\u00E1\u0084\u0091\u00B9\u00D1<\u00A3\u00D5F\u008DF\x0F\u008Ci\u00C6\\\u00E3$\u00E3m\u00C6m\u00C6\u00A3&\x06&!&KM\u00EAM\u00EE\u009ARM\u00B9\u00A6)\u00A6;L;L\u00C7\u00CD\u00CC\u00CD\u00A2\u00CD\u00D6\u00995\u009B=1\u00D72\u00E7\u009B\u00E7\u009B\u00D7\u009B\u00DF\u00B7`ZxZ,\u00B6\u00A8\u00B6\u00B8eI\u00B2\u00E4Z\u00A6Y\u00EE\u00B6\u00BCn\u0085Z9Y\u00A5XUZ]\u00B3F\u00AD\u009D\u00AD%\u00D6\u00BB\u00AD\u00BB\u00A7\x11\u00A7\u00B9N\u0093N\u00AB\u009E\u00D6g\u00C3\u00B0\u00F1\u00B6\u00C9\u00B6\u00A9\u00B7\x19\u00B0\u00E5\u00D8\x06\u00DB\u00AE\u00B6m\u00B6}agb\x17g\u00B7\u00C5\u00AE\u00C3\u00EE\u0093\u00BD\u0093}\u00BA}\u008D\u00FD=\x07\r\u0087\u00D9\x0E\u00AB\x1DZ\x1D~s\u00B4r\x14:V:\u00DE\u009A\u00CE\u009C\u00EE?}\u00C5\u00F4\u0096\u00E9/gX\u00CF\x10\u00CF\u00D83\u00E3\u00B6\x13\u00CB)\u00C4i\u009DS\u009B\u00D3Gg\x17g\u00B9s\u0083\u00F3\u0088\u008B\u0089K\u0082\u00CB.\u0097>.\u009B\x1B\u00C6\u00DD\u00C8\u00BD\u00E4Jt\u00F5q]\u00E1z\u00D2\u00F5\u009D\u009B\u00B3\u009B\u00C2\u00ED\u00A8\u00DB\u00AF\u00EE6\u00EEi\u00EE\u0087\u00DC\u009F\u00CC4\u009F)\u009EY3s\u00D0\u00C3\u00C8C\u00E0Q\u00E5\u00D1?\x0B\u009F\u00950k\u00DF\u00AC~OCO\u0081g\u00B5\u00E7#/c/\u0091W\u00AD\u00D7\u00B0\u00B7\u00A5w\u00AA\u00F7a\u00EF\x17>\u00F6>r\u009F\u00E3>\u00E3<7\u00DE2\u00DEY_\u00CC7\u00C0\u00B7\u00C8\u00B7\u00CBO\u00C3o\u009E_\u0085\u00DFC\x7F#\u00FFd\u00FFz\u00FF\u00D1\x00\u00A7\u0080%\x01g\x03\u0089\u0081A\u0081[\x02\u00FB\u00F8z|!\u00BF\u008E?:\u00DBe\u00F6\u00B2\u00D9\u00EDA\u008C\u00A0\u00B9A\x15A\u008F\u0082\u00AD\u0082\u00E5\u00C1\u00AD!h\u00C8\u00EC\u0090\u00AD!\u00F7\u00E7\u0098\u00CE\u0091\u00CEi\x0E\u0085P~\u00E8\u00D6\u00D0\x07a\u00E6a\u008B\u00C3~\f'\u0085\u0087\u0085W\u0086?\u008Ep\u0088X\x1A\u00D11\u00975w\u00D1\u00DCCs\u00DFD\u00FAD\u0096D\u00DE\u009Bg1O9\u00AF-J5*>\u00AA.j<\u00DA7\u00BA4\u00BA?\u00C6.fY\u00CC\u00D5X\u009DXIlK\x1C9.*\u00AE6nl\u00BE\u00DF\u00FC\u00ED\u00F3\u0087\u00E2\u009D\u00E2\x0B\u00E3{\x17\u0098/\u00C8]py\u00A1\u00CE\u00C2\u00F4\u0085\u00A7\x16\u00A9.\x12,:\u0096@L\u0088N8\u0094\u00F0A\x10*\u00A8\x16\u008C%\u00F2\x13w%\u008E\ny\u00C2\x1D\u00C2g\"/\u00D16\u00D1\u0088\u00D8C\\*\x1EN\u00F2H*Mz\u0092\u00EC\u0091\u00BC5y$\u00C53\u00A5,\u00E5\u00B9\u0084'\u00A9\u0090\u00BCL\rL\u00DD\u009B:\u009E\x16\u009Av m2=:\u00BD1\u0083\u0092\u0091\u0090qB\u00AA!M\u0093\u00B6g\u00EAg\u00E6fv\u00CB\u00ACe\u0085\u00B2\u00FE\u00C5n\u008B\u00B7/\x1E\u0095\x07\u00C9k\u00B3\u0090\u00AC\x05Y-\n\u00B6B\u00A6\u00E8TZ(\u00D7*\x07\u00B2geWf\u00BF\u00CD\u0089\u00CA9\u0096\u00AB\u009E+\u00CD\u00ED\u00CC\u00B3\u00CA\u00DB\u00907\u009C\u00EF\u009F\u00FF\u00ED\x12\u00C2\x12\u00E1\u0092\u00B6\u00A5\u0086KW-\x1DX\u00E6\u00BD\u00ACj9\u00B2<qy\u00DB\n\u00E3\x15\x05+\u0086V\x06\u00AC<\u00B8\u008A\u00B6*m\u00D5O\u00AB\u00EDW\u0097\u00AE~\u00BD&zMk\u0081^\u00C1\u00CA\u0082\u00C1\u00B5\x01k\u00EB\x0BU\n\u00E5\u0085}\u00EB\u00DC\u00D7\u00ED]OX/Y\u00DF\u00B5a\u00FA\u0086\u009D\x1B>\x15\u0089\u008A\u00AE\x14\u00DB\x17\u0097\x15\x7F\u00D8(\u00DCx\u00E5\x1B\u0087o\u00CA\u00BF\u0099\u00DC\u0094\u00B4\u00A9\u00AB\u00C4\u00B9d\u00CFf\u00D2f\u00E9\u00E6\u00DE-\u009E[\x0E\u0096\u00AA\u0097\u00E6\u0097\x0En\r\u00D9\u00DA\u00B4\r\u00DFV\u00B4\u00ED\u00F5\u00F6E\u00DB/\u0097\u00CD(\u00DB\u00BB\u0083\u00B6C\u00B9\u00A3\u00BF<\u00B8\u00BCe\u00A7\u00C9\u00CE\u00CD;?T\u00A4T\u00F4T\u00FAT6\u00EE\u00D2\u00DD\u00B5a\u00D7\u00F8n\u00D1\u00EE\x1B{\u00BC\u00F64\u00EC\u00D5\u00DB[\u00BC\u00F7\u00FD>\u00C9\u00BE\u00DBU\x01UM\u00D5f\u00D5e\u00FBI\u00FB\u00B3\u00F7?\u00AE\u0089\u00AA\u00E9\u00F8\u0096\u00FBm]\u00ADNmq\u00ED\u00C7\x03\u00D2\x03\u00FD\x07#\x0E\u00B6\u00D7\u00B9\u00D4\u00D5\x1D\u00D2=TR\u008F\u00D6+\u00EBG\x0E\u00C7\x1F\u00BE\u00FE\u009D\u00EFw-\r6\rU\u008D\u009C\u00C6\u00E2#pDy\u00E4\u00E9\u00F7\t\u00DF\u00F7\x1E\r:\u00DAv\u008C{\u00AC\u00E1\x07\u00D3\x1Fv\x1Dg\x1D/jB\u009A\u00F2\u009AF\u009BS\u009A\u00FB[b[\u00BAO\u00CC>\u00D1\u00D6\u00EA\u00DEz\u00FCG\u00DB\x1F\x0F\u009C4<YyJ\u00F3T\u00C9i\u00DA\u00E9\u0082\u00D3\u0093g\u00F2\u00CF\u008C\u009D\u0095\u009D}~.\u00F9\u00DC`\u00DB\u00A2\u00B6{\u00E7c\u00CE\u00DFj\x0Fo\u00EF\u00BA\x10t\u00E1\u00D2E\u00FF\u008B\u00E7;\u00BC;\u00CE\\\u00F2\u00B8t\u00F2\u00B2\u00DB\u00E5\x13W\u00B8W\u009A\u00AF:_m\u00EAt\u00EA<\u00FE\u0093\u00D3O\u00C7\u00BB\u009C\u00BB\u009A\u00AE\u00B9\\k\u00B9\u00EEz\u00BD\u00B5{f\u00F7\u00E9\x1B\u009E7\u00CE\u00DD\u00F4\u00BDy\u00F1\x16\u00FF\u00D6\u00D5\u009E9=\u00DD\u00BD\u00F3zo\u00F7\u00C5\u00F7\u00F5\u00DF\x16\u00DD~r'\u00FD\u00CE\u00CB\u00BB\u00D9w'\u00EE\u00AD\u00BCO\u00BC_\u00F4@\u00EDA\u00D9C\u00DD\u0087\u00D5?[\u00FE\u00DC\u00D8\u00EF\u00DC\x7Fj\u00C0w\u00A0\u00F3\u00D1\u00DCG\u00F7\x06\u0085\u0083\u00CF\u00FE\u0091\u00F5\u008F\x0FC\x05\u008F\u0099\u008F\u00CB\u0086\r\u0086\u00EB\u009E8>99\u00E2?r\u00FD\u00E9\u00FC\u00A7C\u00CFd\u00CF&\u009E\x17\u00FE\u00A2\u00FE\u00CB\u00AE\x17\x16/~\u00F8\u00D5\u00EB\u00D7\u00CE\u00D1\u0098\u00D1\u00A1\u0097\u00F2\u0097\u0093\u00BFm|\u00A5\u00FD\u00EA\u00C0\u00EB\x19\u00AF\u00DB\u00C6\u00C2\u00C6\x1E\u00BE\u00C9x31^\u00F4V\u00FB\u00ED\u00C1w\u00DCw\x1D\u00EF\u00A3\u00DF\x0FO\u00E4| \x7F(\u00FFh\u00F9\u00B1\u00F5S\u00D0\u00A7\u00FB\u0093\x19\u0093\u0093\u00FF\x04\x03\u0098\u00F3\u00FCc3-\u00DB\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00 \u0081IDATx\u00DA\u00EC\u009Dy\u0098\x1DE\u00B9\u00FF?U\u00DD}\u00FAl3\u0099ld\u0081\x04\b`@\x16Q\b\u00A0\x12Y%aS\x16\u00E1\"\u00FB\u00BE\u00C9\u009A+\b\u0082\t\u008B\x02\n\x01\u0084\x0B\x18\u0096\x0B\x02\n\u00E2Ud\x0F\u0082\u0088\"\nxe\u0089\u0080\x10\ba\u00C92C&\u0099\u00FD,\u00DD]\u00F5\u00FE\u00FE8\u00D5\u0093\u009E\u00C9\x04T\u00BC\u00F7\u00B9\u00CF\u00F3\u009B\u00F7y\u00FA\u00993\u00DD\u00D5Uu\u00AA\u00BE\u00FD\u00F6\u00F7]\u00AA\u008E\u00FA\u00DC\u008E_f(\u00E9\u00AD)\u00C65yl;u9\x17\x1Dhi.5Ad\u00F8\b9\b\u0098\x03\\\x0E\u00FC\u00E4\u00A3\n2\u00D6\u00F2\u00F3\u0087\u00F2\u009C\u00FA\u00E3\x02\u00EB\u008D\u00B2h\u00B5\u00F6\u00A2\u00D6Z::\u00BB\u00B8l\u00F6\u00B9\u00EC\u00B9\u00FB.,kmCk=\u00A0\u008CR\n\u00AD5}}}\u00F4\u00F6\u00F6\x12\u0086!MMM\u0088H\u00FF\u00F5\u00AC\u00F8\u00BE\u008F\u00B5\u00968\u008E\u00F1<o\u00ADm'IBSS\x13\u00F9|\u009E\u00B6\u00B66\u00C20\x1CP\u00A7\u0088P\u00AB\u00D5\b\u0082`@=I\u0092\u00A0\u00B5\x1E\u00D0\u00CF\u00F4\u00BE\x7FF\u0094R\x18c\x10\x11\u008C1Xk\t\u0082\u0080\\.G\u0092$\x18c\u00FA\u00AF\x07A\u0080\u00EF\u00FB\u0088\bJ)\u00AC\u00B5DQ\u00B4\u00C6\u00F7\u00F7}\u00BF\u00FF\u00DEt\u009Cs\u00B9\x1C\u00D6ZV\u00AE\\I>\u009F\u00A7X,\"\"h\u00AD\u00FB\u00FF\u00A6}1\u00C6\u00F4\u008F\u00AB\u00EF\u00FB\u00D4j5\x00\u00F2\u00F9|\u00FFy\u00CF\u00F3H\u0092\u00848\u008E\x07\u009CSJ\u00F5_K\u0092d\u008D\u00F9I\u00CB\u00A5\u0092~\u00E7\u00B4\u00AE\u00F4\u009E\u00F4>\u00CD'\u0097\r\u0081\u00A7\u0081\u00FB\u0080\u00CD\u0081\u00BB\u0081?\x00\u009B0,\u00C3\u00F2\u00BF \u009F\x04\u00C4!\u00F0\x1F\u00C0;\u00C0N\u0083\u00AE}\x11X\b\u00DC\f\x14\u0086\u0087yX\u00FE/\u0082\u00F8$\u00A0\x03\u00F8\u00C6\u00C7\u0094;\x01\u00E8\u00FC;\u00CA\r\u00CB\u00B0\u00FC\x0F\u0081X\u0081\x15\u0085H\u00E33\u00B0#\u00F0\x16\u00F0\u00A3\x7F@\u00C3\u00E6\u009C\u00C6^\f\u00EC<<\u00E4\u00C3\u00F2\u00BF\x02bO\u008B\u008A\u00C5\u00E7\u00DD\x0F5\x1D\u00BD\u0082\u00D6L\x00\u00E6\x03\u00CF\x00\x1B\u00AFy\x03\x10\x009\x01\x7F\u00AD\u008F\u00C6\x06\u00C0o\u0081'\u00F0\u0099\u00BC\u00AAG\u00D1\u00BEB#J\u00E1i\u00BB\u00F6\x0EjM\u00AD^\u00A7Z\u00AD}\u00A4\x116,\u00C3 N\u008D`\u00CFSxKV\x05\u00D2\u00DEQ\u00E3\u0080\u00AD[\u00FD\x7F\u00DF\u00C3\u00BB\u00AA\u00A9XXF\u00DD\u00CE\x10\x01\x11\u00B0\u00D6i\u00E6\x11\x16\u00C6Z(\bq\x1Dz;]u\u00CD\x16\u00D6\u00B1\u0090\x17\u00C4\u0082\u0095\x01\u00C7\u00EEt\u00A9\u00F7\u00F6\u00D96\u00F9\u00E1\u00A1_\u00AA\u0085\x0B\u00DFMx\u00AF=\u00AF\u00C0zJ5\x1C\x15\u00C6Bw\x05\u0096u(\x16-\u008F(\u0096G\u00B1\u00E1\u00FA\x13\u00A9T*\u00C336,k\u0088\u00FF\u00E6r\u00CD\u00C8\u0092\u00B0\u00FE\x18\u00CB\u0092\u0095\u009E\u00FD\u00A0C\u00CB\u00A7'\u00C0\u00BC\u00A3\u00BB\u008F\u00DAw\u00A6\u00B9\u008E\u00A4\u00D8l;\x1Cz\x15`@\u008F\u00B2\x10\u00C2\u00CB/\x04\u00DC\u00F5\u00C7\x1Co\u00B7i\u00CAy(\u00E4\u0084\u00AEJ\u0083~\u00EC\u00FE\u00E9\u0084\u00C3w\u00ADS^\u00D7\u00C2\u0087\x1A\x1B\u0083\u00D2\u0080\u0080\u00E9R\u00AC\u00BBAr\u00C6O\u00E6D\u00C7=\u00FEdx\u00D6\u00E5\x0F\u0096n]\u00D0\u00E6\u009B\x11\x05\u0085\u00AF-Q\x02\x13G\n\u00DB\u008E1|\u00B0l\x05_\u00DAy_6\u00DF\u00FC3\u00B4\u00AFh\x1B\u009E\u00B1aY\x13\u00C4\u00DF=\u00A8\u00C6\u00A3\u00AF\u00F8<\u00F1\u00A7\u009C\u00EC\u00BAC\u008D\u00EB\u008EJ\u00B6\u00FF\u00FC\u00E6\u00C9\u00EDc\u00A7\u00F8\u009B\u00D1\u009A\u00C3F\u00B6\x01^\u00E5\u00FE\u0094\u0084\u00B7\u00DE\u00F29\u00EF\u00DE\x02o.\u00F7\u00D8y\u00B3\u0098\x03\u00A6\u00C5l\u00B6\u00AEa\\\u00B3\u00F0\u00E6r\u00CD\u00ABK<~\u00F5R\u00C0\u00DC\u00F9!g\u00EFY\u00E7\u00D4\u00995\u00BC\u009C\u00C2&\u00AE\x1E\x1F\u00EC*\u0085\u00CE{\u00A5\x19\u00FBF\u00B7\u00CC\u00D8\u00B1\u00FD\u009C;\x1F)\x1Cs\u00F5\u00E3\u00E6\u008Fu\t\u0099{h\u0095}\u00B7\u008DQ!P\u00EB\u00A6}\u00D4$\u0096t\u00E5\u00F1\u009D\u00EFsX\u0086e\x00\u0088\u00CF:\u00A5\u008F\u0099/\x05\u00DC6\u00DE\u00AEs\u00EA\u00D7\u00FA\u00E6m\u00B8\u0095\u00D9\u008F\u00E5>\u00F2\u00BEB\u00B4m\x10\x0Eih`\u00D5\"\u00D0l\u00B9\u00ED\u00F6\"E_X\u00F0\u0083n\u00F4\u00FA\x06\fPQ``\u00FD-`\x0F-\u00CC\u00AA*\x1E\u00FBM\u00C8iw\x15\u00982\u00CE0\u00F3+u\u00D4\u00FB\x1E6r\x1AY\u0083\u00A9\u0083\u00FA@\u00A3\u009B\u00EC\u00A7\u008E<\u00A0\u00FB\u00D9=\u00B6\u00E5\u00E1\u0090\u00F8\u00F8\u0096\u00F5L\u009BR\x02\u00BD\n\u00B4\x10\u00DB\u0090\u00D8(|\u0084\x06\u00A5Y3p \"Xk\u00FB\x1D\u00E3)?\x12\u0091\x01\u00E5\u00D3 @\x1A\u0088\u00F8\u00B8 \u0084\u00B5\x16km\x7F\u00B9\u00C1u\r\u00EEC\u00F6\u00F3G\u0095\x1D\u0096\x7F!\u0088Y\u00E4\u00B3\u00E9\x04{\u00F1\u0095\x17\u00F4\u00CE\u00A6\u00DD\u00C3\u00BE\u00E1!\u009E4\u0080\u0086c\x11\x02z\u00A4\u00E5\u00CD\u00F7|\u00AA]>W\x1CW\u0081\u00A2`z\x14\u009D\x0B|D\u0083\x05\x02\x05\u00CD#\x04\u00F2\x02U\u00C5\u009E3\u00EB\u00BC6-\u00A6{\u0085\u00E6\u00B9'C>\u00B3IB!\x00k\x06\u00B2r\u00D3\u00AB\u00D0:`\u00FCD\u00F6A\u0099Vz\u00D5\u00E5\x18u\x01\n!\u00F1)\u00D4\u00DF\"_\u00AC\u00E1\x11\u00A2\u00B0\u00EBz\u009E\u00F7\x10P\x02*\u0080VJ\x05J\u00A9\x15A\x10|+\f\u00C3\u00E7\u0082 \u00E8\u008F,y\u009Ew\u0085\u00EF\u00FB\u00C7\u008B\u00C8\u00FB@3\u00B0\u00C2\x18\u00B3\u009F1\u00A6Mk\u00BD~\x10\x04\u00BF\x02\u008A@\x1F\x03\r\u0084\r\u00AA\u00D5\u00EA\u00B5\u00C5b\u00F1\u0092 \b\u00D0Z\u009F\u00E6\u00FB\u00FE\u0091\"R\x04b\u00A5TYD:\u0093$\u00D9CD:<\u00CF\u00BBCk\u00FD5\x11y\u00C7Z\u00BB\u008F\u00EF\u00FB\u00EF\u00FB\u00BE\x7F\u008D\u0088\u009C\b,\x11\u0091\u00AF\x00o\u00FES\u0086\u008B\u00D6\u00D4\u00EB\u00F5\u00FE\u0087sX\x06\u0083X\u00F3\fU\u00B5#K<\u00AC\x00\u00BE\u00A02JC+P\u00B9\u0086\x07\u00E2\x1B\u00B7\x14\u00D9}\u00B3\u0084\u00AD\u00F7\u00A8s\u00ED\r%~\u00F5\u00E7\u0080\r\u00C7Z\u00AC4\u00CA\u00D5\x13x\u00F7C\u008F9\x07W\u00991\u00A3\x0E\x1Fx\u00E4GXr\u00C0N\u00DF+s\u00CA\u00DEu\u00CE8\u00AC\x02K<\u00D0\u00A9\u00D7\x0E\u0094\x02\u00B1\x02=\u00FD!\u00E2\u00F3Q|\x19\u0098\u0086.\u00D3\\\u00FB#%\u0096\x11\u00E7\u00C6\u00E2\u00D9\u00DE\u00B1\u009E\u00E7}6k\u008D:\u00D9\u00ACT*\u00DD\x01l\u00AA\u0094JC\u00BF\x1B\u00E4r\u00B9s\u00B4\u00D6Z)5\u00DAi\u00E1\u008D\u00FA\u00FA\u00FA\u008E\u008B\u00A2\u00E8\u00B2B\u00A1\u00B0\u009E\u00EF\u00FB[\u00A7a\u00D5T[f\u00C2\u00AB\u00DBV\u00ABU\u00E28>\u00B3\\._\u009B\u00D5\u00E0\u00A9v\u00AD\u00D7\u00EB#\u00AC\u00B5\x1DZ\u00EB\u00ED\u0083 (Yk\u00B7\u008C\u00A2h\u00BC\u00EF\u00FB\u00EF\x07A\u00B0\u00A5\u00B5\u00B6\b|J)5\u00E2\u009F\x05p\x1A\u009E\x1D\x1Cn\x1F\u0096\x14\u00C40\t\u00C7\x18H?\u00A8\u00D5\x00F\u0080\u00D1\u0096\u00DB\u00EF\u00CF\u0093\u00C4p\u00DEaUX\u00A9y\u00F1\x1D\u008F\u0099[\u00C5\u009C=\u00B3\u00CE\u00D2\x0E\u00CD\u00F8\x11\u0096\u00F9\x0B\x02\u00BE\u00FB\u0080\u00C75\x0F\u00E6\u00C9\u00E5`\u0097/E\u00B0D\u00A3\u00C7[\u00E6\x1C\\\u00E5\u00A2_\x148i\u00D7:aQ\u00B05\u00B5\x1A\u00C50\u00F0sC\u00C67\x1E\x1De\u00C0C\u00ACE4\u0088H\u0094R\x02\x11y\u00B1V\u00AB}\u00C9\u00F3\u00BC\u00FB\u00C20\u00DC\x0B\x18\u00A7\u0094\x1A\u00A1\u0094\u00EA\x12\x11<\u00CF;Jk\u00AD\x1D%\u00F8\u0083Rj\u00AA\u00E7ycs\u00B9\u00DC\x11\u00F5z\u00FD\u00B2Z\u00AD\u00F6\u00A2\u00EF\u00FB7\u0088\u0088o\u00AD\u00FD\u008A\u00E7y\x13D\u00848\u008E\x1F\u00F7<o\u00B9\u00B5\u00F6\u00F1\u00EE\u00EEn\n\u0085\u00C2ni^A\x14E/h\u00AD\u009FRJM\u00B0\u00D6\u00F6\u0089\u00C82\x07\u00E8(\u00A54J\u00A9\u008A\u00FB\\\x1B\u008A\u0086\u00FC\u00A3R\u00AB\u00D5\u00B0\u00D6\x0E\u00BB\x18?\x02\u00C4Q\x16\u00BF)\u009E\u00FA\u0093r\u00FC\x06\u00DF\u00BD\u00EF\x0F9\x0E\u00DD%j\u00B8\u00D5ViF\u00E4\u0085\u00A9\u0093-\u00E1\x14\u00C3\u0094\u0095\x02\u00A3-\u00CD\u00EF\u00FB|f\u0092\u00E53\u00EB'\x1Cpe\u0089'=a\u009B\u00AD\x13X\u00A99d\u00AF:\u00B7<\x1Dr\u00C3c!\u00B3\u008E\u00AE\"\u00CBU\x03\u00B7k\u00B7\u00D3\u00A4q\b\u00E05\u00FE\x11\u008B\u0088\u0088\x03\n\"\u0092\u00B3\u00D6N\u00D6Z\x17]\u0082\u00C8\x0B\u00C6\u0098\u00AE4\u00F9Fk}\u0088\u00E3\u00C9\u00EFW*\u0095\u00E9a\x18\u00DE\u00A0\u0094:\x15\u00D84\f\u00C3\u0099I\u0092\u00CCO\u0092\u00E4\u00B4(\u008A\u00F0}\x7FC\u00AD\u00F5\x04\x11\u00A1R\u00A9\u00CC\r\u0082\u00E0\t\u0080\\.\u0087\u00E7y:M:\u00A9T*\x17\u00FB\u00BE\u00FFh\u00B9\\^\u0083w\u00A7\u00DC9\b\u0082\x1B\u0081\u00F7\u008C1\u00DB}\u0092\u00C9QJ\x11E\x11q\x1C\u00F7'\u00E1\f\u00CB\u00D0 \u00EE\x07\u00AE\u00CAj\u00E4T\n\u00C2\u00DF\u00DE\u00F0\u00D1\x1E\x1C\u00BC]\f\u00AB\x1A<\u00C0*Hj@\u009Fj\x18uZ\u00B3\u00E9hKl\u00A0\u00ADK3\u00B1E\u00F8\u00C9\u00B39\u00B6\u00D91\u0082>\x0FB\u00D8\u00F3\u00B31\u00CF\u00BF\u00E9C\f\u009En\u00F8\u008DW\u00BF\u009A\x1B\u00B4b\u0088\u00A9\x04\u0084$1$\u0092 6\u0091\f\u0085\u00D8\u00C2\u00F3\u00BC\u00D7\u00D3l2`W\u00A5\u00D4\u00FEQ\x14\u00DD\x1F\x04\u00C1\x17\u008D1\u009B:C\u00AFWk\u00BD\u00A51\u00A6\u00B9^\u00AF\u00E3\u00B4\u00F4\u00FEMMM\u00F3\u00FB\u00FA\u00FA\u00A8\u00D5j\x14\u008B\u00C50\u00CD\u00F6\x12\u0091B\u00A5R\u00A1P(\u00A0\u0094\u00A2^\u00AF\u00DBL\u00D6\u0094\u00A9\u00D5j\u00FD\u0080J\u00B3\u00B9\u00E28\u00B6)\u0088\u0095R\u00D3\u0081\u00E9\u00FF\f\u00E8\u00B2\u00F7\u00A4\u00B4h\x10m\x1A\u0096\u00B5\u0081\u0098\f?\x1D\u0090\x1A\u0099k\u00B8\u00CD\u00A6N4\u00B4\u008C3\u00D0\u00A9\u00A18\u00C4\u00E4\u00F4(\u00D6\x1Bk\u00B9\u00FB\u00EC^\x18)l\u00F0\u00B3<o/\u00F5\u00A0GcK\x16ma\u00FAF\tO-\u00F0\u00A9\u00B6z\x14\u00CA\x16\u00EAj\r\u00D5\u00AB\u0086\u00C0\u00B0\x00q\x14Q\u00D7\x11\u00BED\u00D9\u00C6\x17k\u00AD\u00CF\x16\u0091\u00CD\u00AD\u00B5\u00DF\u00D3Z\u00FB\"2K)u\u00BF1f\u00DD4=\x10\u00F84\u00B0 M;t2\u00C1\x18\u00D3o0EQdS\u00CE\u0099$\u0089M\u0092\u0084Z\u00AD\x11%\u00CC\u00A6_&I\x12\u00A7\u00D7\u00AC\u00B5\u0084a\u0088\u00EF\u00FB\x18c\u0092\f\u00B7^\ft+\u00A56v\x06\u00E8\u00C7Jj\u00B4\u00F9\u00BE\u00BF\x06\u00EF\x1E\x06\u00F0\u00DF\tbY\x1B5\r\u00E0\u00D5%\x1E\u00BD\u00B5\u0086'a\u00C8\u00D7\u00BFu5\u008D\u00B4\u008DL\u0089\u00F1\x16]\u0080\u00A9\u0093\f\x0F=\u0097\u00E3\u00E9?\x07\u00CC\u009D\u00D3\u00C3\u00A8\u00F1\u0096\u00BE\u008A\u00A2\u00A7\n\u0085\x11\x03\u00D1\u00BB\u00F6yj\u00A0\u00B8\x1E\u00D5\u00A9\u00AB\x1AF\u00EA\u0092\u00D1V\u00CB\u0095R\x0F\u0088\u00C8\x7F\x03\u00DF\u00EB\x7Fw4&>\x1B\u00DE[\u00A9\u0094Z\x04\u008C\x13\u0091\u00F5\u009D\u00D1f\u00DB\u00DB\u00DB\u00FB\u00F3rk\u00B5\u009AM\u00C1\u00D2`,6\u00E5\u00B7\x03\u0086ED\u00FEMD\u00C4\u00F3\u00BC\u00C9Z\u00EB\u00BE$I\u00FE\u00CB\x01\u00D0d4\u00E8\u009E\u00C0\u009B\"2\x1F\u0098\u00F1\u00F7\x00XkM>\u009F\x1F\u00E6\u00BD\u00FF\nM\u00BC\x06H-\u008C*\t\x1FV\u00D4Z\u00F8F\u0083r\u00F4uk\u00EE\u00B8\u00A7@_\x04#K\u00C2\u0093\u00AF\x064\u00E5\u0085z\fw?\x15\u00D2\u00DA\u00AB8v\u00F7:cF:\u00F7]\u00B3E\u00C7\x1E\u00B6\x0E\u00A2W\u00D3\u0099\u00A11,\u00C4qBD\u008C\x10{\x19\x10\x7Fa\u0088\x1E\u00ADt\u00AF\u00FE0\u00E3\u0092\u009A\u00E7y\u00DE\x05\"\u00B2\u009B\u00B5\u00F6\u00C9\u00D4\u00F0O\u0093\u00DC\u00EB\u00F5:Z\u00EB\\\x06\u00C4~\u00C6x\x04xYk\u00BD\u008F\x03\u00E8\u0089\u00C0\u0089i\u00DD\u00D6\u00DA\tZ\u00EBV@e4\u00B6v\u00F5\u00A8\u00BF\x07\u00C0\u009E\u00E7Q,\x16\u00FB\u00B5\u00FE\u00B0\u00E6\u00FD\x07=8\x1F\u0087ab\u00D8b\u00B2\u00A1\x16\u00A9\x06\u00FF\u00FD\bEa]^\u0085V\x10\u00FA\u008D\t\u00F5\u009C\u00F6\u00CE\u0087\u00C2\u0092v\u00CD\u00A8\u00820\u00AA$,x.GU\u0081\u009Eh\u00F0|ih\u00F3\u00B5\u00D8w\u0096\u0080XB\x10\u0083\u0088\u00F4\u008A\u00C8*\x111\"\u00D2\u00E3^\u00DF\u0089\u0088\u00D4Dd\u00B1\u0088\u00CCv+\x0FzS\u0083KD:\u00DC*\u0086\u00AE\u00CC\u00B9\u00F6\u00D4\u0095\u0096j\u00F5\u00CC\u00B5Nc\fA\x100z\u00F4h\u00CA\u00E5\u00F2E\u00D6\u00DA[E\u00A4\u00DBZ[\u00B1\u00D6\u00F6:M\u00DD!\"\u0089\u00FB\u00BC\"\u00BD\u00D7Z\u00DB\u00E7\u00F8\u00F1*w\u00CE\u00B8\u00FE\r0\x02S\u00B7Y\u00A9T\u00EA_\u00851,\u009FP\x13\u00AB\u00C1\u00DCb\u0084\u00C0\ba\u00EB)\t\x17\u00FF<\u00CFK\u008B<>\u00FB\u00E9\x04\"\u0085\x12\x17y\u00F3\u0081XQj\u00B2\u009C~D\u00B5\u00F1X\u008C\u00B7\u00D8yET\r\u00CAeaT\x00W_\u00D7\u00C59\u00976\u0091\u00F7\u00C1\u009B`9\x7Fn\u0089w\u00DB5?8\u00B8\u00C6\u00DE_\u00AE\u00A3}A\u00DA\u00F4\x10\u00C48$\u00C7\u0087\x14\u00A4\u0095\u0095l\u0081O\u00DF\x07\u00A06p-\u00DBL\u00D7\r\u00D0\x0B\u00A4\u0086\u00DF\u00AF\u0081\x16\u00F7\u00A0\u00F6\u00B8r\u00FF\r4\u008BHNk\u00DD\u0093\u00BE\u00BA\x1Dx\u008E\x04Nu\u0081\u008C\u009ET\x0B\x17\n\x05\u00B4\u00D6\u00A6\u00B7\u00B7\u00F7\x04\x119E)U\u00CE\u00B4\x19+\u00A5z\u00DD\u00FF\x07\u00B9\u00A0I\u00DD\u00F5\x03\u00E0h\u00E04\u00E7\x01J\u00FB\u0090\x06a(\u0095J\u00E4r\u00B9\x01\u0094bX>\u00A9&N\u00A1P\x14\u0098lx\u00F7\x1D\u008FSf7\u00A1\u00ADb\u0093\t\u0096\u00FF|:\u0084\u0096\x06\u00C2k\u00B1j\u0090\u00C0\u0094b$\nVhh\u00D3\u00D0\u00AA\u00A9v)\u00FE\u00FA\u00AE\u00C7!_\u0088\u00B9\u00FA\u00C2^\u00FA\x16\u00FA<\u00FE\u00FB\x1C{M\u008B@\u00C1\x03\u00B3\u00FA8jz\u00C4\u009C_\u00E59\u00FA\u00F22\x7F|6\u0087\nd\bM\x1F\x02\u00ABX_\u00E6#\u00F8H\u00A3\u00CB=4\u0092\u00F2\u00BB\u00DC\u00D1\u00E9\u00CE\u00C9 ;\u00B1\x0B\u00E8\u00D7\u0096\u00EEu\u00DF\u00A3\u0094Z\tD\u00E9\u009A5w\u00BE\x0E\u00AC\x04\u00BA\x01I9q\u00BA\u009E\u00CCI\u00E2\u00DA\u00EAt\u00ED\u00F7f\u00EA\u00AD\u00BA\u00FB{SM\u009B\u00A9\u00B3'\u00AB}\u00F3\u00F9<---\u00FDk\u00F62\u00DC{X>\u00A9&\x16\x1A\t>\u00D5.\u00CD\u00F5?\u00CFs\u00EFs9\u00A6\u008C\u00B5\u0094\u00CB\u00C2\u00AC}kL\u009F\u00D3\u00C4\u00E1\u00DB\u0085l\u00BFK\u009D\u00D1\u00CD\u0096\x1B\x1F\x0F\u00F9\u00DDk>\u00BD55\u00C0\u00A3\x11\x06\u00F0\u00A7\u00B7<\x0E\u00FD|\f\u00E3\f\u00F4)\u008E\u00BE\u00AC\u00CC\u0084q\u0096=w\u008E`\u00A9\u00C6\x1F%\u009C{i/\u00C7?\x17\u00B0\u00E1Q-\u00FC\u00F2\u00F9\x1C\u00ABn\u00ED\u00C4/K\u00C3e7\u00C0j\x1C\u00C7:\u00FC\u0081\t\u00F6)Z\u00D9\u0081\u0082\u00EA\x18\u00D25\u0095\u008D\u00BA\u00A5.\u00B1\u00F4\b\u00C3\u00B0?\u00F2\u0095\u0096\u00F7<\u008F|>O\x1C\u00C7d\u00DCkh\u00AD)\x16\u008B\u00E4r\u00B9\x01\x0B)\x07\x03--\u009Bj\u00D7\u00F4\\.\u0097\x1B\u00E0\x1EK\u00DB\n\u00C3\x10\u00CF\u00F3\u00C8\u00E5r\u00FD\u008B>\u00B3\x0B\x1E\u0087\u00E5\u0093\u00828\u00D5a\u00A3-\u00F7\u00FD:\u00E4[W\u0095\u00F9\u00D9\u00E5\u00DD\x1C|z\x05>\u00F0\u00F8T\u0093\u00E5\u0098]#\u009E~\u00CDg\u00FB=k\\zX\u0095\u0097_\x0F\u00A8Y\b\u00FD\u0081*01p\u00E2N\u00B0\u00E9\u00E4\u00C6\u00C4\u00F6\u00AE\u00D4x\x02\u0097\x1ETmh\u00EEu\rth\u00E6^X\u00E6\u00EE\u00E7r\x1C\u00BE[\u00C4i_\u00AE\u00E1\u0087\x02\u00B5\u00A1&4\x0Ff1\u00EB\x14\x16S-\x1DH.\u008E\u00D7p\u00FC;7\u00D7\u0080\u0095\u00B0\u009E\u00E7\u00F5\u00BF\u00BA\u00B3\u00D7\u00B5\u00D6\u00FD\x06\u0095\u00EF\u00FB\u00E4r9\n\u0085\x02\u00F5z\u00BD\u00D1Z>\u00DF\x1F\\\u00A8\u00D5j\u00F8\u00BEOKKKV#\u00F7\x1B`\u0085B\x01\x11\u00A1\u00AB\u00AB\x0Bk-\u0085B\x01\u00DF\u00F7SW\u00DD\x00\x10\u00A7\u00AB\u00A2\x07\u00AF\x16\x1E\u0096\x7F\x15\u0088SZ\u00F0\u00A1\u00C7Q;G\u00F4^\u00D0\u00CB\u00F7\x1F\u00C9\u00F3\u00EBW\x03.\u00F9Z\u0095\u0089['\\qZ\x1Ft(n\u00BA\u00AE\u00C4\u00B4-\x13\u00B6;\u00B8\x11\u0082\u00A6G\rD\u00B1O#Y\u00BEWq\u00E3ME\u00B6\u00D8\u00C0p\u00EF\u00F7\u00BB\x1B4\u00E5C\u008F\x1F?\u009C\u00E7\u00F2G\u00F2\u008Ck\u00B6<\u00FC\u00AD^F\u008F\u00B6|\u00E7\u00CE\"\u00E7\u00EE]c\u00EC:vM K'VoHOy_\u008A~\x15E\u00B0\u0086fL\u00B5_6\u0083-I\u0092~\u008B?\x05M.\u0097Ck\u00DD\x0F\u00EA(\u008APJ\u0091\u00CF\u00E7\u00D3\u00E8\x1C\u00D6Z\u00EA\u00F5\u00FA\x1A\u00F5\u00A7\u00A0\u00CC\x023]\u00FE\u00DF\u00D2\u00D2\u00D2\u00FF\u00E0T\u00AB\u00D5\u00FE\u00E5\u00F3Y/D\u0092$k,\u00F9\x1F\u0096\u00FF\x01\u00EF\x04%\u00CB\x03\u00CF\x07\x14\u00CA\u00C2_\u00AE\u00EE\u00C6\u00D70mv\x13g_R\u00A6\u00F2\u00A1\u0086O\x19\u00AA\u00C0\x1E\x17\u00979\u00FF\u00FCf\u0096\u00BD\x124\u00C2w\u00BE\x03\u00AFV\u00D0\u00ADx\u00E6\u00FE<\u00BB\u009E:\u0082\u009B~\x1B\u00B2\u00F1\u00C6\x06\u008A\u00C2/\x7FZ\u00E03\u00A7\u008F\u00E0\u00FA'Cn?\u00B9\u008F\u00DF\u00DD\u00D6\u00C5\u0092v\u00CD\u00B6\u00B3\u009AY\u00D4\u00A6\x19\u00DB,C\u00B8\u00F0\x14\u00D8U\u00AC(\u00ECC\u00A7\u00B7%:n\u00EF\u00A7\x05\u00E9\u0091\u00EEE\u0090j\u00B8\u00EC\x11\u00C7q\x7Fzf\u00FA\x7FZ6\u009B\u00BE\u0099$\u00C9\u00802)'\u00CE\x1Ac\u0083\u00DBM\u00EF\u00C9\u0096\u008B\u00A2h\u00C0>\t\u00E9\u0091\u00B6\u0097\u00827\u009B6:8\u0085\u00F4\u00E3\\r\x19\x1E?\u00E0|6m4{}p[\u00D9\u0087h\u00A8\x14\u00D6\u00B4\u00BF\u0083\u00D3P\u0087j+\x13\u00A5\x1C2\u00F28T\u00D9\u00B5\u00D5\u00F3Q\u00E5>*\x07e\rN\u008C\x07\u00A5\u0082p\u00D2MElU\u00F1\u00A39=\\\u00B3\u00C4\u00E3\u00F8\u00FF(1\u00F5\u00F4\x11\u009C\u00B2k\u009Do\u009F\\\u00E1\u00A4\x19u\u00CE\u00B8\u00B9\u00C8\u00FE\u00D7\u0096\x187BX\x7F\u008CaL\u0093\u00B0\u00B0\u00D5\u00E3\u00C3nE%\u0082cw\u008A8\u00EE\u0080\x1A\u00BF{6\u00C7\u00CC9e\x12\u00A3\u00B8\u00EA\u00B0*{}\u00B5\u00C6\u00C2\x17\x02\u00A6\x1F\u00DBBw\r.\u00D8\u00AF\u00C6.\u009FN\x1A\u008FT4X\x0BW\u00C0\u009B\u00CC\u00AA\u00E2Lr\u00F4\u00A0\u00B4W\u00CA\u00E5\u00FC#3\u009E\x00\x05x\u009E\u00E7u\x18c\x1E\u008E\u00E3xe\u00AAi}\u00DF\u00FF7\u00DF\u00F7\u00A7d=\x03@Q)\u00B5\u00C2Z{\u00BB\u00E3\u00AF\u00FBy\u009E\u00F7E\u00E0\u00D18\u008E\x7F\u00AB\u00B5&\u0097\u00CB\u00ED\u00E5\u00FB\u00FE\x0E@\u00AB\u0088\u00DC\t\u00F4j\u00AD\u00B7\n\u00C3p\u00DF\u00D4\u00F0\x13\x11\u00ED\u00F23Z\u00AD\u00B5\u00F3\u00E38\u00EEv\u009Ay\u008CR\u00EA\u00F0\u00D4{\u0091i\u00B7ED\u009E\x17\u0091'\u00B4\u00D6M\u009E\u00E7\x1D\u00E9\u00AC\u00D6\u00A8\u0081)\u00E5\x01+E\u00E4ag4\u00F6\u0083-\u00C3\u00BF7\x0E\u00C3\u00F0@\x11\u00C9k\u00AD\u009F\u00B5\u00D6>\u00E9\x00\u00B4n\x18\u0086_\x07JZ\u00EB\x17\u00B5\u00D6\x0Fe\u0080\u00BCn\x18\u0086\u00878\u0093]\\\u009B\u00F7\u0089\u00C8\u00BB\u0099MQf\u00E6r\u00B9]\u00B5\u00D6O\u00C7q\u00FChSS\x13\u00B9\\n\u00D70\fw\x16\u0091vc\u00CCO\u00AC\u00B5+\u00D3:\u0083 8(\b\u0082\u008D\u009D\u0091\u00DC\x02\u00BC`\u008C\u00F9\u00F5 \x00\u0097\u0095R3\u0083 \u0098\u0098\u00BA2\u0095REk\u00ED/D\u00E4-\u00A5\x14A\x10l\u00EFy\u00DE\x1EJ\u00A9\u00CE\f\u00A1\u00F5\\\x1F\x7Fn\u00AD]\u00AC\u0094\u00DA:\f\u00C3\u00BD\u0093$\u00E9\x14\x11\u00A3\u00B5V\u00D6ZO)\u00F5\x12\u00F0,\u0080\u0092\u00A7wX\bl\u00D2H\u00B0\x01\u00ED\x1CW\u008F\u00BD\x1C\u00F0\u00C3\u00C7C\u00DEn\u00D5\\|@\u008D\u00C3\u00BE^e\u00C9k\x01\u00C7\u00DFT\u00E4\u00ED6\u00CD\u00C5\u00FB\u00D78\u00EC\u00C0\x1A\u00F4*~\u00F9\u00DB\x1C\u008BWjB\u00BF\u00B1>n\u00C6V1\u009Bn\u009D\u00F0\u00C6+\x01\u00A7\u00DDQ`i\u0087\u00E6\u00CAC\u00AA\u00ECs@\u008De\u00AF\u00FA\u009CtS\u0089\u00D7\u0097k~pH\u0095\x03\u008F\u00A8\u00F2\u00C4\u0083y\u008E\u00BE\u00BE\u00C4\u008B\u0097u3n\u0082m\u00F8\u00A3\u00E1\x03`\x03l\u00B7M\u00FC\u00F5X<\u00EE:\u00ACWF\u00DB\u00CAV\u009E\u00E7\u00BD2\u00D4\u0093\u009F$\u00C9k---[\u00D4\u00EBuV\u00ADZ\x15\u0096J\u00A5\u00C5\u00BE\u00EFO\x18\u009C\u008F`\u00AD\u00ADvuu\u008D\u00D1ZW\u00CA\u00E5\u00F2\x02\u00DF\u00F7\u00B74\u00C6P\u00ADV\x0FPJ\u00DD_(\x14~\u00AF\u0094\u009A\u00EE4\u00D4VI\u0092\u00FCUk\u00FD\u00FD0\f\u00CF\x1D*\x11>\u008E\u00E3\u00D6r\u00B9\u00FCY\x11i\u00ADT*;\x05A\u00F0\u00F4\u009A\u00E1|E\u0092$\x7F\u0088\u00A2h\u00BAR\u00EA\u00B3\u00F9|\u00FE\u00C5\u00A1(E\u0092$\x7F\u00A9\u00D7\u00EB\u00DB\u00A6\u00DA-=\x1C}9;\u009F\u00CF_\u009Dj\u00A7J\u00A5\u00B2I\u0092$o\x17\u008B\u00C5_\u0086a\u00B8\u00BF\u00D3X\u00CF+\u00A5v\u00A8\u00D5jT*\x15J\u00A5\u00D2u\u0085B\u00E1\u00F4\u00AC\x06\u008E\u00A2\u00E8\u00EE(\u008A\u008EH\u00A9V.\u0097{6\b\u0082/\u00B80\u00FCI\"rs\x18\u0086\x0F\u00FA\u00BE\u00BF\u00AF\u00B5\u0096j\u00B5\u00BA\u00971\u00E61c\fZ\u00EB\u00ED\u009B\u009A\u009A\u009EK\u00FB\u00E4\u00A2\u009F\u00D5\u00BE\u00BE\u00BEMDd\u00A9{(F\x15\u008B\u00C5\u0097\u00B4\u00D6\u0093\u00B3\u00F3\u00A4\u0094\u00A2V\u00AB]`\u00AD\u00BD\u00CC\u00E5h\u00DF\u00E4y\u00DE\u00C9Ci\u00D78\u008E\u00BF\u0091$\u00C9\u008D\u00BE\u00EF_\u00E3y\u00DEY\u00F5z\u009DZ\u00ADF\u00ADV\u00CB\u00BE\u0089\u00CE\x01\u00AE\u00F2\x07Sb\u00D61\\|C\u0089?\u00BD\u00ED3\u00FF?;Y\u00FCl\u008E\x13\u00E6\x15\u00B9\u00F4\u0081<\u00D7\x1C^e\u00FEM],|!\u00E0\x1B\u00B7\x15\u0099\u00F3\u00AB<\x17\u00EEU\u00E7\u00E8\u00A3*0\u00CAB\u00DC\u00A0\x15o?\x11\u00B2\u00E7\u00ACf\u00DEi\u00D7\\yh\u0095\u00AF\u00EC_\u00A3\u00F5u\u009F\x03\u00CEl\u00E6/\u00EF\u00FA\u00CC\u00FEj\u008D\u0087\u008E\u00A8\u00D0\u00BE\u00C8g\u009F\u00E3[x\u00A7]s\u00EB\u0089\x15\u00C6\u008D\x1D\u0082\x0F\u00A3\u00D0\u0092\u00A0\u00A4\u0086\u0095&\u0094s\u00979\u00E9\u00B3\u00D6.\u00D4ZO\x05\u008AZ\u00EB\u00CD+\u0095\u00CAnq\x1C\u00FF\u00A6\u0091\u0081i\u008D\u00FB\u00C2VD^r\u00F9\f\u0093\u00AD\u00B5I\x1C\u00C7q\u009A^\u0099r\u00DD0\f\x7F\x19\u00C7\u00F16I\u0092\u00BC\u00AD\u00B5\u009E\u00EE^\u00B5\u00E2\u00FE&\u00E9\u00E0\u0089H#\u00F5\u00A9\u00A1\u0085<\u00CF\u00F3\u00C6'Ir\u00B41\u00E6\n\u00C0f\f\u00C0\x0E\x11y\u00C5i\u00DAi\u00C6\u0098\u00F7\u009CA))Gw\u00E9\u009C\x0B\u00B5\u00D6\u009B*\u00A5\nZ\u00EBm\u0094R\u00D3E\u00E4\u0099!\u00D8D\u009C\u00F6Ak\u008D\u00E7y'[k\u00EF\u00F5<o\u00FF8\u00EEW\u00FA\u00C6%$\u00A1\u00B5\x1E\u00E9y\u00DEa\u008E\u00F6X\x00\u00DD\u0090C\u0080\x0B\u008D1\u00EF9\x1B\u00C0\u00A4c\u0090\u00CB\u00E5\u00E6\u00D5j\u00B5\u00D7\u00E38^\u0094\u00B11\u00E24\u0097:\f\u00C3#\u009D\u008D!\u00D6Z\u00AB\u00B5\u00F6\u008C1\u0085\u00D1\u00A3G\x1FR(\x14\u00E6.[\u00B6\f\u00AD\u00F5\u00F1Z\u00EB\u00C9\u00E9<\u0089H\u009F{\x18K\"\u00D2\u009A\u00A11&C\x13\u00DE\x02\u00DESJ\u0095\u00AD\u00B5\u00DB\u00C4q\u00DC\u00EE\x1E\u0094$\u00A56\"\u00B2\b\u00E8\x16\u00914\u009F\u00FC\u00C0\x01 \u00EE\u0097N\u00CD\u00E93\u00EA\u00FCu\u0089\u00C7\u0096\u00FB\u008D\u00E4\u00C6c\u00AA<yK\x17/?\u0093\u00E3\u00C4yE.\u00B8/\u00CF\u008D\u00C7Ty\u00E2\u00E6.\x16>\x1Fp\u00D2\u00CDE\u00AE\u0098?\u0092\x1F|\u00BD\u00CA\u00D4\t\u0086Yw\x17y}\u00A9f\u00F6~5\u008E9\u00BC\u00CA\u00CA\u00B7}\x0E<\u00BB\u0099?/\u00F6\u00995\u00A3\u00C6//\u00EF!\u00E9\u00D0\x1C7\u00BB\u0089\u00F9\u00AF\u00FA\r-\u00BFS\u00C4c/\x05\u00F4tj\u009A\u009A-\u0098\u0081\u0089\u00C6i\u00D8961V\u00E2\u00FE\u008C2k\u00ED\x7F\u00C7q\u00BC\u00B3\u00EF\u00FB\u00F7x\u009Ew\u0088\u0088\u00D0\u00DD\u00DD\u00BD\u00C2\x19X&\u008Ec\u00E3\x06\u00A0n\u008C\u00B9\u00D8iw\u00CFZ\u00FB\u00A2RJD\u0084(\u008AL\u00FAZu\u0083\u00F6P\x14EI\u00AAAl\x03\u00C5(\u00A5\u0092\u00D4\u00D8K\u0092\u00E4Zk\u00ED\u00F9\u00BE\u00EF_\u00A4\u00B5\u009E#\"T\u00AB\u00D5\u00D1\u00AE]\u00C9x%^5\u00C6\u009C\b\u00AC\u00AB\u0094z_D\u00DEq\x13\u00A83Z\u00EC\x05c\u00CC\u00AE\u00BE\u00EF\u00FFJk\u00FDU7\u00B9m\u0083\u00DD\u0085\u00AE\u00BEd\x10o>\u00CD\u00F7\u00FD\u0093R\u00AF\u00CA\x10\u00E1\u00EC\x03\u0093$\x19\u00E5\u00EA:\f\b\u0094Rw*\u00A5|k\u00ED\u00FEI\u0092\\\x1B\x04\u00C1\u0080\x07\u00D4\u00B5\u00F7_\u00C6\u0098Z\u009A\u00F1\u0097$\u0089qZx\u00941\u00E60\u00F7\u0090\u00FE&\f\u00C33\u00A2(\u00FA\u008B\u0088\x14\u00BA\u00BB\u00BB\x0F\u00ED\u00E8\u00E8\u0098\u00EB\u00EE\x1FQ\u00AB\u00D5\u00D2\u00B1\u00BA^D\u00CEPJ)k\u00ADd\u00F9\u00ADR\u00CAd\u00DER?qQ\u00D1\u008D\u008A\u00C5\u00E2+\u00BE\u00EFwU\u00ABU|\u00DFOR#\u00DDZ{\u008E\u0088\u00DC\u00EFh\u009A\u00EF\u00FC\u00F5k&\x00!\u00B0t\u0095\u00E6\u00EC=\u00EB\u0088\u00C0\u00A9\u00B7\x17(\u00FC\u00A4\u00C0\u00BC\x13*\u00BCpW\x07O>\u009C\u00E7\u00F8[\x0B\x14\u00EF,p\u00FD\u00D1\x15~{['\u00CF=\x19r\u00E6\u008F\u008B,\u00EFR\u009C\u00B5G\u009DG\u00AE\u00AA\x12\u00B7k\u008E\u00B9\u00B0\u0089'^\u00F7\u0099\u00B5G\u00C4/\u00BE\u00D7\x03U\u00C57\u00AF.\u00F1\u00D3\u00E7\x02N\u00D8)b\u00E9\u00DD\u009D`\u00E0\u00E0K\u009Ax\u00F2u\u009F%\u00D7w5\u00F6\u00AF\u0088\u00D7\f#F\u00F5:u]\u00C3\u0097z\u00F6\u00DD3\u00D5Z{\u00AD\u00B5\u00F6\u008Bn\u00A2\u00DBj\u00B5\u00DA\u00D2$I(\u0097\u00CB6I\u0092T%\x16\u0080\x07\x1D\x10VZk7\u00D4Z\u00F78/\u00C4\u00E0]\x12'\u00AE\x11Mo\fz\u0092y5v%IB\x14E\u00AD\u00E9\u00E6}\u008E\u009F3(\u00E02\x1DX\u00E8&\u00E1\u00AE8\u008E\u008Ft\u00DE\x11\u0093\u00D1\u009CSE\u00E4\x1Ac\u00CC4\u00D7\u00BF\x0F\u00DCR\u00AB\x01FV\u009A\x06\u009A\u00E9C\u00D4H\u00CF\"\x14\u0091\u00D8\u00E5kx)\u00C5q \u00FEZ\u00AA\u00C5\u0094R\u00BFi\u00F8*\u00FB\u00E5\u00DF\u00DC\u00C3\u0088\u00D6z\u00F0\x18\u008C\x1BDu\u0092\u00BE\u00BE>\u00B4\u00D63K\u00A5\u00D2\b\u00F7 \u00BD\x1CE\u00D1\u00DF\u00AC\u00B5\u00AF\x00;\x00\u009F\u008B\u00E3x\u00BA\u00D6\u00FA\x19\u00DF\u00F7\u00EB\u00E9C\x1A\u00C7\u00F1\u00DBN\u00E9L2\u00C6Lq\u0099\u0086/\u0088H\u00B7\u00D6:\u009B\u00CCu\u0091;\u00A8T*_\x05\x1Et\u00C6\u00B9\u00C9xwN\u00B1\u00D6\u00CE\u00CC\u00E0\u00F6\u00ED\u00A1\x13\u0080F[\u00E6\u00FF\u0097\u00CF\u00B9w\x17i\u00BD\u00AD\u0093\x05?\u00EB\u00E4\u00B1\u00FBC\x0E\u00B9\u00AE\u00C4\u00A4\u00BB\n\u00DC\u00F6\u008D>^\u00BD\u00B7\u0093\u00C7\x1F\u00C8s\u00EC\u00BC\"#\u00EE,p\u00EB\u00C9\x15\u009E\u00BF\u00BE\x0B\f\u0098\u009A\u00E2\u00AC\x1F\u0094\u00B8\u00EF\u00CF9N\u00DD\u00B5\u00CE\u00ED\u00DF\u00E9\u0084\u008A\u00E2\u00DCkJ\u00DC\u00F5\u00A7\x1C\x07M\u008BXv{\x17\u0084\u00C2\u00857\x15\u00B9\u00ED\u0099\u0090\u0099[\u00C5\u00FC\u00ED\u00CAn\u008A\u00CD\u008D\u00B5yCe\u00B1EqD\u00A4\"\u00ACD\u00D9/>\x1E83\u00C3\x1F\u00C7\x01\x0F(\u00A5vt\u00DA\u00C9d\u0080\u00D5\u00E7\u008C\u008D\x0E\u00ADu\u009C\u00D1\u0096\u00E9+\u00EDm\u00E074\u00B6\u00E8\x1A\x00\u00E2\x14@Y\r\u0092\u00EE\u00F4\u0098\u00F5:\f\u00B6\u00CC]\u0084\u00AF\u00A2\u0094j\u00B6\u00D6\u00F6dr\u0099M\u00A6\u00CCD\u00E0\u00AC\u00CC\u00BD\u0093\u00B4\u00D6\u00F7Yk\u00BF\u009C\u00D6\u009F\u00D9U2\u00C9h\u00E5\u00BB\u0081-\u0095R\u00D3\u0094R\u00B7\u0088\u00C8\u00BE\u00A4\u00ABt\x1A V\u009E\u00E7m\u009D\u00D2\x10\x11y\u00D3\u0085\u00E4c\x07\u00FE-\u0080\x11\u00C6\u0098\u00AE\u00CC8\u00B5\u00D3\u00D8\x18\u00F2\u00D8A\u0080\u008F\u00DDn\u0096;T\u00AB\u00D5\u00F4\u00DCI\u00D6\u00DA#\u0094R\u00E5\u00CCw\u00FF\u009C\u0088<c\u008C\u00B1\x19\u009A\x10\u00BB1\u00BB\x11\u00D8\u00DB=\x00;\x1Bc~\u00A7\u0094\u00B2\u0099q\u00A8\u00BAy*\u00A6y&.\u0090d2\u0081\u00AC/\x0F\u00E2\u00CF\u00A7\x01\u00AF\u00AF\u00C9\u0089\u00DB4\u00E7|\u00A5N.\u0080i\u00DFnf\u00EBI\t\u00F3N\u00AE\u00F0\u00C6\u00BD\x1D\u00DC\u00F5\u00D3\x02;]\u00D4\u00C4V\u00EB\x19~tR\u0085\u00D7\u00EE\u00ED\u00E4\u00A1\u00FB\u00F3\u00ECwU\u0099/m\u009A0y\u00B4\u00E5\u008E\u00DF\u00E7\u00D8\u00FFs1\u00CBn\u00EF\x04\x1F\u00CE\u00BB\u00AE\u00C4\u009D\u00CF\u00E68p\u00DB\u0098e\u00B7t\u00A1FZ\u00AE\u00B9\u00BD\u00C05\u008F\u0087l\u00BF\u0091\u00E1\u00D9\u00EF\u00F40e\u00EB\x18*\n\u00E9\u00D0\u00FD\x0BT\x07g\u00B1%\u0089!&\x01\u0092,\u0088\u00DB\u0094R7\x03\u00A3D\u00E48 \u00AF\u0094\u00DAJk\u00ED'\r\u0094\u00A6\u00EF\u00DE\x1E\u0097\u00A8\u00FE\u009ER\u00AA\u0090.\x1Br\u0094$])2R)u2\u00D0&\"\u00B3\u00B3\u00B6\u009B\u009B\u00A4\u00EC\u0080\u00FB\u008E\u0082\u008C\u00CChT\u00DF\u0095\u00CB\u00F6\u00EF\u00D7J\u00A9\u00AF\x02\u00EB\x02]\u00A9\u00D6\u008E\u00E38;\x13\u00CB\u0094R\u00B7\u00D0H\x13=\x0E\b\u008C1\u00D3\u0092$\x19\u00EDB\u00D6\u00D9\u0087B2`\x7F\x198\u00D7\u00F3\u00BC/\u00F8\u00BE\u00BF(\u008E\u00E3S\x07\x19\u009C\u0081\u0088\u00A4\u00F3\x1B\x00#\x07\u008DlNk\x1D:p\u00A4\u00F5\u008E\x01\u00CE\x07\x16\u00D0\u00D8\u00AA\f\u00C7\u00A3\u00ADs3fg\u00A7\u00C9\x1DY\u00C3-m\u00CF\u00CF\u00F4y\u008C\u00D3\u00EAz\u00B0\u00A1\u009B\u00FDnJ\u00A9s\u0080\x1B\u0080\u00C9J\u00A9VGc\u00D2\u0090m\u00AA(~\u00AF\u0094\u00BAOD\u00F6\x03vwU}^\u00D3\u00C8\x00^\u00ED\x0F\u00AD)\u00C4\x13\u00CE<\u00AE\u00C2\x1Bs\u00BB\u00D8r\u0092e\u00BBo7s\u00F8\u00B7\u009A\u00F9\u00DA\u00F4\u0088\u00C5\u00F7t\u00B2\u00FB\u00E6\t\u00DB}\u00BB\u0089\u00FD\u00CFl\u00E6\x0B\u009FNX\u00F8\u00D3\x0E6Y\u00C7\u00B2p\u00A9\u00C7\u00EB?\u00ECf\u00EE7\u00FB\u0098\u00FB\u00B3\x02\x13\u008Fh\u00A1\u00AB\u00A2\u00F8`^\x17\u00D7\u009F\u00D7\u00C3\x7F\u00CE\x0F\u00D9\u00F0\u00D0\x16\x1E[\x10\u00F0\u00E0Y}\u00FC\u00FC\u008A\x1E\u00A6l\u009A \u00CB<\u00CC*\u00CD\u00A0\u00C4\u00C5\u00CCn\x17\x16k\u00FB}\u00B2*c\x18,r\u0080;-\u00B5\u008C\u00AD\u00B5:I\x12\u009D\rC\u008BH\u00C9Z{\u0087\u00B5\u00F6ac\u00CCsq\x1C\u00FF\u00D5\x18\x13d}\u00A3\"R\x16\u0091f\x11\u0099#\"\u00AFe\u00EEU\u0083\u00DB\x15\u0091s\u008D1oYkgg\u00CE\u00B5\u00BAr\u00D9\u00B6?o\u00AD}\u00DAZ{\u008F\u00B5v90/\u0093\u00D5\u0096\u0096y\u00D3\u00BDFO\x11\u0091\x0F3\u00D7\u00ED\u00A0\u00EF\u0080\u0088d\u00FB0\u00CA\u00B9\u00E4\x1E\u008A\u00A2\u00C8\x0E.\u00E3\x1E:I\u0093\u00F4\u009D\u00C6\u00FEb:N\"b\u008D1\u00C6q\u00D4\u00EC\u0098\u008E\u00B7\u00D6\u00CE\x13\u0091\u00DFe\u00CE)W\u00AE\u00BF\x1D\u00A5\u00D4yZ\u00EB\x02pG\u00A6\\\u009A\u0087\u00DD\u009E\u00E9\u00CF\x05n\u009Ev\u00CE\u0096sc\u009Fmw\u0096\x1B\u00AB\u00FB\u0093$Ye\u008C\u00D9;k?8\u00B9\u00C7\x01\u00FD\u0086\u00C1~\u00E2\u00F7Q\u00AC\u00DFX\u00CE\u00A6P\x1EH]\u00C1\u00FB\x1E\u00C5f\u00E1{\u00DF\u00EC\u00E5\u00FC\x03|.\u00BC'\u00CF&g4s\u00D0\u00B61\u00D7\u009CT\u00E1\u00F4#\u00AB\u00FC\u00F0\u00C7\x05\u00B6>\u00B7\u0089\x19\u009B'\u00DC\u00F4\u008D\n\u00C18\u00CBmw\x17\u00B8\u00E4\u0081\u0090\x1D64\u00BC\u00F1\u00C3.\u009A'\x19n\u00BB\u00BB\u00C8\x15\u008F\u0084\u008Co\u00B1\u00DCq|\u0085\u009Dv\u008D\u00C0\u0080,\u00D5\u00A4\u00FDSj\u008D4\u00D0\u00E5\u008D\u00D7\u009C8\u00AA\u0097n\u0080\u00B1:@\u00A3\u0094\n3\t4\u00B9\u008C\u00E6\u00B4\u0083\x12\u00F3< \u00BBB\u00BA\x0F\b\u00D2W]ZFDJ\u00CE\x0F\u00BC\u009C\u00C6^\u00CB\u00E9\u00BD\u0083\u00B3T[\u00DC\u0091\u00CA;\u00C0]C\u0094\x1BIc\u009B\u00DB\u00D4\u00D8\u00DA \u009Bo\u009Cj\u00C4\u008C\u00B1\u0096\u00DE\u00AB\u00D7\u0092\u008B\x1C\f\u00D6d\u00EE\u00DE\u00A1\u0096\u00DC\u00EA\u00CCXu\u00B8\f>2\x19v\u00D9\u00EB~\u00A6\u00DE\u0094F,\u00C9hu=\u00B8}\x11y\x11\u00A8\u0089\u00C8\u00EBC\u00C4\x1D\u00EEp\u00AF\u00FA\u00A9\u00CE\u00E7;e\u0090\x16\u00F6\u0086\u0088SLI\u00CB\u00B9\u00EF6~\u00886\u00C3!\u0082t\u00CA\u00C7\u00F2%Zd6%{\u00B1\u00AEkd\u00A5F\x10D\u0081\u00F4*\u00E8\u00F1(\u00B7X\u00AE\u00FDv/\u00E7\u00BE\u00EAs\u00FE\u00BD\x05&\u009D\u00D0\u00C2\u00C1\u00D3\"\u00E6\u009EX\u00E1\u00CC#\u00AA\\:\u00AF\u00C86\u00DFl\u00C2\nLYGx\u00EE\u00D2\x1E&l\u009E\u00F0\u00D3{\n\u00CC>7\u00CF\u00BA#-\u00B7\x1CSa\u00E7\u009D\x1B\x19l|\u00A8\x1B\u00BB\x01\u00E9\u00D5<Fk\x1A\u00FBU\u00F8@U}\u0097\u0084\u00EF4\u00A6\u00A3B\x0F\u0093\u00A8\u00B0\x0E\u00B9\u00C6\u00F8\u00BF\x07\x1C\u00EF^\u00D1\x7F\u00C9|\u00E9\u00B3\x1D\u00F0\x16;.\np\x1E\u008D\u00CD\u00BE\u00BB\u00B3\u00C1\x0E`\x05\u008D=+\x00.\x01\u00B6s\u00F7}\u00E8\u00CE]Ic\u00A3\u00F0%\u00C0\u00BB\u00EE\u00DC\u00FD\u00AE\u00DE4[.\u00ED\u00FDR\u0097\u00F6\u0099\u00D6\u00F7\x1A\u008D\u00ADl\u00BD\u00C1\u00C1\x0E\u00A5\u00D4\u009F\u00DC\u00E7w\u0081\x13\u0081\t\u00C0\x0B\u00992g\x03\u009B\u00D1\u00D8\u00DB\u00B9c\b\x10?\x0E\u00FC\u00BB3T\x1F\u00C8\u009C\x7Fo\u0088\u00FA\"\u00D7\u008F\u00CD\u0080\u00BFd\x1E\u0094\u00F3\u0080\u00CF\u00B8\x07o\u0095;w\x19\u00F0{\u00A0\x15X\u00E4\u00CE\u00DD\u00EC\u00FA\u00B1\x02\u00F8\u009B;w\u00AB\u00FB\u00BE]\"\u00F2\u00B2\u00D3\u0090\u008F\u00B8\u00EFj3}\u00EAuJc\x0F`=7^\u00D6\x01\u00D28\u00BA\u0092\u0082}\u00A9\u00CB6\u00CC\x06;\x027\u00A6\x00?u\u00D7\x01\x1Eu\x7F\u00FF\u00E4\u00EC\u00882\u00F0\u0094\u0092\u00F7\u00B7\u00E5\u00D1\u0087\u00F3\u00FC\u00EC\u00A9\u00C2\u00983\u00F6\u00EC\u00FB\u00D16;F\x07\u00D2\u00E7a;T\u00FF\x0B]\u00C4\u00CDX\u008B\u00852,z)`\u00CE/\u00F2\u00FC\u00F6o>G~!\u00E2\u00F2\u0093+\u00ACh\u00D3\u00B4\u00ADTl\u00B1]\u00CC\u00AF\u00E7\u0087\u00CC\u00BA\u00BBH\u00B9 \\~`\u0095]vi\u0080W\u00DA5\u0092\u00ACV\u00AA\u0082\u00DB\u0098e\u0084\u0081PSk\u00F3\x1E\u0088\u00EArBy\u00BCY\u00A15\u008D\x1D\u0080\u00BC6\u00DA\u00EDn\u00BCh\u00CE&d\x15\u008A\u00E1|\u0083a\x19(\u00DE\u0088p\x13\u00AE|0\u00CF\x13/\u00E6*\x0F\u00BE\u00A4\u00EE\u00CB\u00F5\u00F1\u00E86\u0093\u00F4\u00E7\u00BD\u00C9\u00F1:\u00AA\u00AE\u0091h5;\u00B55\u0085\u00EAV\u008C\u009Ad8`f\u009D\x03\u00A7&\u00DC\u00F7|\u008E\x7F\u00BF\u00BD\u00C8\x06\u00A3,\u00A3J\u00C2\x01\u00976\u00F1\u00C8\u00CB9.\u00DE\u00AF\u00C6\u00DC3\u00FA\u00D8pc\x03\u00ED\x1A\u00DB\u00AD\u00FA\u00F5\u0097\x00\u00CA\u0082WV\u00A8u\u00A1\u00B6\u00DC\x7F\u00E3\u00FB\u00F7\x16\u00F7\u009D\u00FD\u008B\u00FCUW\u00CF\u00CFUZ[=v\u00DA\u00C8\u00E0\x15\x15\u00C4\u00BD\u00D8\u00DC&\u00B4\u00B2\x03\u0092T>\u00F2\u00F7=\u0086\u00E5\u00FFOQ\u00A5\u008Df0q\u00A40\u00AE\u00D9\u00EA\u00F6>\u00CD\x07\u00ED\u009E\u009D:\u00C6\u00F0\u00CD\u00BD\u00EA\u0087\x7F}\u00BF\u00CA\x7F\u0090\u00F7F\u00D86\x05\u00B1\fX\u00D7\u00AF\x005\u00DABQx\u00F9\x0F9\u00CE\u00B9\u00B7\u00C0\u0092\x0E\u00C593\u00EB\x1C\u00BB_\x1DJ\x16\u00DA<l\f\u00A2V/\x04\u00ED\u00DF\x16k\u0082 \u00DDQ\u00EF\u00CF\x1F\u00CF\u009F~\u00D5\x13c\u00EEX\u00B0$b\u009D\x11\u0096\u00C0StU\x14\x1B\u008F\u00B3l\u00B8\u008Ee\u00E5\u00AAN&o\u00B0)'\u009D<\u008B$\u00AE\u0093\u00F1\x06\f\u00CB\u00B04@\u009C\u00F9\u00F5$\u00A5\x14\u009E\x02Y\u00D6\u00AD\u00CC\u00CAU\u008Acw3\u00DEq;W.\u00DBf\u0083\u00F8\\\u00B4\u008F520s\u00D3\u00ADRV\u00A3-q\u009F\u00C2F\u008Aplcs\x15[\x1F2G\u00AEQ>/\u00BC\u00F6np\u00CDY?\u00F6\u00CE\x7F\u00EA\x15]\u009F<.\u00C7\u0098&\u00EB\u008B\u00C5\u00A2\x1A.\u0095\u00AEJ\u00E3\x17\u009C\u00AC\x15\u00AA}\x1D\\t\u00F6\x11\u00EC=c7\u00DAV\u00AC\x1C\u009E\u00B5aYk*\u00A6\u0088\u0090X\u00C1Ll\x16\u00B5\u00E9d\u00C3]\x7F,\u0099\u00AF\\f\u00BE\u00F5\u00EE\u00B2x\x02M\u00FAQ\u00ED\u00F6\u00A4\u00D0N#k\u00ED4\u00ECJM`\x15a \u008D\u00E5I\thou\u00D9\u00EC\u00A1|\x1EG\u00ABI\u00A7\u00FD8?\u00EB\u00C9\x05\u00A5\u00FA6\x1B\u00E7\x18]2X\u008B\x11\u00B0\u00E9F\u00DE\u00CD\u0085\u00C6\x1E\u00C5\u0093\u00C7j\x02\u00FAxc\u00D1{\u00F8~0<c\u00C3\u00F2\u0091 \u00CE\u00C4Y\x11_+&\u00B6$\u008C(Zb\u00A3Z\u0081\u00BDY\u00FD\u00ABH\x03\u00DDai\u00D2a\u00A4>j[\u00AA\u00F4W\u0096fbX2\u00A6(\u008Co1\x18k\u0091\u00C6MCZl\u00D6ZrA@\u00B9T\x1C^\r<,\x7F?\u0088S\u00EE\u00AA\u00B5\u00C2\u00D3\u00A0Vo\u0093\u00F9G\u00E7\u00FB;!\u00E3R\u00FA8\u00A9\x01\u00A7\x00\x1B97\x0E(\u00F0\u00BD\u00B5\u00E2vX\u0086\u00E5_\x03\u00E2\u008F\u0091[i8\u00F2\u00AF\u00FB\u0098r?r\u00E5~4<\u00D4\u00C3\u00F2\x7F\r\u00C4\u00D0p\u00A6\u009FI\u00E3W\u0091\u009E\x1At\u00ED\u00F7N\u00F3\u009E\u00E24\u00F1\u00B0\f\u00CB\u00FFI\x10\u00A7\u00F2\x1E\u00B0\x1B\u00F05\x1A\u0091\u0098C\x1D\u00F7}gxx\u0087\u00E5\x7FC\u00FE\u00DF\x00g\u00E3\x0EL\u00F1BT\u00DE\x00\x00\x00\x00IEND\u00AEB`\u0082"
    return (image1_imgString);
        }
    var image1 = group1.add("image", undefined, strImageSrc(), {name: "image1"}); 

    var group2 = group1.add("group", undefined, {name: "group2"}); 
        group2.orientation = "row"; 
        group2.alignChildren = ["left","center"]; 
        group2.spacing = 10; 
        group2.margins = [180,0,0,00];
//TODO:
    var button1 = group2.add("button", undefined, undefined, {name: "button1"}); 
        button1.text = "About"; 
        button1.justify = "right"; 
        button1.onClick=  function onAboutFunction() {
            alert();  
            if(typeof(helpWindow_unitTest) == "undefined") {
                new helpWindow().run();
                }
        }


    pal.grp= pal.add(res);
    pal.layout.layout(true);
    pal.grp.minimumSize= pal.grp.size;
    pal.layout.resize();
    pal.onResizing = pal.onResize = function () {this.layout.resize();}
//=============================

    //TODO: 
    /*pal.grp.group1.group2.group3.button1.onClick= function onAboutFunction() {
        if(typeof(helpWindow_unitTest) == "undefined") {
            new helpWindow().run();
            }
        alert();  
    } */

    function DropDown1List() { //добавляю в dropdown1 композиции из dropdown1_array
    var listItem= dropdown1_array; 
    for (var i=0; i<listItem.length; i++)
    pal.grp.group4.group5.panel1.group6.group7.dropdown1.add("item", listItem[i]);
    pal.grp.group4.group5.panel1.group6.group7.dropdown1.selection=0;
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

    function DropDown4List() { //добавляю в dropdown4 композиции из dropdown_array
        var listItem= dropdown4_array; 
        for (var i=0; i<listItem.length; i++)
        pal.grp.group4.group5.panel1.group9.group11.dropdown4.add("item", listItem[i]);
        pal.grp.group4.group5.panel1.group9.group11.dropdown4.selection= 0;
    }
    DropDown4List()
    pal.grp.group4.group5.panel1.group9.group11.dropdown4.onChange= onDropdown4Function;
    function onDropdown4Function(){  //включаю группу для dropdown4_1
        if (pal.grp.group4.group5.panel1.group9.group11.dropdown4.selection.index !==0) {
        pal.grp.group4.group5.panel1.group9.group12.enabled=true;
        } else {pal.grp.group4.group5.panel1.group9.group12.enabled=false;}
    }

    function DropDown4_1List() { //добавляю в dropdown4_1 композиции из dropdown_array
        var listItem= dropdown4_1_array; 
        for (var i=0; i<listItem.length; i++)
        pal.grp.group4.group5.panel1.group9.group12.dropdown4_1.add("item", listItem[i]);
        pal.grp.group4.group5.panel1.group9.group12.dropdown4_1.selection= 26;
    }
    DropDown4_1List()

    function DropDown5List() { //добавляю в dropdown5 композиции из dropdown_array
        var listItem= dropdown5_array; 
        for (var i=0; i<listItem.length; i++)
        pal.grp.group4.group15.group16.panel2.group17.group18.dropdown5.add("item", listItem[i]);
        pal.grp.group4.group15.group16.panel2.group17.group18.dropdown5.selection=17;
    }
    DropDown5List()

    pal.grp.group4.group15.group16.panel3.edittext2.text=1.0;  // для radiobutton1, radiobutton2 и radiobutton3 в edittext2 изменяю текст
    pal.grp.group4.group15.group16.panel3.radiobutton1.onClick= function () {
        if(pal.grp.group4.group15.group16.panel3.radiobutton1.value==true) {
        pal.grp.group4.group15.group16.panel3.edittext2.text=1.0;
        }
    } 
    pal.grp.group4.group15.group16.panel3.radiobutton2.onClick= function () { //===>
        if(pal.grp.group4.group15.group16.panel3.radiobutton2.value==true) {
        pal.grp.group4.group15.group16.panel3.edittext2.text=1920;
        }
    } 
    pal.grp.group4.group15.group16.panel3.radiobutton3.onClick= function () { //===>
        if(pal.grp.group4.group15.group16.panel3.radiobutton3.value==true) {
        pal.grp.group4.group15.group16.panel3.edittext2.text=1080;
        }
    } 
    
    pal.grp.group4.group15.group16.panel3.edittext2.onChange= function () {   //проверяю если в edittext2 введено число или буква
        if (isNaN(pal.grp.group4.group15.group16.panel3.edittext2.text)==true){
        alert( '"'+pal.grp.group4.group15.group16.panel3.edittext2.text+'"'+" is not a number. Please enter a number.", ame.scriptName);
    }
    }

    pal.grp.groupN.checkbox1.onClick= function onCheckbox1Function() { //включаю group14 (секция сохранения композиций)
        if (pal.grp.groupN.checkbox1.value==true) {
            pal.grp.groupN.group14.enabled=true;
        } else {pal.grp.groupN.group14.enabled=false;}
    }

    if (app.project.file!== null) {   //записваю путь сохраненного проекта в edittext3
        pal.grp.groupN.group14.edittext3.text= decodeURI(app.project.file.path);
    } else {pal.grp.groupN.group14.edittext3.text=''}

    pal.grp.groupN.group14.button2.onClick= function () {  //при клике на Browse открываю окно и записваю путь в edittext3
        //var ProjectPath= app.project.file.path;
        if (app.project.file!== null) {
            var Savefolder = Folder.selectDialog("Output To Folder");
            if (Savefolder==null) {pal.grp.groupN.group14.edittext3.text=app.project.file.path  //если путь =null, то edittext3= путь сохранения
            } else{
            pal.grp.groupN.group14.edittext3.text = decodeURI(Savefolder); }
        } else {
            app.project.saveWithDialog();
            pal.grp.groupN.group14.edittext3.text = decodeURI(app.project.file.path);
        }

    }

    // GROUP3
   
    pal.grp.group21.checkbox2.onClick= function () {  //проверяю версию AE при клике на checkbox2
        if (pal.grp.group21.checkbox2.value==true) {
        if (parseFloat(app.version) < 13.8) {
            alert("'Send to Adobe Media Encoder' requires "+ame.strAEVersion, ame.scriptName);
            pal.grp.group21.checkbox2.value=false;
            } else {}
        }
    else {}
    }

    pal.grp.group21.button3.onClick= onQueueFunction;    //Queue кнопка

    TEST_Run;         //TEST_Run         
    function TEST_Run() {
        var Q=app.project.item(1).layer(1).inPoint+' '+app.project.item(1).layer(1).startTime;

        alert(Q)
        //this.parent.parent.group4.group5.panel1.group6.group7.dropdown1.selection
    }
    

    // GROUP7 
    
    }
    return (pal);
}

                    
    function onQueueFunction() { 

        var nProceedCompIndex =1,Dropdown1Selection=dropdown1_array[this.parent.parent.group4.group5.panel1.group6.group7.dropdown1.selection.index];
        function onProceedCompIndex() {               //получаю index для dropdown1 
            while (nProceedCompIndex>0 && nProceedCompIndex<1000) {
                if (app.project.item(nProceedCompIndex).name == Dropdown1Selection) {
                return(nProceedCompIndex)
            }   else {
                nProceedCompIndex++;
            }      
        } } 
        onProceedCompIndex()

        if (app.project.item(nProceedCompIndex).numLayers==0) {alert('There are no layers to Queue', ame.scriptName)} //сообщение, если нет слоев для обработки

        var nLinkCompIndex =1,Dropdown4Selection=dropdown4_array[this.parent.parent.group4.group5.panel1.group9.group11.dropdown4.selection.index];
        function onLinkCompIndex() {               //получаю index для dropdown4 
            while (nLinkCompIndex>0 && nLinkCompIndex<app.project.numItems+1) {
                if (app.project.item(nLinkCompIndex).name == Dropdown4Selection) {
                return(nLinkCompIndex)
            }   else {
                nLinkCompIndex++;
            }      
        } } 
        onLinkCompIndex()

        var Dropdown3Selection= this.parent.parent.group4.group5.panel1.group9.group10.dropdown3.selection.index //переменная для Time Span
        Dropdown4_1Selection= this.parent.parent.group4.group5.panel1.group9.group12.dropdown4_1.selection.index; // переменная для blending mode
        Dropdown5Selection= this.parent.parent.group4.group15.group16.panel2.group17.group18.dropdown5.selection.index; //переменная для перекраски слоя
        Edittext1Selection= this.parent.parent.group4.group15.group16.panel2.group17.group19.edittext1.text; //переменная для текста из edittext1
        Edittext2Selection= this.parent.parent.group4.group15.group16.panel3.edittext2.text; //переменные для Resize Comp ==>
        Radiobutton1Value= this.parent.parent.group4.group15.group16.panel3.radiobutton1.value; //==>
        Radiobutton2Value= this.parent.parent.group4.group15.group16.panel3.radiobutton2.value; //==>
        Radiobutton3Value= this.parent.parent.group4.group15.group16.panel3.radiobutton3.value; //==/
        Checkbox2Value= this.parent.parent.groupN.checkbox1.value; // переменная для checkbox1
        Edittext3Selection= this.parent.parent.groupN.group14.edittext3.text; //переменная для edittext3
        ProgressBarValue= 0;
        
        if (Checkbox2Value==true && Edittext3Selection== '') {  //прерываю если путь в Output Folder не указан
            alert("Can't save Queue Comps. Please specify Output Folder", ame.scriptName);
            function exit() {
                p.blah();
            }
            exit()
        }

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

        if (this.parent.parent.group4.group5.panel1.group6.group8.dropdown2.selection.index==0 && this.parent.parent.groupN.checkbox1.value==false) {     //определяю maxvalue для progressbar 
            this.parent.parent.group22.progressbar1.maxvalue= app.project.item(nProceedCompIndex).numLayers;  
            } else if (this.parent.parent.group4.group5.panel1.group6.group8.dropdown2.selection.index==1 && this.parent.parent.groupN.checkbox1.value==false) {
                var nMaxValue=0;
                for (var n=1; n<app.project.item(nProceedCompIndex).numLayers+1; n++) {
                if (app.project.item(nProceedCompIndex).layer(n).enabled==true)  this.parent.parent.group22.progressbar1.maxvalue= nMaxValue++ }
            } else if (this.parent.parent.group4.group5.panel1.group6.group8.dropdown2.selection.index==0 && this.parent.parent.groupN.checkbox1.value==true) {
                this.parent.parent.group22.progressbar1.maxvalue= app.project.item(nProceedCompIndex).numLayers + app.project.item(nProceedCompIndex).numLayers; 
            } else if (this.parent.parent.group4.group5.panel1.group6.group8.dropdown2.selection.index==1 && this.parent.parent.groupN.checkbox1.value==true) {
                var nMaxValue=0;
                for (var n=1; n<app.project.item(nProceedCompIndex).numLayers+1; n++) {
                if (app.project.item(nProceedCompIndex).layer(n).enabled==true) this.parent.parent.group22.progressbar1.maxvalue= nMaxValue++ } 
                this.parent.parent.group22.progressbar1.maxvalue*=2;
            }

    app.beginUndoGroup('Send Render Queue');    //начало отмены действия Ctrl + Z
        var CheckNumLayers=numI=app.project.item(nProceedCompIndex).numLayers, n=CheckNumLayers, ChooseLayer;
        if (this.parent.parent.group4.group5.panel1.group6.group8.dropdown2.selection.index==0) {
        while (n<CheckNumLayers+1 && n>0) {
            ProgressBarValue++;
            this.parent.parent.group22.progressbar1.value= ProgressBarValue;
            pal.update();
            ChooseLayer = app.project.item(nProceedCompIndex).layer(n);      //работаю со всеми слоями
            GeneralOperation()
                n--; 
            } 
        } else {
            while (n<CheckNumLayers+1 && n>0) {
                if (app.project.item(nProceedCompIndex).layer(n).enabled==true) {  //работаю только с включенными слоями
                    ProgressBarValue++;
                    this.parent.parent.group22.progressbar1.value= ProgressBarValue;
                    pal.update();
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
                var GetNameComp= GetNameLayer += ' '+ame.strQueueComp + ' ' +Edittext1Selection;         //имя слоя + Comp
                var Width, Height, PixelAspect, FrameRate;  
                function GetPropertiesToComp() {     //получаю свойства слоя через проверку его на Project пенеле  
                    var nI=nProceedCompIndex, AspectR=app.project.item(nI).width/app.project.item(nI).height; 
                    while (nI>0 && nI<1000) {
                        if (app.project.item(nProceedCompIndex).layer(n).name==app.project.item(nI).name) {   //Делаю Resize если активно 'Resize Queue Comps using'                       
                            //Width = app.project.item(nI).width;
                            //Height = app.project.item(nI).height;
                            FrameRate = app.project.item(nI).frameRate;
                            PixelAspect = app.project.item(nI).pixelAspect;
                            if (Radiobutton1Value==true) {
                                Width = app.project.item(nI).width*Edittext2Selection;
                                Height = app.project.item(nI).height*Edittext2Selection;
                            } else if (Radiobutton1Value==false && Radiobutton2Value==true) { 
                                Width = Edittext2Selection;
                                Height = Width/AspectR;
                            } else if (Radiobutton1Value==false && Radiobutton2Value==false && Radiobutton3Value==true) {
                                Height = Edittext2Selection;
                                Width = Edittext2Selection*AspectR;
                            }
                            break;
                        }else {
                            nI++;
                        }
                    } }
                GetPropertiesToComp() 
                Width==0 ? Width=1920 : {};  //Обработка ошибки если параметы =0
                Height==0 ? Height=1080 : {};  //==>
                PixelAspect==0 ? PixelAspect=1 : {};  //==>
                FrameRate==0 ? FrameRate=25 : {};  //==/

                    //alert( GetNameComp+' '+ Width+' '+ Height+' '+ PixelAspect+' '+ GetDuration+' '+ FrameRate);
                    app.project.items.addComp(GetNameComp, Number(Width), Number(Height), PixelAspect, GetDuration, FrameRate);  //создаю композицию с именем "имя слоя Comp"
                    var AVItemN=1, nItemQ=nProceedCompIndex;
                    while (AVItemN>0 && AVItemN<app.project.numItems+1) {   
                        if (app.project.item(AVItemN).name==GetNameComp)                //проверка если item = "Имя слоя Comp"
                        {
                            if (Dropdown5Selection!==17) {        //перекрашиваю слой
                            app.project.item(nItemQ).layer(n).label=Dropdown5Selection;
                            } else { }  

                            app.project.item(nItemQ).layer(n).copyToComp(app.project.item(AVItemN));  //копирую слой "имя слоя" в композицию "имя слоя Comp"
                            app.project.item(AVItemN).layer(1).enabled= true;  //включаю видимость слоя
                            app.project.item(AVItemN).layer(1).startTime=0;
                            app.project.item(AVItemN).layer(1).startTime=0-app.project.item(AVItemN).layer(1).inPoint;

                            if (Dropdown3Selection==1) {      //определяю Work Area
                                var WorkAreaStartX= app.project.item(nProceedCompIndex).workAreaStart-app.project.item(nProceedCompIndex).layer(n).inPoint;
                                if (WorkAreaStartX>0 && app.project.item(nProceedCompIndex).workAreaStart<app.project.item(nProceedCompIndex).layer(n).outPoint) { 
                                    app.project.item(AVItemN).workAreaStart=WorkAreaStartX;
                                } else if (WorkAreaStartX<0 && app.project.item(nProceedCompIndex).workAreaStart<app.project.item(nProceedCompIndex).layer(n).outPoint) {
                                     app.project.item(AVItemN).workAreaStart=0; 
                                } else {app.project.item(AVItemN).workAreaStart=0;
                                    app.project.item(AVItemN).workAreaDuration= 0.1;
                                } 
                                if (app.project.item(nProceedCompIndex).workAreaStart+ app.project.item(nProceedCompIndex).workAreaDuration>app.project.item(nProceedCompIndex).layer(n).outPoint) {
                                } else {
                                    var Y= app.project.item(nProceedCompIndex).layer(n).outPoint-(app.project.item(nProceedCompIndex).workAreaStart+app.project.item(nProceedCompIndex).workAreaDuration)
                                    WorkAreaStartX>0 ? app.project.item(AVItemN).workAreaDuration= GetDuration-WorkAreaStartX- Y : app.project.item(AVItemN).workAreaDuration= GetDuration- Y;
                                }
                            } else {}

                            if (Dropdown4Selection!=="None") {   
                            app.project.item(AVItemN).layers.add(app.project.item(nLinkCompIndex)); //Перемещаю композицию в "имя слоя Comp" для Link Comp 
                            app.project.item(AVItemN).layer(1).blendingMode=dropdown4_1_blending_array[Dropdown4_1Selection]; //определяю blending mode
                            } else {}
                            
                            function ResizeLayers() {  //делаю resize слоев в композицию в "имя слоя Comp"
                                var NumLayers= app.project.item(AVItemN).numLayers, nI=1, WidthLayer, HeightLayer, WidthItem, HeightItem, ScaleWidth, ScaleHeight;
                                while (nI>0 && nI<NumLayers+1) {
                                    WidthLayer= app.project.item(AVItemN).layer(nI).width;
                                    HeightLayer= app.project.item(AVItemN).layer(nI).height;
                                    WidthItem= app.project.item(AVItemN).width;
                                    HeightItem= app.project.item(AVItemN).height;
                                    app.project.item(AVItemN).layer(nI).property('Anchor Point').setValue([0,0]);
                                    app.project.item(AVItemN).layer(nI).property('Position').setValue([0,0]);

                                    if (app.project.item(AVItemN).layer(nI).name==app.project.item(nProceedCompIndex).layer(n).name) {
                                    ScaleWidth= WidthItem/WidthLayer*100;
                                    ScaleHeight= HeightItem/HeightLayer*100;
                                    app.project.item(AVItemN).layer(nI).property('Scale').setValue([ScaleWidth,ScaleHeight]);
                                    } else {
                                        ScaleWidth= WidthItem/WidthLayer*100*PixelAspect;
                                        ScaleHeight= HeightItem/HeightLayer*100;
                                        app.project.item(AVItemN).layer(nI).property('Scale').setValue([ScaleWidth,ScaleHeight]); 
                                    }
                                    nI++;
                                    }
                            }
                            ResizeLayers()

                            app.project.renderQueue.items.add(app.project.item(AVItemN));        //отправляю на рендер "имя слоя Comp" 
                            
                            break;
        
                        }else {
                            AVItemN++;
                        }
                    }
        }
    function MoveToFolder() {
    var RenderFolder=app.project.items.addFolder(ame.strFolder);     //создаю папку
    for (var n=1; n<app.project.numItems+1; n++) {                       //перемещаю в папку композицию с именем "имя слоя Comp" при n++
    app.project.item(n).name.indexOf(ame.strQueueComp)!== -1 ? app.project.item(n).parentFolder = RenderFolder : {}  
        }
    for (var nI=app.project.numItems; nI>0; nI--) {                       //перемещаю в папку композицию с именем "имя слоя Comp" при n--
    app.project.item(nI).name.indexOf(ame.strQueueComp)!== -1 ? app.project.item(nI).parentFolder = RenderFolder : {}    
        }
    }

MoveToFolder();
/////////////
//FIXME: BUG:
                            if (Checkbox2Value==true && Edittext3Selection!== '') {    //сохраняю композиции если включен Save all Queue Comps
                                app.project.save(File(Edittext3Selection+'/'+ame.strQueueComp+' '+decodeURI(app.project.file.name)));
                                var MainProject= Edittext3Selection+'/'+decodeURI(app.project.file.name);
                               // function SaveQueueComp() {
                                    var n=1; 
                                    for (n>0; n<app.project.numItems+1; n++) {
                                        if (app.project.item(n).name.indexOf(ame.strQueueComp)!== -1) {
                                                ProgressBarValue+=0.5;   
                                                this.parent.parent.group22.progressbar1.value= ProgressBarValue;   //работаю с progressbar
                                                pal.update();
                                            app.beginUndoGroup('Save Queue Comps');
                                            var TheItems=[];
                                            TheItems[TheItems.length]= app.project.item(n);
                                            app.project.reduceProject(TheItems)
                                            var nI=1;
                                            for (nI>0; nI<app.project.numItems+1; nI++) {
                                                if (app.project.item(nI).name.indexOf(ame.strQueueComp)!== -1) {
                                            app.project.save(File(Edittext3Selection+'/'+app.project.item(nI).name)) }}
                                                ProgressBarValue+=0.5;    
                                                this.parent.parent.group22.progressbar1.value= ProgressBarValue;  //работаю с progressbar
                                                pal.update();
                                            app.open(File(MainProject))
                                            app.endUndoGroup();
                                            app.executeCommand(app.findMenuCommandId("Undo Save Queue Comps"));
                                        } else { }
                                    }
                               // }
                                //SaveQueueComp();
                            } 
app.endUndoGroup(); //конец отмены действия Ctrl + Z  
                           
if (this.parent.parent.group21.checkbox2.value== true ){ 
    //alert(app.project.renderQueue.canQueueInAME);
    if (app.project.renderQueue.canQueueInAME == true){
        app.project.renderQueue.queueInAME(false);                     // Отправляю в AME
        alert('Layers were sent to AME', ame.scriptName);
    } else {
        for (var nQueueItem=1; nQueueItem<app.project.numItems+1; nQueueItem++) {
            if (app.project.item(nQueueItem).name.indexOf(ame.strQueueComp)!== -1)  {
                app.project.item(nQueueItem).selected=true;
            } else {app.project.item(nQueueItem).selected=false;}
        }
        app.executeCommand(app.findMenuCommandId("Project"));
        app.executeCommand(app.findMenuCommandId("Project"));
        app.executeCommand(app.findMenuCommandId("Add to Adobe Media Encoder Queue..."));
        alert('Layers were sent to AME', ame.scriptName);
    }
    }
    else {}


    if(this.parent.parent.group22.progressbar1.value==this.parent.parent.group22.progressbar1.maxvalue) { //обнуляю progressbar
        this.parent.parent.group22.progressbar1.value=0} else {}
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
     alert("Could not open the user interface.", ame.scriptName);
    }


}
    // Execute script
Script(this);
}