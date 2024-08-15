<template>
  <div>
    <div v-if="isLoading">加载中...</div>
    <div v-else-if="error">发生错误: {{ error }}</div>
    <div v-else>
      <div v-if="responseType === 'table'">
        <v-data-table
            :headers="responseHeaders"
            :items="responseData"
        ></v-data-table>
      </div>
      <div v-else-if="responseType === 'text'">
        {{ responseData }}
      </div>
      <div v-else-if="responseType === 'icon'">
        <v-icon size="64">{{ responseData }}</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    responseData: {
      type: [Array, String, Object],
      default: null
    },
    responseHeaders: {
      type: Array,
      default: () => []
    },
    responseType: {
      type: String,
      default: null
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  }
}
</script>