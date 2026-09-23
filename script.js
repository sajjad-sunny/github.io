const gallery=document.getElementById('gallery');
const lightbox=document.getElementById('lightbox');
const lightImg=lightbox.querySelector('img');
const lightText=lightbox.querySelector('p');
let media=[];
async function loadGallery(){
  const r=await fetch('assets/photos.json'); media=await r.json(); render('all');
}
function render(filter){
  gallery.innerHTML='';
  media.filter(x=>filter==='all'||x.cat===filter).forEach(x=>{
    const el=document.createElement('figure'); el.className='gallery-item reveal';
    const img=document.createElement('img'); img.loading='lazy'; img.src=x.src; img.alt=x.label;
    const cap=document.createElement('span'); cap.textContent=x.label;
    el.append(img,cap); el.onclick=()=>{lightImg.src=x.src;lightImg.alt=x.label;lightText.textContent=x.label;lightbox.classList.add('open')}; gallery.appendChild(el);
  });
  requestAnimationFrame(()=>document.querySelectorAll('.reveal').forEach(e=>e.classList.add('show')));
}
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.filter)});
lightbox.querySelector('button').onclick=()=>lightbox.classList.remove('open'); lightbox.onclick=e=>{if(e.target===lightbox)lightbox.classList.remove('open')};
document.addEventListener('keydown',e=>{if(e.key==='Escape')lightbox.classList.remove('open')});
loadGallery();
