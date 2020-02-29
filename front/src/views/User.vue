<template>

    <div >
        <Header/>
        <h1>MY PROFILE</h1>
        <div>
            <div class="card" style="margin: 10px auto">
                <img :src="pic" alt="Avatar" style="width:100%">
                <div class="container">
                    <h4><b>Username: {{username}}</b></h4>
                    <p>Role: {{role}}</p>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import Header from "@/components/Header";
    import { mapActions } from 'vuex'
    import { mapState } from 'vuex'
    export default {
        name: "User",
        components: {Header},
        comments: {
            Header
        },
        data()  {
            return{
                username: localStorage.getItem('user'),
                pic: localStorage.getItem('pic'),
                role: localStorage.getItem('role')
            }
        },
        computed: {
           ...mapState['user']
        },
        methods: {
            ...mapActions['load_user']
        },
        mounted: function () {
            if(localStorage.getItem('auth') == null){
                this.$router.push('../log')
                return
            }
           this.load_user(localStorage.getItem('user_id'))
        }
    }
</script>

<style scoped>
    .card {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        width: 40%;
    }

    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    .container {
        padding: 2px 16px;
    }
</style>
