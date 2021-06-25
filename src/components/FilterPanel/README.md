### 示例代码
```

<template>
  <div>
    <FilterPanel>
      <span slot="header">
        <el-form :inline="true"> 
          <el-form-item>
            <el-input style="width: 180px" size="small" clearable />
          </el-form-item>
        </el-form>
      </span>
      <span slot="body">
        <el-form :inline="true"> 
          <el-form-item>
            <el-input style="width: 180px" size="small" clearable />
          </el-form-item>
          <el-form-item>
            <el-input style="width: 180px" size="small" clearable />
          </el-form-item>
        </el-form>
      </span>
    </FilterPanel>
  </div>
</template>

<script>
import FilterPanel from '@/commponents/FilterPanel'
export default {
  name: 'DemoFilter',
  components: { FilterPanel },
}
</script>
```
