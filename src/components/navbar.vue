<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand :to="{ name: 'Map'}">HOME</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown v-if="this.loggedIn == true" right>
                        <!-- Using 'button-content' slot -->
                        <template slot="button-content"><em>User</em></template>
                        <b-dropdown-item :to="{ name: 'New'}">Add Property</b-dropdown-item>
                        <b-dropdown-item :to="{ name: 'Map'}" @click="signOut">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item v-else :to="{ name: 'New'}" @click="signIn"><b-button variant="outline-info">Sign In</b-button></b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import { mapGetters } from 'vuex'

    const namespaced = true

    export default {
        namespaced,
        name: 'navbar',
        data() {
            return {
                // loggedIn: true
            }
        },
        computed: {
            ...mapGetters('loggedIn',['loggedIn']),
        },
        created(){
            console.log('logged in or not', this.loggedIn)
        },
        methods: {
            ...mapActions('loggedIn',['setloggedIn']),
            signIn(){
                this.setloggedIn(true)
            },
            signOut(){
                this.setloggedIn(false)
            }
        }
    }
</script>