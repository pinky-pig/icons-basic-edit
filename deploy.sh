#!/usr/bin/env sh

# 关于错误
set -e

# 打包项目
npm run build

# 进入生成的文件夹目录
cd dist

# 执行命令上传到GitHub仓库到 gh-pages 分支（代码在master分支，打包生成的静态页面在gh-pages分支）
git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/pinky-pig/icons-basic-edit.git main:gh-pages

# 返回目录，将刚才打包生成的静态文件在目录中删除
# cd -
# rm -rf docs/.vitepress/dist
