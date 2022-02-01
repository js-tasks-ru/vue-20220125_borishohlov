import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const Root = defineComponent({
  name: 'Root',

  data() {
    return {
      firstNum: 0,
      secondNum: 0,
      operator: 'sum',
      operators: {
        sum: '➕',
        subtract: '➖',
        multiply: '✖',
        divide: '➗',
      },
      pickedOperator: 'sum',
    };
  },

  computed: {
    result() {
      switch (this.pickedOperator) {
        case 'sum':
          return this.firstNum + this.secondNum;
          break;
        case 'subtract':
          return this.firstNum - this.secondNum;
          break;
        case 'multiply':
          return this.firstNum * this.secondNum;
          break;
        case 'divide':
          return this.firstNum / this.secondNum;
          break;
      }
    },
  },
});

createApp(Root).mount('#app');
