<template>
  <page-wrapper>
    <template slot="header">虚拟列表</template>
    <template slot="body">
      <el-select v-model="item" filterable clearable placeholder="输入查询匹配或下拉选择" v-loadmore="sumItemList">
        <el-option v-for="item in itemList" :key="item.id" :value="item.id" :label="item.name"></el-option>
      </el-select>
    </template>
  </page-wrapper>
</template>

<script lang="ts" src="./VirtualList.ts"></script>

<style lang="scss" scoped></style>
