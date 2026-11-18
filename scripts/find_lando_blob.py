import re

with open('references_scraped/08-landonorris/js/lando-by-OFF+BRAND.js', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

terms = ['blob', 'mask', 'spring', 'viscous', 'circle', 'helmet']
for t in terms:
    matches = re.findall(t, c, re.I)
    print(f'{t}: {len(matches)}')

matches_blob = [m.start() for m in re.finditer(r'blob', c, re.I)]
for idx in matches_blob[:5]:
    print('--- BLOB MATCH ---')
    print(c[max(0, idx-100):min(len(c), idx+300)])
