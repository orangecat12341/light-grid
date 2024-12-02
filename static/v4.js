var socket = io()

function setPixel(pixelId) {
    colorToSet = document.getElementById('paintbrush').value;
    pixel = document.getElementById(pixelId)
    pixel.style.backgroundColor = colorToSet;
    pixel.value = colorToSet;
    send_updated_pixels();
};
function send_updated_pixels() {
    var pixel_arr = [];
    for (let i=1; i<101; i++) {
        pixel_arr.push(document.getElementById("pixel" + i).value);
    }
    pixels = {"pixels": pixel_arr}
    socket.emit('update_color_grid', pixels.pixels);
};
function resetColorGrid(value) {
    pixels = document.getElementsByClassName('pixel')
    for(var i = 0; i < pixels.length; i++) {
        pixels[i].value = value;
    };
    send_updated_pixels();
    document.getElementById('paintbrush').value = value;

};
function setColorGridTo() {
    colorToSet = document.getElementById('paintbrush').value;
    resetColorGrid(colorToSet);
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
