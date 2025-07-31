<template>
    <!-- ↓↓ Label-Input pair for Recipients ↓↓ -->
    <div>
        <label for="recipient">Recipients</label>
        <!-- ↓↓ Error displaying with animation for recipients field ↓↓ -->
        <transition name="error">
            <div v-if="recipientsError" class="text-error">({{ recipientsError }})</div>
        </transition>
        <!-- ↑↑ Error displaying with animation for recipients field ↑↑ -->
        <!-- ↓↓ Error displaying with animation for errors related to the endpoint communication ↓↓ -->
        <transition name="error">
            <div v-if="error" class="text-error">{{ error }}</div>
        </transition>
        <!-- ↑↑ Error displaying with animation for errors related to the endpoint communication ↑↑ -->
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
            placeholder="Name or Email" 
        >
        <!-- ↓↓ Suggestions for recipients ↓↓ -->
        <datalist id="recipients">
            <option v-for="filteredClient in filteredClients" :key="filteredClient.id" :value=filteredClient.email />
        </datalist>
        <!-- ↑↑ Suggestions for recipients ↑↑ -->
    </div>
    <!-- ↑↑ Label-Input pair for Recipients ↑↑ -->
    <!-- ↓↓ Recipients list ↓↓ -->
    <div class="recipients-list">
        <div v-if="loading" class="loader-container">
            <div class="loader"></div>
        </div>
        <div v-for="recipient in recipients" :key="recipient" class="pill" @click="deleteRecipient(recipient)">
            {{ recipient }} <span class="material-symbols-outlined cancel">cancel</span>
        </div>
    </div>
    <!-- ↑↑ Recipients list ↑↑ -->
    <!-- ↓↓ Actions section - includes two buttons for adding and removing all clients respectively from the recipients list ↓↓ -->
    <div class="actions">
        <button type="button" @click.prevent="removeAllRecipients" class="secondary">Remove All Clients</button>
        <button type="button" @click.prevent="addAllRecipients" class="primary">Enter All Customers</button>
    </div>
    <!-- ↑↑ Actions section - includes two buttons for adding and removing all clients respectively from the recipients list ↑↑ -->
</template>

<script>
import getClients from '@/composables/getClients';
import { ref, watch } from 'vue';
import debounce from 'debounce'

export default {
    props: ['recipients', 'setRecipients', 'recipientsError', 'setRecipientsError', 'shouldWobble', 'setShouldWobble', 'erroredField', 'setErroredField'],
    setup(props) {
        // ref declarations
        const filteredClients = ref([])
        const tempRecipient = ref('')
        const loading = ref(false)

        // destructure composable for getting the clients from the given endpoint
        const { clients, error, load } = getClients()

        // load() - since endpoint returns all the clients, clients could be loaded here once and every time the user types in the recipient input, only filtering would be needed

        // watching Recipient field clear error and error styling 
        watch(tempRecipient, () => {
            props.setRecipientsError(false) // clear error
            props.setErroredField(false) // clear error styling 
            
            loadClients(tempRecipient.value) // fetch clients based on the user's input - suggestions for autocomplete

            // check if input for recipient is empty and clear suggestions
            if (!tempRecipient.value) {
                filteredClients.value = [] // clear suggestions
            }
        })

        // methods
        // method to add recipient to the recipient list when ',' is pressed
        const addToRecipientsOnKeyUp = (event) => {
            if (event.key === ',' && tempRecipient.value) {
                tempRecipient.value = tempRecipient.value.split(",")[0] // ',' is excluded from the input
                addToRecipients()
            }
        }

        // method to add recipient to the recipient list when an option (suggestion) of the datalist is selected
        const addToRecipientsOnChange = (event) => {
            if (tempRecipient.value) {
                addToRecipients()
            }
        }

        // method to add the recipient inputτed to the list of the recipients
        const addToRecipients = () => {
            // validy check - input must be a valid email
            if (!isValidEmail(tempRecipient.value)) {
                return
            }

            // check if inputed recipient is not already in the recipients list
            if (!props.recipients.includes(tempRecipient.value)) {
                props.setRecipients([...props.recipients, tempRecipient.value]) // add inputed recipient to the recipient list - at the end of the list
            }

            tempRecipient.value = '' // clear input for recipient
        }

        // method to remove the selected recipient from the recipients list (remove with click on the corresponding recipient pill)
        const deleteRecipient = (recipient) => {
            props.setRecipients(props.recipients.filter(item => recipient !== item))
        }

        // method to remove all recipients previously added to the recipients list
        const removeAllRecipients = () => {
            props.setRecipients([])
        }

        // method to add all recipients fetched from the endpoint to the recipients list while keeping the recipients previously added
        const addAllRecipients = async() => {
            // clear error and error styling
            props.setRecipientsError(false)
            props.setErroredField(false)

            loading.value = true // signal start of loading state
            await load() // fetch clients from the endpoint
            loading.value = false // signal end of loading state
            
            // add all all fetched recipients (no duplicates)
            const allEmails = clients.value.map(c => c.email) // keep only the email field from every client
            const uniqueRecipients = [...new Set([...props.recipients, ...allEmails])] // create list with all fetched recipients alongside with the previously added recipients - Set guarantees that there wil be no duplicates
            props.setRecipients(uniqueRecipients) // push recipients to the recipients list
        }

        // method for email validity check
        const isValidEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return regex.test(email)
        }

        // method to fetch clients from the endpoint with a debounce time of 400ms and make suggestions for the autocomplete
        const loadClients = debounce(async (query) => {
            await load() // fetch clients from the endpoint

            // check if input for recipient is not empty to show suggestions
            if (query) {
                // filter fetched clients to get the suggestions based on the recipient inputτed
                filteredClients.value = clients.value.filter(client =>
                (client.email + client.name).toLowerCase().includes(query.toLowerCase()) &&
                !props.recipients.includes(client.email)
            )
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
        margin-bottom: 5px;
        height: 40px;
        justify-content: center;
        align-items: center;
        border: solid 1px rgb(239, 149, 56, 0.5);
        border-radius: 10px;
    }
    .pill:hover {
        background-color: rgb(239, 149, 56, 0.04);
        transition: all 0.2s ease;
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

    /* ↓↓ Transitions & Animations ↓↓ */

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

    /* ↑↑ Transitions & Animations ↑↑ */
</style>