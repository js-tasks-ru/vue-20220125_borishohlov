<template>
  <ui-input ref="input" v-model="modelValueProxy" :type="type">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  props: {
    type: {
      type: [String, Object],
      default: 'date'
    },
    modelValue: {
      type: Number
    }
  },

  methods: {
    updateValue(event) {
      console.log(event.target)
      this.$emit('update:modelValue', event.target.valueAsNumber);
    },
    formatDate(date, format) {
      var d = new Date(date);
      //var d = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
      var  month = '' + (d.getUTCMonth() + 1),
        day = '' + d.getUTCDate(),
        year = d.getUTCFullYear(),
        hour = '' + d.getUTCHours(),
        minute = '' + d.getUTCMinutes(),
        second = '' + d.getUTCSeconds();


      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;
      if (hour.length < 2)
        hour = '0' + hour;
      if (minute.length < 2)
        minute = '0' + minute;
      if (second.length < 2)
        second = '0' + second;

      let res = '';
      switch (format){
        case 'date':
          res = [year,month, day].join('-');
          break;
        case 'datetime-local':
          res = [year,month, day].join('-') + 'T' + [hour, minute].join(':');
          break;
        case 'time':
          res = [hour, minute].join(':');
          break;
        case 'time2':
          res = [hour, minute, second].join(':');
          break;
      }

      console.log(res);
      return res
    }
  },

  computed: {
    modelValueProxy: {
      get() {
        console.log(this.formatDate(this.date, this.type))
        if (this.modelValue) return this.formatDate(this.date, this.type);
        else return this.modelValue
      },
      set(value) {
        console.log(value)
        this.$emit('update:modelValue', this.$refs.input.$refs.input.valueAsNumber)
      }
    },
    date: function () {
      return new Date(this.modelValue);
    }
  },

  components: { UiInput },
};
</script>
