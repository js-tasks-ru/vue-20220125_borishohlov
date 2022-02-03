import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  props: {
    count: Number,
  },

  emits: ['update:count'],

  methods: {
    increaseCount() {
      this.$emit('update:count', this.count + 1);
    },
  },

  template: `<button type="button" @click="increaseCount">{{ count || 0 }}</button>`,
});
