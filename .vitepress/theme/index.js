// .vitepress/theme/index.js

// 可以直接在主题入口导入 Vue 文件
// VitePress 已预先配置 @vitejs/plugin-vue
import Layout from "./myLayout.vue";

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    router.onBeforeRouteUpdate = (to, from) => {
      // 线上环境才上报
      if (important.meta.env.MODE === "production") {
        if (typeof _hmt !== "undefined" && !!to) {
          _hmt.push(["_trackPageview", to]);
        }
      }
    };
  },
};
