
## 查看提交日志
> git log --pretty=oneline

## 删除 git 仓库文件

> git rm -r -n [targetFile]

```
-r  递归移除目录

-n  加上这个参数，执行命令时，是不会删除任何文件，而是展示此命令要删除的文件列表预览
    所以一般用这个参数先看看要删除哪些文件，防止误删，确认之后，就去掉此参数，真正的删除文件。

如果只想从版本库中删除, 但是本地仍旧保留的话,加上 --cached 
git rm -r --cached [targetFile]

删除远程版本库中的文件
git commit -m "移除target目录下所有文件"
git push origin dev
```