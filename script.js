const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}))}document.getElementById('year').textContent=new Date().getFullYear();

// Accessible photo viewer for the field gallery.
const galleryButtons=[...document.querySelectorAll('.gallery-open')];
if(galleryButtons.length){
  const viewer=document.createElement('dialog');
  viewer.className='photo-viewer';
  viewer.innerHTML='<button class="photo-viewer-close" type="button" aria-label="Close image viewer">×</button><img alt=""><p></p>';
  document.body.append(viewer);
  const viewerImage=viewer.querySelector('img');
  const viewerCaption=viewer.querySelector('p');
  const closeViewer=()=>viewer.close();
  viewer.querySelector('button').addEventListener('click',closeViewer);
  viewer.addEventListener('click',event=>{if(event.target===viewer)closeViewer()});
  galleryButtons.forEach(button=>button.addEventListener('click',()=>{
    const img=button.querySelector('img');
    viewerImage.src=button.dataset.full;
    viewerImage.alt=img.alt;
    viewerCaption.textContent=img.alt;
    viewer.showModal();
  }));
}


// Switch the embedded live NERDC preview between its four working tools.
const previewFrame=document.getElementById('nerdc-live-preview');
const previewTabs=[...document.querySelectorAll('.preview-tab')];
if(previewFrame&&previewTabs.length){
  previewTabs.forEach(tab=>tab.addEventListener('click',()=>{
    const path=tab.dataset.preview;
    if(!path)return;
    const nextUrl='https://nerdclessonplanner.lovable.app'+path;
    if(previewFrame.src!==nextUrl)previewFrame.src=nextUrl;
    previewTabs.forEach(item=>{
      const active=item===tab;
      item.classList.toggle('active',active);
      item.setAttribute('aria-pressed',String(active));
    });
  }));
}

/* Filter credential gallery without hiding its full evidence register from assistive technology. */
const credentialFilters=[...document.querySelectorAll('.credential-filter')];
const expandedCredentials=[...document.querySelectorAll('.credential-grid .credential-card')];
const credentialStatus=document.querySelector('.credential-filter-status');
if(credentialFilters.length&&expandedCredentials.length){
  credentialFilters.forEach(filter=>filter.addEventListener('click',()=>{
    const category=filter.dataset.credentialFilter;
    let visible=0;
    expandedCredentials.forEach(card=>{
      const show=category==='all'||card.dataset.credentialCategory===category;
      card.hidden=!show;
      if(show)visible++;
    });
    credentialFilters.forEach(button=>{
      const active=button===filter;
      button.classList.toggle('active',active);
      button.setAttribute('aria-pressed',String(active));
    });
    if(credentialStatus){
      const label=filter.textContent.trim();
      credentialStatus.textContent=category==='all'
        ? 'Showing all professional credentials and documented recognition.'
        : 'Showing '+visible+' records in '+label+'.';
    }
  }));
}

/* Unified document viewer for certificates, approval letters and programme records. */
const evidenceViewer=document.getElementById('evidence-viewer');
const evidenceFrame=document.getElementById('evidence-viewer-frame');
const evidenceTitle=document.getElementById('evidence-viewer-title');
const evidenceOpenNew=document.getElementById('evidence-open-new');
const evidenceClose=document.getElementById('evidence-viewer-close');
const evidenceExtensions=/\\.(pdf|jpe?g|png|webp)(?:[?#].*)?$/i;
if(evidenceViewer&&evidenceFrame){
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href]');
    if(!link||!evidenceExtensions.test(link.getAttribute('href')||''))return;
    const href=link.getAttribute('href');
    if(!href.startsWith('/'))return;
    event.preventDefault();
    const title=(link.textContent||link.getAttribute('aria-label')||'Portfolio evidence').trim().replace(/\\s+/g,' ').slice(0,90);
    evidenceTitle.textContent=title||'Portfolio evidence';
    evidenceFrame.src=href;
    evidenceOpenNew.href=href;
    evidenceViewer.showModal();
  });
  const closeEvidence=()=>{evidenceViewer.close();evidenceFrame.src='about:blank'};
  evidenceClose?.addEventListener('click',closeEvidence);
  evidenceViewer.addEventListener('click',event=>{if(event.target===evidenceViewer)closeEvidence()});
  evidenceViewer.addEventListener('close',()=>{evidenceFrame.src='about:blank'});
}
