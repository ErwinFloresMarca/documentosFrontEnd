import { defineStore } from 'pinia';

const useTheme = defineStore({
  // id de estado
  id: 'theme',
  state: () => {
    return {
      themeType: 'dark',
      themeColor: '#2080F0FF',
    };
  },
  // getters del estado
  getters: {
    getThemeType: (state) => state.themeType,
    getThemeColor: (state) => state.themeColor,
  },
  // pinia mutations actions
  actions: {
    // actions async tipo de tema
    setThemeType(type: string) {
      this.themeType = type;
    },
  },
});

export default useTheme;
