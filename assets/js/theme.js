(function () {
  const storageKey = 'theme-preference';
  const body = document.body;
  const themeButtons = document.querySelectorAll('.theme-toggle');
  const navButtons = document.querySelectorAll('.nav-toggle');
  const navMenus = document.querySelectorAll('.nav-menu');
  const currentYearElements = document.querySelectorAll('#current-year');

  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const updateThemeLabel = (theme) => {
    themeButtons.forEach((button) => {
      const text = button.querySelector('.theme-toggle-text');
      if (text) {
        text.textContent = theme === 'dark' ? 'Šviesus režimas' : 'Tamsus režimas';
      }
      button.setAttribute('aria-pressed', String(theme === 'dark'));
    });
  };

  const applyTheme = (theme) => {
    body.setAttribute('data-theme', theme);
    localStorage.setItem(storageKey, theme);
    updateThemeLabel(theme);
  };

  applyTheme(getPreferredTheme());

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  });

  navButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const menu = navMenus[index];
      if (!menu) return;
      const isOpen = menu.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  });

  currentYearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
})();
