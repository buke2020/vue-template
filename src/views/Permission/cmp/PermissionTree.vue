<template>
  <div class="tree">
    <div v-for="(level1, index1) in treeList" :key="index1" class="tree-line">
      <!-- 第一级 -->
      <div class="tree-first flex-start">
        <div
          @click.stop="$set(treeList[index1], 'isCollapse', !level1.isCollapse)"
          :style="{ visibility: level1.lowers && level1.lowers.length ? '' : 'hidden' }"
        >
          <i v-if="!level1.isCollapse" class="iconfont ic-ui-caretleft"></i>
          <i v-else class="iconfont ic-ui-sortdown"></i>
        </div>
        <el-checkbox :indeterminate="level1.indeterminate" v-model="level1.checked" @change="debounceLevel1Change($event, index1, level1.path)">
          {{ level1.path | autoPath }}
        </el-checkbox>
      </div>

      <div v-show="level1.isCollapse" v-for="(level2, index2) in level1.lowers" :key="level1 + '_' + index2">
        <!-- 第二级 -->
        <div class="tree-second flex-start">
          <div
            @click.stop="$set(treeList[index1].lowers[index2], 'isCollapse', !level2.isCollapse)"
            :style="{ visibility: level2.lowers && level2.lowers.length ? '' : 'hidden' }"
          >
            <i v-if="!level2.isCollapse" class="iconfont ic-ui-caretleft"></i>
            <i v-else class="iconfont ic-ui-sortdown"></i>
          </div>
          <el-checkbox
            :indeterminate="level2.indeterminate"
            v-model="level2.checked"
            @change="debounceLevel2Change($event, index1, index2, level2.path)"
          >
            {{ level2.path | autoPath }}
          </el-checkbox>
        </div>
        <!-- 第三级 -->
        <div v-show="level2.isCollapse" class="tree-third flex-start">
          <el-checkbox
            v-for="(level3, index3) in level2.lowers"
            :key="level1 + '_' + index2 + '_' + index3"
            v-model="level3.checked"
            @change="debounceLevel3Change($event, level3.path)"
          >
            {{ level3.path | autoPath }}
          </el-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./PermissionTree.ts"></script>

<style lang="scss" scoped>
.tree {
  box-sizing: border-box;
  width: 100%;
  min-height: 48px;
  border: 1px solid #d1dced;
  border-bottom: none;
  .flex-start {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
  &-first {
    height: 48px;
    background: #f5f6fa;
    padding-left: 20px;
  }
  &-second {
    padding-left: 32px;
  }
  &-third {
    padding-left: 64px;
  }
  &-line {
    border-bottom: 1px solid #d1dced;
  }
  .ic-ui-caretleft,
  .ic-ui-sortdown {
    font-size: 12px;
    color: #b3b9c7;
    margin-right: 8px;
  }

  /deep/ .el-checkbox {
    width: 200px;
    line-height: 18px;
    padding: 8px 0;
  }
}
</style>
