// Мини-аналитика кликов (без сторонних библиотек)
(function(){
  function track(ev){
    var el = ev.target.closest('[data-track]');
    if(!el) return;
    var key = el.getAttribute('data-track');
    try {
      var data = JSON.parse(localStorage.getItem('mini-analytics')||'{}');
      data[key] = (data[key]||0)+1;
      localStorage.setItem('mini-analytics', JSON.stringify(data));
      // Для Я.Метрики/GA сюда можно добавить вызовы, если подключите
      // console.log('Tracked:', key, data[key]);
    } catch(e){}
  }
  document.addEventListener('click', track, true);
})();
