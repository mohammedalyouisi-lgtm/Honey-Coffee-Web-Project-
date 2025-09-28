/* ===== enhance.js ===== */
(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const THEME_KEY='theme', DEF='dark';
    const apply=t=>{document.documentElement.dataset.theme=t};
    apply(localStorage.getItem(THEME_KEY)||DEF);
    const tbtn=document.getElementById('theme-toggle');
    if(tbtn){tbtn.addEventListener('click',()=>{const cur=document.documentElement.dataset.theme||DEF;const next=cur==='dark'?'light':'dark';apply(next);localStorage.setItem(THEME_KEY,next);});}

    // تمرير ناعم داخلي
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click',e=>{
        const id=a.getAttribute('href').slice(1); if(!id) return;
        const el=document.getElementById(id); if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});}
      });
    });

    // التحقق البسيط للنماذج
    document.querySelectorAll('form[data-validate]').forEach(form=>{
      form.addEventListener('submit',e=>{
        let ok=true;
        form.querySelectorAll('[required]').forEach(el=>{
          const v=(el.value||'').trim();
          if(!v){ok=false;el.setAttribute('aria-invalid','true');} else el.removeAttribute('aria-invalid');
        });
        const email=form.querySelector('input[type="email"]');
        if(email&&email.value){const re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/; if(!re.test(email.value.trim())){ok=false;email.setAttribute('aria-invalid','true');}}
        let out=form.querySelector('.form-output'); if(!out){out=document.createElement('div');out.className='form-output';form.appendChild(out);}
        if(!ok){e.preventDefault();out.textContent='يرجى إكمال الحقول المطلوبة والتأكد من البريد الإلكتروني.';out.style.color='#dc2626';}
        else{out.textContent='تم التحقق من البيانات (محليًا).';out.style.color='#16a34a';}
      });
    });

    // زر نسخ رابط المقال
    const h2=document.querySelector('.post h2');
    if(h2){const b=document.createElement('button');b.className='btn';b.type='button';b.textContent='نسخ رابط المقال';b.style.marginInlineStart='8px';h2.insertAdjacentElement('afterend',b);
      b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);const old=b.textContent;b.textContent='تم النسخ';setTimeout(()=>b.textContent=old,1500);}catch{}});}
  });
})();
