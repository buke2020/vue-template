<template>
  <el-dialog :title="title" :visible="true" width="800px" @close="doCancel">
    <div v-if="step === 1" class="step-first">
      <div class="flex-start">
        <span>模板示例文件：</span>
        <el-button type="text" @click="onDownloadTemplate">{{ title }}模板</el-button>
      </div>
      <div class="tip space-around">支持xls、xlsx、csv格式文件，为保障上传成功，建议上传文件大小不超过1M</div>
      <div class="flex-start">
        <div class="space-limit"></div>
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" accept=".xls,.xlsx,.csv" :http-request="doSelectFile">
          <el-button>选择文件</el-button>
        </el-upload>
      </div>
    </div>
    <div v-if="step === 2" v-loading="true" class="step-second"></div>
    <div v-if="step === 3">
      <div v-if="!errorMessage" class="step-third">
        <span>
          导入成功：
          <span class="color-success">{{ result.successCount }} 条</span>
        </span>
        <span>
          导入忽略：
          <span class="color-primary">{{ result.ignoreCount }} 条</span>
        </span>
        <span>
          导入失败：
          <span class="color-danger space-right">{{ result.failCount }} 条</span>
          <el-button v-if="result.result" type="text" @click="onDownloadError(result.result)">下载导入失败明细</el-button>
        </span>
      </div>
      <div v-else class="step-space">
        <span>导入失败：</span>
        <span class="color-danger">{{ errorMessage }}</span>
      </div>
    </div>
    <div slot="footer">
      <el-button v-if="step === 1" @click="doCancel">取消</el-button>
      <el-button v-if="step === 3" @click="doFinish">好的</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" src="./ImportDialog.ts"></script>

<style lang="scss" scoped>
.step-first {
  margin: 0 50px;
  .space-around {
    color: #666666;
    margin: 20px 0 12px;
  }
  .space-limit {
    width: 300px;
    height: 30px;
    border: 1px solid #e3e3e3;
    margin-right: 20px;
  }
}
.step-second {
  height: 120px;
}
.step-third {
  display: flex;
  flex-direction: column;
  line-height: 36px;
  margin: 0 100px;
  .space-right {
    margin-right: 16px;
  }
}
.step-space {
  margin: 20px 36px 0;
}
</style>
