const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const Root = defineComponent({
  name: 'Root',

  data() {
    return {
      meetupType: 1,
      meetupTitle: '',
    };
  },

  watch: {
    meetupType: {
      immediate: true,
      async handler(newVal, oldVal) {
        this.meetupTitle = (await fetchMeetupById(newVal)).title;
      },
    },
  },
});

window.vm = createApp(Root).mount('#app');
