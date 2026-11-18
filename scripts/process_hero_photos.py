import os
import rembg
from PIL import Image

os.makedirs('public/hero', exist_ok=True)

print('Processing rev.jpg (Executive Base)...')
img1 = Image.open('public/rev.jpg')
# Resize for snappy performance if large, or keep full quality
print(f'Original size: {img1.size}')
# Scale to max 1600px width for silky 60fps web performance
w1, h1 = img1.size
max_w = 1600
if w1 > max_w:
    ratio = max_w / float(w1)
    new_size = (max_w, int(float(h1) * ratio))
    img1 = img1.resize(new_size, Image.Resampling.LANCZOS)
    print(f'Resized to {new_size}')

out1 = rembg.remove(img1)
out1.save('public/hero/rev-base.png', format='PNG')
print('Saved public/hero/rev-base.png successfully!')

print('Processing rev2.JPG (Alternate Persona)...')
img2 = Image.open('public/rev2.JPG')
print(f'Original size: {img2.size}')
w2, h2 = img2.size
if w2 > max_w:
    ratio = max_w / float(w2)
    new_size = (max_w, int(float(h2) * ratio))
    img2 = img2.resize(new_size, Image.Resampling.LANCZOS)
    print(f'Resized to {new_size}')

out2 = rembg.remove(img2)
out2.save('public/hero/rev-persona.png', format='PNG')
print('Saved public/hero/rev-persona.png successfully!')
