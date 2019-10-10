<template>
  <div class="clearfix text-gray-700 font-semibold tracking-wide mb-4 mx-2">
    <div class="float-left">
      <slot name="left"></slot>
    </div>
    <div class="float-right md:mr-5">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  //
};
</script>
