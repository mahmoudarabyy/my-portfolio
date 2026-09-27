export const THEME_KEY = "araby-theme-v1";

// Runs before the first paint. Only these two known values can reach the DOM.
export const themeBootstrap = `(function(){var theme='dark';try{var saved=localStorage.getItem('${THEME_KEY}');if(saved==='light'||saved==='dark')theme=saved;}catch(e){}document.documentElement.dataset.theme=theme;})();`;
