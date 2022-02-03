import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',

  props: {
    title: String,
    image: String,
  },

  template: `
    <div class="meetup-cover" :style="'--bg-url: url(' + (this.image || 'https://course-vue.javascript.ru/api/images/2') + ')'">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
});
