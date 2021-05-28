import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Contact from "./views/Contact.vue";
import Projects from "./views/Projects.vue"
import Project from "./views/Project.vue"
import ThreeDScroll from "./views/ThreeDScroll.vue"

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact
    },
    {
      path: "/projects",
      name: "projects",
      component: Projects
    },
    {
      path: "/project/:slug",
      name: "project",
      component: Project
    },
    {
      path: "/3d-scroll",
      name: "3dScroll",
      component: ThreeDScroll
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   debugger
//   if (to.name == '3dScroll') {
//     // .classList.remove("position-relative")
//   }
//   next()
// })
export default router