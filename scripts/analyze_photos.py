from PIL import Image
import numpy as np

def analyze_photo(path):
    img = Image.open(path)
    w, h = img.size
    arr = np.array(img)
    corners = {
        'top_left': arr[:50, :50].mean(axis=(0,1)),
        'top_right': arr[:50, -50:].mean(axis=(0,1)),
        'bottom_left': arr[-50:, :50].mean(axis=(0,1)),
        'bottom_right': arr[-50:, -50:].mean(axis=(0,1)),
    }
    print(f'=== {path} ({w}x{h}) ===')
    for k, v in corners.items():
        print(f'  {k}: RGB {v.astype(int)}')

analyze_photo('public/rev.jpg')
analyze_photo('public/rev2.JPG')
analyze_photo('public/rev3.JPG')
