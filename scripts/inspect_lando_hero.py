import re

with open('references_scraped/08-landonorris/index.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

print('Searching Lando index.html for helmet, mask, hero...')
matches = re.findall(r'class="[^"]*(?:hero|helmet|mask|blob|cursor)[^"]*"', c, re.I)
print('Classes:', set(matches[:20]))

idx = c.find('In-helm')
if idx != -1:
    print('Around In-helm:')
    print(c[max(0, idx-200):min(len(c), idx+500)])
