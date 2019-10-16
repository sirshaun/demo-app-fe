<template>
  <div>
    <div class="glide">
      <div class="glide__track" data-glide-el="track">
        <slot></slot>
      </div>
      <div class="glide__arrows" data-glide-el="controls">
        <a
          class="glide__arrow glide__arrow--left"
          :class="{ 'on-image': multi }"
          data-glide-dir="<"
          v-show="!sliderStart"
        >
          <svg
            class="fill-current h-10"
            :class="{ 'md:h-16 text-white': multi, 'text-gray-900': !multi }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z"
            />
          </svg>
        </a>
        <a
          class="glide__arrow glide__arrow--right"
          :class="{ 'on-image': multi }"
          data-glide-dir=">"
          v-show="!sliderEnd"
        >
          <svg
            class="h-10 fill-current"
            :class="{ 'md:h-16 text-white': multi, 'text-gray-900': !multi }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css'
// import '@glidejs/glide/dist/css/glide.theme.min.css'

export default {
  props: {
    multi: {
      type: Boolean,
      default: false,
    },
    perView: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      glide: {},
      glideRun: {},
    }
  },
  mounted() {
    this.multi ? this.loadMultipleCarousels() : this.loadSingleCarousel()
  },
  computed: {
    sliderStart() {
      if (this.multi) return false

      return this.glideRun.hasOwnProperty('isStart')
        ? this.glideRun.isStart()
        : true
    },
    sliderEnd() {
      if (this.multi) return false

      return this.glideRun.hasOwnProperty('isEnd')
        ? this.glideRun.isEnd()
        : true
    },
  },
  methods: {
    loadMultipleCarousels() {
      const carousels = document.querySelectorAll('.glide')

      Object.values(carousels).map(carousel => {
        const slider = new Glide(carousel, {
          type: 'carousel',
          perView: 1,
        })
        slider.mount()
      })
    },
    loadSingleCarousel() {
      this.glide = new Glide('.glide', {
        perView: this.perView,
      })

      this.glide.mount()

      this.glideRun = this.glide._c.Run
    },
  },
}
</script>

<style scoped>
.glide__arrow {
  position: absolute;
  display: block;
  top: 50%;
  z-index: 2;
  color: gray;
  /*text-transform: uppercase;*/
  /*padding: 9px 12px;*/
  background-color: transparent;
  /*border: 2px solid rgba(255, 255, 255, 0.5);*/
  /*border-radius: 4px;*/
  /*box-shadow: 0 0.25em 0.5em 0 rgba(0, 0, 0, 0.1);*/
  /*text-shadow: 0 0.25em 0.5em rgba(0, 0, 0, 0.1);*/
  opacity: 1;
  cursor: pointer;
  transition: opacity 150ms ease, border 300ms ease-in-out;
  transform: translateY(-50%);
  line-height: 1;
}
.glide__arrow:focus {
  outline: none;
}
.glide__arrow:hover {
  /*border-color: white;*/
}
.glide__arrow--left {
  left: -1.8em;
}
.glide__arrow--left.on-image {
  left: 0;
}
.glide__arrow--right {
  right: -1.8em;
}
.glide__arrow--right.on-image {
  right: 0;
}
.glide__arrow--disabled {
  opacity: 0.33;
}

.glide__bullets {
  position: absolute;
  z-index: 2;
  bottom: 2em;
  left: 50%;
  display: inline-flex;
  list-style: none;
  transform: translateX(-50%);
}

.glide__bullet {
  background-color: rgba(255, 255, 255, 0.5);
  width: 9px;
  height: 9px;
  padding: 0;
  border-radius: 50%;
  border: 2px solid transparent;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  line-height: 0;
  box-shadow: 0 0.25em 0.5em 0 rgba(0, 0, 0, 0.1);
  margin: 0 0.25em;
}
.glide__bullet:focus {
  outline: none;
}
.glide__bullet:hover,
.glide__bullet:focus {
  border: 2px solid white;
  background-color: rgba(255, 255, 255, 0.5);
}
.glide__bullet--active {
  background-color: white;
}

.glide--swipeable {
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}

.glide--dragging {
  cursor: grabbing;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
}
</style>
