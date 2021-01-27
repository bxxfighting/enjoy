### 荫照椅
早晨和黄昏照射着阳光，午后又遮挡在树荫下的椅子

#### 说在前面
此前端是完全照搬了[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)  
特别感谢作者弄一个这么好用的东西出来，减少了我很多工作.  
我是使用的版本4.4.0(git checkout 4.4.0).  
我遵从的一个原则就是做减法，从新搭建很麻烦，但是做减法比较容易，所以选择了这个集成版本.  

### 体验说明
* [体验地址: http://39.105.71.60](http://39.105.71.60)(有点懒的备案)  
* 体验系统管理账号: admin/123456 (超级管理员，需要取消LDAP用户选项)  
* 体验业务操作账号: buxingxing/123456 (管理员, 需要选中LDAP用户选项)  

##### 体验及提示
* 请不要将自己实际账号等重要信息填写到体验系统中，如果因此造成损失作者不承担责任  
* 体验地址主要是体验整个控制界面及流程，如果要实际操作，可以本地部署测试  

### 开发教程
[开发教程](https://github.com/bxxfighting/rurality/blob/master/docs/develop/README.md)  
[后端代码库](https://github.com/bxxfighting/rurality)  
[前端代码库](https://github.com/bxxfighting/enjoy)  
[流水线代码库](https://github.com/bxxfighting/darling)  

### 使用教程
##### 开发
1. 修改```.env.development```文件中```VUE_APP_BASE_API```，指定自己的后端地址
2. ```npm install && npm run dev```运行本地服务

##### 部署
1. 修改```.env.production```文件中```VUE_APP_BASE_API```，指定自己的后端地址
2. ```npm install && npm run build:prod```，部署生成的dist目录即可

### 免责声明
* 本项目属于教学及体验设计，如果在生产环境使用，请进行充分测试与评估，出现任何问题作者不承担任何责任  
