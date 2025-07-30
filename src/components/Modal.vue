<template>
  <div @click.self="closeModal" class="backdrop">
    <div class="modal">
        <h1>Send an email</h1>
        <form @submit.prevent="submit">
            <AutoComplete 
                :recipients="recipients"
                :setRecipients="val => recipients = val"
                :recipientsError="recipientsError"
                :setRecipientsError="val => recipientsError = val"
                :shouldWobble="shouldWobble"
                :setShouldWobble="val => shouldWobble = val"
                :erroredField="erroredField"
                :setErroredField="val => erroredField = val"
            />
            <div>
                <label for="subject">Subject</label>
                <transition name="error">
                    <div v-if="subjectError" class="text-error">({{ subjectError }})</div>
                </transition>
                <input v-model="subject" id="subject" name="subject" type="text" placeholder="Email subject" required>
            </div>
            <div>
                <label for="body">Body</label>
                <transition name="error">
                    <div v-if="bodyError" class="text-error">({{ bodyError }})</div>
                </transition>
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
        const shouldWobble = ref(false)
        const erroredField = ref(false)

        const closeModal = () => {
            emit('close')
        }

        const submit = () => {
            if (recipients.value.length === 0) {
                recipientsError.value = 'At least one recipient is required'
                shouldWobble.value = true
                erroredField.value = true
                return
            }
            console.log('recipients:' + recipients.value + '\nsubject:' + subject.value + '\nbody:' + body.value)
            emit('success')
            closeModal()
        }

        return { recipients, subject, body, recipientsError, subjectError, bodyError, shouldWobble, erroredField, closeModal, submit }
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
    width: 1000px;
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
    border: solid 1px rgb(44, 62, 80, 0.4);
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
.text-error {
    display: inline;
    color: crimson;
    margin-left: 10px;
    font-weight: 600;
    letter-spacing: 0.5px;
}
.error {
    border-color: crimson;
}
</style>