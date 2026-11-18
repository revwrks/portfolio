import urllib.request
import os

chunks = [
    "55yDJIky.js", "CENEsQq1.js", "CTD0GRTa.js", "s5kuwhN6.js", "BqbHwPfs.js",
    "CDY68bNc.js", "VbIHlcLE.js", "BWhTUJCt.js", "Br6vISkq.js", "De0MQsoJ.js",
    "C5x6R2a_.js", "yQCYfrVS.js", "BdT36_8W.js", "B-tuEXrK.js", "0DoWyssW.js",
    "EJcA7ZIo.js", "BBSPXiNi.js", "BGfcuG2n.js", "BQjU4dwZ.js", "vxidHdmP.js",
    "CAExIIT3.js", "BBmyyArJ.js", "CglMc2Yn.js", "C2l4VpSc.js", "BMM1ly83.js"
]

os.makedirs('references_scraped/03-getty-tracingart/chunks', exist_ok=True)
base = "https://www.getty.edu/tracingart/_nuxt/"
headers = {'User-Agent': 'Mozilla/5.0'}

for c in chunks:
    url = base + c
    dst = os.path.join('references_scraped/03-getty-tracingart/chunks', c)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(dst, 'wb') as f:
            f.write(resp.read())
        print(f'Downloaded {c} ({os.path.getsize(dst)} bytes)')
    except Exception as e:
        print(f'Failed {c}: {e}')
