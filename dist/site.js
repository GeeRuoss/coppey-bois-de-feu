const menuButton=document.querySelector('.menu-toggle');const menu=document.querySelector('.mobile-menu');function menuInert(on){document.querySelectorAll('main,footer,.header .brand,.skip').forEach(el=>el.inert=on)}function closeMenu(){menuInert(false);menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Ouvrir le menu');document.body.style.overflow=''}menuButton?.addEventListener('click',()=>{const isOpen=menuButton.getAttribute('aria-expanded')==='true';if(isOpen)closeMenu();else{menuInert(true);menu.hidden=false;menuButton.setAttribute('aria-expanded','true');menuButton.setAttribute('aria-label','Fermer le menu');document.body.style.overflow='hidden';menu.querySelector('a')?.focus()}});document.addEventListener('keydown',e=>{if(!menu||menu.hidden)return;if(e.key==='Escape'){closeMenu();menuButton.focus()}if(e.key==='Tab'){const links=[menuButton,...menu.querySelectorAll('a')];const first=links[0],last=links.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));window.matchMedia('(min-width:768px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
// Repères indicatifs de bois empilé : 1 stère occupe environ 0,6 / 0,7 / 0,8 m³.
// Sources et limites de l'estimation : docs/calcul-steres.md.
const stereFactors = Object.freeze({'25':0.6, '33':0.7, '50':0.8});
function estimateSteres(dimensions, length) {
  if (!Object.hasOwn(stereFactors, length)) return null;
  const amount = dimensions.reduce((a,b) => a*b, 1) / 1e6 / stereFactors[length];
  return Number(amount.toFixed(amount < 1 ? 2 : 1));
}
function formatSteres(amount) {
  return amount.toLocaleString('fr-CH', {maximumFractionDigits:2}) + (amount <= 1 ? ' stère' : ' stères');
}
const spaceForm = document.querySelector('.space-inputs');
if (spaceForm) {
  const dims = ['width','depth','height'].map(k => document.getElementById('space-'+k));
  const cutLength = document.getElementById('space-length');
  const valIds = ['width-value','depth-value','height-value'];
  function updateSpace() {
    const values = dims.map(input => Number(input.value));
    values.forEach((n,i) => document.getElementById(valIds[i]).value = n+' cm');
    const amount = estimateSteres(values, cutLength.value);
    document.getElementById('space-volume').value = '≈ '+amount.toLocaleString('fr-CH', {maximumFractionDigits:2});
    document.querySelector('.space-result>span').textContent = amount <= 1 ? 'stère estimé' : 'stères estimés';
    document.querySelector('.space-visual').style.setProperty('--wood-scale', String(.75+Math.min(amount,5)*.07));
    const params = new URLSearchParams({largeur:String(values[0]),profondeur:String(values[1]),hauteur:String(values[2]),longueur:cutLength.value});
    document.getElementById('use-space').href = '/reservation/?'+params.toString();
  }
  dims.forEach(input => input.addEventListener('input', updateSpace));
  cutLength.addEventListener('change', updateSpace);
  spaceForm.disabled = false;
  document.getElementById('use-space').firstChild.textContent = 'Utiliser cette estimation ';
  updateSpace();
}
const requestForm=document.getElementById('wood-request');
if(requestForm){const firstName=document.getElementById('first-name'),locality=document.getElementById('locality'),length=document.getElementById('length'),otherLength=document.getElementById('other-length'),quantity=document.getElementById('quantity'),timing=document.getElementById('timing'),precision=document.getElementById('message');const result=document.getElementById('message-result'),intro=document.getElementById('request-summary'),preview=document.getElementById('message-preview'),wa=document.getElementById('whatsapp-send'),params=new URLSearchParams(location.search);if(['Verbier','Le Châble','Vollèges','Martigny'].includes(params.get('localite')))locality.value=params.get('localite');const dimensions=['largeur','profondeur','hauteur'].map(k=>Number(params.get(k)));
const hasDimensions=dimensions.every(Number.isFinite)&&dimensions[0]>=50&&dimensions[0]<=400&&dimensions[1]>=20&&dimensions[1]<=150&&dimensions[2]>=20&&dimensions[2]<=200;
if (Object.hasOwn(stereFactors,params.get('longueur'))) length.value=params.get('longueur');
let quantityEdited=false;
function updateEstimate() {
  if (!hasDimensions) return;
  const amount=estimateSteres(dimensions,length.value);
  const note=document.getElementById('space-estimate-note');
  note.hidden=false;
  note.textContent='Votre rangement : '+dimensions.join(' × ')+' cm. '+(amount===null?'Choisissez 25, 33 ou 50 cm pour estimer les stères.':'Environ '+formatSteres(amount)+' en bûches de '+length.value+' cm, à confirmer avec Coppey.');
  if (!quantityEdited) quantity.value=amount===null?'':'Environ '+formatSteres(amount)+' (estimation à confirmer)';
}
quantity.addEventListener('input',()=>{quantityEdited=true});
length.addEventListener('change',updateEstimate);
updateEstimate();
const lengths=new Set(['conseil','25','33','50','autre']);function syncLength(){const custom=length.value==='autre';document.getElementById('other-length-field').hidden=!custom;otherLength.disabled=!custom;otherLength.required=custom}length.addEventListener('change',syncLength);function makeMessage(){const selected=lengths.has(length.value)?length.value:'conseil';const size=selected==='autre'?otherLength.value+' cm':selected==='conseil'?'À conseiller':selected+' cm';return ['Bonjour Coppey, je m’appelle '+firstName.value.trim()+'.','J’aimerais du bois de feu.','Longueur souhaitée : '+size,'Quantité souhaitée : '+(quantity.value.trim()?(/^\d+(?:[.,]\d+)?$/.test(quantity.value.trim())?quantity.value.trim()+(Number(quantity.value.trim().replace(',','.'))<=1?' stère':' stères'):quantity.value.trim()):'À conseiller en stères'),hasDimensions&&'Rangement disponible : '+dimensions.join(' × ')+' cm',locality.value.trim()&&'Localité : '+locality.value.trim(),timing.value.trim()&&'Période souhaitée : '+timing.value.trim(),precision.value.trim()&&'Précisions : '+precision.value.trim(),'Pouvez-vous me confirmer les possibilités, le prix et les modalités ?','Merci !'].filter(Boolean).join('\n')}let prepared=false;function updateMessage(){const text=makeMessage();preview.value=text;wa.href='https://wa.me/41792903493?text='+encodeURIComponent(text)}function updateProgress(){const completed=[!!firstName.value.trim(),!!(quantity.value.trim()||length.value!=='conseil'),!!(locality.value.trim()||timing.value.trim()||precision.value.trim())];document.querySelectorAll('.request-progress span').forEach((s,i)=>s.classList.toggle('active',completed[i]));if(prepared)updateMessage();document.getElementById('copy-status').textContent=''}firstName.addEventListener('input',()=>firstName.setCustomValidity(''));requestForm.addEventListener('input',updateProgress);requestForm.addEventListener('change',updateProgress);requestForm.addEventListener('submit',e=>{e.preventDefault();firstName.setCustomValidity(firstName.value.trim()?'':'Indiquez votre prénom.');if(!requestForm.reportValidity())return;prepared=true;updateMessage();intro.hidden=true;result.hidden=false;result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'center'});preview.focus({preventScroll:true})});wa.addEventListener('click',e=>{firstName.setCustomValidity(firstName.value.trim()?'':'Indiquez votre prénom.');if(!requestForm.reportValidity()){e.preventDefault();return}updateMessage()});document.getElementById('copy-message').addEventListener('click',async()=>{firstName.setCustomValidity(firstName.value.trim()?'':'Indiquez votre prénom.');if(!requestForm.reportValidity())return;updateMessage();try{await navigator.clipboard.writeText(preview.value);document.getElementById('copy-status').textContent='Message copié.'}catch{preview.focus();preview.select();document.getElementById('copy-status').textContent='Sélectionnez et copiez le message ci-dessus.'}});document.getElementById('request-fields').disabled=false;document.getElementById('prepare-message').disabled=false;syncLength();updateProgress()}

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
    contactWidget.hidden = Boolean(editing || menuOpen);
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
  document.addEventListener('focusout', () => setTimeout(syncContactVisibility, 0));
  if (menuButton) new MutationObserver(syncContactVisibility).observe(menuButton, {attributes:true, attributeFilter:['aria-expanded']});
  syncContactVisibility();
  if (!alreadySeen) invitationTimer = setTimeout(invite, 5000);
}
