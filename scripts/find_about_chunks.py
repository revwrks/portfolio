import os

for root, dirs, files in os.walk('references_scraped/07-phantom-land'):
    for f in files:
        if 'about' in f.lower() and f.endswith('.js'):
            print(os.path.join(root, f))
