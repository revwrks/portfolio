import os, re

dir_path = 'references_scraped/03-getty-tracingart/chunks'
for f in os.listdir(dir_path):
    fp = os.path.join(dir_path, f)
    with open(fp, 'r', encoding='utf-8', errors='ignore') as fl:
        c = fl.read()
        if 'Click on an artwork' in c or 'artwork to learn' in c:
            print(f'FOUND IN {f}!')
            idx = c.find('artwork to learn')
            print(c[max(0, idx-200):min(len(c), idx+500)])
        elif 'world-of-gpi-title' in c:
            print(f'world-of-gpi-title in {f}!')
            idx = c.find('world-of-gpi-title')
            print(c[max(0, idx-200):min(len(c), idx+500)])
