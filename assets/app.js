// モバイルメニュー
var t=document.getElementById('navToggle'),m=document.getElementById('menu');
t&&t.addEventListener('click',function(){m.classList.toggle('open')});
m&&m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){m.classList.remove('open')})});

// スクロール表示（reveal / stagger）
var io=new IntersectionObserver(function(es){es.forEach(function(e){
  if(!e.isIntersecting)return;
  var el=e.target;
  if(el.classList.contains('stagger')){
    var ch=[].slice.call(el.children);
    ch.forEach(function(c,i){c.style.transitionDelay=(i*70)+'ms'});
    el.classList.add('in');
    setTimeout(function(){ch.forEach(function(c){c.style.transitionDelay=''})},1700);
  }else{
    el.classList.add('in');
    setTimeout(function(){el.style.transitionDelay=''},1200);
  }
  io.unobserve(el);
})},{threshold:.12});

document.querySelectorAll('.reveal,.sec-head,.stagger').forEach(function(el){
  if(!el.classList.contains('stagger')){
    var p=el.parentElement;
    if(p){
      var sibs=[].slice.call(p.children).filter(function(c){return c.classList.contains('reveal')});
      var i=sibs.indexOf(el);
      if(i>0)el.style.transitionDelay=(i*90)+'ms';
    }
  }
  io.observe(el);
});

// ヘッダー：スクロールでそっと陰影
var hd=document.querySelector('header');
if(hd){var sc=function(){hd.classList.toggle('scrolled',window.scrollY>8)};sc();window.addEventListener('scroll',sc,{passive:true});}

// ヒーロー：カーソルに反応する背景（PC・動きOK設定のみ）
var heroEl=document.querySelector('.hero'),heroBg=document.querySelector('.hero-bg');
if(heroEl&&heroBg&&matchMedia('(hover:hover)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  heroEl.addEventListener('mousemove',function(e){
    var r=heroEl.getBoundingClientRect();
    var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    heroBg.style.transform='translate('+(x*-24).toFixed(1)+'px,'+(y*-16).toFixed(1)+'px)';
  });
  heroEl.addEventListener('mouseleave',function(){heroBg.style.transform=''});
}
