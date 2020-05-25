  
var path = "D:/Работы АЕ/Vh. 20 Batch Render Manager/Pictures/";
var f = File(path+"BRM45px.png");
f.encoding = 'BINARY'
f.open('e');

var binary;
binary = f.read().toSource();

var myFile = new File("D:/Работы АЕ/Vh. 20 Batch Render Manager/Pictures/BRM45px.txt");
        myFile.open("w");
        myFile.encoding = "UTF-8";
        myFile.write(binary);
        myFile.close();

$.writeln(binary);

f.close();