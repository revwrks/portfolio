with open('references_scraped/03-getty-tracingart/index.html', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

idx = c.find('class="section2"')
if idx != -1:
    end_idx = c.find('class="section3"', idx)
    if end_idx == -1: end_idx = idx + 15000
    sec2 = c[idx:end_idx]
    import re
    classes = set(re.findall(r'class="([^"]+)"', sec2))
    print('Classes in section2:')
    for cl in sorted(classes):
        print(' ', cl)
