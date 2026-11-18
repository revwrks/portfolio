with open('references_scraped/04-cappen/index.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

idx = c.find('class="work section"')
print(c[idx:idx+2500])
