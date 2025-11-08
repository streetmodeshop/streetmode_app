// StreetMode mini app - static JS
const STORE_EMAIL = '{}';
let lang = 'bs';
const products = [{"id": "hoodie-ash", "title_en": "Essentials Oversized Hoodie - Ash Grey", "title_bs": "Essentials Oversized Hoodie - Siva", "price": 69, "sizes": ["S", "M", "L", "XL"], "image": "assets/hoodie.jpg", "short_en": "Premium oversized hoodie. Sizes S\u2013XL.", "short_bs": "Premium oversized hoodie. Veli\u010dine S\u2013XL.", "yupoo": "https://deateath.x.yupoo.com/item1"}, {"id": "tee-white", "title_en": "StreetMode Tee - White", "title_bs": "StreetMode Majica - Bijela", "price": 29, "sizes": ["S", "M", "L", "XL"], "image": "assets/tee.jpg", "short_en": "Classic cotton tee.", "short_bs": "Klasi\u010dna majica od pamuka.", "yupoo": "https://deateath.x.yupoo.com/item2"}, {"id": "sneaker-black", "title_en": "Core Sneaker - Black", "title_bs": "Core Patika - Crna", "price": 129, "sizes": ["40", "41", "42", "43", "44"], "image": "assets/sneaker.jpg", "short_en": "Comfort & style sneaker.", "short_bs": "Udobna i moderna patika.", "yupoo": "https://deateath.x.yupoo.com/item3"}, {"id": "demo-jacket", "title_en": "Demo Bomber Jacket", "title_bs": "Demo Bomber Jakna", "price": 85, "sizes": ["S", "M", "L"], "image": "assets/jacket.jpg", "short_en": "Lightweight bomber jacket.", "short_bs": "Lagana bomber jakna.", "yupoo": "https://deateath.x.yupoo.com/demo1"}, {"id": "demo-beanie", "title_en": "Demo Beanie", "title_bs": "Demo Kapa", "price": 15, "sizes": ["One size"], "image": "assets/beanie.jpg", "short_en": "Cozy winter beanie.", "short_bs": "Topla kapa za zimu.", "yupoo": "https://deateath.x.yupoo.com/demo2"}, {"id": "demo-bag", "title_en": "Demo Crossbody Bag", "title_bs": "Demo Torba preko ramena", "price": 49, "sizes": ["One size"], "image": "assets/bag.jpg", "short_en": "Compact crossbody bag.", "short_bs": "Kompaktna torba preko ramena.", "yupoo": "https://deateath.x.yupoo.com/demo3"}];
const productsEl = document.getElementById('products');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const yearEl = document.getElementById('year');
const langBtn = document.getElementById('langBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const modal = document.getElementById('modal');
let cart = JSON.parse(localStorage.getItem('streetmode_cart')||'[]');

function t(key){const map={
  heroTitle: {'bs':'Streetwear kolekcije — direktno iz izvora','en':'Streetwear collections — direct from supplier'},
  heroSubtitle: {'bs':'Dostava širom BiH. Brzo, pouzdano, stylish.','en':'Delivery across BiH. Fast, reliable, stylish.'},
  shopTitle: {'bs':'Shop / Prodavnica','en':'Shop'},
  cartTitle: {'bs':'Tvoja korpa','en':'Your cart'},
  checkout: {'bs':'Kupi / Checkout','en':'Checkout'},
  contactTitle: {'bs':'Kontakt / Contact','en':'Contact'},
  placeOrder: {'bs':'Potvrdi narudžbu','en':'Place order'}
};return map[key]?[map[key][lang]]:''}

function renderUI(){document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.getAttribute('data-i18n');el.textContent=t(key)});yearEl.textContent=new Date().getFullYear();renderProducts();renderCart();}

function renderProducts(){productsEl.innerHTML='';products.forEach(p=>{const card=document.createElement('div');card.className='card';card.innerHTML=`<img src='${p.image}' alt='${p.title_en}'/><h4>${'{'}lang==='bs'?p.title_bs:p.title_en${'}'}</h4><p>${'{'}lang==='bs'?p.short_bs:p.short_en${'}'}</p><div class='actions'><div class='price'><strong>${'{'}p.price${'}'} KM</strong></div><div><select class='size-select' data-id='${p.id}'>${'{'}p.sizes.map(s=>`<option>${s}</option>`).join('')${'}'}</select><button class='btn add' data-id='${p.id}'>Dodaj</button></div></div>`;productsEl.appendChild(card)});
  document.querySelectorAll('.btn.add').forEach(b=>b.addEventListener('click',e=>{const id=e.target.getAttribute('data-id');const sel=document.querySelector(`select[data-id='${id}']`);addToCart(id,sel.value);}));}

function addToCart(id,size){const p=products.find(x=>x.id===id);cart.push({id:p.id,title:lang==='bs'?p.title_bs:p.title_en,price:p.price,size, yupoo:p.yupoo});localStorage.setItem('streetmode_cart',JSON.stringify(cart));renderCart();alert('Proizvod dodat u korpu');}

function renderCart(){cartItemsEl.innerHTML='';if(!cart.length){cartItemsEl.innerHTML='<div class="text-muted">Korpa prazna</div>';cartTotalEl.textContent='0 KM';return;}cart.forEach((c,idx)=>{const div=document.createElement('div');div.style.padding='8px 0';div.innerHTML=`<div>${c.title} <small>(${c.size})</small> - ${c.price} KM <button data-idx='${idx}' class='btn small remove'>x</button></div>`;cartItemsEl.appendChild(div);} );document.querySelectorAll('.btn.remove').forEach(b=>b.addEventListener('click',e=>{const i=parseInt(e.target.getAttribute('data-idx'));cart.splice(i,1);localStorage.setItem('streetmode_cart',JSON.stringify(cart));renderCart();}));const total=cart.reduce((s,c)=>s+c.price,0);cartTotalEl.textContent=total+' KM';}

langBtn.addEventListener('click',()=>{lang = lang==='bs'?'en':'bs';renderUI();});

checkoutBtn.addEventListener('click',()=>{if(!cart.length){alert('Korpa prazna');return;}document.getElementById('contact').scrollIntoView({behavior:'smooth'});});

const orderForm=document.getElementById('orderForm');orderForm.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(orderForm);const name=fd.get('name');const phone=fd.get('phone');const address=fd.get('address');const notes=fd.get('notes')||''; if(!name||!phone||!address){alert('Popuni ime, telefon i adresu');return;}const items=cart.map(c=>`- ${c.title} (${c.size}) - ${c.price} KM - Yupoo: ${c.yupoo}`).join('\n');const total=cart.reduce((s,c)=>s+c.price,0);const subject=encodeURIComponent('StreetMode narudžba');const body=encodeURIComponent(`Narudžba:\n\nKupac: ${name}\nTelefon: ${phone}\nAdresa: ${address}\nNapomene: ${notes}\n\nProizvodi:\n${items}\n\nUkupno: ${total} KM\n\nMolim da obradite narudžbu i naručite preko CSSBuy koristeći ove Yupoo linkove.`);window.location.href=`mailto:${store_email}?subject=${subject}&body=${body}`;localStorage.removeItem('streetmode_cart');cart=[];renderCart();alert('Hvala! Otvorili smo mail klijent sa instrukcijama.');});

renderUI();
