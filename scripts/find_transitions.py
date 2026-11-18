import os, re

dir_path = 'references_scraped/06-pantheonmedia/js'
for f in os.listdir(dir_path):
    if f.endswith('.js'):
        fp = os.path.join(dir_path, f)
        with open(fp, 'r', encoding='utf-8', errors='ignore') as fl:
            c = fl.read()
            if 'transition' in c.lower() and ('curtain' in c.lower() or 'wipe' in c.lower() or 'menu' in c.lower()):
                idx = c.find('menu')
                print(f'Match in {f} around menu:')
                print(c[max(0, idx-100):min(len(c), idx+300)])
                break
