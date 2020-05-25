//app.executeCommand(app.findMenuCommandId("Project"));
//app.executeCommand(app.findMenuCommandId("Project"));

//app.executeCommand(app.findMenuCommandId("Add to Adobe Media Encoder Queue..."));
/*
var N=app.project.item(2);
if ((N instanceof CompItem)) alert(N, 1)
else
 alert (N,2);
 */
//app.project.item(2).selected=true;
//app.project.item(500).name;
alert(app.project.item(500).name);







                            /*
                            if (Checkbox2Value==true ) {
                                app.project.save(File(Edittext3Selection+'/'+decodeURI(app.project.file.name)+ame.strQueueComp));
                                var MainProject= app.project.file;
                                function SaveQueueComp() {
                                        if (app.project.item(AVItemN).name.indexOf(ame.strQueueComp)!== -1) {
                                            app.beginUndoGroup('Save Queue Comps');
                                            var TheItems=[];
                                            TheItems[TheItems.length]= app.project.item(AVItemN);
                                            app.project.reduceProject(TheItems)
                                            app.project.save(File(Edittext3Selection+'/'+GetNameComp))
                                            app.open(MainProject)
                                            app.endUndoGroup();
                                            app.executeCommand(app.findMenuCommandId("Undo Save Queue Comps"));
                                        } 
                                    }
                                SaveQueueComp();
                            
                            }*/

                            /*
        var defaultFolder = pal.grp.groupN.group14.edittext3.text;
        if ((defaultFolder === "") && (app.project.file !== null)) {
            // Default to the current folder of the project file, so it's easier to create a subfolder for proxies next to the project file.
            defaultFolder = app.project.file.path;
        }
        if ($.os.indexOf("Windows") !== -1)				// On Windows, escape backslashes first
                    defaultFolder = defaultFolder.replace("\\", "\\\\");
                
        var Savefolder = Folder.selectDialog("Output To Folder");
        if (Savefolder !== null) 
            pal.grp.groupN.group14.edittext3.text = decodeURI(Savefolder); 
        }*/
                        