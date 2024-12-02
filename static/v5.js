var socket = io();

currentPixels();
sendUpdate();
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
    pixel = document.getElementById(pixelId);
    pixel.style.backgroundColor = colorToSet;
    pixel.value = colorToSet;
};
function send_updated_pixels() {
    currentPixels();
    socket.emit('update_color_grid', pixels.pixels);
};
function currentPixels() {
    var pixel_arr = [];
    for (let i=1; i<101; i++) {
        pixel_arr.push(document.getElementById("pixel" + i).value);
    }
    pixels = {"pixels": pixel_arr};
}
function resetColorGrid(value) {
    pixelElem = document.getElementsByClassName('pixel');
    for(var i = 0; i < pixelElem.length; i++) {
        pixelElem[i].value = value;
    };
    send_updated_pixels();
    document.getElementById('paintbrush').value = value;
};
function setColorGridTo() {
    colorToSet = document.getElementById('paintbrush').value;
    resetColorGrid(colorToSet);
};
function sendUpdate() {
    setInterval(() => {
        if (typeof pixels !== 'undefined') {
            var newestPixels = [];
            for (let i=1; i<101; i++) {
                newestPixels.push(document.getElementById("pixel" + i).value);
            }
            pixelsContent = pixels.pixels
            if (arraysEqual(newestPixels, pixelsContent) === false) {
                send_updated_pixels();
            }
        } else {
            pixels = {"pixels": newestPixels}
        };
    }, 500)
};
function setPaintbrush(palletColor) {
    document.getElementById('paintbrush').value = palletColor.value;
}
socket.on('connect', () => {
    console.log("connected");
    socket.emit('get_color_grid');
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
