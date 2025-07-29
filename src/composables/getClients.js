import { ref } from "vue"

const getClients = () => {
    const clients = ref([])
    const error = ref(null)

    const load = async () => {
        try {
            let data = await fetch('https://686547495b5d8d0339808f5d.mockapi.io/spitogatos/api/customer-email-lookup')
            if (!data.ok) {
                throw Error('No data available')
            }

            clients.value = await data.json()
        } catch (err) {
            error.value = err.message
        }
    }

    return { clients, error, load }
}

export default getClients