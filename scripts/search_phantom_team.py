with open('references_scraped/07-phantom-land/index.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

import re
matches = [m.start() for m in re.finditer(r'team', c, re.I)]
print('Matches for team in index.html:', len(matches))
for idx in matches[:5]:
    print('--- MATCH ---')
    print(c[max(0, idx-100):min(len(c), idx+200)])
