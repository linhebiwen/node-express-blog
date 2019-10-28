<details>
<summary>展开查看</summary>
2,以后每个业务或者基础组件维护自己的版本号，在CHANGELOG.md中，rider 构建以后的tag关联成自己的版本号；

3,整个大仓库不再有 tag，只有 master 主干分支，所有 mr 发送前，一定要注意先 merge master；

4,使用 Rider 构建以后（retag），回滚可以基于 Rider 的 retag 来回滚，而不是回滚大仓库的代码；

</details>
