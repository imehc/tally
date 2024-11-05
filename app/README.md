[yarn](https://reactnative.dev/blog/2024/04/22/release-0.74#yarn-3-for-new-projects)
[调试](https://fbflipper.com/)
[splash](https://github.com/zoontek/react-native-bootsplash?tab=readme-ov-file#full-command-usage-example)

## 踩坑
[无法识别别名](https://github.com/tleunen/babel-plugin-module-resolver/issues/354#issuecomment-475858527)

[v0.76控制台报错](https://github.com/callstack/react-native-paper/issues/4401#issuecomment-2332537632)

# 仓库
[地址](https://reactnative.directory/)

# 升级
[地址](https://react-native-community.github.io/upgrade-helper)

## 生成启动页面
``` bash
yarn react-native generate-bootsplash src/assets/images/bootsplash_logo_original.jpg \
  --platforms=android,ios \
  --background=F5FCFF \
  --logo-width=100 \
  --assets-output=assets/bootsplash \
  --flavor=main  
```

# 验证
- [x] Android Platform
- [ ] IOS Platform