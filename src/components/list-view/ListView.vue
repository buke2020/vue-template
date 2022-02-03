<template>
  <div class="list-view">
    <div v-if="selectable" class="toolbar">
      <div class="selected-btn" type="info" :closable="false">
        <span>已选中</span>
        <span class="num">{{ internalSelected.length }}</span>
        <span>行</span>
        <el-button v-if="internalSelected.length" type="text" size="small" @click="clearSelection()">取消选中</el-button>
      </div>
      <slot name="actions" :selected="internalSelected"></slot>
      <div class="icons">
        <slot name="icons"></slot>
      </div>
    </div>
    <el-table
      ref="table"
      :data="data"
      :row-key="rowKey"
      @row-click="doRowClick"
      :stripe="stripe"
      :show-header="showHeader"
      :emptyText="emptyText"
      :height="height"
      :max-height="maxHeight"
      :default-sort="internalDefaultSort"
      @selection-change="doSelectionChange"
      @sort-change="doSortChange"
      v-loading="loading"
    >
      <el-table-column v-if="selectable" type="selection" :selectable="checkSelectable" :reserve-selection="reserveSelection"></el-table-column>
      <slot></slot>
      <div slot="empty" class="empty-blank-tip small">
        <div>{{ emptyStr }}</div>
      </div>
    </el-table>
    <el-pagination
      class="pagination"
      layout="total, prev, pager, next, sizes, slot"
      v-if="pageable && !smallPage"
      :current-page.sync="internalPage"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="queryParam.limit"
      :total="total"
      @size-change="doSizeChange"
      @current-change="doPageChange"
    >
      <div class="custom-jump-page">
        跳转至
        <el-input v-model.trim="jumpPageIndex" placeholder="" @keyup.native.enter="$event.target.blur()" @blur="jumpPage()" />
        页
      </div>
    </el-pagination>

    <el-pagination
      class="pagination"
      layout="total,prev,next,jumper"
      v-if="pageable && smallPage"
      :current-page.sync="internalPage"
      :page-size="queryParam.limit"
      :total="total"
      @size-change="doSizeChange"
      @current-change="doPageChange"
    ></el-pagination>
  </div>
</template>

<script lang="ts" src="./ListView.ts"></script>

<style lang="scss" scoped>
/*缺省提示*/
.empty-tip {
  line-height: initial;
  text-align: center;
  color: #999999;
  font-size: 14px;
  padding-top: 20px;
  padding-bottom: 20px;

  .ic-empty {
    width: 90px;
    /*margin-bottom: 15px;*/
  }
}

/* 分页器 */
.custom-jump-page {
  color: #79879e;
  font-size: 12px;
  font-weight: initial;
  display: inline-block;
  margin-left: 8px;

  .el-input {
    width: 88px;
  }

  .el-input--mini .el-input__inner {
    padding: 0 3px;
  }
}

.list-view {
  .toolbar {
    display: flex;
    align-items: center;
    padding-bottom: 12px;
  }

  .selected-btn {
    flex: 0 0 auto;
    color: #4c5f7d;
    width: auto;
    display: inline-block;
    margin-right: 10px;
    padding: 4px 12px;
    font-size: $--button-small-font-size;

    /deep/ .el-button--text {
      padding: 0;
      margin-left: 5px;
    }
  }

  .num {
    color: $--color-primary;
    margin: 0 5px;
  }

  .pagination {
    height: 56px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
