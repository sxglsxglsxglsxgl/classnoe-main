(function () {
  const vv = window.visualViewport;

  function update() {
    const top = vv ? Math.max(0, vv.offsetTop) : 0;
    const bottom = vv ? Math.max(0, window.innerHeight - (vv.height + vv.offsetTop)) : 0;
    const left = vv ? Math.max(0, vv.offsetLeft) : 0;
    const right = vv ? Math.max(0, window.innerWidth - (vv.width + vv.offsetLeft)) : 0;

    document.documentElement.style.setProperty('--safe-top', top + 'px');
    document.documentElement.style.setProperty('--safe-bottom', bottom + 'px');
    document.documentElement.style.setProperty('--safe-left', left + 'px');
    document.documentElement.style.setProperty('--safe-right', right + 'px');
  }

  update();
  if (vv) {
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
  }
  window.addEventListener('orientationchange', update);
})();
