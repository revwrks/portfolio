import re

with open('references_scraped/07-phantom-land/pages/about_agency.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

headings = re.findall(r'<h[1-6][^>]*>(.*?)</h[1-6]>', c)
for h in headings[:15]:
    print('  h:', h.strip()[:100])

videos = re.findall(r'<video[^>]*src="([^"]+)"', c)
print('Videos in about_agency:', videos)

images = re.findall(r'<img[^>]*src="([^"]+)"', c)
print('Images count:', len(images))
for img in images[:10]:
    print('  img:', img)
