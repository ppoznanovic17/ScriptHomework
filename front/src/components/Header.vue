<template>

    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand @click="goHome">Petar's project</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item @click="goHome" v-show="login">Home</b-nav-item>
                <b-nav-item @click="goNewTheme" v-show="login">Start  Theme</b-nav-item>
                <b-nav-item @click="goProfile" v-show="login">Profile</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <!--<b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>-->

                <b-nav-item href="http://localhost:8000/" target="_blank" right  v-show="admin">Admin Panel</b-nav-item>
                <b-nav-item href="#" right @click="goLog" v-show="!login">Login</b-nav-item>
                <b-nav-item href="#" right @click="goLogout" v-show="login">Logout</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
<script>
    export default {
        name: "Header",
        methods: {
            goLog: function() {
                this.$router.push({ path: `/log` })
            },
            goRegister: function() {
                this.$router.push({ path: `/reg` })
            },
            goHome: function () {
                this.$router.push({ path: `/` })
            },
            goLogout: function () {
                localStorage.removeItem('auth')
                localStorage.removeItem('user')
                localStorage.removeItem('user_id')
                localStorage.removeItem('role')
                localStorage.removeItem('pic')
                this.login = false
                this.$router.push({ path: `/log` })


            },
            isLog: function () {
                if(localStorage.getItem('auth')){
                    this.login = true
                }else {
                    this.login = false
                }

            },
            goProfile: function () {
                this.$router.push({ path: `../user/${localStorage.getItem('user_id')}` })
            },
            goNewTheme: function () {
                this.$router.push('../new/theme')
            },
            isAdmin: function () {
                if(localStorage.getItem('role') === 'admin'){
                    this.admin = true
                }else {
                    this.admin = false
                }
            }
        },
        data() {
            return{
                login: true,
                admin: false
            }
        },
        mounted : function ()
         {
            this.isLog()
             this.isAdmin()
        }
    }

</script>


<style scoped>

</style>
