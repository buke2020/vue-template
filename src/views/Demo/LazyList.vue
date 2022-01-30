<template>
  <page-wrapper>
    <template slot="body">
      <el-select
        v-model="lazyValue"
        filterable
        clearable
        placeholder="输入查询匹配或下拉选择"
        v-loadmore="loadmore(rangeNum)"
        :filter-method="filterMethod"
      >
        <el-option v-for="item in itemList.slice(0, rangeNum)" :key="item.id" :value="item.id" :label="item.name"></el-option>
      </el-select>
    </template>
  </page-wrapper>
</template>

<script lang="ts" src="./LazyList.ts"></script>

<style lang="scss" scoped>
/deep/ .el-select {
  width: 388px;
  margin: 20px 0;
}
</style>
