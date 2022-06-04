const useLayout = defineStore({
  id: 'layout_store',
  state: () => {
    return {
      menu: {
        collapse: false,
        backgroundColor: '',
      },
      header: {
        backgroundColor: '#0A2F3A',
      },
      main: {
        backgroundColor: '',
      },
      footer: {
        backgroundColor: '',
        textColor: '',
      },
    };
  },
  getters: {},
  actions: {},
});

export default useLayout;
