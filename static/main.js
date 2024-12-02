var socket = io()

const pixel1 = document.getElementById("pixel1");
const pixel2 = document.getElementById("pixel2");
const pixel3 = document.getElementById("pixel3");
const pixel4 = document.getElementById("pixel4");
const pixel5 = document.getElementById("pixel5");
const pixel6 = document.getElementById("pixel6");
const pixel7 = document.getElementById("pixel7");
const pixel8 = document.getElementById("pixel8");
const pixel9 = document.getElementById("pixel9");
const pixel10 = document.getElementById("pixel10");
const pixel11 = document.getElementById("pixel11");
const pixel12 = document.getElementById("pixel12");
const pixel13 = document.getElementById("pixel13");
const pixel14 = document.getElementById("pixel14");
const pixel15 = document.getElementById("pixel15");
const pixel16 = document.getElementById("pixel16");
const pixel17 = document.getElementById("pixel17");
const pixel18 = document.getElementById("pixel18");
const pixel19 = document.getElementById("pixel19");
const pixel20 = document.getElementById("pixel20");
const pixel21 = document.getElementById("pixel21");
const pixel22 = document.getElementById("pixel22");
const pixel23 = document.getElementById("pixel23");
const pixel24 = document.getElementById("pixel24");
const pixel25 = document.getElementById("pixel25");
const pixel26 = document.getElementById("pixel26");
const pixel27 = document.getElementById("pixel27");
const pixel28 = document.getElementById("pixel28");
const pixel29 = document.getElementById("pixel29");
const pixel30 = document.getElementById("pixel30");
const pixel31 = document.getElementById("pixel31");
const pixel32 = document.getElementById("pixel32");
const pixel33 = document.getElementById("pixel33");
const pixel34 = document.getElementById("pixel34");
const pixel35 = document.getElementById("pixel35");
const pixel36 = document.getElementById("pixel36");
const pixel37 = document.getElementById("pixel37");
const pixel38 = document.getElementById("pixel38");
const pixel39 = document.getElementById("pixel39");
const pixel40 = document.getElementById("pixel40");
const pixel41 = document.getElementById("pixel41");
const pixel42 = document.getElementById("pixel42");
const pixel43 = document.getElementById("pixel43");
const pixel44 = document.getElementById("pixel44");
const pixel45 = document.getElementById("pixel45");
const pixel46 = document.getElementById("pixel46");
const pixel47 = document.getElementById("pixel47");
const pixel48 = document.getElementById("pixel48");
const pixel49 = document.getElementById("pixel49");
const pixel50 = document.getElementById("pixel50");
const pixel51 = document.getElementById("pixel51");
const pixel52 = document.getElementById("pixel52");
const pixel53 = document.getElementById("pixel53");
const pixel54 = document.getElementById("pixel54");
const pixel55 = document.getElementById("pixel55");
const pixel56 = document.getElementById("pixel56");
const pixel57 = document.getElementById("pixel57");
const pixel58 = document.getElementById("pixel58");
const pixel59 = document.getElementById("pixel59");
const pixel60 = document.getElementById("pixel60");
const pixel61 = document.getElementById("pixel61");
const pixel62 = document.getElementById("pixel62");
const pixel63 = document.getElementById("pixel63");
const pixel64 = document.getElementById("pixel64");



socket.on('connect', () => {
    console.log('connected')
    socket.emit('get_color_grid')
});
socket.on('color_grid', (grid) => {
  console.log(grid)
  pixel1.value = grid[0];
  pixel2.value = grid[1];
  pixel3.value = grid[2];
  pixel4.value = grid[3];
  pixel5.value = grid[4];
  pixel6.value = grid[5];
  pixel7.value = grid[6];
  pixel8.value = grid[7];
  pixel9.value = grid[8];
  pixel10.value = grid[9];
  pixel11.value = grid[10];
  pixel12.value = grid[11];
  pixel13.value = grid[12];
  pixel14.value = grid[13];
  pixel15.value = grid[14];
  pixel16.value = grid[15];
  pixel17.value = grid[16];
  pixel18.value = grid[17];
  pixel19.value = grid[18];
  pixel20.value = grid[19];
  pixel21.value = grid[20];
  pixel22.value = grid[21];
  pixel23.value = grid[22];
  pixel24.value = grid[23];
  pixel25.value = grid[24];
  pixel26.value = grid[25];
  pixel27.value = grid[26];
  pixel28.value = grid[27];
  pixel29.value = grid[28];
  pixel30.value = grid[29];
  pixel31.value = grid[30];
  pixel32.value = grid[31];
  pixel33.value = grid[32];
  pixel34.value = grid[33];
  pixel35.value = grid[34];
  pixel36.value = grid[35];
  pixel37.value = grid[36];
  pixel38.value = grid[37];
  pixel39.value = grid[38];
  pixel40.value = grid[39];
  pixel41.value = grid[40];
  pixel42.value = grid[41];
  pixel43.value = grid[42];
  pixel44.value = grid[43];
  pixel45.value = grid[44];
  pixel46.value = grid[45];
  pixel47.value = grid[46];
  pixel48.value = grid[47];
  pixel49.value = grid[48];
  pixel50.value = grid[49];
  pixel51.value = grid[50];
  pixel52.value = grid[51];
  pixel53.value = grid[52];
  pixel54.value = grid[53];
  pixel55.value = grid[54];
  pixel56.value = grid[55];
  pixel57.value = grid[56];
  pixel58.value = grid[57];
  pixel59.value = grid[58];
  pixel60.value = grid[59];
  pixel61.value = grid[60];
  pixel62.value = grid[61];
  pixel63.value = grid[62];
  pixel64.value = grid[63];
});

function send_updated_pixels() {
    pixels = {"pixels": [pixel1.value, pixel2.value, pixel3.value, pixel4.value, pixel5.value, pixel6.value, pixel7.value, pixel8.value, pixel9.value, pixel10.value, pixel11.value, pixel12.value, pixel13.value, pixel14.value, pixel15.value, pixel16.value, pixel17.value, pixel18.value, pixel19.value, pixel20.value, pixel21.value, pixel22.value, pixel23.value, pixel24.value, pixel25.value, pixel26.value, pixel27.value, pixel28.value, pixel29.value, pixel30.value, pixel31.value, pixel32.value, pixel33.value, pixel34.value, pixel35.value, pixel36.value, pixel37.value, pixel38.value, pixel39.value, pixel40.value, pixel41.value, pixel42.value, pixel43.value, pixel44.value, pixel45.value, pixel46.value, pixel47.value, pixel48.value, pixel49.value, pixel50.value, pixel51.value, pixel52.value, pixel53.value, pixel54.value, pixel55.value, pixel56.value, pixel57.value, pixel58.value, pixel59.value, pixel60.value, pixel61.value, pixel62.value, pixel63.value, pixel64.value]};
    socket.emit('update_color_grid', pixels.pixels);
};

function resetColorGrid(value) {
  pixels = document.getElementsByClassName('pixel')
  for(var i = 0; i < pixels.length; i++) {
        pixels[i].value = value;
    };
  send_updated_pixels();
  document.getElementById('fullGridSet').value = value;
};

function setColorGridTo() {
  colorToSet = document.getElementById('fullGridSet').value;
  resetColorGrid(colorToSet);
}