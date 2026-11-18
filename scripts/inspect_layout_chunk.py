with open('references_scraped/06-pantheonmedia/js/layout-ae05fae713302377.js', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

import re
matches = re.findall(r'[a-zA-Z0-9_]*Menu[a-zA-Z0-9_]*|[a-zA-Z0-9_]*Transition[a-zA-Z0-9_]*', c)
print('Matches in layout chunk:', set(matches))

idx = c.find('Menu')
if idx != -1:
    print('Around Menu:')
    print(c[max(0, idx-100):min(len(c), idx+500)])
