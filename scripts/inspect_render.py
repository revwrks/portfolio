with open('references_scraped/03-getty-tracingart/chunks/BBSPXiNi.js', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

idx = c.find('Circus-Sideshow')
end_ct = c.find('];', idx)
print('End of ct array at:', end_ct)
print(c[end_ct:end_ct+3000])
