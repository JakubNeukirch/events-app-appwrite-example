import {Appwrite} from "appwrite";

const client = new Appwrite()
client.setEndpoint("https://localhost/v1")
client.setProject("60eab38d9cf89")
const eventsCollectionId = '60eab4902f6b8'

export default {
    signIn(email, password) {
        return client.account.createSession(email, password)
    },
    addEvent(name, date){
        return client.database.createDocument(eventsCollectionId, {
            name: name,
            date: date
        })
    },
    loadEvents() {
        return client.database.listDocuments(eventsCollectionId)
    },
    deleteLast() {
        return client.functions.createExecution('60eabca93319d')
    }
}