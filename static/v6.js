var socket = io()

currentPixels();
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
function setPixel(pixelId) {
    colorToSet = document.getElementById('paintbrush').value;
    pixel = document.getElementById(pixelId)
    pixel.style.backgroundColor = colorToSet;
    pixel.value = colorToSet;
    sendUpdate();
};
function send_updated_pixels() {
    currentPixels();
    socket.emit('update_color_grid', pixels.pixels);
};
function currentPixels() {
    var pixel_arr = [];
    for (let i=1; i<145; i++) {
        pixel_arr.push(document.getElementById("pixel" + i).value);
    }
    pixels = {"pixels": pixel_arr};
}
function resetColorGrid(value) {
    console.log(value);
    pixelElem = document.getElementsByClassName('pixel');
    for(var i = 0; i < pixelElem.length; i++) {
        pixelElem[i].value = value;
        console.log(pixelElem[i].value);
    };
    send_updated_pixels();
    document.getElementById('paintbrush').value = value;
};
function setColorGridTo() {
    colorToSet = document.getElementById('paintbrush').value;
    resetColorGrid(colorToSet);
};
let timeoutId;
function sendUpdate() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
	send_updated_pixels();
    }, 500)
};
function setPaintbrush(palletColor) {
    document.getElementById('paintbrush').value = palletColor.value;
}
socket.on('connect', () => {
    console.log("connected")
    socket.emit('get_color_grid')
});


socket.on('color_grid', (grid) => {
    var grid_location = 0;
    grid.forEach(grid_value => {
        grid_location ++;
        pixel = document.getElementById("pixel" + grid_location);
        pixel.value = grid_value;
        pixel.style.backgroundColor = grid_value;
    });
});
