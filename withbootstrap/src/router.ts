import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader.vue";
import StartPage from "./pages/StartPage.vue";
import Reservation from "./pages/Reservation.vue";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "start",
      components: {
        header: AppHeader,
        default: StartPage
      }
    },
    {
      path: "/reservation",
      name: "reservation",
      components: {
        default: Reservation
      }
    }
  ]
});
