<template>
    <div>
        <v-col class="mt-5" v-if="!volver">
            <Login class="mb-5" />
            <a @click="volvere">Registrar</a>
        </v-col>
        <v-col class="mt-5" v-show="volver" >
            <Register  class="mb-5" />
            <a @click="volvere">volver</a>
        </v-col>
    </div>
</template>

<script>
import Register from '@/components/auth/Register'
import Login from '@/components/auth/Login'
export default {
    components: {
        Register,
        Login
    },
    data: () => ({
      volver: false,
    }),
    methods: {
        volvere() {
            this.volver = !this.volver
        }
    }
}
</script>