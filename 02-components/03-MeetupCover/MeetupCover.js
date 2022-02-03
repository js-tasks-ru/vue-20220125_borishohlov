import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',

  props: {
    title: String,
    image: String,
  },

  template: `
    <div class="meetup-cover" :style="this.image ? '--bg-url: url(' + this.image + ')' : ''">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
});
