<template>
  <div class="toasts" >
    <div
      v-for="item in items"
      class="toast"
      :class="types[item.name].cssClass"
    >
      <ui-icon class="toast__icon" :icon="types[item.name].iconName" />
      <span>{{ item.message }}</span>
    </div>
  </div>
</template>

<script>
import UiIcon from './UiIcon';
import { ToastTypes } from './UiToast';

function addToastItem(name, message) {
  const newItem = { name, message };
  newItem.timeoutId = setTimeout(() => this.items.splice(this.items.indexOf(newItem), 1), 5000);
  newItem.key = newItem.timeoutId;
  this.items.push(newItem);
}

export default {
  name: 'TheToaster',

  data() {
    return {
      items: new Array(),
      types: ToastTypes
    };
  },

  components: { UiIcon },


  beforeUnmount() {
    this.items?.foreach((item) => clearTimeout(item.timeoutId));
  },

  methods: {
    success(message) {
      addToastItem.call(this, 'success', message);
    },

    error(message) {
      addToastItem.call(this, 'error', message);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
