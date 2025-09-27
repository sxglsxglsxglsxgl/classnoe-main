(function () {
  const root = document.documentElement;
  const computed = getComputedStyle(root);
  const baseInsets = {
    top: parseFloat(computed.getPropertyValue('--safe-top')) || 0,
    right: parseFloat(computed.getPropertyValue('--safe-right')) || 0,
    bottom: parseFloat(computed.getPropertyValue('--safe-bottom')) || 0,
    left: parseFloat(computed.getPropertyValue('--safe-left')) || 0,
  };
  const vv = window.visualViewport;

  function update() {
    const top = vv ? Math.max(baseInsets.top, Math.max(0, vv.offsetTop)) : baseInsets.top;
    const bottom = vv
      ? Math.max(
          baseInsets.bottom,
          Math.max(0, window.innerHeight - (vv.height + vv.offsetTop))
        )
      : baseInsets.bottom;
    const left = vv ? Math.max(baseInsets.left, Math.max(0, vv.offsetLeft)) : baseInsets.left;
    const right = vv
      ? Math.max(
          baseInsets.right,
          Math.max(0, window.innerWidth - (vv.width + vv.offsetLeft))
        )
      : baseInsets.right;

    root.style.setProperty('--safe-top', top + 'px');
    root.style.setProperty('--safe-bottom', bottom + 'px');
    root.style.setProperty('--safe-left', left + 'px');
    root.style.setProperty('--safe-right', right + 'px');
  }

  update();
  if (vv) {
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
  }
  window.addEventListener('orientationchange', update);
})();
