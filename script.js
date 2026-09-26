const body=document.body;
const themeBtn=document.getElementById('themeBtn');
const searchBtn=document.getElementById('searchBtn');
const searchPanel=document.getElementById('searchPanel');
const closeSearch=document.getElementById('closeSearch');
const searchInput=document.getElementById('searchInput');
const searchResults=document.getElementById('searchResults');
const menuBtn=document.getElementById('menuBtn');
const nav=document.getElementById('navLinks');
const stories=[...document.querySelectorAll('.story')];

themeBtn.addEventListener('click',()=>{
  body.classList.toggle('dark');
  themeBtn.textContent=body.classList.contains('dark')?'☀':'☾';
  localStorage.setItem('technova-theme',body.classList.contains('dark')?'dark':'light');
});
if(localStorage.getItem('technova-theme')==='dark'){body.classList.add('dark');themeBtn.textContent='☀'}

menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

searchBtn.addEventListener('click',()=>{
  searchPanel.classList.add('open');searchInput.focus();
});
closeSearch.addEventListener('click',()=>searchPanel.classList.remove('open'));

const searchable=stories.map(s=>({
  title:s.querySelector('h3').textContent,
  category:s.dataset.category,
  el:s
}));
searchInput.addEventListener('input',()=>{
  const q=searchInput.value.toLowerCase().trim();
  if(!q){searchResults.innerHTML='';return}
  const matches=searchable.filter(x=>(x.title+' '+x.category).toLowerCase().includes(q));
  searchResults.innerHTML=matches.length
    ? matches.map(x=>`<div class="search-item"><strong>${x.title}</strong><div class="meta">${x.category}</div></div>`).join('')
    : '<div class="search-item">No matching stories yet.</div>';
});

document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter=btn.dataset.filter;
    stories.forEach(s=>s.classList.toggle('hide',filter!=='all'&&s.dataset.category!==filter));
  });
});

document.getElementById('newsletterForm').addEventListener('submit',e=>{
  e.preventDefault();
  const email=document.getElementById('email').value;
  document.getElementById('formNote').textContent=`You're on the list — ${email} is ready for the TechNova brief.`;
  document.getElementById('email').value='';
  showToast('Subscribed successfully!');
});
function showToast(msg){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2600);
}
document.querySelectorAll('a[href="#article"]').forEach(a=>a.addEventListener('click',e=>{
  e.preventDefault();showToast('Article reader is ready for your content.');
}));
