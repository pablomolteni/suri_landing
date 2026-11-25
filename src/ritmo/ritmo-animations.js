/*!
 * SURI · Ritmo — animaciones (v1.0). Vanilla JS, sin dependencias.
 * Uso: <script src="ritmo-animations.js" defer></script>  (o import './ritmo-animations.js')
 * Se inicia solo en DOMContentLoaded. En SPAs (React/Next/Vue) llamar window.Ritmo.init(root) después de montar,
 * y window.Ritmo.destroy() al desmontar. Es idempotente: no procesa dos veces el mismo elemento.
 * Atributos:
 *   data-ritmo="lines"    título línea por línea (funciona con cualquier texto, <br> y spans internos)
 *   data-ritmo="stagger"  hijos directos aparecen escalonados. Con data-ritmo-items solo los hijos con data-ritmo-item.
 *                         Hijos con clase .reveal (sistema propio del sitio): ritmo solo les pone el retardo escalonado.
 *   data-ritmo="reveal"   un elemento aparece con fade-up
 *   data-ritmo="steps"    contenedor; adentro data-ritmo-step (cada círculo) y opcional data-ritmo-line (la línea)
 *   data-ritmo="arrow"    link/botón: anima la "→" final; si no tiene, agrega una (aria-hidden). data-ritmo-arrow="wrap-only" para no agregar.
 *   data-ritmo-tone="#F8F9FF"  en secciones: el fondo de la página toma ese tono cuando la sección cruza el centro.
 * Opcionales: data-ritmo-delay="0.12" (s, inicio), data-ritmo-gap="0.08" (s, entre ítems/líneas), data-ritmo-interval="550" (ms, entre pasos).
 * Forzar estado final (capturas): agregar ?ritmo=still a la URL o <html data-ritmo-still>.
 */
