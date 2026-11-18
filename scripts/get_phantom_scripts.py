import re

with open('references_scraped/07-phantom-land/pages/about_agency.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

scripts = re.findall(r'src="([^"]+\.js)"', c)
print('Scripts in about_agency.html count:', len(scripts))
for s in scripts:
    print(' ', s)
