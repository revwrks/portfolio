with open('references_scraped/08-landonorris/index.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

idx = c.find('home-hero')
print('=== HOME HERO MARKUP ===')
print(c[idx-50:idx+2500])
