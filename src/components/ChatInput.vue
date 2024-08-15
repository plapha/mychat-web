<template>
  <v-text-field
      v-model="userInput"
      label="请输入您的问题"
      append-icon="mdi-send"
      @click:append="sendMessage"
  ></v-text-field>
</template>

<script>
export default {
  data: () => ({
    userInput: ''
  }),
  methods: {
    sendMessage() {
      // TODO: 发送 userInput 到后端 API
      // ...

      // 清空输入框
      this.userInput = '';
    }
  }
}
</script>