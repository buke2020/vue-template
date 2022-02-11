<template>
  <div>
    <el-radio-group v-model="dateType" @change="doDateTypeChange">
      <el-radio-button v-for="item in fastOpts" :label="item" :key="item"></el-radio-button>
    </el-radio-group>
    <el-date-picker
      ref="datePicker"
      v-if="dateType === '自定义'"
      class="date-range"
      v-model="date"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :value-format="'yyyy-MM-dd'"
      :picker-options="rangeValue && pickerOptions"
      @change="doDateChange"
      :clearable="clearable"
      :editable="false"
    ></el-date-picker>
  </div>
</template>

<script lang="ts" src="./FastDatePicker.ts"></script>

<style lang="scss" scoped>
.date-range {
  width: 250px !important;
  margin-left: 20px;
}
</style>
