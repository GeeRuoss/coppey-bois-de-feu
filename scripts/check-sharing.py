"""Bloque une publication si les sources et les cartes sociales ne correspondent plus."""
from pathlib import Path
import hashlib,json
root=Path(__file__).resolve().parents[1]
config=json.loads((root/'data/partage.json').read_text())
media=json.loads((root/'data/media.json').read_text())
manifest=json.loads((root/'data/partage-manifest.json').read_text())
for key,card in config['cards'].items():
    name=card['image']
    if name and name.startswith('@'): name=media[name[1:]]
    digest=hashlib.sha256()
    for name_part in ['scripts/render-sharing.cjs','data/partage.json','data/media.json','dist/assets/logo.svg']:
        digest.update((root/name_part).read_bytes())
    digest.update(key.encode())
    if name: digest.update((root/f'dist/assets/{name}-1200.webp').read_bytes())
    assert manifest[key]['sourceDigest']==digest.hexdigest(), f'Regénérer les cartes de partage : {key}'
    image=root/'dist/assets'/manifest[key]['file']
    assert hashlib.sha256(image.read_bytes()).hexdigest()==manifest[key]['sha256'], f'Image altérée : {key}'
print('Sources et images de partage synchronisées.')
