# 使用说明

### 属性
* width  
用于控制输入框宽度，必须是整数，默认值为240
* multiple  
用于控制已选项最大占用宽度是输入框宽度多少倍
* placeholder  
用于在输入框中显示提示内容，默认为：请输入关键字搜索
* selectKey  
必填项，决定了以数据对象中哪个值当作key值，此值需要是唯一值
* name  
必填项，用于指定以数据对象中哪个值当作展示值
* getObjs  
必填项，提供用于获取数据对象列表的方法，可以是调用接口数据的方法，  
此方法只支持一个参数keyword，keyword是用于输入内容，当作筛选项
* selectedObjs  
用于返回用户选择的数据对象列表
* showCount  
是否展示已选择数量，默认为显示

### 方法
* change  
用于选择时触发，传入用户选择的数据对象列表当作参数
