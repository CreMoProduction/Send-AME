app.beginUndoGroup('Send to AME');    //для отмены действия Ctrl + Z
var n=40, ChooseLayer;
while (n<41 && n>0) {
    ChooseLayer = app.project.item(1).layer(n);
    ChooseLayer.enabled = true;                                       //включаю видимость слоя
    var GetName= app.project.item(1).layer(n).name;                   //получаю имя слоя
    var GetNameComp= GetName += ' Comp'                               //имя слоя + Comp
    app.project.items.addComp(GetNameComp, 1920, 1080, 1, 6.03, 25); //создаю композицию с именем "имя слоя Comp"
    
    var ItemN=1;
    while (ItemN>0 && ItemN<100) {   
        if (app.project.item(ItemN).name==GetNameComp)                //проверка если item = "Имя слоя Comp"
        {
        app.project.item(1).layer(n).copyToComp(app.project.item(ItemN));
        app.project.renderQueue.items.add(app.project.item(ItemN));

        break;
        
        }else {
            ItemN++;
        }
    }
    n-=1;
}
if (app.project.renderQueue.canQueueInAME == true)
    {
        
        app.project.renderQueue.queueInAME(false);                     // Send queued items to AME, but do not start rendering.
        alert('Media were sent to AME');
    }
    else {
        alert("There are no queued item in the Render Queue.");
}

app.endUndoGroup();