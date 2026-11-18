with open('references_scraped/03-getty-tracingart/chunks/BBSPXiNi.js', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

idx = c.find('ct=[{')
print(c[idx:idx+3500])
