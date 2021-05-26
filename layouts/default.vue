<template>
  <v-app dark>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation
    v-model="value"
    background-color="black"
    active-class="red"
    dark
    fixed
    shift
  >
    <v-btn to="/">
      <span>Home</span>

      <v-icon>mdi-television-play</v-icon>
    </v-btn>

    <v-btn to="/perfil">
      <span>Music</span>

      <v-icon>mdi-music-note</v-icon>
    </v-btn>

    <v-btn>
      <span>Book</span>

      <v-icon>mdi-book</v-icon>
    </v-btn>

    <v-btn>
      <span>Image</span>

      <v-icon>mdi-image</v-icon>
    </v-btn>
  </v-bottom-navigation>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ value: null }),

    computed: {
      color () {
        switch (this.value) {
          case 0: return 'blue-grey'
          case 1: return 'teal'
          case 2: return 'brown'
          case 3: return 'indigo'
          default: return 'blue-grey'
        }
      },
    },
  }
</script>
