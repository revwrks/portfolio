import os

for root, dirs, files in os.walk('references_scraped/07-phantom-land'):
    if '_next' in root:
        print(f'{root}: {len(files)} files')
