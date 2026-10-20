const config = JSON.parse(document.getElementById('site-data')?.textContent || '{}');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.mobile-menu');
function menuInert(on) {
  document.querySelectorAll('main,footer,.header .brand,.skip').forEach(el => { el.inert=on; });
}
function closeMenu() {
  if (!menu || !menuButton) return;
  menuInert(false); menu.hidden=true;
  menuButton.setAttribute('aria-expanded','false');
  menuButton.setAttribute('aria-label','Ouvrir le menu');
  document.body.style.overflow='';
}
menuButton?.addEventListener('click', () => {
  if (menuButton.getAttribute('aria-expanded')==='true') closeMenu();
  else {
    menuInert(true); menu.hidden=false;
    menuButton.setAttribute('aria-expanded','true');
    menuButton.setAttribute('aria-label','Fermer le menu');
    document.body.style.overflow='hidden'; menu.querySelector('a')?.focus();
  }
});
document.addEventListener('keydown', event => {
  if (!menu || menu.hidden) return;
  if (event.key==='Escape') { closeMenu(); menuButton.focus(); }
  if (event.key==='Tab') {
    const links=[menuButton,...menu.querySelectorAll('a')], first=links[0],last=links.at(-1);
    if (event.shiftKey && document.activeElement===first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement===last) { event.preventDefault(); first.focus(); }
  }
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
matchMedia('(min-width:1024px)').addEventListener('change', event => {if(event.matches)closeMenu();});
const formats = new Map((config.formats || []).map(format=>[format.id,format]));
const woods = new Map((config.wood || []).map(wood=>[wood.id,wood]));
function estimateSteres(dimensions, format) {
  if (!formats.has(format)) return null;
  const value=dimensions.reduce((a,b)=>a*b,1)/1e6/formats.get(format).factor;
  return Number(value.toFixed(value<1?2:1));
}
function formatSteres(amount) {
  return amount.toLocaleString('fr-CH',{maximumFractionDigits:2})+(amount<=1?' stère':' stères');
}
const spaceForm=document.querySelector('.space-inputs');
if (spaceForm) {
  const tool=spaceForm.closest('.space-tool');
  const keys=['width','depth','height'];
  const dimensions=keys.map(key=>document.getElementById('space-'+key));
  const numbers=keys.map(key=>document.getElementById('space-number-'+key));
  const cut=document.getElementById('space-length');
  const scene=document.getElementById('space-scene');
  const model=document.getElementById('space-model');
  const presets=[...tool.querySelectorAll('[data-space-preset]')];
  let view=0;
  const views=[45,28,62];
  const metres=n=>(n/100).toLocaleString('fr-CH',{maximumFractionDigits:2})+' m';
  function drawSpace(values) {
    const [w,d,h]=values.map(n=>n/100);
    const angle=views[view]*Math.PI/180,c=Math.cos(angle),s=Math.sin(angle),scale=100;
    const x=340-(w*c-d*s)*scale/2,y=310-(w*s+d*c)*scale*.32/2;
    const point=(a,b,z)=>[x+(a*c-z*s)*scale,y+(a*s+z*c)*scale*.32-b*scale];
    const pair=p=>p.map(n=>n.toFixed(2)).join(',');
    const front=point(0,0,d),side=point(w,0,0),top=point(0,h,0);
    const widthA=point(0,0,d),widthB=point(w,0,d),depthA=point(w,0,0),depthB=point(w,0,d),heightB=point(0,h,d);
    model.innerHTML=`<ellipse cx="340" cy="318" rx="${(w*c+d*s)*scale*.54}" ry="${(w*s+d*c)*scale*.18}" fill="#3f3625" opacity=".07"/>
      <g transform="matrix(${-s*scale} ${c*scale*.32} 0 ${-scale} ${pair(side).replace(',',' ')})"><rect width="${d}" height="${h}" fill="url(#log-sides)"/></g>
      <g transform="matrix(${c*scale} ${s*scale*.32} 0 ${-scale} ${pair(front).replace(',',' ')})"><rect width="${w}" height="${h}" fill="url(#log-ends)"/></g>
      <g transform="matrix(${c*scale} ${s*scale*.32} ${-s*scale} ${c*scale*.32} ${pair(top).replace(',',' ')})"><rect width="${w}" height="${d}" fill="#c7a987"/><path d="${Array.from({length:Math.ceil(w/.18)},(_,i)=>`M${(i*.18).toFixed(2)} 0v${d}`).join(' ')}" stroke="#9c7853" stroke-width=".012"/></g>
      <g class="wood-scene__dimensions" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M${widthA[0]},${widthA[1]+24}L${widthB[0]},${widthB[1]+24}"/><path d="M${depthA[0]+22},${depthA[1]+8}L${depthB[0]+22},${depthB[1]+8}"/><path d="M${widthA[0]-22},${widthA[1]}L${heightB[0]-22},${heightB[1]}"/></g>
      <g class="wood-scene__labels" fill="currentColor"><text x="${(widthA[0]+widthB[0])/2}" y="${(widthA[1]+widthB[1])/2+52}" text-anchor="middle">${metres(values[0])}</text><text x="${(depthA[0]+depthB[0])/2+36}" y="${(depthA[1]+depthB[1])/2+14}" text-anchor="start">${metres(values[1])}</text><text x="${widthA[0]-34}" y="${(widthA[1]+heightB[1])/2+6}" text-anchor="end">${metres(values[2])}</text></g>`;
    scene.setAttribute('aria-label',`Volume de bois empilé en 3D : largeur ${metres(values[0])}, profondeur ${metres(values[1])}, hauteur ${metres(values[2])}. Le personnage représente une personne de 1,70 m.`);
  }
  function updateSpace() {
    const values=dimensions.map(input=>Number(input.value));
    values.forEach((value,i)=>{
      document.getElementById(keys[i]+'-value').value=value+' cm';
      if(document.activeElement!==numbers[i]) numbers[i].value=value;
      const percent=(value-Number(dimensions[i].min))/(Number(dimensions[i].max)-Number(dimensions[i].min))*100;
      dimensions[i].style.setProperty('--range-fill',percent+'%');
    });
    const amount=estimateSteres(values,cut.value);
    document.getElementById('space-volume').value='≈ '+amount.toLocaleString('fr-CH',{maximumFractionDigits:2});
    document.querySelector('.space-result>span').textContent=amount<=1?'stère estimé':'stères estimés';
    const cubic=values.reduce((a,b)=>a*b,1)/1e6;
    document.getElementById('space-cubic').textContent=cubic.toLocaleString('fr-CH',{maximumFractionDigits:2})+' m³';
    presets.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.spacePreset===values.join(','))));
    drawSpace(values);
    const params=new URLSearchParams({largeur:values[0],profondeur:values[1],hauteur:values[2],format:cut.value});
    document.getElementById('use-space').href='/reservation/?'+params.toString();
  }
  dimensions.forEach(input=>input.addEventListener('input',updateSpace));
  numbers.forEach((input,i)=>{
    input.addEventListener('focus',()=>tool.classList.add('is-number-editing'));
    input.addEventListener('blur',()=>tool.classList.remove('is-number-editing'));
    input.addEventListener('input',()=>{
      if(input.value===''||!input.validity.valid) return;
      dimensions[i].value=input.value;updateSpace();
    });
    const normalizeNumber=()=>{
      if(input.value===''||!Number.isFinite(input.valueAsNumber)) input.value=dimensions[i].value;
      input.value=Math.min(Number(input.max),Math.max(Number(input.min),Math.round(Number(input.value))));
      dimensions[i].value=input.value;updateSpace();
    };
    input.addEventListener('change',normalizeNumber);
    input.addEventListener('blur',normalizeNumber);
    input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();normalizeNumber();}});
  });
  presets.forEach(button=>button.addEventListener('click',()=>{
    const values=button.dataset.spacePreset.split(',');
    dimensions.forEach((input,i)=>input.value=values[i]);updateSpace();
  }));
  document.getElementById('space-turn').addEventListener('click',()=>{view=(view+1)%views.length;drawSpace(dimensions.map(input=>Number(input.value)));});
  cut.addEventListener('change',updateSpace);spaceForm.disabled=false;updateSpace();
}
const form=document.getElementById('wood-request');
if (form) {
  const field=id=>document.getElementById(id);
  const firstName=field('first-name'),wood=field('wood'),length=field('length'),quantity=field('quantity'),address=field('address'),timing=field('timing'),notes=field('message'),stacking=field('stacking');
  const preview=field('message-preview'),send=field('whatsapp-send'),status=field('copy-status');
  const params=new URLSearchParams(location.search);
  const dimensions=['largeur','profondeur','hauteur'].map(key=>Number(params.get(key)));
  const bounds=[[50,400],[20,150],[20,200]];
  const hasDimensions=dimensions.every((value,i)=>Number.isFinite(value)&&value>=bounds[i][0]&&value<=bounds[i][1]);
  const requestedFormat=params.get('format')||params.get('longueur');
  if (formats.has(requestedFormat)) length.value=requestedFormat;
  if (woods.has(params.get('bois'))) wood.value=params.get('bois');
  if (['livraison','retrait','faconnage'].includes(params.get('mode'))) form.querySelector('input[name=mode][value="'+params.get('mode')+'"]').checked=true;
  if (['Verbier','Le Châble','Vollèges','Sembrancher','Orsières','Martigny'].includes(params.get('localite'))) address.value=params.get('localite');
  let quantityEdited=false;
  let estimated=false;
  const mode=()=>form.querySelector('input[name=mode]:checked').value;
  function syncChoices() {
    const intervention=mode()==='faconnage',pickup=mode()==='retrait';
    field('wood-choice').hidden=intervention;wood.disabled=intervention;length.disabled=intervention;
    field('address-field').hidden=pickup;address.disabled=pickup;address.required=!pickup;address.setCustomValidity('');
    field('address-label').textContent=intervention?'Lieu d’intervention *':'Adresse de livraison *';
    field('quantity-label').textContent=intervention?'Volume à préparer, si connu':'Quantité en stères';
    field('stacking-field').hidden=pickup||intervention;stacking.disabled=pickup||intervention;
    const conifer=woods.get(wood.value)?.family==='resineux';
    const conflict=conifer&&length.value==='33-gros';
    if (conflict) length.value='33';
    length.querySelector('[value="33-gros"]').disabled=conifer;
    field('large-log-note').hidden=intervention||(!conifer&&length.value!=='33-gros');
    field('large-log-note').setAttribute('role','status');
    const note=field('space-estimate-note');
    note.hidden=!hasDimensions||intervention;
    if (hasDimensions && !intervention) {
      const amount=estimateSteres(dimensions,length.value);
      note.textContent='Rangement : '+dimensions.join(' × ')+' cm. '+(amount===null?'Choisissez un format pour estimer vos stères.':'Environ '+formatSteres(amount)+', à confirmer ensemble.');
      if (!quantityEdited) { quantity.value=amount===null?'':'Environ '+formatSteres(amount);estimated=amount!==null; }
    } else if (hasDimensions && !quantityEdited) {quantity.value='';estimated=false;}
  }
  function makeMessage() {
    const intervention=mode()==='faconnage',pickup=mode()==='retrait';
    const selectedWood=woods.get(wood.value)?.name||(length.value==='33-gros'?'Feuillus, à conseiller':'À conseiller');
    let amount=quantity.value.trim()||'À conseiller';
    if (/^\d+(?:[.,]\d+)?$/.test(amount)) amount+=(Number(amount.replace(',','.'))<=1?' stère':' stères');
    if (estimated) amount+=' (estimation à confirmer)';
    return [
      'Bonjour Coppey'+(firstName.value.trim()?', je m’appelle '+firstName.value.trim():'')+'.',
      intervention?'J’aimerais faire préparer du bois en bigbags sur place avec votre machine.':'J’aimerais commander du bois de feu.',
      !intervention&&'Bois : '+selectedWood,
      !intervention&&'Format : '+(formats.get(length.value)?.label||'À conseiller'),
      (intervention?'Volume à préparer : ':'Quantité : ')+amount,
      !intervention&&'Service : '+(pickup?'Retrait au dépôt':'Livraison en vrac'),
      !pickup&&address.value.trim()&&(intervention?'Lieu d’intervention : ':'Adresse de livraison : ')+address.value.trim(),
      !pickup&&!intervention&&stacking.checked&&'Rangement souhaité, facturé au temps passé.',
      !intervention&&hasDimensions&&'Rangement disponible : '+dimensions.join(' × ')+' cm',
      timing.value.trim()&&'Période souhaitée : '+timing.value.trim(),
      notes.value.trim()&&'Précisions : '+notes.value.trim(),
      'Pouvez-vous me confirmer le prix et les possibilités ? Merci !'
    ].filter(Boolean).join('\n');
  }
  function updateMessage() {
    const text=makeMessage();preview.value=text;
    send.href='https://wa.me/'+config.whatsapp+'?text='+encodeURIComponent(text);
    status.textContent='';
  }
  function validate() {
    firstName.setCustomValidity(firstName.value.trim()?'':'Indiquez votre prénom.');
    address.setCustomValidity(address.disabled||address.value.trim()?'':'Indiquez l’adresse pour préparer votre demande.');
    return form.reportValidity();
  }
  firstName.addEventListener('input',()=>firstName.setCustomValidity(''));
  address.addEventListener('input',()=>address.setCustomValidity(''));
  quantity.addEventListener('input',()=>{quantityEdited=true;estimated=false;});
  form.addEventListener('input',updateMessage);
  form.addEventListener('change',()=>{syncChoices();updateMessage();});
  send.addEventListener('click',event=>{if(!validate()){event.preventDefault();return;}updateMessage();});
  form.addEventListener('submit',event=>{event.preventDefault();if(validate())send.click();});
  field('copy-message').addEventListener('click',async()=>{
    updateMessage();
    try {await navigator.clipboard.writeText(preview.value);status.textContent='Message copié.';}
    catch {preview.focus();preview.select();status.textContent='Sélectionnez et copiez le message.';}
  });
  field('request-fields').disabled=false; syncChoices(); updateMessage();
}
// Une seule invitation par session, sans interrompre le menu ou la saisie.
const contactWidget = document.querySelector('.contact-widget');
if (contactWidget) {
  const bubble = document.getElementById('contact-bubble');
  const contactButton = contactWidget.querySelector('.contact-widget__button');
  const sessionKey = 'coppey-contact-seen';
  let alreadySeen = false;
  let invitationTimer;
  try { alreadySeen = sessionStorage.getItem(sessionKey) === '1'; } catch {}
  function rememberInvitation() {
    alreadySeen = true;
    clearTimeout(invitationTimer);
    try { sessionStorage.setItem(sessionKey, '1'); } catch {}
  }
  function closeInvitation() {
    const returnFocus = bubble.contains(document.activeElement);
    bubble.hidden = true;
    rememberInvitation();
    if (returnFocus) contactButton.focus({preventScroll:true});
  }
  function syncContactVisibility() {
    const editing = document.activeElement?.matches('input,textarea,select,[contenteditable="true"]');
    const menuOpen = menuButton?.getAttribute('aria-expanded') === 'true';
    const formRect = form?.getBoundingClientRect();
    const formVisible = formRect && formRect.top < innerHeight && formRect.bottom > 0;
    const calculatorRect = spaceForm?.closest('.space-tool').getBoundingClientRect();
    const calculatorVisible = calculatorRect && calculatorRect.top < innerHeight && calculatorRect.bottom > 0;
    contactWidget.hidden = Boolean(editing || menuOpen || formVisible || calculatorVisible);
  }
  function invite() {
    if (alreadySeen) return;
    syncContactVisibility();
    const videoPlaying = [...document.querySelectorAll('video')].some(video => !video.paused && !video.ended && !video.autoplay);
    if (contactWidget.hidden || document.hidden || videoPlaying) {
      invitationTimer = setTimeout(invite, 500);
      return;
    }
    bubble.hidden = false;
    rememberInvitation();
  }
  contactWidget.querySelector('.contact-widget__close').addEventListener('click', closeInvitation);
  contactWidget.querySelectorAll('a').forEach(link => link.addEventListener('click', closeInvitation));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !bubble.hidden && !contactWidget.hidden) closeInvitation();
  });
  document.addEventListener('focusin', syncContactVisibility);
  if (form) new IntersectionObserver(syncContactVisibility).observe(form);
  if (spaceForm) new IntersectionObserver(syncContactVisibility).observe(spaceForm.closest('.space-tool'));
  document.addEventListener('focusout', () => setTimeout(syncContactVisibility, 0));
  if (menuButton) new MutationObserver(syncContactVisibility).observe(menuButton, {attributes:true, attributeFilter:['aria-expanded']});
  syncContactVisibility();
  if (!alreadySeen) invitationTimer = setTimeout(invite, 5000);
}

