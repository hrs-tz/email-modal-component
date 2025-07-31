<template>
  <!-- ↓↓ Navigation bar - only Contact is functional - Dashboard, Settings for demonstration purpose ↓↓ -->
  <nav>
    <a href="/">Dashboard</a>
    <a @click="toggleModal" >Contact</a>
    <a href="/">Settings</a>
  </nav>
  <!-- ↑↑ Navigation bar - only Contact is functional - Dashboard, Settings for demonstration purpose ↑↑ -->

  <div>
    <!-- ↓↓ Modal which contains the form - teleported outside of #app for better code organisation ↓↓ -->
    <teleport to="#modals" v-if="showModal">
      <Modal 
      @close="toggleModal"
      @success="toggleAlert"
    />
    </teleport>
    <!-- ↑↑ Modal which contains the form - teleported outside of #app for better code organisation ↑↑ -->

    <!-- ↓↓ Toast with animation - appears after successful message sending ↓↓ -->
    <transition name="toast">
      <Toast v-if="showAlert" @close="toggleAlert">Message sent successfully</Toast>
    </transition>
    <!-- ↑↑ Toast with animation - appears after successful message sending ↑↑ -->
    
    <!-- ↓↓ Dummy content to demonstrate modal functionality ↓↓ -->
    <h1>Welcome to the Email Tool</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, sunt distinctio enim veniam in id explicabo deserunt ipsum dignissimos nemo quasi soluta, repellendus, velit minima aliquam aspernatur accusamus! Mollitia minus corporis neque odit modi nisi fuga quasi dolorum architecto eius consectetur non consequuntur nostrum, molestias eos facere, dicta libero odio.</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci veniam, alias vitae itaque sed praesentium aspernatur maiores molestiae voluptatem dicta laudantium corporis autem ullam vero libero tenetur aperiam! Minima deserunt excepturi accusamus voluptas iste labore, illo impedit in quis debitis nihil aliquam minus tempore optio architecto delectus, fugiat possimus sunt.</p>
    <!-- ↑↑ Dummy content to demonstrate modal functionality ↑↑ -->

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
    // ref declarations
    const showModal = ref(false)
    const showAlert = ref(false)

    // methods
    const toggleModal = () => {
      showModal.value = !showModal.value
    }

    const toggleAlert = () => {
      showAlert.value = !showAlert.value
    }

    return { showModal, showAlert, toggleModal, toggleAlert }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
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

h1 {
  margin: 20px;
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
  padding: 10px;
  letter-spacing: 0.5px;
}

button {
  padding: 12px 20px;
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
  border: solid 1px rgb(44, 62, 80, 0.2);
}

button.primary:hover {
  background-color: #DE8832;
  transition: all 0.2s ease;
}

button.secondary:hover {
  background-color: rgb(44, 62, 80, 0.04);
  transition: all 0.2s ease;
}

/* ↓↓ Media Queries for Mobile Responsiveness ↓↓ */

@media (max-width: 768px) {
  nav > a {
    font-size: 1.1rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  p {
    font-size: 0.95rem;
    text-align: justify;
  }

  button {
    font-size: 1rem;
    margin-top: 10px;
  }

  .toast {
    width: 90%;
    left: 5%;
    right: 5%;
    bottom: 10px;
    padding: 15px;
    font-size: 0.95rem;
  }
}

/* ↑↑ Media Queries for Mobile Responsiveness ↑↑ */

/* ↓↓ Transitions ↓↓ */

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

/* ↑↑ Transitions ↑↑ */
</style>
