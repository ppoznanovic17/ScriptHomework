<template>
    <div>
        <Header/>
        <div>
            <label >Current Comment Content:</label>
            <br>
            <label >{{comments[0].content}}</label>

            <div class="div">
                <div>
                    <label for="fname">Comment:</label>
                    <br>
                    <textarea v-model="text" type="text" id="fname" name="firstname"  placeholder="Write comment ...">
                </textarea>
                    <button class="btn dark" @click="editComment">Save</button>

                    <p style="color: red; font-size: 10px" v-show="err">{{msg}} </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Header from "@/components/Header";
    import { mapActions} from 'vuex'
    import { mapState} from 'vuex'

    export default {
        name: "EditComment",
        components: {Header},
        data() {
          return{
              text: '',
              err: false,
              msg: 'Comment content must have between 3 and 250 characters.'
          }
        },
        computed: {

                ...mapState(['comments'])

        },
        methods: {
            ...mapActions(['load_comment', 'change_comment']),

            editComment: function () {
                if(this.text.length<3 || this.text.length>250){
                    this.err = true
                    return

                }
                this.change_comment({id: this.$route.params.id, content: JSON.stringify({content: this.text})})


                    this.$router.push(`../theme/${this.comments[0].theme_id}`)

            }

        },
        mounted: function () {
            this.load_comment(this.$route.params.id)


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
    .dark:hover{
        color: white;
        background: #000000;
    }
    .btn{
        background: #888888;
        color: black;
    }
</style>
