<template>
  <page-wrapper>
    <template slot="body">
      <detail-card title="操作权限" :showTag="true"></detail-card>
      <permission-tree v-if="treeList.length" :tree="treeList" @change="doTreeChange"></permission-tree>
      <div v-else class="empty">
        <img src="@/assets/img/common/img_blank.png" class="empty-img" />
        <div class="empty-title">暂无操作权限～</div>
      </div>
    </template>
  </page-wrapper>
</template>

<script lang="ts" src="./PermissionList.ts"></script>

<style lang="scss" scoped>
.empty {
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-img {
    width: 240px;
    height: 240px;
    margin: 120px 0 16px;
  }
  &-title {
    font-size: 18px;
    font-weight: 500;
  }
}
</style>
