<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="300px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          outlined
          color="yellow"
          dark
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
              :value="4.5"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="grey--text ml-4">
              4.5 (41)Ofertas
            </div>
          </v-row>

          <div class="subtitle-2 mt-4">
            <span>10 $ - Anaco</span>
            <span>$ • {{ tasas[0].tasa }}</span>
          </div>

          <!-- <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div> -->
        </v-card-text>
        <v-divider class="mx-4"></v-divider>

        <v-card-title>Tasas a ofertar</v-card-title>

        <v-card-text>
          <v-chip-group
            v-model="selection"
            active-class="teal darken-4 white--text"
            column
          >
            <v-chip @click="datos">{{ tasas[0].nombre }}</v-chip>
            <v-chip>{{ tasas[1].nombre }}</v-chip>

          </v-chip-group>
          <div class="subtitle-1 green--text">
            $ • {{ tasas[0].tasa }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
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
    data: () => ({
      dialog: false,
      selection: '',
    }),
    created() {
      console.log(this.dat);
    },
    computed: {
      tasas() {
        return this.$store.state.rates.tasas
      },
      dataPedidos() {
          return this.$store.state.pedidos.pedidos
      },
      dat() {
        return this.$store.state.rates.data
        },
    },
    methods: {
      datos() {
        console.log(this.dataPedidos);
      }
    }
  }
</script>