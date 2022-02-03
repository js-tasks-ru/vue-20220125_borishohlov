import { defineComponent } from './vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from './meetupService.js';

console.log(agendaItemIcons['registration'])

export default defineComponent({
  name: 'MeetupAgendaItem',

  agendaIcons : agendaItemIcons,
  agendaItemDefaultTitles: agendaItemDefaultTitles,

  props: {
    agendaItem: Object,
  },

  methods: {
    getIcon(icon) {
      return this.$options.agendaIcons[icon];
    }
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="\`/assets/icons/icon-\${$options.agendaIcons[agendaItem.type]}.svg\`" class="icon" :alt="$options.agendaIcons[agendaItem.type]" />
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ agendaItem.title || $options.agendaItemDefaultTitles[agendaItem.type] }}</h3>
        <p v-if="agendaItem.type === 'talk'" class="agenda-item__talk">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p>{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
