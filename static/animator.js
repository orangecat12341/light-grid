var socket = io()
let hasFrameBeenSelected = false
socket.emit('get_animation')
function setColorToPixel(pixelId) {
    colorToSet = document.getElementById('paintbrush').value;
    pixel = document.getElementById(pixelId);
    pixel.style.backgroundColor = colorToSet;
    pixel.value = colorToSet;
    updateFrame();
    sendUpdate();
};
function setPaintbrush(palletColor) {
    document.getElementById('paintbrush').value = palletColor.value;
};
function setPixel(pixelId) {
    if (document.getElementById('colorDropper').classList.contains('pickColor')) {
        document.getElementById('colorDropper').classList.remove('pickColor')
        document.getElementById('colorDropper').style.backgroundColor = 'blue'
        document.getElementById('paintbrush').value = document.getElementById(pixelId).value
    } else {
        setColorToPixel(pixelId)
    }
}
function dropper() {
    document.getElementById('colorDropper').className = 'pickColor'
    document.getElementById('colorDropper').style.backgroundColor = 'red'
}
function resetColorGrid(value) {
    pixelElem = document.getElementsByClassName('pixel');
    for(var i = 0; i < pixelElem.length; i++) {
        pixelElem[i].value = value;
        // pixelElem[i].style.backgroundColor = value;
    };
    frames = document.getElementsByClassName('selected')
    if (frames[0] != undefined) {
        updateFrame();
        sendAllFrames();
    }
    document.getElementById('paintbrush').value = value;
};
function setColorGridTo() {
    colorToSet = document.getElementById('paintbrush').value;
    resetColorGrid(colorToSet);
};
function drawGrid(currentFrames) {
    var eeby = document.getElementsByClassName('selected')
    if (eeby[0] != undefined) {
        var eeby2 = []
        eeby2[0] = eeby[0].id
    } else {
        var eeby2 = []
        eeby2[0] = undefined
    }
    document.getElementById('frameBox').innerHTML = ""
    currentFrames.splice(0,1)
    frameIndex = 1
    currentFrames.forEach(frame => {
        var frameElement = document.createElement("button");
        frameElement.className = 'frame';
        frameElement.id = 'frame' + frameIndex;
        frameElement.setAttribute('onclick', "selectFrame('frame" + frameIndex + "')");
        frameElement.value = JSON.stringify(frame);
        var deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';
        deleteButton.id = 'delete' + frameIndex;
        deleteButton.setAttribute('onclick', "deleteFrame('frame" + frameIndex + "')");
        deleteButton.innerHTML = 'Delete';
        var canvas = document.createElement("canvas");
        // canvas.id = 'frame' + frameIndex;
        canvas.value = frame;
        canvas.className = 'frameCanvas';
        canvasContainer = document.createElement('div');
        canvasContainer.className = 'canvasContainer';
        frameBoxElement = document.getElementById('frameBox');
        frameBoxElement.appendChild(frameElement);
        canvasContainer.appendChild(canvas);
        frameElement.appendChild(canvasContainer);
        frameElement.appendChild(deleteButton);
        var ctx = canvas.getContext('2d');
        var gridSize = 4;
        colorIndex = 0;
        for (let line = 0; line < 48; line+=gridSize) {
            var num = 0;
            for (let i = 0; num < 48; i+=gridSize) {
                var x = num;
                var y =  gridSize + line;
                num += gridSize;
                ctx.fillStyle = frame[colorIndex];
                colorIndex++;
                ctx.fillRect(x, y, gridSize, gridSize);
            }
        }
        frameIndex++
    })
    if (eeby2[0] != undefined) {
        selectFrame(eeby2[0])
    }
};
var selectedFrame = []
function selectFrame(frame) {
    selected = document.getElementsByClassName('selected')
    if (selected.length > 0) {
        selectedFrames = document.getElementsByClassName('selected')
        selectedFrames[0].classList.remove('selected')
        selectedElement = document.getElementById(frame)
        selectedElement.classList.add('selected')
    } else {
        selectedElement = document.getElementById(frame)
        selectedElement.classList.add('selected')
    }
    fillButtonGrid(JSON.parse(selectedElement.value))
};
function deleteAll() {
    deleteFrames = confirm('Are you sure?');
    if (deleteFrames){
        frames = document.getElementsByClassName('frame');
        while (frames.length > 0) {
            frames[0].remove();
        }
        resetColorGrid('#000000');
        addNewFrame(false);
        selectFrame('frame1');
    }
};
function fillButtonGrid(grid) {
    var grid_location = 0;
    grid.forEach(grid_value => {
        grid_location ++;
        pixel = document.getElementById("pixel" + grid_location);
        pixel.value = grid_value;
        pixel.style.backgroundColor = grid_value;
    });
};
socket.on('load_animation', (data) => {
	document.getElementById('speedInput').value = data[0];
	drawGrid(data);
    if (hasFrameBeenSelected == false) {
        selectFrame('frame1');
        hasFrameBeenSelected = true
    }
});
let timeoutId;
function sendUpdate() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        sendAllFrames();
  }, 800)
};
function updateFrame() {
    var pixel_arr = [];
    for (let i=1; i<145; i++) {
        pixel_arr.push(document.getElementById("pixel" + i).value);
    }
    var selectedFrame = document.getElementsByClassName('selected')
    selectedFrame[0].value = JSON.stringify(pixel_arr);
    allFramesButtons = document.getElementsByClassName('frame')
    frames = [];
    frames.push(2)
    var num = 0
    for (let i = 0; i < allFramesButtons.length; i++) {
        if (allFramesButtons[i] == selectedFrame[0]) {
            frames.push(pixel_arr)
        }
        else {
            frames.push(JSON.parse(document.getElementById('frame' + (num+1)).value))
        }
        num++
    }
    drawGrid(frames)
}
function sendAllFrames() {
    frames = document.getElementsByClassName('frame')
    allFrames = []
    speed = document.getElementById('speedInput').value
    if (speed != '') {
        allFrames.push(speed)
    } else {
        allframes.push(1)
    }
    for (i=0; i < frames.length; i++) {
        allFrames.push(JSON.parse(frames[i].value))
    }
    socket.emit('add_animation', allFrames)
}
function addNewFrame(dontDrawFrame) {
    var allFrames = []
    if (document.getElementById('frameBox').contains(document.getElementById('frame2'))) {
        frames = document.getElementsByClassName('frame')
    }
    allFrames.push(1)
    for (i=0; i < frames.length; i++) {
        allFrames.push(JSON.parse(frames[i].value))
    }
    newFrameData = []
    for (i=0; i < 144; i++) {
        newFrameData.push('#000000')
    }
    allFrames.push(newFrameData);
    if (dontDrawFrame == false) {
        drawGrid(allFrames);
    }
    sendAllFrames();
}
function deleteFrame(frameId) {
    var allFrames = []
    frames = document.getElementsByClassName('frame')
    allFrames.push(1)
    for (i=0; i < frames.length; i++) {
        allFrames.push(JSON.parse(frames[i].value))
    }
    // frames = document.getElementsByClassName('frame')
    for (i = 0; i < frames.length; i++) {
        if (frames[i].id == frameId) {
            allFrames.splice(i+1, 1)
            if (i == (frames.length)) {
                if (i == 0) {
                    addNewFrame(true);
                    setTimeout(() => {
                        drawGrid(allFrames);
                    }, 20)
                    selectFrame('frame' + (i - 1))
                } else {
                    if (i = (frames.length - 1)) {
                        drawGrid(allFrames);
                        selectFrame('frame' + (i + 1))
                    }
                }
            } else {
                drawGrid(allFrames)
            }
        }
    }
    sendAllFrames();
}

function showFrames() {
    if (document.getElementById('frameToggle').innerHTML == 'Hide') {
	document.getElementById('animationsBar').style.visibility = 'hidden'
	document.getElementById('frameToggle').innerHTML = 'Show'
    } else {
	document.getElementById('animationsBar').style.visibility = 'visible'
	document.getElementById('frameToggle').innerHTML = 'Hide'
    }
}
document.getElementById('speedInput').addEventListener('input', (event) => {
    sendUpdate();
});
