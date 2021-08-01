<template>
<div class="d-flex flex-column align-center justify-center fill-height" style="height: 100vh">
  <v-card class="align-center justify-center" width="300pt">
    <div class="pa-8 d-flex flex-column" style="background-color: white">
      <h2>Logowanie</h2>
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-text-field v-model="password" type="password" label="Hasło"></v-text-field>
      <div class="d-flex flex-row justify-end">
        <v-btn color="primary" style="color: white" v-on:click="signIn"> Zaloguj Się </v-btn>
      </div>
    </div>
  </v-card>
</div>
</template>

<script>
import apw from "../service/appwrite-service"
export default {
  name: "Login",
  data: function () {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    async signIn() {
      await apw.signIn(this.email, this.password)
      this.$router.push("/events")
    }
  }
}
</script>

<style scoped>

</style>