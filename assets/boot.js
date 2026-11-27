/* Runs before the page paints: applies saved display preferences (theme, big text, calm mode),
   and removes any service worker / cache left from when the site was an installable app. */
(function(){
  try{
    var P = (JSON.parse(localStorage.getItem("uprep_state_v2") || "null") || {}).prefs || {};
    var L = function(k){ return localStorage.getItem("uprep-" + k); };
    var B = P.big || L("big"), C = P.calm || L("calm"), t = P.theme || L("theme"), d = document.documentElement;
    if(B) d.classList.add("bigtext");
    if(C) d.classList.add("calm");
    if(t === "light" || t === "dark") d.setAttribute("data-theme", t);
  }catch(e){}
  try{
    if("serviceWorker" in navigator) navigator.serviceWorker.getRegistrations().then(function(rs){ rs.forEach(function(r){ r.unregister(); }); }).catch(function(){});
    if(window.caches) caches.keys().then(function(ks){ ks.forEach(function(k){ if(/^uprep-/.test(k)) caches.delete(k); }); }).catch(function(){});
  }catch(e){}
})();