(function(w,d){
  'use strict';
  var mq=w.matchMedia?w.matchMedia('(prefers-reduced-motion: reduce)'):{matches:false};
  var STILL=/[?&]ritmo=still\b/.test(w.location.search)||d.documentElement.hasAttribute('data-ritmo-still');
  var observers=[],listeners=[];
  function reduced(){return mq.matches||STILL}
  function num(el,attr,def){var v=parseFloat(el.getAttribute(attr));return isNaN(v)?def:v}
  function has(el,k){return (' '+(el.getAttribute('data-ritmo')||'')+' ').indexOf(' '+k+' ')>-1}
  function onEnter(el,cb,th){
    if(reduced()||!('IntersectionObserver' in w)){cb();return}
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){io.unobserve(e.target);cb()}})},{threshold:th||0.15,rootMargin:'0px 0px -8% 0px'});
    io.observe(el);observers.push(io);
  }
  /* ---------- lines ---------- */
  function wrapWords(root){
    // envuelve cada palabra en <span class="ritmo-w"><span>palabra</span></span> sin romper el markup interno
    var walker=d.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),nodes=[],n;
    while((n=walker.nextNode()))nodes.push(n);
    nodes.forEach(function(t){
      if(!/\S/.test(t.nodeValue))return;
      var parent=t.parentNode,clip=false,cs=w.getComputedStyle(parent);
      if((cs.webkitBackgroundClip||cs.backgroundClip)==='text')clip=true;
      var frag=d.createDocumentFragment();
      t.nodeValue.split(/(\s+)/).forEach(function(part){
        if(!part)return;
        if(/^\s+$/.test(part)){frag.appendChild(d.createTextNode(part));return}
        var o=d.createElement('span');o.className='ritmo-w'+(clip?' ritmo-clip':'');
        var i=d.createElement('span');i.textContent=part;o.appendChild(i);frag.appendChild(o);
      });
      parent.replaceChild(frag,t);
    });
  }
  function assignLines(el){
    var base=num(el,'data-ritmo-delay',0.12),gap=num(el,'data-ritmo-gap',0.09);
    var words=el.querySelectorAll('.ritmo-w'),line=-1,top=null;
    for(var k=0;k<words.length;k++){
      var t=Math.round(words[k].getBoundingClientRect().top);
      if(top===null||Math.abs(t-top)>4){line++;top=t}
      words[k].style.setProperty('--ritmo-d',(base+line*gap).toFixed(3)+'s');
    }
  }
  function initLines(el){
    if(!el.hasAttribute('aria-label')){var c=el.cloneNode(true);[].forEach.call(c.querySelectorAll('br'),function(b){b.replaceWith(' ')});el.setAttribute('aria-label',c.textContent.replace(/\s+/g,' ').trim())}
    wrapWords(el);
    [].forEach.call(el.querySelectorAll('.ritmo-w'),function(s){s.setAttribute('aria-hidden','true')});
    el.classList.add('ritmo-ready');
    var go=function(){assignLines(el);w.requestAnimationFrame(function(){w.requestAnimationFrame(function(){el.classList.add('ritmo-in')})})};
    var start=function(){onEnter(el,go,0.1)};
    if(d.fonts&&d.fonts.ready)d.fonts.ready.then(start);else start();
  }
  /* ---------- stagger / reveal ---------- */
  function initStagger(el){
    var base=num(el,'data-ritmo-delay',0),gap=num(el,'data-ritmo-gap',0.08);
    var items=el.hasAttribute('data-ritmo-items')?el.querySelectorAll(':scope > [data-ritmo-item]'):el.children;
    [].filter.call(items,function(c){return !c.hasAttribute('data-ritmo-line')&&!c.classList.contains('ritmo-track')&&w.getComputedStyle(c).position!=='absolute'}).forEach(function(c,i){
      var v=(base+i*gap).toFixed(3)+'s';
      if(c.classList.contains('reveal'))c.style.transitionDelay=v; else c.style.setProperty('--ritmo-d',v);
    });
    onEnter(el,function(){el.classList.add('ritmo-in')});
  }
  /* ---------- steps ---------- */
  function initSteps(el){
    var steps=[].slice.call(el.querySelectorAll('[data-ritmo-step]'));
    var line=el.querySelector('[data-ritmo-line]');
    var interval=num(el,'data-ritmo-interval',550);
    steps.forEach(function(s){
      if(!s.querySelector(':scope > .ritmo-step-label')){var sp=d.createElement('span');sp.className='ritmo-step-label';while(s.firstChild)sp.appendChild(s.firstChild);s.appendChild(sp)}
    });
    var prev=line&&line.previousElementSibling;
    if(line&&!(prev&&prev.classList.contains('ritmo-track'))){
      var tr=line.cloneNode(false);tr.removeAttribute('data-ritmo-line');tr.classList.add('ritmo-track');tr.setAttribute('aria-hidden','true');line.parentNode.insertBefore(tr,line);
    }
    var n=steps.length;
    function fill(){
      steps.forEach(function(s,i){
        setTimeout(function(){s.classList.add('ritmo-on')},i*interval*2*(reduced()?0:1));
        if(line&&i>0)setTimeout(function(){line.style.setProperty('--ritmo-l',(i/(n-1)).toFixed(4))},((i-1)*2+1)*interval*(reduced()?0:1));
      });
      if(line&&n<2)line.style.setProperty('--ritmo-l',1);
    }
    onEnter(el,fill,0.45);
  }
  /* ---------- arrow ---------- */
  function initArrow(el){
    if(el.querySelector('.ritmo-arrow'))return;
    var last=el.lastChild;
    while(last&&last.nodeType===1&&last.lastChild)last=last.lastChild;
    if(last&&last.nodeType===3&&/→\s*$/.test(last.nodeValue)){
      last.nodeValue=last.nodeValue.replace(/\s*→\s*$/,'');
      var s=d.createElement('span');s.className='ritmo-arrow';s.textContent='→';last.parentNode.appendChild(s);return;
    }
    if(el.getAttribute('data-ritmo-arrow')==='wrap-only')return;
    var a=d.createElement('span');a.className='ritmo-arrow';a.setAttribute('aria-hidden','true');a.textContent='→';el.appendChild(a);
  }
  /* ---------- tone ---------- */
  function initTone(root){
    var secs=[].slice.call(root.querySelectorAll('[data-ritmo-tone]'));
    if(!secs.length||reduced())return;
    var body=d.body,bg=w.getComputedStyle(body).backgroundColor,def=body.getAttribute('data-ritmo-tone-default')||(bg&&bg!=='rgba(0, 0, 0, 0)'&&bg!=='transparent'?bg:'#FFFFFF');
    body.classList.add('ritmo-tone-on');
    function tick(){var c=w.innerHeight/2,col=def;secs.forEach(function(s){var r=s.getBoundingClientRect();if(r.top<c&&r.bottom>c)col=s.getAttribute('data-ritmo-tone')});body.style.backgroundColor=col}
    w.addEventListener('scroll',tick,{passive:true});listeners.push(['scroll',tick]);tick();
  }
  function init(root){
    root=root||d;d.documentElement.classList.add('ritmo-js');
    if(reduced())d.documentElement.classList.add('ritmo-reduced');
    [].forEach.call(root.querySelectorAll('[data-ritmo]'),function(el){
      if(el.__ritmo)return;el.__ritmo=1;
      if(has(el,'lines'))initLines(el);
      if(has(el,'stagger'))initStagger(el);
      if(has(el,'reveal'))onEnter(el,function(){el.classList.add('ritmo-in')});
      if(has(el,'steps'))initSteps(el);
      if(has(el,'arrow'))initArrow(el);
    });
    initTone(root);
  }
  function destroy(){observers.forEach(function(o){o.disconnect()});observers=[];listeners.forEach(function(l){w.removeEventListener(l[0],l[1])});listeners=[];d.body&&d.body.classList.remove('ritmo-tone-on')}
  w.Ritmo={init:init,destroy:destroy,version:'1.0'};
  // la clase va lo antes posible para evitar parpadeo
  d.documentElement.classList.add('ritmo-js');
  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',function(){init()});else init();
})(window,document);
