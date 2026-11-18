import re, os

with open('references_scraped/07-phantom-land/pages/about_agency.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

print('Searching about_agency.html...')
sections = re.findall(r'<section[^>]*class="([^"]+)"', c)
print('Sections in about_agency:', sections)

depth_maps = re.findall(r'[^"\'>]+\-depth\.webp', c)
print('Depth maps in about_agency:', len(depth_maps))

with open('references_scraped/07-phantom-land/pages/careers.html', 'r', encoding='utf-8', errors='ignore') as f:
    cc = f.read()

sections_c = re.findall(r'<section[^>]*class="([^"]+)"', cc)
print('Sections in careers:', sections_c)
depth_maps_c = re.findall(r'[^"\'>]+\-depth\.webp', cc)
print('Depth maps in careers:', len(depth_maps_c))
