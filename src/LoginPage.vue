<template>
    <div>
        <div class="bg-yellow-900 py-4">
            <div class="container mx-auto flex items-center justify-between">
                <div class="text-red-100 text-4xl">Todo</div>
            </div>
        </div>
        <div class="container border-2 p-3 rounded-md border-yellow-900 mx-auto w-1/3 mt-24">
            <a-tabs default-active-key="signin" @change="tabChange">
                <a-tab-pane key="signin" tab="Sign In">
                    <a-input-group>
                        <a-input
                            v-model="form.email"
                            class="inputbox"
                            size="large"
                            placeholder="Email"
                        />
                        <a-input-password
                            v-model="form.password"
                            class="inputbox"
                            size="large"
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            class="inline-block px-6 mt-4 py-2 border border-blue-500 text-blue-500 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            v-on:click="SignIn"
                        >
                            Login
                        </button>
                    </a-input-group>
                </a-tab-pane>
                <a-tab-pane key="signup" tab="Sign Up">
                    <a-input-group>
                        <a-input
                            v-model="form.email"
                            class="inputbox"
                            size="large"
                            placeholder="Email"
                        />
                        <a-input-password
                            v-model="form.password"
                            class="inputbox"
                            size="large"
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            class="inline-block px-6 mt-4 py-2 border border-blue-500 text-blue-500 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            v-on:click="SignUp"
                        >
                            Sign Up
                        </button>
                    </a-input-group>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SIGNIN, SIGNUP } from "./store/modules/helper";

export default {
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
        };
    },
    computed: {
        ...mapGetters("auth", ["cred"]),
    },
    created() {
        if (this.cred) {
            this.$router.push("/todos");
        }
    },
    methods: {
        tabChange() {
            this.form = {
                email: "",
                password: "",
            };
        },
        SignIn() {
            this.$store.dispatch(SIGNIN, this.form);
        },
        SignUp() {
            this.$store.dispatch(SIGNUP, this.form);
        },
    },
};
</script>

<style scoped>
.inputbox {
    margin-top: 20px;
}
</style>
