"""Prépare le site pour le sous-dossier GitHub Pages, sans modifier l'aperçu local."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import shutil, runpy

root = Path(__file__).resolve().parents[1]
runpy.run_path(str(root/'scripts/check-sharing.py'),run_name='__main__')
source = root / 'dist'
target = root / 'build' / 'github-pages'
prefix = '/coppey-bois-de-feu'
if target.exists():
    shutil.rmtree(target)
shutil.copytree(source, target)
for path in target.rglob('*'):
    if path.suffix not in {'.html', '.css', '.js'}:
        continue
    text = path.read_text()
    text = text.replace('"/', '"' + prefix + '/').replace("'/", "'" + prefix + '/')
    text = text.replace('url(/', 'url(' + prefix + '/')
    # L’image sociale doit être accessible depuis le miroir publié.
    text = text.replace('https://coppeyboisdefeu.ch/assets/partage-', 'https://geeruoss.github.io'+prefix+'/assets/partage-')
    text = text.replace(', /assets/', ', ' + prefix + '/assets/').replace(',/assets/', ',' + prefix + '/assets/')
    text = text.replace('property="og:url" content="https://coppeyboisdefeu.ch/', 'property="og:url" content="https://geeruoss.github.io'+prefix+'/')
    path.write_text(text)
(target / '.nojekyll').touch()

class CheckLinks(HTMLParser):
    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if not value:
                continue
            urls = [value] if key in {'src', 'href'} else [v.strip().split()[0] for v in value.split(',')] if key == 'srcset' else []
            for url in urls:
                if not url.startswith('/'):
                    continue
                assert url.startswith(prefix + '/'), url
                destination = target / urlsplit(url).path.removeprefix(prefix + '/')
                assert destination.exists(), (self.page, url)
for page in target.rglob('*.html'):
    checker = CheckLinks()
    checker.page = page
    checker.feed(page.read_text())
print('GitHub Pages : chemins des pages et médias vérifiés dans build/github-pages/')
