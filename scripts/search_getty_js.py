import re

with open('references_scraped/03-getty-tracingart/js/DPLBeim1.js', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

terms = ['Click on an artwork', 'artwork', 'scrolly', 'ScrollTrigger', 'pin', 'section-2']
for term in terms:
    m = re.findall(term, c, re.I)
    print(f'{term}: {len(m)}')

matches = [m.start() for m in re.finditer(r'Click on an artwork', c, re.I)]
for idx in matches:
    print('CLICK MATCH:')
    print(c[max(0, idx-200):min(len(c), idx+300)])
