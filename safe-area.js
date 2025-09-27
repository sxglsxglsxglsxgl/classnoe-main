(function () {
  const root = document.documentElement;
  const vv = window.visualViewport;

  function measureEnvInset(side) {
    const probe = document.createElement('div');
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.pointerEvents = 'none';
    probe.style.setProperty(`padding-${side}`, `env(safe-area-inset-${side}, 0px)`);
    root.appendChild(probe);
    const value = parseFloat(getComputedStyle(probe).getPropertyValue(`padding-${side}`)) || 0;
    root.removeChild(probe);
    return value;
  }

  function readBaseInsets() {
    return {
      top: measureEnvInset('top'),
      right: measureEnvInset('right'),
      bottom: measureEnvInset('bottom'),
      left: measureEnvInset('left'),
    };
  }

  let baseInsets = readBaseInsets();

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
    const handleResize = () => {
      baseInsets = readBaseInsets();
      update();
    };
    vv.addEventListener('resize', handleResize);
    vv.addEventListener('scroll', update);
  }
  window.addEventListener('orientationchange', () => {
    baseInsets = readBaseInsets();
    update();
  });
})();
