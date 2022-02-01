import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const Root = defineComponent({
  name: 'Root',
  // Реактивные данные приложения, его локальное состояние
  data() {
    return {
      number: 0
    };
  },

  methods: {
    increase() {
      this.number++
    }
  }
});

const vm = createApp(Root).mount('#app');
