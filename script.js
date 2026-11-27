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
