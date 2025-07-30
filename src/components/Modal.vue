<template>
  <div @click.self="closeModal" class="backdrop">
    <div class="modal">
        <h1>Send an email</h1>
        <form @submit.prevent="submit">
            <AutoComplete 
                :recipients="recipients"
                :setRecipients="val => recipients = val"
                :recipientsError="recipientsError"
            />
            <div>
                <label for="subject">Subject</label>
                <input v-model="subject" id="subject" name="subject" type="text" placeholder="Email subject" required>
            </div>
            <div>
                <label for="body">Body</label>
                <textarea v-model="body" name="body" id="body" placeholder="Body of text" minlength="10" required></textarea>
            </div>  
            <div class="actions">
                <button type="button" @click="closeModal" class="secondary">Cancel</button>
                <button type="submit" class="primary">Submit</button>
            </div>
        </form>

        
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import AutoComplete from './AutoComplete.vue'

export default {
    components: {
        AutoComplete
    },
    setup(props, { emit }) {
        const recipients = ref([])
        const subject = ref('')
        const body = ref('')
        const recipientsError = ref('')
        const subjectError = ref('')
        const bodyError = ref('')

        const closeModal = () => {
            emit('close')
        }

        const submit = () => {
            if (recipients.value.length === 0) {
                recipientsError.value = 'At least one recipient is required'
                return
            }
            console.log('recipients:' + recipients.value + '\nsubject:' + subject.value + '\nbody:' + body.value)
            emit('success')
            closeModal()
        }

        return { recipients, subject, body, recipientsError, closeModal, submit }
    }
}
</script>

<style>
.backdrop {
    top: 0;
    position: fixed;
    background: rgb(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal {
    width: 80%;
    height: 70%;
    padding: 60px;
    background: white;
    border-radius: 10px;
    text-align: left;
}
form>div {
    margin-bottom: 20px;
}
input, textarea {
    display: block;
    padding: 10px;
    border: solid 1px #2c3e50;
    border-radius: 10px;
    width: 100%;
    font-size: medium;
}
textarea {
    height: 100px;
}
label {
    font-weight: 600;
    opacity: 70%;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
}
.actions {
    display: flex;
    justify-content: end;
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
.error {
    display: inline;
    color: crimson;
    margin-left: 10px;
    font-weight: 600;
    letter-spacing: 0.5px;
}
</style>