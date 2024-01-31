---
title: git npm 操作命令
tag:
  - git
  - npm
categories:
  - git
  - npm
keywords: 'git,npm'
addrlink: dda8c81b
date: 2020-03-24 01:06:33
description:
top_img:
cover: 'https://img.zhangaming.com/mayday/dna.jpg'
---
# npm 上传组件

https://blog.csdn.net/qq_41694291/article/details/104328725

## npm 常用操作命令

## 设置代理

1. npm config get registry 获取代理地址
2. npm config set registry url 设置代理地址
3. npm login 登录个人账户
4. npm publish 发布包
5. npm config delete registry

## npm 出问题

npm install 时，一直停留在 fetchMetaData network 不动，可能是网速问题导致的，所以可以使用办法 1：设置淘宝镜像来解决。
解决办法 1：设置淘宝镜像
可以先检测一下 npm 的源是不是淘宝的镜像源：

npm config get registry
1
如果终端 Terminal 返回：

https://registry.npm.taobao.org/
1
则表示已经设置了淘宝的镜像源。

否则，就需要设置淘宝镜像：

npm config set registry https://registry.npm.taobao.org
1
配置后再通过刚才的检测方式验证是否设置成功：

npm config get registry

## github 出现问题

https://www.zhihu.com/question/26717343/answer/1041220251

github,Empty reply from server

主要是代理问题

打开 Git 命令页面，执行 git 命令脚本：修改设置，解除 ssl 验证

git config --global http.sslVerify "false"

清楚代理

1. 取消本地代理

git config --unset http.proxy

2. 取消全局代理

git config --global --unset http.proxy
3. 取消代理
	1、npm config delete  registry
## git 表情地址

https://gitmoji.dev/

## .在~/.gitconfig 目录下多出一个文件，用来记录你的密码和帐号

git config --global credential.helper store

## 再最后输入一次正确的用户名和密码，就可以成功的记录下来，这是最后一次麻烦啦！

git pull

## git 操作命令

git branch 查看当前所有分支
git branch xxx 创建分支 xxx
git checkout xxx 切换分支
git merge xxx 在当前分支 合并 aaa 分支
git branch -d xxx 删除 xxx 分支
git branch -D xxx 强制删除 当前分支
git push origin --delete xxx 删除远程分支 xxx
git branch -a 查看本地和远程分支 a 指的是 all

git clone url -b dev 克隆远程分支 dev 下来 （克隆指定分支） url 指的是网址
git fetch (拉所有远程分支下来)

git checkout 切换
git checkout -b funa 切换并在本地生成一个 funa 分支

###. 代码回退

首先你要用 git log 查看你要回到的那个本版，

然后用

git reset --hard HEAD^ 回退到上个版本
git reset --hard commit_id 退到/进到 指定 commit_id

来把你的本地代码回到你复制的某个版本上
如果你要吧回退的某个版本提交的远程的话
git push origin HEAD --force

当你回滚之后，又后悔了，想恢复到新的版本怎么办？

用 git reflog 打印你记录你的每一次操作记录

git reflog 可以查看所有分支的所有操作记录（包括（包括 commit 和 reset 的操作），包括已经被删除的 commit 记录，git log 则不能察看已经删除了的 commit 记录，而且跟进结果可以回退道某一个修改

###. 如果你要回吧本地的代码回到最新的并且你回退的版本没有提交到远程 就用

git checkout master

##特殊情況

当你本地分支 all 所显示的 与 git 线上所显示的远程分支名不一样

先 git remote show origin
再 git remote prune origin
