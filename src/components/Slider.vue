<template>
	<div>
		<div class="glide">
			<div class="glide__track" data-glide-el="track">
				<ul class="glide__slides">
					<li class="glide__slide max-w-sm" v-for="slide in slides">
						<img
							class="object-cover rounded-t-lg"
							:src="slide.imageUrl"
							style="max-height: 239.95px; width: 359.5px"
						/>
						<!-- <div
							class="bg-cover object-cover"
							style="width: 293.333px; height: 195.55px; background-image: url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')"
						></div> -->
						<div class="mt-1 px-1">
							<div class="flex items-baseline">
								<span
									class="inline-block bg-indigo-200 text-indigo-800 text-xs px-1 rounded-full uppercase font-semibold tracking-wide"
									v-if="slide.new"
									>New</span
								>
								<div
									class="text-gray-600 text-xs uppercase font-semibold tracking-wide ml-2"
								>
									{{ pluralize('bed', slide.beds, true) }}
									&bull;
									{{ pluralize('baths', slide.baths, true) }}
								</div>
							</div>
							<p
								class="font-semibold text-sm leading-tight truncate"
							>
								{{ slide.title }}
							</p>
							<div class="flex items-center">
								<svg
									v-for="i in 5"
									:key="i"
									viewBox="0 0 24 24"
									:class="
										i <= slide.rating
											? 'text-indigo-500'
											: 'text-gray-400'
									"
									class="h-3 w-3 fill-current"
								>
									<path
										d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"
									/>
								</svg>
								<span class="text-gray-600 text-xs ml-2">{{
									slide.reviewCount
								}}</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<!-- TODO: Hide arrow if there is nowhere to scroll to -->
			<div class="glide__arrows" data-glide-el="controls">
				<a
					class="glide__arrow glide__arrow--left"
					data-glide-dir="<"
					v-show="!sliderStart"
				>
					<img src="/img/ikonate/chevron-left.svg" class="h-10" />
				</a>
				<a
					class="glide__arrow glide__arrow--right"
					data-glide-dir=">"
					v-show="!sliderEnd"
				>
					<img src="/img/ikonate/chevron-right.svg" class="h-10" />
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css'
// import '@glidejs/glide/dist/css/glide.theme.min.css'
import Pluralize from 'pluralize'

export default {
	props: ['slides'],
	data() {
		return {
			glide: {},
			glideRun: {},
		}
	},
	mounted() {
		this.glide = new Glide('.glide', {
			perView: 2,
		})

		this.glide.mount()

		this.glideRun = this.glide._c.Run
	},
	methods: {
		pluralize(word, count = 0, inclusive) {
			return Pluralize(word, count, inclusive)
		},
	},
	computed: {
		sliderStart() {
			return this.glideRun.hasOwnProperty('isStart')
				? this.glideRun.isStart()
				: true
		},
		sliderEnd() {
			return this.glideRun.hasOwnProperty('isEnd')
				? this.glideRun.isEnd()
				: true
		},
	},
}
</script>

<style>
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
.glide__arrow--right {
	right: -1.8em;
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
