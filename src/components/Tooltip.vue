<template>
  <on-click-outside :do="handleClickOutside">
    <transition name="fade">
      <div class="relative inline-block p-4 rounded-full">
        <div
          class="absolute bg-white rounded text-gray-800 px-4 py-3 shadow-2xl z-max"
          style="height: auto; min-height: 200%; top: 105%; right: 0%; min-width:310px;"
        >
          <div class="font-light text-sm tracking-wide">{{ tip }}</div>
        </div>
      </div>
    </transition>
  </on-click-outside>
</template>

<script>
import OnClickOutside from './OnClickOutside'

export default {
  components: { OnClickOutside },
  props: {
    tip: { type: String, required: true },
    show: { type: Boolean, default: false },
    toggleTooltip: { type: Function, required: true },
  },
  data() {
    return {
      open: false,
    }
  },
  methods: {
    handleClickOutside(e) {
      if (this.open) {
        this.toggleTooltip(e)
      } else {
        this.open = true
      }
    },
  },
}
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.3s;
}

.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
