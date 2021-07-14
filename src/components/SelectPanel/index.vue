<template>
  <div>
    <el-row>
      <el-autocomplete
        id="autocomplete"
        v-model="state"
        :style="'width: '+width.toString()+'px'"
        size="small"
        :fetch-suggestions="_getObjList"
        :placeholder="placeholder"
        clearable
        @select="handleSelect"
        @clear="clear"
      />
      <span
        v-if="showCount"
        style="color: #606266; font-size: 8px"
      >已选 {{ selectedObjKeys.length }} 个</span>
    </el-row>
    <el-row
      :style="'width: '+(width*multiple).toString()+'px; margin-top: 3px'"
    >
      <el-tag
        v-for="tag in selectedObjList"
        :key="tag.id"
        style="margin-bottom: 3px; margin-right: 3px"
        size="small"
        closable
        @close="deleteObj(tag)"
      >
        {{ tag.name }}
      </el-tag>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'SelectPanel',
  props: {
    // 指定输入框宽度
    width: {
      default: 240
    },
    multiple: {
      default: 2
    },
    placeholder: {
      default: '请输入关键字搜索'
    },
    // 指定数据对象以哪个值为key
    selectKey: {
      required: true,
      type: String
    },
    // 指定数据对象以哪个值作为显示值
    name: {
      required: true,
      type: String
    },
    // 获取数据对象列表的方法，必须支持then获取返回数据
    getObjs: {
      required: true,
      type: Function
    },
    // 已选择的数据对象列表
    selectedObjs: {
      type: Array
    },
    // 是否显示计数
    showCount: {
      default: true
    }
  },
  data() {
    return {
      selectedObjList: [],
      selectedObjKeys: [],
      state: ''
    }
  },
  methods: {
    handleSelect(item) {
      this.state = this.state.replace('(已选)', '')
      if (this.selectedObjList.filter(obj => obj[this.selectKey] === item[this.selectKey]).length === 0) {
        this.selectedObjList.push(item)
        this.selectedObjKeys.push(item[this.selectKey])
        this.$emit('update:selectedObjs', this.selectedObjList)
        this.$emit('change', this.selectedObjList)
      }
    },
    deleteObj(item) {
      for (const i in this.selectedObjList) {
        if (this.selectedObjList[i][this.selectKey] === item[this.selectKey]) {
          this.selectedObjList.splice(i, 1)
          this.selectedObjKeys.splice(i, 1)
          break
        }
      }
    },
    _getObjList(keyword, cb) {
      Promise.resolve(this.getObjs(keyword)).then(data => {
        const objList = data.map(item => { return { ...item, value: item[this.name] } })
        for (const obj of objList) {
          if (this.selectedObjKeys.indexOf(obj[this.selectKey]) > -1) {
            obj.value = '(已选)' + obj.value
          }
        }
        cb(objList)
      })
    },
    clear() {
      // 清除数据时，同时失去焦点，防止出现搜索不触发情况
      const autocomplete = document.getElementById('autocomplete')
      autocomplete.blur()
    }
  }
}
</script>
<style scoped>
</style>
