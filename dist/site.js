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
matchMedia('(min-width:768px)').addEventListener('change', event => {if(event.matches)closeMenu();});
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
  const keys=['width','depth','height'];
  const dimensions=keys.map(key=>document.getElementById('space-'+key));
  const cut=document.getElementById('space-length');
  function updateSpace() {
    const values=dimensions.map(input=>Number(input.value));
    values.forEach((value,i)=>{document.getElementById(keys[i]+'-value').value=value+' cm';});
    const amount=estimateSteres(values,cut.value);
    document.getElementById('space-volume').value='≈ '+amount.toLocaleString('fr-CH',{maximumFractionDigits:2});
    document.querySelector('.space-result>span').textContent=amount<=1?'stère estimé':'stères estimés';
    const params=new URLSearchParams({largeur:values[0],profondeur:values[1],hauteur:values[2],format:cut.value});
    document.getElementById('use-space').href='/reservation/?'+params.toString();
  }
  dimensions.forEach(input=>input.addEventListener('input',updateSpace));
  cut.addEventListener('change',updateSpace); spaceForm.disabled=false; updateSpace();
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
  if (['Verbier','Le Châble','Vollèges','Martigny'].includes(params.get('localite'))) address.value=params.get('localite');
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
    contactWidget.hidden = Boolean(editing || menuOpen || formVisible);
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
