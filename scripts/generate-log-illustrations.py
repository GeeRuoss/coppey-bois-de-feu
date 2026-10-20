"""Dessine trois bûches en perspective, avec la même section et une longueur à l'échelle."""
from pathlib import Path
import math

root = Path(__file__).resolve().parents[1]
section = [(-38, -37), (-8, -51), (36, -15), (41, 14), (22, 42), (-8, 48), (-36, 27)]


def points(vertices):
    return ' '.join(f'{x:.2f},{y:.2f}' for x, y in vertices)


for length in (25, 33, 50):
    dx, dy = length * 4.2, length * -1.24
    ox, oy = 210 - dx / 2, 147 - dy / 2
    front = [(x + ox, y + oy) for x, y in section]
    back = [(x + dx, y + dy) for x, y in front]
    faces, grain = [], []
    for i in range(6):
        a, b = front[i], front[i + 1]
        if (b[1]-a[1])*dx - (b[0]-a[0])*dy <= 0:
            continue
        vertices = [a, b, back[i + 1], back[i]]
        fill = ['url(#split)', 'url(#light)', '#b38a56', 'url(#bark)', '#79583c', '#a98150'][i]
        faces.append(f'<polygon points="{points(vertices)}" fill="{fill}"/>')
        for n in range(1, 9):
            t = n / 9
            x, y = a[0] + (b[0]-a[0])*t, a[1] + (b[1]-a[1])*t
            bend = math.sin(n*2.1+i) * 3
            colour = '#fff1ce' if n % 3 == 0 else '#695039'
            grain.append(f'<path d="M{x:.2f},{y:.2f} C{x+dx*.28:.2f},{y+dy*.28+bend:.2f} {x+dx*.65:.2f},{y+dy*.65-bend:.2f} {x+dx:.2f},{y+dy:.2f}" stroke="{colour}" stroke-width="{.7 if i < 2 else 1.3}" opacity="{.27 if i < 2 else .32}"/>')
    rings = ''.join(f'<ellipse cx="{ox-22}" cy="{oy-20}" rx="{r*.83}" ry="{r}" transform="rotate(-29 {ox-22} {oy-20})"/>' for r in (9, 17, 26, 36, 47, 59, 72, 85, 98))
    # Le noeud et les fibres suivent la longueur de la face fendue supérieure.
    a, b = front[1], front[2]
    ax, ay = b[0]-a[0], b[1]-a[1]
    knot = f'<g transform="matrix({dx} {dy} {ax} {ay} {a[0]} {a[1]})" fill="none" stroke="#9b764c" stroke-width=".012" opacity=".7"><ellipse cx=".61" cy=".49" rx=".13" ry=".13"/><ellipse cx=".61" cy=".49" rx=".075" ry=".075"/><path d="M.1 .4C.3 .39 .41 .23 .6 .23S.84 .37 .96 .38M.08 .61C.3 .62 .41 .76 .62 .76S.86 .63 .97 .63"/></g>'
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="420" height="280" viewBox="0 0 420 280" role="img" aria-labelledby="title desc">
<title id="title">Bûche de {length} cm en perspective</title><desc id="desc">Illustration d'une bûche fendue, avec veinage, écorce et ombre. Même section et même échelle que les formats 25, 33 et 50 cm.</desc>
<defs>
<linearGradient id="split" x2=".4" y2="1"><stop stop-color="#ead5ae"/><stop offset="1" stop-color="#c29b67"/></linearGradient>
<linearGradient id="light" x1="0" y1="0" x2=".2" y2="1"><stop stop-color="#e6cda1"/><stop offset=".5" stop-color="#d3b07a"/><stop offset="1" stop-color="#bb915c"/></linearGradient>
<linearGradient id="bark" x2="0" y2="1"><stop stop-color="#9b7954"/><stop offset="1" stop-color="#624b35"/></linearGradient>
<linearGradient id="end" x2=".9" y2="1"><stop stop-color="#f1ddb8"/><stop offset="1" stop-color="#d3ae78"/></linearGradient>
<radialGradient id="shadow"><stop stop-color="#3f3625" stop-opacity=".22"/><stop offset="1" stop-color="#3f3625" stop-opacity="0"/></radialGradient>
<clipPath id="cap"><polygon points="{points(front)}"/></clipPath>
</defs>
<ellipse cx="216" cy="221" rx="{dx/2+61}" ry="19" fill="url(#shadow)"/>
<g stroke-linejoin="round">
<polygon points="{points(back)}" fill="#9a754d"/>
{''.join(faces)}
<g fill="none" stroke-linecap="round">{''.join(grain)}</g>
{knot}
<polygon points="{points(front)}" fill="url(#end)"/>
<g clip-path="url(#cap)" fill="none" stroke="#a47a46" stroke-width="1" opacity=".48">{rings}
<path d="M{ox-9},{oy+47}l4,-27 -6,-11m7,14 9,-9M{ox+36},{oy-15}l-16,10 -4,12M{ox-37},{oy-36}l17,16" stroke="#7c5c39" stroke-width="1.5"/>
</g>
<path d="M{points(front[2:]).replace(' ', 'L')}" fill="none" stroke="#715238" stroke-width="4" opacity=".8"/>
<path d="M{points([front[0],back[0],back[1],front[1]]).replace(' ', 'L')}" fill="none" stroke="#f7e6c5" stroke-width="1.2" opacity=".7"/>
</g></svg>'''
    target = root / f'dist/assets/buche-{length}-3d.svg'
    target.write_text(svg)
    print(f'{target.name} : {len(svg.encode())} octets')
