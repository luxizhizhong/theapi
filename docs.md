
## 反向代理
使用此接口可以反向代理,达到跨域的目的

_**get** /proxy/**_

> 栗子

```console
# /proxy后面是代理的接口地址
curl http://localhost:3000/proxy/https://api.isoyu.com/index.php/api/News/banner
```

## utils
> 意在便捷的使用`API`
 
#### 时间
_**get** /utils/time_

#### 网易云音乐
直接获取音乐真实地址,需要传递歌曲`id`

_**get** /utils/nem/dl?id=&_

搜索音乐,需要传递`keywords`

_**get** /utils/nem/search?keywords=&_

歌单,需要传递歌单`id`

_**get** /utils/nem/playlist?id=&_

歌词,需要传递歌曲`id`

_**get** /utils/nem/lyric?id=&_

歌曲详情,需要传递歌曲`id`

_**get** /utils/nem/song?id=&_

#### 返回文本
在有些地方,这个需求显得很有用
意在直接返回文本,必须传入文本

_**get** /utils/txt/&_

#### markdown 在线预览(测试)
markdown在下预览,我觉得是很实用的,所以就添加了这个接口
(这个接口在测试,不稳定)
需要传递`url`

_**get** /utils/md?url=&_

#### bing美图
此接口可返回`bing`美图,一个是`json`接口,另一个直接`302`到真实链接

_**get** /utils/bing_

_**get** /utils/bing?type=img_ (直接返回图片)

## 葫芦侠
> by@[d1y](https://github.com/d1y) 2019.01.22 葫芦侠版本号: 3.5.0.83.3

#### 游戏搜索建议

> 参数

_**get** /huluxia/tools?type=search&keys=suggest_

> 测试

```console
$ curl http://localhost:3000/huluxia/tools?type=search&keys=suggest
{"msg":"","list":["武动九天","怪物猎人物语"],"status":1}
```

#### 游戏应用推荐

> 参数

_**get** /huluxia/tools?type=search&keys=recommend_

> 测试

```console
$ curl http://localhost:3000/huluxia/tools?type=search&keys=recommend
{
    "msg": "",
    "keywodList": [
        "吃鸡",
        "穿越火线",
        "奔跑吧兄弟",
        "王者荣耀",
        "葫芦侠我的世界",
        "天天酷跑",
        "饥荒",
        "登山赛车",
        "愤怒的小鸟"
    ],
    "colors": [
        "#ff0000",
        "#F4A549",
        "#ff0000",
        "#D385FB",
        "#ff0000",
        "#ff0000",
        "#ff0000",
        "#ff0000",
        "#ff0000"
    ],
    "status": 1
}
```

#### 游戏(应用)搜索

> 参数

_**get** /huluxia/tools?type=search&keyword=文字_

需要传入的`keyword`关键字用来搜索

> 测试

```console
$ curl http://localhost:3000/huluxia/tools?type=search&keyword=打工
{
    "msg": "",
    "gameapps": [
        {
            "appid": 34209,
            "apptitle": "打工吧！UFO 中文版",
            "appdesc": "..",
            "appcrackdesc": "【花花花】进入游戏赠送大量货币",
            "appsize": "46.35",
            "applogo": "..",
            "apptags": "免费下载,畅玩,汉化",
            "applanguage": "中文",
            "appversion": "1.0.4",
            "categoryname": "休闲益智",
            "categoryalias": "休闲",
            "appauthorization": "免费",
            "opentype": 0,
            "apptype": null,
            "packname": "jp.halegg.nazcaf",
            "appcrc": "",
            "shareurl": "..",
            "share": false,
            "username": "手谈汉化组",
            "system": "Android 4.4.2",
            "versionCode": 8,
            "storagePath": 0,
            "businessType": 0,
            "pageSize": 48605535,
            "md5": "",
            "cloudStatus": 0,
            "downFileType": 0,
            "openCloudType": 1,
            "imageresource": null,
            "appdownul": [
                {
                    "name": "普通下载",
                    "url": ".."
                }
            ],
            "isLocationBased": 0
        }
    ],
    "categorytitle": null,
    "more": 0,
    "start": "10",
    "status": 1
}
```

#### 返回首页游戏

> 参数

_**get** /huluxia/tools?type=game&keys=recommend_

#### 游戏(应用)详情(必须传入一个app_id)

> 参数

_**get** /huluxia/tools?type=game&keys=detail&app_id=110_

#### 游戏(应用)评论(必须传入一个app_id)

_**get** /huluxia/tools?type=game&keys=comment&app_id=110_

#### 所有板块

_**get** /huluxia/floor?type=category_

**需要一提的是,有些板块无法访问,比如`我的关注`,还有`系统推荐`之类,需要自行`slice`**

#### 热帖

_**get** /huluxia/floor?type=hot_post_

#### 板块(需要传递 cat_id)

_**get** /huluxia/floor?cat_id=43_

**在所有板块里有传递的 cat_id**

#### 帖子(需要传递 post_id)

_**get** /huluxia/floor?post_id=23_

翻页功能未实现...