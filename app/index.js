import document from "document";
import { display } from "display";
import clock from "clock";
import * as fs from "fs";
import { me } from "appbit";


let number = document.getElementById("numberLabel");
let myClock = document.getElementById("myClock");
let btnBR = document.getElementById("btn-br");
let btnTR = document.getElementById("btn-tr");
let btnTL = document.getElementById("btn-tl");
let count;
let save = {};
clock.granularity = "minutes";


try {
  
  let saveread = fs.readFileSync("save.txt","cbor");
  
} catch (err) {
 
   save.number = 0;
   fs.writeFileSync("save.txt", save, "cbor");

}

let saveread = fs.readFileSync("save.txt", "cbor");
count = saveread.number;

clock.ontick = function(evt) {
myClock.text = ("0" + evt.date.getHours()).slice(-2) + ":" +
                      ("0" + evt.date.getMinutes()).slice(-2)
};


number.text = count;


btnTR.onactivate = function(evt) {
  if(count >= 999){count = 0;}else{
      count++;
  }
  number.text = count;
 
}

btnTL.onactivate = function(evt) {
 count = 0;
 number.text = count;
 
}


btnBR.onactivate = function(evt) {
  if(count > 0){
    count--;
  } 
  number.text = count;
  
}

me.onunload = () => {
  save.number = count;       
  fs.writeFileSync("save.txt", save, "cbor");
}