from PIL import Image
import sys

def make_transparent(input_path, output_path, fuzz_percent=10):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    # Get corner pixel color (assume it's the background color)
    bg_color = data[0] # Top-left corner
    
    new_data = []
    
    threshold = (255 * fuzz_percent) // 100
    
    for item in data:
        r_diff = abs(item[0] - bg_color[0])
        g_diff = abs(item[1] - bg_color[1])
        b_diff = abs(item[2] - bg_color[2])
        if r_diff <= threshold and g_diff <= threshold and b_diff <= threshold:
            new_data.append((255, 255, 255, 0)) # Transparent
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved {output_path}")

try:
    make_transparent('public/371063523_122115951206008830_4198149107452173976_n.jpg.jpeg', 'public/story_seed_1.png', 15)
    make_transparent('public/460932001_507081895296250_8501373947895446188_n.jpg.jpeg', 'public/story_seed_2.png', 15)
except Exception as e:
    print("Error:", e)
