<script setup>
import DefaultTheme from "vitepress/theme";
import { watch } from "vue";
import Giscus from "@giscus/vue";
import { useData, useRoute, inBrowser } from "vitepress";

const { page, isDark } = useData();
const { Layout } = DefaultTheme;

watch(isDark, (dark) => {
  if (!inBrowser) return;
  const iframe = document
    .querySelector("giscus-widget")
    ?.shadowRoot?.querySelector("iframe");

  iframe?.contentWindow?.postMessage(
    {
      giscus: {
        setConfig: { theme: dark ? "dark" : "light" },
      },
    },
    "https://giscus.app"
  );
});
</script>

<template>
  <Layout>
    <template #doc-after>
      <div style="margin-top: 20px">
        <Giscus
          :key="page.filePath"
          repo="ghostchan/orangeDiscus"
          repoId="R_kgDOH5X9Yw"
          category="Announcements"
          categoryId="DIC_kwDOH5X9Y84CQjzj"
          mapping="title"
          scrict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          :theme="isDark ? 'dark' : 'light'"
          inputPosition="top"
          lang="zh-CN"
          crossorigin="anonymous"
        ></Giscus>
      </div>
    </template>
  </Layout>
</template>

<style>
iframe {
  width: 100%;
  height: 400px;
  border-top-width: 0px;
  border-bottom-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  margin-top: 40px;
  margin-bottom: 40px;
}

/* 表格宽度自适应 */
th,
td {
  white-space: nowrap !important; /* 不让th，td内容换行 */
  width: 1%; /* 强制均匀分配宽度 */
}

/* markdown图片居中 */
.main img {
  display: block;
  margin: 0 auto;
}
</style>
