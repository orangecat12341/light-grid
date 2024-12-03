from flask import Flask, request, jsonify, render_template, url_for, redirect, session
from flask_socketio import SocketIO, emit, join_room, leave_room
import pickle, os, string, random, neopixel, board, time, threading
from rpi_ws281x import *

running = [True]
threads = []

pixels = neopixel.NeoPixel(board.D18, 256)

def grid(grid):
    pixel = []
    for i in range(144):
        pixel.insert(i, hex_to_rgb(grid[i]))
    pixels[0:144] = pixel[0:144]

def hex_to_rgb(hex_value):
    hex_value = hex_value.lstrip('#')
    return tuple(int(hex_value[i:i+2], 16) for i in (0, 2, 4))


def setAnim():
    file = pickle.load(open("animation.txt", "rb"))
    while running[0]:
        for i in range(len(file) - 1):
            if running[0]:
                grid(file[i+1])
                time.sleep(float(file[0]))

def stopAnim():
    running[0] = False
    for t in threads:
        t.join()

def clearGrid():
    pixels.fill((00, 00, 00))

app = Flask(__name__, static_url_path="")
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template("v7.html")

@app.route('/v1/')
def v1():
    return render_template("v1.html")

@app.route('/v2/')
def v2():
    return render_template("v2.html")

@app.route('/v3/')
def v3():
    return render_template("v3.html")

@app.route('/v4/')
def v4():
    return render_template("v4.html")

@app.route('/v5/')
def v5():
    return render_template("v5.html")

@app.route('/v6/')
def v6():
    return render_template("v6.html")

@app.route('/v7/')
def v7():
    return render_template("v7.html")

@app.route('/animator/')
def animator():
    return render_template("animator.html")

@socketio.on('get_color_grid')
def send_color_grid():
    color_grid = pickle.load(open("color.txt", "rb"))
    socketio.emit('color_grid', color_grid)

@socketio.on('update_color_grid')
def update_color_grid(data):
    pickle.dump(data, open("color.txt", "wb"))
    socketio.emit('color_grid', data)
    grid(data)

@socketio.on('setAnim')
def animation():
    stopAnim()
    running[0] = True
    t = threading.Thread(target=setAnim)
    threads.append(t)
    t.start()
    
    
@socketio.on('stopAnim')
def stop():
    stopAnim()
    clearGrid()

@socketio.on('get_animation')
def get_animation():
    animation = pickle.load(open("animation.txt", "rb"))
    socketio.emit('load_animation', animation)

@socketio.on('add_animation')
def add_animation(animationData):
    print(animationData)
    pickle.dump(animationData, open("animation.txt", "wb"))
    socketio.emit('load_animation', animationData)


if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=570)
