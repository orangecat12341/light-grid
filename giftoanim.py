from PIL import Image, ImageSequence, ImageEnhance
import os, pickle, re

def rgb_to_hex(rgb):
    return "#{:02x}{:02x}{:02x}".format(rgb[0], rgb[1], rgb[2])

def downscale_gif(input_path, output_path, new_size):
    try:
        im = Image.open(input_path)
    except FileNotFoundError:
        print(f"Error: Input file not found: {input_path}")
        return
    except Exception as e:
         print(f"An error occurred opening the image: {e}")
         return

    frames = []
    for frame in ImageSequence.Iterator(im):
        frame = frame.convert('RGBA')
        frame = frame.resize(new_size, Image.LANCZOS)
        frames.append(frame)

    try:
        frames[0].save(output_path, save_all=True, append_images=frames[1:], loop=0, duration=im.info['duration'])
    except KeyError:
        print("Warning: GIF duration not found, setting default duration")
        frames[0].save(output_path, save_all=True, append_images=frames[1:], loop=0, duration=100)
    except Exception as e:
        print(f"An error occurred saving the image: {e}")

def downscale_image(image_path, new_width, new_height, output_path):
    img = Image.open(image_path)
    img = img.resize((new_width, new_height), Image.LANCZOS)
    img.save(output_path)

def contrast(image_path, output_path, contrast_factor):
    try:
        image = Image.open(image_path)
        enhancer = ImageEnhance.Contrast(image)
        modified_image = enhancer.enhance(contrast_factor)
        modified_image.save(output_path)
    except FileNotFoundError:
        print('File not found')
    
def gif_to_frames(gif_filepath, output_prefix="frame", image_format="PNG"):
    try:
        with Image.open(gif_filepath) as img:
            for i in range(img.n_frames):
                img.seek(i)
                frame = img.convert("RGB")  # Ensure consistent color mode
                frame.save(f"{output_prefix}{i+1}.{image_format.lower()}")
        print(f"Successfully extracted {img.n_frames} frames.")
    except FileNotFoundError:
        print(f"Error: GIF file not found at '{gif_filepath}'")
    except Exception as e:
        print(f"An error occurred: {e}")

def get_pixel_values(image_path):
    try:
        img = Image.open(image_path)
        pixel_values = list(img.getdata())
        return pixel_values
    except FileNotFoundError:
        print(f"Error: Image file not found at {image_path}")
        return None
    except Exception as e:
         print(f"An error occurred: {e}")
         return None
    
def get_gif_frame_ms(gif_path):
    img = Image.open(gif_path)
    durations = []
    for i in range(img.n_frames):
        img.seek(i)
        durations.append(img.info['duration'])
    if durations:
        avg_duration_ms = sum(durations) / len(durations)
        return avg_duration_ms
    else:
        return None

def convertGifToAnim(file_name, contrast_mult=1):
    input_gif_path = file_name
    output_gif_path = 'output_downscaled.gif'
    new_width = 12
    new_height = 12
    new_size = (new_width, new_height)

    downscale_gif(input_gif_path, output_gif_path, new_size)
    print(f"GIF downscaled and saved to {output_gif_path}")

    gif_to_frames("output_downscaled.gif", "gif_frames/", "PNG")
    
    directory = "gif_frames"

    speed = get_gif_frame_ms(input_gif_path) / 1000
    all = [speed]
    for filename in sorted(os.listdir(directory), key=lambda x: int(re.search(r'(\d+)', x).group(1))):
        f = os.path.join(directory, filename)
        if os.path.isfile(f):
            contrast(f, f, contrast_mult)
            dataToAdd = get_pixel_values(f)
            values = []
            for i in range(144):
                values.insert(i, rgb_to_hex(dataToAdd[i]))
            all.append(values)
            os.remove(f)
    os.remove('input.gif')
    os.remove('output_downscaled.gif')
    pickle.dump(all, open("animation.txt", "wb"))

def get_frames_from_img(input_path, contrast_mult=1):
    if os.path.isfile(input_path):
        contrast(input_path, input_path, contrast_mult)
        dataToAdd = get_pixel_values(input_path)
        values = []
        for i in range(144):
            values.insert(i, rgb_to_hex(dataToAdd[i]))
        os.remove(input_path)
        pickle.dump(values, open("color.txt", "wb"))
