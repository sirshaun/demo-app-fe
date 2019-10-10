<template>
  <div>
    <div v-for="(friend, index) in friends" :key="index">
      <div class="flex items-center">
        <img class="w-10 h-10 rounded-full mr-4" :src="friend.profileImage" />
        <div class="w-full text-sm">
          <div class="clearfix">
            <div class="float-left">
              <p class="font-light text-normal">
                {{ friend.name }}
              </p>
            </div>
            <div class="float-right" v-if="!friend.owner">
              <img
                class="cursor-pointer h-6"
                src="/img/ikonate/close.svg"
                @click="func"
              />
            </div>
          </div>
        </div>
      </div>
      <hr class="my-6" v-show="index != friends.length - 1" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    friends: { type: Array, required: true },
    func: { type: Function, required: true }
  }
};
</script>
