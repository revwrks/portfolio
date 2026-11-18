with open('references_scraped/03-getty-tracingart/chunks/BBSPXiNi.js', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

idx = c.find('introTitle__logo')
print('=== AROUND INTRO TITLE ===')
print(c[max(0, idx-300):min(len(c), idx+1500)])
