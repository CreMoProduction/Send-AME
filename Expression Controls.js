

// Рандом для LL параметр Brightness

seedRandom(thisComp.layer("Effector Control").effect("Brightness")("Slider"), timeless = true);
random(-90,90);

function Random_for_Scale_LL() {
// Рандом для Scale LL
var Velocity;
if (thisComp.layer("Effector Control").effect("Velocity (evolution)")("Slider")==20) {Velocity = false} 
else {Velocity= true};
seedRandom(thisComp.layer("Effector Control").effect("Scale")("Slider"), timeless = Velocity);
random(800,6000);

//Рандом для Scale LL, рандом On/Off
if (thisComp.layer("Effector Control").effect("Random")("Checkbox")==1) 
{seedRandom(thisComp.layer("Effector Control").effect("Randomizer")("Slider"), timeless= true); 
random(500, 6000)}; 
else 
{var Velocity;
if (thisComp.layer("Effector Control").effect("Velocity (evolution)")("Slider")==20) {Velocity = false} 
else {Velocity= true};
seedRandom(thisComp.layer("Effector Control").effect("Scale")("Slider"), timeless = Velocity);
random(500,6000)};
}

//Brighntess LL, рандом On/Off
if (thisComp.layer("Effector Control").effect("Random")("Checkbox")==1) 
{seedRandom(thisComp.layer("Effector Control").effect("Randomizer")("Slider"), timeless= true); 
random(-90, 90)}; 
else 
thisComp.layer("Effector Control").effect("Brightness")("Slider")-90;

//Evolution LL, рандом On/Off, timeless = random
if (thisComp.layer("Effector Control").effect("Random")("Checkbox")==1) 
{seedRandom(thisComp.layer("Effector Control").effect("Randomizer")("Slider"), timeless= 
(random()==1) ? true : true); 
time*random(100, 1200)}; 
else 
time*(thisComp.layer("Effector Control").effect("Velocity (evolution)")("Slider")*15)

