<template>
    <div>
        <div  v-for="theme in themes" :key="theme.id">
            <h2 >{{theme.title}}</h2>
            <h2 >{{theme.content}}</h2>
            <hr>
        </div>

    </div>
</template>

<script>

    import {mapActions, mapState} from 'vuex';

    export default {
        name: "Home",
        computed: {
            ...mapState(['themes'])
        },
        methods: {
            ...mapActions(['load_themes']),

            loadThemes : function () {
                this.load_themes()
            }
        },
        mounted: function () {
            this.load_themes()
        },
        data() {
            return {
                items:[
                    {msg: 'msg', mss: 'mss'},
                    {msg: 'msg2', mss: 'mss2'},
                    {msg: 'msg3', mss: 'mss3'}
                ]
            }

        }

    }
</script>

<style scoped>

</style>
