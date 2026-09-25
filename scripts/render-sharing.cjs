/** Cartes sociales composées en HTML avec les SVG et photos du projet. */
const {chromium}=require('playwright');
const fs=require('node:fs');const path=require('node:path');const crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');const read=name=>fs.readFileSync(path.join(root,name));
const config=JSON.parse(read('data/partage.json'));const media=JSON.parse(read('data/media.json'));
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const uri=(type,buffer)=>`data:${type};base64,${buffer.toString('base64')}`;
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
 const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});const manifest={};
 for(const [key,card] of Object.entries(config.cards)){
  const name=card.image?.startsWith('@')?media[card.image.slice(1)]:card.image;
  const photo=name?read(`dist/assets/${name}-1200.webp`):null;
  const hash=crypto.createHash('sha256');[read('scripts/render-sharing.cjs'),read('data/partage.json'),read('data/media.json'),read('dist/assets/logo.svg'),Buffer.from(key),...(photo?[photo]:[])].forEach(b=>hash.update(b));
  const illustration=photo?`<img class="photo" src="${uri('image/webp',photo)}" alt="">`:`<div class="formats">${[25,33,50].map(n=>`<div class="format"><strong>${n}<small>cm</small></strong><span style="width:${n*6}px"></span><span style="width:${n*6}px"></span><span style="width:${n*6}px"></span></div>`).join('')}</div>`;
  await page.setContent(`<!doctype html><html lang="fr"><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#f6f2eb;color:#3f3625;font-family:Arial,sans-serif;display:grid;grid-template-columns:600px 600px}.copy{padding:44px 48px 46px 52px;display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between}.logo{width:146px;height:150px;object-fit:contain}h1{font-size:64px;line-height:1.04;letter-spacing:-2.8px;margin:0;font-weight:700}h1 span{display:block;white-space:nowrap}p{font-size:25px;margin:25px 0 0;line-height:1.3}.visual{height:630px;overflow:hidden;border-radius:88px 0 0 0}.photo{width:100%;height:100%;object-fit:cover;object-position:55% 50%;filter:sepia(.06) saturate(.96) contrast(1.05)}.formats{height:100%;background:#3f3625;color:#c7a987;display:flex;flex-direction:column;justify-content:center;gap:35px;padding:50px 72px}.format{position:relative;padding-left:105px;min-height:100px;display:flex;flex-direction:column;justify-content:center;gap:7px}.format strong{position:absolute;left:0;top:12px;font-size:57px;line-height:1;letter-spacing:-2px}.format small{display:block;font-size:20px;letter-spacing:0;margin-top:9px;font-weight:400}.format span{height:19px;background:#c7a987;border:1px solid #c7a987;border-radius:6px}.format span:nth-of-type(2){transform:translateX(8px)}</style><div class="copy"><img class="logo" src="${uri('image/svg+xml',read('dist/assets/logo.svg'))}" alt="Coppey Bois de feu"><div><h1>${card.headline.map(x=>`<span>${esc(x)}</span>`).join('')}</h1><p>${esc(card.caption)}</p></div></div><div class="visual">${illustration}</div></html>`);
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));});
  const overflow=await page.evaluate(()=>[...document.querySelectorAll('.copy,h1 span,.formats')].some(e=>e.scrollWidth>e.clientWidth+1));if(overflow)throw new Error('Texte coupé : '+key);
  const jpg=await page.screenshot({type:'jpeg',quality:86});const digest=crypto.createHash('sha256').update(jpg).digest('hex');const file=`partage-${key}-${digest.slice(0,12)}.jpg`;fs.writeFileSync(path.join(root,'dist/assets',file),jpg);
  manifest[key]={file,alt:card.alt,width:1200,height:630,sourceDigest:hash.digest('hex'),sha256:digest};
 }
 await browser.close();fs.writeFileSync(path.join(root,'data/partage-manifest.json'),JSON.stringify(manifest,null,2)+'\n');console.log('4 cartes de partage rendues, manifest et empreintes mis à jour.');
})().catch(e=>{console.error(e);process.exit(1)});
