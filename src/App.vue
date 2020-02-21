<template>
  <div id="app">
    <transition mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  beforeCreate() {
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  computed: {
    ...mapGetters({ state: "get_state", house_list: "get_house_list" })
  },
  methods: {
    ...mapActions(["request_house_list", "request_user_list"])
  },
  mounted() {
    this.request_house_list();
    this.request_user_list();
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.8s ease;
}
body {
  margin-top: -50px;
   /* background-color:rgba(0.1, 0.1, 0.1, 0.1); */
}
a {
  text-decoration: none;
}
</style>
