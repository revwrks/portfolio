import os, re

dir_path = 'references_scraped/07-phantom-land'
for root, dirs, files in os.walk(dir_path):
    for f in files:
        if f.endswith('.html') or f.endswith('.js'):
            fp = os.path.join(root, f)
            with open(fp, 'r', encoding='utf-8', errors='ignore') as fl:
                c = fl.read()
                if '-depth.webp' in c:
                    print(f'depth.webp found in {fp}!')
                if 'leadership' in c.lower() or 'founders' in c.lower() or 'our team' in c.lower():
                    print(f'team keyword found in {fp}!')
