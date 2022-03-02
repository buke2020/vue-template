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
        <div id="column" class="flex-start">
          <div v-for="item in columnList" :key="item.id" class="circle">{{ item.name | empty }}</div>
        </div>
      </template>
    </page-wrapper>
  </div>
</template>

<script lang="ts" src="./Dragable.ts"></script>

<style lang="scss" scoped>
.flex-start {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  margin: 12px;
  border: 1px solid #f7f7f7;
  border-radius: 8px;
}
</style>
