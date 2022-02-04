<template>
  <page-wrapper>
    <template slot="body">
      <div ref="chart" class="chart"></div>
    </template>
  </page-wrapper>
</template>

<script lang="ts" src="./Chart.ts"></script>

<style lang="scss" scoped>
.chart {
  box-sizing: border-box;
  width: 100%;
  height: 388px;
}
</style>
