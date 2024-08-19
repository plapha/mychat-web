<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Chat2DB</v-card-title>
          <v-card-text>
            <v-text-field
                v-model="userInput"
                label="请输入您的问题"
                append-icon="mdi-send"
                @click:append="sendMessage"
            ></v-text-field>
            <div v-if="responseMessage">
              <p>SQL语句: {{ responseMessage }}</p>
            </div>
            <!-- 这里添加跳转按钮 -->
            <v-btn color="primary" @click="goToDatabaseConfig">
              后端设置
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userInput: '',
      responseMessage: ''
    };
  },
  methods: {
    sendMessage() {
      axios.post('http://127.0.0.1:5000/api/chat', { prompt: this.userInput, history: [] })
          .then(response => {
            this.responseMessage = response.data.response;
          })
          .catch(error => {
            console.error("There was an error!", error);
          });

      this.userInput = '';
    },
    goToDatabaseConfig() {
      this.$router.push('/database-config');
    }
  }
};
</script>

<style>
/* 可以根据需要添加样式 */
</style>