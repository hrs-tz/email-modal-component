<template>
  <div class="toast">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 20px 50px;
        background-color: rgb(82, 176, 82);
        opacity: 0.7;
        color: white;
        border-radius: 10px;
    }
</style>