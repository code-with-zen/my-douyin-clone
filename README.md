# tiktok

一、环境搭建和手脚架的使用

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

bug1：此时发现背景并不是黑色，tailwind并未生效，原因是tailwindcss@4.1.17与脚手架Modern.js不兼容
解决方案：降级到tailwindcss@3.4.17，问题解决

bug2：此时发现字体也是黑色的，css需要修改
解决方案：在index.css中设置字体颜色

bug3：测试侧边栏发现选中侧边栏的颜色不对
解决方案：继续在index.css中修改选中组件背景色、文字颜色和鼠标悬停背景色

bug4：测试侧边栏发现收起时组件宽窄不变，原因是layout.tsx中没有设置状态
解决方案：使用useState管理折叠状态，动态设置Sider宽度

阶段一效果图：

![image.png](image.png)

二、视频的嵌入

引入xgplayer和jotai：

```bash
pnpm install xgplayer jotai
```

在src\components\VideoPlayer.tsx中创建视频组件，并在page.tsx中引入视频组件

在src\store\atom.ts中定义播放状态
测试图如下：

![image.png](image%201.png)

三、视频内容展示

在src\components\VideoInfoOverlay.tsx中定义右侧交互栏和下侧的详情，并在page中引入
bug:交互栏的图标颜色始终无法更改
解决方案：原因是在引入tailcss时用!important把图标颜色写死了，改为默认白色
测试图如下：

![image.png](image%202.png)

四、评论区

在src\components\CommentDrawer.tsx中定义评论区，并在page中引入

测试图如下：

![image.png](image%203.png)