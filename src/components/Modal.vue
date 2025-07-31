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
            <!-- ↓↓ Label-Input pair for Subject  ↓↓ -->
            <div>
                <label for="subject">Subject</label>
                <!-- ↓↓ Error displaying with animation for subject field - never used but useful for displaying errors originated from Backend  ↓↓ -->
                <transition name="error">
                    <div v-if="subjectError" class="text-error">({{ subjectError }})</div>
                </transition>
                <!-- ↑↑ Error displaying with animation for subject field - never used but useful for displaying errors originated from Backend ↑↑ -->
                <input v-model="subject" id="subject" name="subject" type="text" placeholder="Email subject" required>
            </div>
            <!-- ↑↑ Label-Input pair for Subject ↑↑ -->
            <!-- ↓↓ Label-Input pair for Body  ↓↓ -->
            <div>
                <label for="body">Body</label>
                <!-- ↓↓ Error displaying with animation for body field - never used but useful for displaying errors originated from Backend  ↓↓ -->
                <transition name="error">
                    <div v-if="bodyError" class="text-error">({{ bodyError }})</div>
                </transition>
                <!-- ↑↑ Error displaying with animation for body field - never used but useful for displaying errors originated from Backend ↑↑ -->
                <textarea v-model="body" name="body" id="body" placeholder="Body of text" minlength="10" required></textarea>
            </div>
            <!-- ↑↑ Label-Input pair for Body ↑↑ -->
            <!-- ↓↓ Actions section - includes two buttons for form submission and canceling out of the form (modal) respectively  ↓↓ -->
            <div class="actions">
                <button type="button" @click="closeModal" class="secondary">Cancel</button>
                <button type="submit" class="primary">Submit</button>
            </div>
            <!-- ↑↑ Actions section - includes two buttons for form submission and canceling out of the form (modal) respectively  ↑↑ -->
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
        // ref declarations
        const recipients = ref([])
        const subject = ref('')
        const body = ref('')
        const recipientsError = ref('')
        const subjectError = ref('')
        const bodyError = ref('')
        const shouldWobble = ref(false)
        const erroredField = ref(false)

        // methodes
        const closeModal = () => {
            emit('close')
        }

        const submit = () => {
            // validation check - at least one recipient is required for each message
            if (recipients.value.length === 0) {
                recipientsError.value = 'At least one recipient is required'
                shouldWobble.value = true // enables wobble animation for input field
                erroredField.value = true // makes input field red
                return
            }
            // output data on the console - fake submit (real case scenario: POST request to the appropriate endpoint)
            console.log('recipients:' + recipients.value + '\nsubject:' + subject.value + '\nbody:' + body.value)
            // create event to signal successful message sending which invokes toast
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
    max-width: 95vw;
    max-height: 95vh;
    padding: 45px;
    background: white;
    text-align: left;
    border-radius: 10px;
    overflow-y: scroll;
}
.modal > h1 {
    margin: 0 0 20px 0;
}
form>div {
    margin-bottom: 20px;
}
input, textarea {
    display: block;
    padding: 10px;
    border: solid 1px rgb(44, 62, 80, 0.2);
    border-radius: 10px;
    width: 100%;
    font-size: medium;
}
textarea {
    resize: none;
    height: 100px;
}
input:hover, textarea:hover {
    background-color: rgb(44, 62, 80, 0.04);
    transition: all 0.2s ease;
}
input:focus, textarea:focus {
    outline: none;
    border-color: rgb(239, 149, 56, 0.5);
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

/* ↓↓ Media Queries for Mobile Responsiveness ↓↓ */

@media (max-width: 768px) {
  .modal {
    width: 100vw;
    max-width: none;
    max-height: 90vh;
    overflow-y: auto;
    padding: 30px;
    border-radius: 0;
  }
}

/* ↑↑ Media Queries for Mobile Responsiveness ↑↑ */
</style>