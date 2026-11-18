with open('references_scraped/08-landonorris/js/lando-by-OFF+BRAND.js', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

import re
matches = [m.start() for m in re.finditer(r'viscous', c, re.I)]
for idx in matches[:5]:
    print('--- VISCOUS MATCH ---')
    print(c[max(0, idx-100):min(len(c), idx+300)])
