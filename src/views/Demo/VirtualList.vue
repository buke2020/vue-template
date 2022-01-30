<template>
  <page-wrapper>
    <template slot="body">
      <el-select v-model="virtualValue" filterable clearable placeholder="输入查询匹配或下拉选择" :filter-method="filterMethod">
        <el-option v-for="item in itemList" :key="item.id" :value="item.id" :label="item.name"></el-option>
      </el-select>
    </template>
  </page-wrapper>
</template>

<script lang="ts" src="./VirtualList.ts"></script>

<style lang="scss" scoped>
/deep/ .el-select {
  width: 388px;
  margin: 20px 0;
}
</style>
