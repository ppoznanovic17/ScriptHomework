<template>
    <div>
    <Header/>
        <div class="div">
            <div>
                <label for="a">Title:</label>
                <br>
                <input type="text" id="a" name="Title" v-model="title" placeholder="Title">


                <br>
                <br>
                <br>
                <label for="b">Content:</label>
                <br>
                <textarea type="text" id="b" name="Content" v-model="content" placeholder="Content">
                </textarea>
                <p style="color: red; font-size: 10px" v-show="msgbool"> {{msg}}</p>
                <button class="btn dark" @click="addNew">SAVE</button>


            </div>
        </div>
    </div>
</template>

<script>

    import Header from "@/components/Header"
    import { mapActions } from 'vuex'

    export default {
        name: "NewTheme",
        components: {Header},
        component: {
            Header
        },
        data() {
            return{
                theme: {
                    title: '',
                    content: '',
                    user_id: localStorage.getItem('user_id'),
                    picture: localStorage.getItem('pic'),
                    username: localStorage.getItem('user')
                },
                title: '',
                content: '',
                msg: '',
                msgbool: false

            }
        },
        methods: {
            ...mapActions(['new_theme']),

            addNew: function () {
                if(this.title.length < 3 || this.title.length>15){
                    this.msgbool = true
                    this.msg = 'Title must be longer than 3 and shorter than 15 characters.'
                    return
                }
                if(this.content.length < 3 || this.content.length>200){
                    this.msgbool = true
                    this.msg = 'Content must be longer than 3 and shorter than 15 characters.'
                    return
                }
                this.theme.content = this.content
                this.theme.title  = this.title
                this.content = ''
                this.title = ''
                const themeJson = JSON.stringify(this.theme);
                this.msgbool = false
                this.msg = ''
                this.new_theme(themeJson)
                this.$router.push('/')

            }
        }
    }
</script>

<style scoped>
    textarea, select {
        width: 100%;
        height: 80px    ;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    input[type=submit] {
        width: 100%;
        background-color: #888888;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    input[type=submit]:hover {
        background-color: #DDDDDD;
        color: #000;
    }

    .div {
        border-radius: 5px;
        background-color: #f2f2f2;
        padding: 20px;
        width: 60%;
        margin: 10px auto   ;
    }
    img{
        height: 80px;
        width: 80px;


    }
    .btn{
        background: #888888;
        color: black;
    }

    .lbl{
        background: black;
        color: white;
    }

    .green:hover{
        color: white;
        background: green;
    }


    .red:hover{
        color: white;
        background: red;
    }

    .dark:hover{
        color: white;
        background: #000000;
    }
</style>
