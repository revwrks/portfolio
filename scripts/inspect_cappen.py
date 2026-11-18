import re

with open('references_scraped/04-cappen/index.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

print('Searching Cappen index.html structure...')
sections = re.findall(r'<section[^>]*class="([^"]+)"', c)
print('Sections:', sections)

projects = re.findall(r'class="[^"]*project[^"]*"', c)
print('Project classes count:', len(projects))

with open('references_scraped/04-cappen/js/preloader.js', 'r', encoding='utf-8', errors='ignore') as f:
    cp = f.read()

print('Preloader snippet:')
idx = cp.find('toFixed')
if idx != -1:
    print(cp[max(0, idx-200):min(len(cp), idx+300)])
