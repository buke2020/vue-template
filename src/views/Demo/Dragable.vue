<template>
  <div>
    <page-wrapper>
      <template slot="header">行拖拽</template>
      <template slot="body">
        <el-table key="row" :data="rowList">
          <el-table-column label="序号">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="code" label="代码" show-overflow-tooltip></el-table-column>
        </el-table>
      </template>
    </page-wrapper>
    <page-wrapper>
      <template slot="header">列拖拽</template>
      <template slot="body">
        <el-table key="column" :data="columnList">
          <el-table-column prop="id" label="ID" show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="code" label="代码" show-overflow-tooltip></el-table-column>
        </el-table>
      </template>
    </page-wrapper>
  </div>
</template>

<script lang="ts" src="./Dragable.ts"></script>
