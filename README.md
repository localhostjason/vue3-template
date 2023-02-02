# vue3-template

### 前提

​	此整个框架搭建 环境要求，node和npm版本尽可能最新，若以后将webpack替换vite相对容易

```
node: v18.13.0
npm: 8.19.3
```



### 技术栈

| 名称         | 描述                                     |
| ------------ | ---------------------------------------- |
| vue3         | vue核心代码库                            |
| vue-router   | vue 路由                                 |
| pinia        | vue 状态管理，替代vuex。比vuex使用更友好 |
| webpack      | 模板管理构建工具                         |
| element-plus | 核心 UI 库。issue很多，不影响真正使用    |
| lodash       | 强大的js函数库                           |
| echarts      | 核心 图表库。很强大                      |



### 运行步骤

```shell
npm install
npm run serve

# build
npm run build
```

webpack 更详细配置查看 [Configuration Reference](https://cli.vuejs.org/config/).



页面展示：

![p1](./example/image-20230130111944216.png)

![home2](./example/img.png)
