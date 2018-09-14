<template>
    <div class="dashboard border border-light">
        <p>{{ user }}</p>
        <h1>{{ msg }}</h1>
        <br>
        <button class="btn btn-lg btn-danger btn-block" v-on:click="logout">logout</button>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                msg: 'Welcome to your dashboard!',
                user: ''
            }
        },
        beforeCreate: function () {
            if (this.$session.exists() === false) {
                this.$router.push({
                    name: 'login'
                });
            }
        },
        beforeMount: function() {
            this.user = this.$session.get('username');
        },
        methods: {
            logout() {
                this.$session.destroy();
                this.$router.push({
                    name: 'login'
                });
            }
        }
    }
</script>

<style scoped>
    div.dashboard {
        margin: 10% auto 0px auto;
        max-width: 500px;
        padding: 5% 45px;
        text-align: center;
        background: #fff;
    }
    div.dashboard p {
        color: #ececec
    }
</style>