// Le contenu reste visible sans JavaScript et avec la réduction des mouvements.
(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-pending');
        observer.unobserve(entry.target);
      }
    });
  }, {rootMargin:'0px 0px -24px 0px', threshold:0});
  const candidates = document.querySelectorAll('.section-heading,.family-card,.story>div,.size-card,.wood-profile>div,.feature-note,.service-pair article,.order-steps li,.closing>div,.work-callout');
  candidates.forEach(element => {
    if (element.getBoundingClientRect().top < innerHeight || element.contains(document.activeElement)) return;
    element.classList.add('reveal-on-scroll','is-pending');
    observer.observe(element);
  });
  document.addEventListener('focusin', event => {
    const element = event.target.closest('.is-pending');
    if (element) {element.classList.remove('is-pending');observer.unobserve(element);}
  });
  reducedMotion.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    candidates.forEach(element => element.classList.remove('is-pending'));
  });
})();

// Déplacement borné, réservé à la souris et arrêté hors du premier écran.
(() => {
  const hero = document.querySelector('.woodcraft-hero');
  const wood = hero?.querySelector('.woodcraft-hero__visual img');
  if (!wood) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const mouse = matchMedia('(hover: hover) and (pointer: fine)');
  let visible = true;
  const reset = () => {
    wood.style.removeProperty('--wood-x');
    wood.style.removeProperty('--wood-y');
    wood.style.removeProperty('--wood-tilt');
  };
  hero.addEventListener('pointermove', event => {
    if (!visible || motion.matches || !mouse.matches || event.pointerType !== 'mouse') return;
    const bounds = hero.getBoundingClientRect();
    const x = Math.max(-.5, Math.min(.5, (event.clientX - bounds.left) / bounds.width - .5));
    const y = Math.max(-.5, Math.min(.5, (event.clientY - bounds.top) / bounds.height - .5));
    wood.style.setProperty('--wood-x', `${x * 16}px`);
    wood.style.setProperty('--wood-y', `${y * 12}px`);
    wood.style.setProperty('--wood-tilt', `${x * 1.2}deg`);
  }, {passive: true});
  hero.addEventListener('pointerleave', reset);
  motion.addEventListener('change', reset);
  mouse.addEventListener('change', reset);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (!visible) reset();
  }).observe(hero);
})();
