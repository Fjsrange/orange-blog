import { setSidebar } from "./gen_sidebar.mjs";

export default [
  {
    text: "手把手教你写油猴脚本",
    link: "/油猴",
  },
  {
    text: "Examples",
    items: [
      { text: "Markdown Examples", link: "/markdown-examples" },
      { text: "Runtime API Examples", link: "/api-examples" },
    ],
  },
];

// export default {
//   "/learn/vue2/": setSidebar("/docs/learn/vue2"),
// };
