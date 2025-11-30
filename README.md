# my-douyin-clone

# 一、环境搭建和手脚架的使用

创建项目：

```bash
npx @modern-js/create@latest my-douyin-clone
```

安装 UI 组件库：

```bash
pnpm add @douyinfe/semi-ui @douyinfe/semi-icons @douyinfe/semi-foundation
```

安装并配置tailwindcss：

```bash
pnpm add -D tailwindcss @modern-js/plugin-tailwindcss
```

在根目录下创建配置文件tailwind.config.ts，并在modern.config.ts中引入并启用tailwindcssPlugin()插件，在index.css中引入tailwind

主页和布局开发：

src/routes/page.tsx是主页，清空准备开发

src/routes/layout.tsx为布局文件，page.tsx的父级，引入ui组件库中的Header, Sider, Content，设计好顶栏和侧边栏

bug1：此时发现背景并不是黑色，tailwind并未生效，原因是tailwindcss@4.1.17与脚手架Modern.js不兼容 解决方案：降级到tailwindcss@3.4.17，问题解决

bug2：此时发现字体也是黑色的，css需要修改 解决方案：在index.css中设置字体颜色

bug3：测试侧边栏发现选中侧边栏的颜色不对 解决方案：继续在index.css中修改选中组件背景色、文字颜色和鼠标悬停背景色

bug4：测试侧边栏发现收起时组件宽窄不变，原因是layout.tsx中没有设置状态 解决方案：使用useState管理折叠状态，动态设置Sider宽度

阶段一效果图：

![image](../assets/blog_res/README.assets/image.png)

# 二、视频的嵌入

引入xgplayer和jotai：

```bash
pnpm install xgplayer jotai
```

在src\components\VideoPlayer.tsx中创建视频组件，并在page.tsx中引入视频组件

在src\store\atom.ts中定义播放状态 测试图如下：

![image 1](../assets/blog_res/README.assets/image 1.png)

# 三、视频内容展示

在src\components\VideoInfoOverlay.tsx中定义右侧交互栏和下侧的详情，并在page中引入 bug:交互栏的图标颜色始终无法更改 解决方案：原因是在引入tailcss时用!important把图标颜色写死了，改为默认白色 测试图如下：

![image 2](../assets/blog_res/README.assets/image 2.png)

# 四、评论区

在src\components\CommentDrawer.tsx中定义评论区，并在page中引入

测试图如下：

![image 3](../assets/blog_res/README.assets/image 3.png)

# 五、Mock

创建工具函数 src/utils/mockRequest.ts，模拟真实网络请求的延迟。

创建数据文件 src/mock/data.ts，把视频数据和评论数据抽离出来。

改造 State 管理 src/store/atoms.ts，把原来的“静态数组”改成“异步获取”。

在页面中引入数据 src/page.tsx

# PS：

由于个人前端基础不足，加之本次开发周期较为紧迫，项目中可能存在代码组织不够优雅、TypeScript 类型定义不够严格或部分边缘交互细节处理不到位的情况。

在这个过程中，我第一次尝试 **Modern.js** 全栈框架与 **Jotai** 原子化状态管理，虽然踩了不少坑（特别是 CSS 层级和第三方库的兼容性问题），但也通过查阅文档和调试解决了很多实际问题。

受限于时间和能力，目前的版本是一个核心功能验证版。如果还有更多时间，我会尝试完善以下功能：

1. 修复ui问题，优化界面。
2. 增加历史记忆和搜索栏等功能。
3. 接入真实的后端接口。