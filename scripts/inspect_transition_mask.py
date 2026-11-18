with open('references_scraped/06-pantheonmedia/js/layout-ae05fae713302377.js', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

idx = c.find('TransitionMaskGrid')
print('=== TRANSITION MASK CODE ===')
print(c[idx-100:idx+3500])
