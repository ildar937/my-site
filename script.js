/* Force all Telegram-related links to the channel @ai_do_after */
document.addEventListener('DOMContentLoaded', () => {
  const CHANNEL = 'https://t.me/ai_do_after';

  // 1) Перенаправляем все t.me / tg:// ссылки на канал
  document.querySelectorAll('a[href*="t.me/"], a[href^="tg://"]').forEach(a => {
    a.href = CHANNEL;
    a.target = '_blank';
    a.rel = 'noopener';
    a.dataset.to = 'channel';
  });

  // 2) Подхватываем кнопки/ссылки по тексту (Заказать/Написать/Обсудить/Telegram)
  const keywords = ['заказать', 'написать', 'обсудить', 'telegram', 'tg', 'связаться'];
  document.querySelectorAll('a, button').forEach(el => {
    const txt = (el.textContent || '').trim().toLowerCase();
    if (keywords.some(k => txt.includes(k))) {
      if (el.tagName === 'A') {
        el.href = CHANNEL;
        el.target = '_blank';
        el.rel = 'noopener';
        el.dataset.to = 'channel';
      } else {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.open(CHANNEL, '_blank', 'noopener');
        });
        el.dataset.to = 'channel';
      }
    }
  });

  // 3) Телефонные и email ссылки не трогаем
  // 4) Мини‑метка клика (в консоль + localStorage)
  const mark = (label) => {
    try {
      const key = 'clicks_to_channel';
      const arr = JSON.parse(localStorage.getItem(key) || '[]');
      arr.push({ t: Date.now(), label });
      localStorage.setItem(key, JSON.stringify(arr.slice(-100))); // последние 100
      console.log('[to channel]', label);
    } catch {}
  };

  document.body.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-to="channel"], button[data-to="channel"]');
    if (a) mark('cta');
  });
});
