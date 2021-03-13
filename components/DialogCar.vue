<template>
  <v-row justify="end">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="300px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          outlined
          color="yellow"
          small
          dark
          @click="monto"
          v-bind="attrs"
          v-on="on"
        >
          Ofertar
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <v-avatar size="28">
            <img src="/icon.png" alt="">
          </v-avatar>
          <span class="headline ml-2">@username</span>
        </v-card-title>
        <v-card-text>
          <v-row
            align="center"
            class="mx-0"
          >
            <v-rating
              :value="3.5"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="grey--text ml-4">
              3.5 (41)Ofertas
            </div>
          </v-row>

          <div class="subtitle-2 mt-4">
            <span>{{ pedidos[0].amount}} $ - {{ pedidos[0].ciudad }}</span>
            <span>• {{ pedidos[1].nombre }}</span>
          </div>

          <!-- <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div> -->
        </v-card-text>
        <v-divider class="mx-4"></v-divider>

        <v-card-title>Tasas a ofertar</v-card-title>

        <v-card-text>
          <v-chip-group
            v-model="selection"
            mandatory
            active-class="teal darken-4 white--text"
            column
          >
            <v-chip
              v-for="(item, i) in tasas"
              :key="i"
              @click="tasaMul"
            >
              {{ item.nombre }}
            </v-chip>

          </v-chip-group>
          <div class="subtitle-1 green--text">
            $ • {{ tasaid.tasa }}
          </div>
          <span>Total > {{ pedidos[0].amount * tasaid.tasa }} </span>
        </v-card-text>
        <v-card-actions>
          <!-- <v-spacer></v-spacer> -->
          <v-btn
            outlined
            color="yellow"
            @click="dialog = false"
          >
            Enviar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: {
      pedidos: {
        type: Array,
        default: () => ({})
      }
    },
    data: () => ({
      dialog: false,
      selection: 0,
    }),
    // created() {
    //   console.log(this.dataPedidos);
    // },
    computed: {
      tasas() {
        return this.$store.state.rates.tasas
      },
      tasaid() {
        return this.tasas[this.selection]
      }
      // pediTasa() {
      //   return this.tasaid * 
      // },
    },
    methods: {
      tasaMul() {
        // const tasa = this.multiTasa * 
        console.log(this.tasaid);
      },
      monto() {
        console.log(this.pedidos);
      }
    }
  }
</script>