with open('references_scraped/07-phantom-land/pages/about_agency.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

import re
text_snippets = re.findall(r'<p[^>]*>(.*?)</p>', c)
for p in text_snippets[:10]:
    print('  p:', p.strip()[:100])
