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
        color: white;
        box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
        border-radius: 10px;
        letter-spacing: 0.5px;
    }
</style>