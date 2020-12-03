export class NFTThemeService {
  web3;
  forceUpdate;

  setUserTheme(token, account) {
    const theme = { [account]: token };
    const themes = JSON.parse(localStorage.getItem("userTheme")) || {};
    localStorage.setItem("userTheme", JSON.stringify({ ...themes, ...theme }));
  }

  getUserTheme(account) {
    const themes = JSON.parse(localStorage.getItem("userTheme")) || {};
    return themes[account];
  }
}
