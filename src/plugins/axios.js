import axios from 'axios';

const plugin = {
  install(app) {
    app.config.globalProperties.$axios = axios;
  }
};

export default plugin;