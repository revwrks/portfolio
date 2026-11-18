with open('references_scraped/06-pantheonmedia/js/5630-3c51532c0eb1982e.js', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

idx = c.find('index.style__SquaresMain')
print(c[idx:idx+3500])
