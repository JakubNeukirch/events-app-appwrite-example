<template>
  <v-main>
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
    addEvent() {
      this.dialog = false
      console.log("Add " + this.newName + ", " + this.newDate)
      //todo add event
      this.loadEvents()
    },
    loadEvents() {
      //todo loading events
      this.events = []
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