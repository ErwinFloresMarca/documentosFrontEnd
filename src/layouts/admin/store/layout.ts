export const LAYOUT_STORE_KEY = 'layout_store';
const useLayout = defineStore({
  id: LAYOUT_STORE_KEY,
  state: () => {
    return {
      menu: {
        collapse: false,
        backgroundColor: '#044D6A',
        textColor: '#FFFFFF',
        activeTextColor: '#E9C245',
      },
      header: {
        backgroundColor: '#0A2F3AEE',
        height: '70px',
      },
      main: {
        backgroundColor: '',
      },
      footer: {
        backgroundColor: '#88888855',
        height: '30px',
      },
    };
  },
  actions: {
    menuToggle() {
      this.menu.collapse = !this.menu.collapse;
    },
  },
});

export default useLayout;
