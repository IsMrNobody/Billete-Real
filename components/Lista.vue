<template>
  <v-card
    class="mx-auto mt-5 text-center"
    :class="{'green' : colorState}"
    width="600"
    tile
  >
    <v-list flat>
      <v-list-item-group
        v-model="selectedItem"
        active-class="green--text"
        mandatory
      >
        <v-list-item
          v-for="(item, i) in tasas"
          :key="i"
          @click="tasaSelect()"
        >
          <v-list-item-icon>
            <v-img width="10" :src="item.icon"></v-img>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.nombre"></v-list-item-title>
          </v-list-item-content>
           <v-list-item-content>
            <v-list-item-title v-text="item.tasa"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-btn @click="objetos = !objetos" color="green" text>ver {}</v-btn>
    <p v-show="objetos" class="green">{{ objeTotal }}</p>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      selectedItem: 0,
      color: 'green',
      colorState: false,
      objetos: false
    }),
    created() {
      this.$store.dispatch('rates/getTasaDeCambio')
      this.$store.dispatch('rates/getTasaDeCambio2')
      this.$store.dispatch('rates/addTasa', `${this.selectedItem}`)
      this.colored
    },
    computed: {
      tasas() {
      return this.$store.state.rates.tasas
      },
      datselec() {
        return this.tasas[`${this.selectedItem}`]
      },
      objeTotal() {
      return this.tasas
      },
      // orden() {
      //   return this.tasas.sort( (a , b) => b.tasa - a.tasa)
      // },
      colored() {
        return this.$store.state.rates.tasas[0].color = this.color
      }
    },
    methods: {
      tasaSelect() {
      this.$store.dispatch('rates/addTasa', `${this.selectedItem}`)
      this.$store.dispatch('rates/addSelec', `${this.datselec}`)
      console.log(this.datselec);
      }
    }
  }
</script>

<style scoped>
  .colorCard {
    background-color: #c71c1c;
  }  
</style>