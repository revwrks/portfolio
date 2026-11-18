import os, re

dir_path = 'references_scraped/06-pantheonmedia/js'
for f in os.listdir(dir_path):
    if f.endswith('.js'):
        fp = os.path.join(dir_path, f)
        with open(fp, 'r', encoding='utf-8', errors='ignore') as fl:
            c = fl.read()
            if 'SquaresMain' in c or 'Squares' in c:
                idx = c.find('SquaresMain')
                if idx != -1:
                    print(f'FOUND SquaresMain in {f}!')
                    print(c[max(0, idx-200):min(len(c), idx+500)])
