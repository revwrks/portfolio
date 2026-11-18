import re

with open('references_scraped/03-getty-tracingart/index.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

scripts = re.findall(r'<script[^>]*src="([^"]+)"', c)
for s in scripts:
    print('Script src:', s)

links = re.findall(r'<link[^>]*href="([^"]+)"', c)
for l in links:
    if '.js' in l:
        print('Link js:', l)
