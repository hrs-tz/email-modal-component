<template>
  <div class="toast">
    <slot></slot>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  setup(props, { emit }) {
    onMounted( () => {
      setTimeout(() => emit('close'), 4000)
    })
  }
}
</script>

<style>
    .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 20px 50px;
        background-color: rgba(27, 135, 27, 0.5);
        color: white;
        box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
        border-radius: 10px;
        letter-spacing: 0.5px;
    }
</style>