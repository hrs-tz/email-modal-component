<template>
    <div>
        <label for="recipient">Recipients</label>
        <transition name="error">
            <div v-if="recipientsError" class="text-error">({{ recipientsError }})</div>
        </transition>
        <transition name="error">
            <div v-if="error" class="text-error">{{ error }}</div>
        </transition>
        <input 
            @keyup="addToRecipientsOnKeyUp" 
            @change="addToRecipientsOnChange"
            :class="{ 'wobble': shouldWobble, 'error': erroredField }"
            @animationend="setShouldWobble(false)"
            v-model="tempRecipient" 
            list="recipients" 
            id="recipient" 
            name="recipient" 
            type="email" 
            placeholder="name or email" 
        >
        <datalist id="recipients">
            <option v-for="filteredClient in filteredClients" :key="filteredClient.id" :value=filteredClient.email />
        </datalist>
    </div>
    
    <div class="recipients-list">
        <div v-if="loading" class="loader-container">
            <div class="loader"></div>
        </div>
        <div v-for="recipient in recipients" :key="recipient" class="pill" @click="deleteRecipient(recipient)">
            {{ recipient }} <span class="material-symbols-outlined cancel">cancel</span>
        </div>
    </div>

    <div class="actions">
        <button type="button" @click.prevent="removeAllRecipients" class="secondary">Remove All Clients</button>
        <button type="button" @click.prevent="addAllRecipients" class="primary">Enter All Customers</button>
    </div>
</template>

<script>
import getClients from '@/composables/getClients';
import { ref, watch } from 'vue';
import debounce from 'debounce'

export default {
    props: ['recipients', 'setRecipients', 'recipientsError', 'setRecipientsError', 'shouldWobble', 'setShouldWobble', 'erroredField', 'setErroredField'],
    setup(props) {
        const filteredClients = ref([])
        const tempRecipient = ref('')
        const loading = ref(false)

        const { clients, error, load } = getClients()

        // load()

        watch(tempRecipient, () => {
            props.setRecipientsError(false)
            props.setErroredField(false)
            loadClients(tempRecipient.value)
            
        })

        const addToRecipientsOnKeyUp = (event) => {
            if (event.key === ',' && tempRecipient.value) {
                tempRecipient.value = tempRecipient.value.split(",")[0]

                addToRecipients()
            }
        }

        const addToRecipientsOnChange = (event) => {
            if (tempRecipient.value) {
                addToRecipients()
            }
        }

        const addToRecipients = () => {
            if (!isValidEmail(tempRecipient.value)) {
                return // must throw errror
            }

            if (!props.recipients.includes(tempRecipient.value)) {
                props.setRecipients([...props.recipients, tempRecipient.value])
                filteredClients.value = []
            }

            tempRecipient.value = ''
        }

        const deleteRecipient = (recipient) => {
            props.setRecipients(props.recipients.filter(item => recipient !== item))
        }

        const removeAllRecipients = () => {
            props.setRecipients([])
        }

        const addAllRecipients = async() => {
            props.setRecipientsError(false)
            props.setErroredField(false)
            loading.value = true
            await load()
            loading.value = false
            const allEmails = clients.value.map(c => c.email)
            const uniqueRecipients = [...new Set([...props.recipients, ...allEmails])]
            props.setRecipients(uniqueRecipients)
        }

        const isValidEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return regex.test(email)
        }

        const loadClients = debounce(async (query) => {
            // loading.value = true
            await load()
            // loading.value = false

            if (query) {
                filteredClients.value = clients.value.filter(client =>
                (client.email + client.name).toLowerCase().includes(query.toLowerCase()) &&
                !props.recipients.includes(client.email)
            )
            } else {
                filteredClients.value = []
            }
        }, 400)

        return { tempRecipient, filteredClients, loading, error, addToRecipientsOnKeyUp, addToRecipientsOnChange, deleteRecipient, removeAllRecipients, addAllRecipients }
    }

}
</script>

<style>
    .recipients-list{
        display: flex;
        width: 100%;
        height: 70px;
        flex-flow: wrap;
        overflow-y: scroll;
    }
    .pill {
        display: flex;
        padding: 10px 20px;
        margin-right: 5px;
        height: 20px;
        justify-content: center;
        align-items: center;
        border: solid 1px #EF9538;
        border-radius: 10px;
    }
    .cancel {
        margin-left: 5px;
        margin-right: -5px
    }

    .loader-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    .loader {
        border: 5px solid #f3f3f3;
        border-top: 5px solid #EF9538;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: spin 2s linear infinite;
        }

    /* Transitions & Animations */
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    @keyframes wobble {
        0% { transform: translateX(0px) }
        50% { transform: translateX(-10px); }
        60% { transform: translateX(8px);}
        70% { transform: translateX(-8px);}
        80% { transform: translateX(4px);}
        90% { transform: translateX(-4px);}
        100% { transform: translateX(0); }
    }

    @keyframes flash {
        0% { opacity: 0; }
        50% { opacity: 1; }
        60% { opacity: 0.5;}
        70% { opacity: 1;}
        80% { opacity: 1;}
        90% { opacity: 0.5;}
        100% { opacity: 1; }
    }
    .error-enter-active {
        animation: flash 0.5s ease;
    }
    .wobble {
        animation: wobble 0.5s ease;
    }
</style>