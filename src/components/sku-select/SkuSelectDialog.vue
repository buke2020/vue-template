<template>
  <el-dialog title="添加商品" :visible.sync="visible" width="800px">
    <detail-card>
      <template slot="left">
        <el-row :gutter="24" class="query-header">
          <el-col :span="18">
            <el-input ref="keyword" v-model="keyword" clearable placeholder="商品名称/商品代码" @change="doSearch"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="doSearch">查询</el-button>
          </el-col>
        </el-row>
        <list-view
          ref="list"
          :selectable="true"
          :data="skuDataList"
          :total="total"
          :smallPage="true"
          row-key="uuid"
          :selectedList="selectedList"
          :clearable="false"
          @selected="getSelectedList"
          @load="doListLoad"
          height="328"
        >
          <el-table-column label="商品名称">
            <template slot-scope="scope">{{ scope.row.flowNo | empty }}</template>
          </el-table-column>
          <el-table-column label="商品代码" width="100">
            <template slot-scope="scope">{{ scope.row.uuid | empty }}</template>
          </el-table-column>
        </list-view>
      </template>
      <template slot="right">
        <div class="flex-between select-header">
          <div>
            已选商品：
            <span class="color-primary">{{ selectedList.length }}</span>
          </div>
          <el-button type="text" @click="doClear">清空</el-button>
        </div>
        <div class="select-body">
          <div v-for="(item, index) in selectedList" :key="index" class="flex-between select-text">
            <span>{{ item.flowNo | empty }}[{{ item.uuid | empty }}]</span>
            <i class="sop-iconfont ic-sop-ic_delete_line_normal" @click="doRemove(index)"></i>
          </div>
          <div v-if="!selectedList.length" class="empty">
            <img src="@/assets/img/common/img_blank.png" class="empty-img" />
            <div class="empty-tip">请点击左侧表格选择商品～</div>
          </div>
        </div>
      </template>
    </detail-card>
    <div slot="footer" class="dialog-footer">
      <el-button @click="doCancel">取 消</el-button>
      <el-button type="primary" @click="doConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" src="./SkuSelectDialog.ts"></script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
  overflow: hidden;
  cursor: pointer;
}
/deep/ .detail-card .body .card-left {
  width: 400px !important;
  border: 1px solid rgba(215, 223, 235, 1);
  margin: 0 20px;
}
/deep/ .detail-card .body .card-right {
  max-width: 300px;
  border: 1px solid rgba(215, 223, 235, 1);
}
/deep/ .list-view .toolbar {
  display: none;
}
.query-header {
  padding: 12px;
}
.select-header {
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid rgba(215, 223, 235, 1);
  padding: 0 12px;
  margin: 0 0 12px 0;
}
.select-body {
  height: 380px;
  overflow: auto;
}
.select-text {
  padding: 0 12px 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  .empty-img {
    width: 114px;
    height: 114px;
  }
  .empty-tip {
    font-size: 12px;
    color: #a0abbc;
    margin-top: 12px;
  }
}
</style>
