<template>
  <nav>
    <a href="/">Dashboard</a>
    <a @click="toggleModal" >Contact</a>
    <a href="/">Settings</a>
  </nav>
  <div>
    <teleport to="#modals" v-if="showModal">
      <Modal 
      @close="toggleModal"
      @success="toggleAlert"
    />
    </teleport>

    <transition name="toast">
      <Toast v-if="showAlert">Message sent successfully</Toast>
    </transition>
    
    <h1>Welcome to the Email Tool</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, sunt distinctio enim veniam in id explicabo deserunt ipsum dignissimos nemo quasi soluta, repellendus, velit minima aliquam aspernatur accusamus! Mollitia minus corporis neque odit modi nisi fuga quasi dolorum architecto eius consectetur non consequuntur nostrum, molestias eos facere, dicta libero odio.</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci veniam, alias vitae itaque sed praesentium aspernatur maiores molestiae voluptatem dicta laudantium corporis autem ullam vero libero tenetur aperiam! Minima deserunt excepturi accusamus voluptas iste labore, illo impedit in quis debitis nihil aliquam minus tempore optio architecto delectus, fugiat possimus sunt.</p>
 
  </div>
</template>

<script>
import { ref } from 'vue';
import Modal from './components/Modal.vue';
import Toast from './components/Toast.vue';

export default {
  name: 'App',
  components: {
    Modal,
    Toast
  },
  setup() {
    const showModal = ref(false)
    const showAlert = ref(false)

    const toggleModal = () => {
      showModal.value = !showModal.value
    }

    const toggleAlert = () => {
      showAlert.value = true
      setTimeout(() => {
        showAlert.value = false
      }, 4000)
    }

    return { showModal, showAlert, toggleModal, toggleAlert }
  }
}
</script>

<style>
body {
  margin: 0;
  position: relative;
}
#app, #modals {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app {
  margin: 20px 40px;
}

a {
  text-decoration: none;
  color: #2c3e50;
}

nav {
  display: flex;
  justify-content: center;
}

nav>a {
  margin: 0 20px 0 0;
  letter-spacing: 0.5px;
}

button {
    padding: 10px 35px;
    margin-left: 15px;
    border: none;
    border-radius: 10px;
    font-size: medium;
    font-weight: 600;
    letter-spacing: 0.5px;
}
button.primary {
    background-color: #EF9538;
    color: white;
}
button.secondary {
    background-color: white;
    border: solid 1px #2c3e50;
}

/* Transitions */
.toast-enter-from {
  transform: translateX(60px);
  opacity: 0;
}
.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}
.toast-leave-to {
  transform: translateY(60px);
  opacity: 0;
}
</style>
