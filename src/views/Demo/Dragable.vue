<template>
  <page-wrapper>
    <template slot="body">
      <el-table ref="table" :data="itemList">
        <el-table-column label="序号">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="code" label="代码" show-overflow-tooltip></el-table-column>
      </el-table>
    </template>
  </page-wrapper>
</template>

<script lang="ts" src="./Dragable.ts"></script>
