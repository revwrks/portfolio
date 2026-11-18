with open('references_scraped/06-pantheonmedia/pages/about-us.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

idx = c.find('data-section="team"')
if idx == -1: idx = c.find("data-section='team'")
print('Found team section at:', idx)
print(c[idx:idx+3500])
