<template>
  <v-main>
    <v-btn color="red" v-on:click="deleteLast">Usuń ostatni</v-btn>
    <div class="d-flex flex-column align-center">
      <v-card width="60%" v-for="ev in events" v-bind:key="ev.name" class="event-card d-flex flex-column">
        <v-card-title>{{ev.name}}</v-card-title>
        <v-card-text class="justify-start" style="font-weight: bold; width: 90pt">
          {{ev.date}}
        </v-card-text>
      </v-card>
    </div>
    <v-fab-transition>
      <v-btn color="blue" fixed bottom right v-on:click="dialog = true" fab><v-icon color="white">mdi-plus</v-icon></v-btn>
    </v-fab-transition>
    <v-dialog v-model="dialog" width="300pt" >
      <div class="d-flex flex-column" style="background-color: aliceblue; width: 300pt; padding: 16pt">
        <h2>Dodaj Wydarzenie</h2>
        <v-text-field v-model="newName" label="Nazwa"></v-text-field>
        <v-date-picker v-model="newDate"></v-date-picker>
        <div class="d-flex flex-row justify-space-between pt-4">
          <v-btn v-on:click="dialog=false">Anuluj</v-btn>
          <v-btn v-on:click="addEvent" color="primary">Dodaj</v-btn>
        </div>
      </div>

    </v-dialog>
  </v-main>
</template>

<script>
import apw from "../service/appwrite-service"
export default {
  name: "Events",
  data: function () {
    return {
      newName: "",
      newDate: "",
      dialog: false,
      events: []
    }
  },
  methods: {
    async addEvent() {
      this.dialog = false
      console.log("Add " + this.newName + ", " + this.newDate)
      await apw.addEvent(this.newName, this.newDate)
      this.loadEvents()
    },
    async loadEvents() {
      let response = await apw.loadEvents()
      this.events = response.documents
    },
    async deleteLast() {
      await apw.deleteLast();
      this.loadEvents();
    }
  },
  created() {
    this.loadEvents()
  }
}
</script>

<style scoped>
.event-card {
  margin: 32pt 16pt;
}
</style>