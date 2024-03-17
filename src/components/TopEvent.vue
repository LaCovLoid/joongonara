<template>
  <div :class="$style.index">
    <img src="@/assets/image/banner/event.webp" :class="$style.image" alt="" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" module>
.index {
  width: 100%;
  height: 60px;

  position: fixed;

  z-index: 1;
  background-color: #141313;

  > .image {
    width: 100%;
    height: 100%;

    margin: 0 auto;

    object-fit: cover;
  }
}
</style>
