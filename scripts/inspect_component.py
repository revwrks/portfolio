with open('references_scraped/03-getty-tracingart/chunks/BBSPXiNi.js', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

idx = c.find('img:"A-Mountain-Landscape"')
if idx == -1: idx = c.find('The-Anunciation')
print(c[idx+1000:idx+4000])
