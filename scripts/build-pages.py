"""Prépare la publication sur le domaine Coppey, sans modifier les sources."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import shutil, runpy

root = Path(__file__).resolve().parents[1]
runpy.run_path(str(root/'scripts/check-sharing.py'),run_name='__main__')
source = root / 'dist'
target = root / 'build' / 'github-pages'
prefix = ''
if target.exists():
    shutil.rmtree(target)
shutil.copytree(source, target)
for path in target.rglob('*'):
    if path.suffix not in {'.html', '.css', '.js'}:
        continue
    text = path.read_text()
    if path.suffix == '.html' and path.name != '404.html':
        text = text.replace('content="noindex,nofollow"', 'content="index,follow"')
    text = text.replace('"/', '"' + prefix + '/').replace("'/", "'" + prefix + '/')
    text = text.replace('url(/', 'url(' + prefix + '/')
    # Les métadonnées restent sur le domaine principal.
    text = text.replace(', /assets/', ', ' + prefix + '/assets/').replace(',/assets/', ',' + prefix + '/assets/')
    path.write_text(text)
(target / '.nojekyll').touch()
(target / 'CNAME').write_text('coppeyboisdefeu.ch\n')
(target / 'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: https://coppeyboisdefeu.ch/sitemap.xml\n')

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
