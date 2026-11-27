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
const expandedCredentials=[...document.querySelectorAll('.credential-expanded')];
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
