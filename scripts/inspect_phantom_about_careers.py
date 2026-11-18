import re

with open('references_scraped/07-phantom-land/pages/about_agency.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

print('=== ABOUT AGENCY ===')
headings = re.findall(r'<h[1-6][^>]*>(.*?)</h[1-6]>', c)
for h in headings[:10]:
    print('  h:', h.strip()[:100])

team = re.findall(r'class="[^"]*team[^"]*"', c)
print('Team classes count:', len(team))

with open('references_scraped/07-phantom-land/pages/careers.html', 'r', encoding='utf-8', errors='ignore') as f:
    cc = f.read()

print('=== CAREERS ===')
headings_c = re.findall(r'<h[1-6][^>]*>(.*?)</h[1-6]>', cc)
for h in headings_c[:10]:
    print('  h:', h.strip()[:100])
