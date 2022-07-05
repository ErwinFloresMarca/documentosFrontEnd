export const LAYOUT_STORE_KEY = 'layout_store';
const useLayout = defineStore({
  id: LAYOUT_STORE_KEY,
  state: () => {
    return {
      menu: {
        collapse: false,
        backgroundColor: '#C24B56',
        textColor: '#FFFFFF',
        activeTextColor: '#D19FA1',
      },
      header: {
        backgroundColor: '#821618',
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
