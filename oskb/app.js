'use strict';

const aco = '&#x05AB;' // Accent Ole
const sva = '&#x05B0;' // Sheva
const hsg = '&#x05B1;' // Hataf Segol
const hpt = '&#x05B2;' // Hataf Patah
const hqz = '&#x05B3;' // Hataf Qamats
const hir = '&#x05B4;' // Hiriq
const zre = '&#x05B5;' // Tsere
const sgl = '&#x05B6;' // Segol
const pth = '&#x05B7;' // Patah
const qmz = '&#x05B8;' // Qamats
const hlm = '&#x05B9;' // Holam
const hlv = '&#x05BA;' // Holam Haser for Vav (rests on Vav's "palm")
const qbz = '&#x05BB;' // Qubuts
const dmq = '&#x05BC;' // Dagesh or Mapiq
//const CGJ = '&#847;'   // Combining Grapheme Joiner (misnomer)
const mtg = '&#x05BD;' // Meteg
const mqf = '&#x05BE;' // Maqaf
const shd = 0x5C1; // Shin dot
const sid = 0x5C2; // Sin dot
var uin = document.getElementById("userinput");

function ink() {
  uin.value += this.innerHTML;
}

function bksp() {
  var l = uin.value.length;
  var bk= 1; // back this number of glyphs
  if (l>1) {
    var lc = uin.value.substr(l-1,1).charCodeAt();
    bk = ((lc == shd) || (lc == sid)) ? 2 : 1;
  }
  uin.value = uin.value.substr(0,l-bk);
}

function doKeypad() {
  var keypad = document.getElementById("keypad");

  const keytops = [ [ 'ץ','ף','ן','ם','ך',aco,'ח','ז','ו','ה','ד','ג','ב','א'],
                    [ sva,hsg,sgl,zre,hpt,hlm,mtg,'ס','נ','מ','ל','כ','י','ט',dmq],
                    [ pth,qmz,hqz,hir,qbz,mqf,'ת','שׂ','שׁ','ר','ק','צ','פ','ע'],
  ];

  for (var r = 0; r < keytops.length; r++) {
    var row = document.createElement("div");
    for (var k = 0; k < keytops[r].length; k++) {
      var b = document.createElement("button");
      b.id = 'r'+(r+1)+'k'+(keytops[r].length-k) ;
      b.innerHTML = keytops[r][k];
      b.addEventListener("click", ink);
      row.appendChild(b);
    }
    keypad.appendChild(row);
  }
  var bkspkey = document.getElementById('bksp');
  bkspkey.addEventListener("click",bksp);
}

doKeypad();
