import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: Array,
  },

  template: `
    <ul class="agenda">
      <li class="agenda__item">
        <meetup-agenda-item v-for="i in agenda" :agenda-item="i"></meetup-agenda-item>
      </li>
    </ul>`,
});
