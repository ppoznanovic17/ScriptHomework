<template>

    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand @click="goHome">Petar's project</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item @click="goHome">Home</b-nav-item>
                <b-nav-item href="#">Start  Theme</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>

                <b-nav-item href="#" right @click="goLog">Login</b-nav-item>
                <b-nav-item href="#" right>Logout</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
<script>

    export default {
        name: "Header",
        methods: {
            goLog: function() {
                this.$router.push({ path: `/log` }) // -> /user/123
            },
            goHome: function () {
                this.$router.push({ path: `` }) // -> /user/123
            }
        }
    }

</script>


<style scoped>

</style>
