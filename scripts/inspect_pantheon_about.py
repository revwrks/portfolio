import re

with open('references_scraped/06-pantheonmedia/pages/about-us.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

print('Searching for team in about-us.html...')
matches = [m.start() for m in re.finditer(r'team', c, re.I)]
print(f'Matches count: {len(matches)}')
for idx in matches[:5]:
    print('--- MATCH ---')
    print(c[max(0, idx-100):min(len(c), idx+300)])

headings = re.findall(r'<h[1-6][^>]*>(.*?)</h[1-6]>', c)
print('Headings in about-us:')
for h in headings[:15]:
    print(' ', h.strip()[:100])
