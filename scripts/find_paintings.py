import re

with open('references_scraped/03-getty-tracingart/index.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

imgs = re.findall(r'src="([^"]+)"', c)
print('Images in HTML count:', len(imgs))
for img in imgs:
    if 'section-2' in img or 'artwork' in img or 'thumb' in img or 'paint' in img or 'tracing' in img:
        print(' ', img)

with open('references_scraped/03-getty-tracingart/js/bundle-1.js', 'r', encoding='utf-8', errors='ignore') as f:
    cj = f.read()

imgs_j = re.findall(r'"(/tracingart/images/[^"]+)"', cj)
print('Images in JS count:', len(imgs_j))
for img in set(imgs_j):
    print('  js:', img)
