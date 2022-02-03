import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';
import MeetupView from "../06-MeetupView/MeetupView.js";

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView
  },

  data() {
    return {
      meetup: undefined,
      load: true
    }
  },

  props: {
    meetupId: Number
  },

  watch: {
    meetupId: {
      immediate: true,
      async handler(newVal, oldVal) {
        this.load = true;
        this.meetup = await fetchMeetupById(newVal).then(
          result => {
            return result
          },
          error => {
            return false
          }
        );
        this.load = false;
      },
    },
  },

  template: `
    <div class="page-meetup">
      <meetup-view v-if="meetup && !this.load" :meetup="meetup"></meetup-view>

      <ui-container v-else-if="this.load">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-else>
        <ui-alert>Test Error</ui-alert>
      </ui-container>
    </div>`,
});
