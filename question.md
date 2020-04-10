# 问题记录
***
- 搜索api不能用<br>
方法1(https://movie.douban.com/j/subject_suggest?q=追龙)<br>
## 可用
方法2 (http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10)<br>
万能知乎 (https://www.zhihu.com/topic/19615958/newest)<br>
(https://zhuanlan.zhihu.com/p/77620888)<br>
apiKey '0df993c66c0c636e29ecbb5344252a4a`<br>
- fix (https://github.com/zce/douban-api-proxy/issues/15)<br>
***
- 图片展示不出<br>
- fix (https://images.weserv.nl/docs/#how-it-works)<br>
***

#仍需做
***
~~1.用户登录注册~~<br>
~~2.用户行为数据，埋点~~<br>
3.收藏列表
4.喜欢这部剧的人也喜欢
***
#todo待优化点
***
1.演员导演，可展示详细信息<br>
2.推荐标签页<br>
***


(https://api.douban.com/v2/movie/imdb/tt0111161?apikey=0df993c66c0c636e29ecbb5344252a4a)

#用户行为日志设计
***
- 如何表示用户
```text
user id
产生行为的用户
item id
产生行为的对象
behavior type
行为的种类(如购买还是浏览)
context
产生行为的上下文，包括时间和地点
behavior weight
行为的权重(用户评分、观看时长等)
behavior content
行为的内容(评论文本、标签等)
```

- 数据集的一般分类
```text
无上下文信息的隐性反馈数据集
包含 user id, item id
如 Book-Crossing
无上下文信息的显性反馈数据集
包含 user id, item id, 物品评分
有上下文信息的隐性反馈数据集
包含 user id, item id, 用户对物品产生行为的 timestamp
如 Lastfm
有上下文信息的显性反馈数据集
包含 user id, item id, 物品评分, 用户对物品产生行为的 timestamp
如 Netflix Prize
```
***
