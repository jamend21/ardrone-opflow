const spawn = require('child_process').spawn;
const py = spawn('python', ['newtest.py']);
var ev = '';
//const readline = require('readline')
//readline.emitKeypressEvents(process.stdin);
//process.stdin.setRawMode(true);

var arDrone = require('ar-drone');
console.log("ar drone made");
var client = arDrone.createClient();
console.log("client made");

client.takeoff();
console.log("taking off");
//anytime we info back this process should be done.
py.stdout.on('data', function(data){
  ev = data.toString();
  rads = ev*(Math.PI/180)
  console.log(ev);
  if(ev>=0 & ev<=90){
    move(Math.cos(rads),0,0,Math.sin(rads));
    console.log(ev);
  } else if (ev>90 & ev<=180){
    move(0,abs(Math.cos(rads)),0,Math.sin(rads));
    console.log(ev);
  } else if (ev>180 & ev<=270){
    move(0,abs(Math.cos(rads)),abs(Math.sin(rads)),0);
    console.log(ev);
  } else if (ev>270 & ev<=360){
    move(Math.cos(rads),0,abs(Math.sin(rads)),0);
    console.log(ev);

});

py.stdout.on('end', function(){
  client.stop();
  client.land();
  console.log("landing");
})

function move(f,b,l,r){
  client.left(l);
  client.right(r);
  client.front(f);
  client.back(b);
  client.stop();
}

setTimeout(function(){}, 3000);
console.log("starting program")
/*process.stdin.on('keypress', (str,key)=>{
    if(key && key.name =='t') {
      console.log("taking off!");
    } else if(key && key.ctrl && key.name == 'c') {
      process.exit();
    } else {
      console.log(`You pressed the "$[str]" key`);
    }
  })
*/
