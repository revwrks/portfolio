import re

with open('references_scraped/07-phantom-land/pages/careers.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

idx = c.find('Roles we&#x27;re on the lookout for:')
if idx != -1:
    print('CAREERS LISTING:')
    print(c[idx:idx+2500])

idx_spirit = c.find('Phantom spirit represents')
if idx_spirit != -1:
    print('SPIRIT SECTION:')
    print(c[idx_spirit-200:idx_spirit+1500])
