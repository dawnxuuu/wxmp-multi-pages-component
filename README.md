# 微信小程序多页面组件

## 开发

1. 安装依赖：

```
npm install
```

2. 执行命令：

```
npm run dev
```

默认会在包根目录下生成 miniprogram\_dev 目录，src 中的源代码会被构建并生成到 miniprogram\_dev/components 目录下。如果需要监听文件变化动态构建，则可以执行命令：

```
npm run watch
```

> ps: 如果 minirpogram\_dev 目录下已存在小程序 demo，执行`npm run dev`则不会再将 tools 下的 demo 拷贝到此目录下。而执行`npm run watch`则会监听 tools 目录下的 demo 变动并进行拷贝。

3. 生成的 miniprogram\_dev 目录是一个小程序项目目录，以此目录作为小程序项目目录在开发者工具中打开即可查看自定义组件被使用的效果。


## 发布

> ps: 发布前得确保已经执行构建，小程序 npm 包只有构建出来的目录是真正被使用到的。

1. 如果还没有 npm 帐号，可以到[ npm 官网](https://www.npmjs.com/)注册一个 npm 帐号。
2. 在本地登录 npm 帐号，在本地执行：

```
npm adduser
```

或者

```
npm login
```

3. 在已完成编写的 npm 包根目录下执行：

```
npm publish
```

到此，npm 包就成功发布到 npm 平台了。

> PS：一些开发者在开发过程中可能修改过 npm 的源，所以当进行登录或发布时需要注意要将源切回 npm 的源。

## 目录结构

以下为推荐使用的目录结构，如果有必要开发者也可以自行做一些调整:

```
|--miniprogram_dev // 开发环境构建目录
|--miniprogram_dist // 生产环境构建目录
|--src // 源码
|   |--components // 通用自定义组件
|   |--images // 图片资源
|   |
|   |--xxx.js/xxx.wxml/xxx.json/xxx.wxss // 暴露的 js 模块/自定义组件入口文件
|
|--test // 测试用例
|--tools // 构建相关代码
|   |--demo // demo 小程序目录，开发环境下会被拷贝生成到 miniprogram_dev 目录中
|   |--config.js // 构建相关配置文件
|
|--gulpfile.js
```

> PS：对外暴露的 js 模块/自定义组件请放在 src 目录下，不宜放置在过深的目录。另外新增的暴露模块需要在 tools/config.js 的 entry 字段中补充，不然不会进行构建。

## 测试

* 执行测试用例：

```
npm run test
```

* 检测覆盖率：

```
npm run coverage
```

测试用例放在 test 目录下，使用 **miniprogram-simulate** 工具集进行测试，[点击此处查看](https://github.com/wechat-miniprogram/miniprogram-simulate/blob/master/README.md)使用方法。在测试中可能需要变更或调整工具集中的一些方法，可在 test/utils 下自行实现。

## 其他命令

* 清空 miniprogram_dist 目录：

```
npm run clean
```

* 清空 miniprogam_dev 目录：

```
npm run clean-dev
```

# npm组件使用方法

## 引入组件
小程序工程中，package.json 文件中引入组件
```
{
  "dependencies": {
    "【npm包名】wxmp-login-register": "1.2.19"
  }
}
```
## 页面内容需作为slot放在登录组件标签内
```
<component-wx-login  env="local"  bind:loginSuccess="loginSuccess">
  <view>页面内容</view>
  <view>页面内容</view>
</component-wx-login>
```
## 属性与方法
### env
* local 本地开发环境
* pre 预上线环境
* production 生产环境。默认。

用以配置不同环境的接口地址。
### navigationBarTitleText
这里需要重复设置一下页面标题，没办法
### bind:loginSuccess
登录成功回调函数
### bind:loginFail
登录失败回调函数
### logoutEmitter
解绑退出触发器。默认必须是false，当设置为true时会触发解绑退出方法，在解绑退出成功回调中，需要将此属性重置为false，以便下次解绑退出时设置为true才生效。
### bind:logoutSuccess
解绑退出成功的回调函数
### bind:logoutFail
解绑退出成功的失败函数
用户必须添加此回调，此回调函数中必须将 logoutEmitter 重置为false

## 可通过 selectComponent() 直接调用的组件方法
### showCertificateList
显示认证列表页
### executeLogin
执行登录逻辑

# 组件原理
## 引入main组件的原因
main组件与页面子组件可利用组件间关系releations，实现父子组件数据交互。
否则的话，每个子组件都需要定义一堆属性以及触发一系列事件来实现与index父组件数据交互。
而使用了组件间关系，只需要在组件加载时linked钩子上，将目标组件的实例挂载到当前组件上，即可轻松调用目标组件实例上全部数据和方法。
main组件仅需要通过有限的几个属性和方法即可将主要数据传递给父组件index。父组件index将主要数据传递给业务调用方即可。
```
// index.wxml 中

<main>
  <bindAccount></bindAccount>
  <createAccount></createAccount>
</main>
```

## 全局唯一登录态
多个页面引用组件时，只要有一个页面登录成功了，会在app实例中设置全局属性 app.loggedIn = true，此时其他页面的登录行为便不不再进行。

## 全局状态

### 存储在本地缓存中的，字段均以 login_开头，有如下：
```   
login_at    
login_rt    
login_deviceId
login_fromUserCenterUnbind
login_personal_info
```

### 存储在main组件中的值有如下：
```      
data.url.passport 等，存储不同环境的接口地址
data.globalState.at    
data.globalState.rt    
data.globalState.deviceId    
```

### 存储在app实例对象上的有
```
app.loggedIn   是否已登录  Boolean
app.certificate 认证相关
```

