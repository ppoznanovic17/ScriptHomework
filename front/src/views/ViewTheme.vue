<template>
    <div>


        <Header/>
        <h1>START NEW THEME</h1>
        <div class="w3-card-4" style="width: 80%; margin: 35px auto">

            <header class="w3-container w3-light-grey">
                <h3>{{theme.title}}</h3>
            </header>

            <div class="w3-container" style="display: flex">

                <div style="flex-grow: 1; border-right: 1px solid #999999; height: 100px">
                    <img  :src="theme.picture" :alt="theme.username" >
                    <p>{{theme.date.slice(8,10)}}.{{theme.date.slice(5,7)}}.{{theme.date.slice(0,4)}} by <b>{{theme.username}}</b></p>
                </div>
                <div style="flex-grow: 5; text-align: left; margin-left: 20px">
                    <p >{{theme.content}}</p>
                </div>

            </div>
            <div v-show="isSameUser(theme.username)">
                <label class="lbl" style="width: 100%" >SAVE</label>

            </div>



        </div>

        <div class="div">
            <div>
                <label for="fname">Comment:</label>
                <br>
                <textarea type="text" id="fname" name="firstname" v-model="text" placeholder="Write comment ...">
                </textarea>
                <button class="btn dark" @click="addComment">ADD</button>

                <p style="color: red; font-size: 10px" v-show="err"> {{err}}</p>
            </div>
        </div>


        <hr style="width: 90%;margin: 1px auto">
        <hr style="width: 90%;margin: 1px auto">


        <div class="div" style="display: flex; padding: 5px" v-for="com in comments.slice().reverse()" :key="com.id">
            <div style="flex-grow: 1" >
                <img :src="com.picture" :alt="com.username">
                <p>{{com.username}}</p>
                <button class="btn dark" v-show="isSameUser(com.username)" @click="edit(com.id)" style="margin-right: 5px">Edit</button>
                <button class="btn dark"  v-show="isSameUser(com.username)" @click="deleteComment(com.id)">Delete</button>
            </div>
            <div style="flex-grow: 5; display: flex; flex-direction: column">
                <div style="flex-grow: 10; border: 1px solid #999999; text-align: left; padding: 3px">
                    {{com.content}}
                </div>
                <div style="flex-grow: 1">
                    <p>{{com.date.slice(8,10)}}.{{com.date.slice(5,7)}}.{{com.date.slice(0,4)}}</p>
                </div>
            </div>

        </div>




    </div>
</template>

<script>

    import { mapState } from 'vuex'
    import { mapActions} from 'vuex'
    import Header from "@/components/Header";
    export default {
        name: "ViewTheme",
        components: {
          Header
        },
        data() {
            return{
                comment:{
                    content: String,
                    user_id: localStorage.getItem('user_id'),
                    theme_id: this.$route.params.id,
                    username : localStorage.getItem('user'),
                    picture: localStorage.getItem('pic')
                },
                text: '',
                err: null,
                delete:false
            }
        },
        computed: {
            ...mapState(['themes', 'theme', 'comments'])
        },
        methods: {
          ...mapActions(["load_theme", 'load_themes', 'load_comments', 'new_comment', 'delete_comment']),

            isSameUser: function (username) {
                if(localStorage.getItem('user') == username){
                    return true
                }
                else{
                    return false
                }
            },
            addComment: function () {
                if(this.text.length <150 && this.text.length>2){
                    this.comment.content = this.text
                    this.new_comment(JSON.stringify(this.comment))
                    window.console.log(JSON.stringify(this.comment))
                    this.err = null
                    this.text = ''
                }else{
                    this.text = ''
                    this.err = 'Comment length must be between 3 and 150 characters'
                }

            },
            deleteComment: function (id) {
                this.delete_comment(id)
                this.$router.push('../')
            },
            edit: function (id) {
                this.$router.push(`../comment/${id}`)
            }
        },
        mounted: function () {
            if(localStorage.getItem('auth') == null){
                this.$router.push('../log')
                return
            }
            this.load_themes()
            this.load_theme(this.$route.params.id)
            this.load_comments(this.$route.params.id)
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
