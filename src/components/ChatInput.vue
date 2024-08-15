<template>
  <v-container>
    <v-card>
      <v-card-title>Chat2DB</v-card-title>
      <v-card-text>
        <v-list class="chat-window" ref="chatWindow">
          <v-list-item v-for="(message, index) in messages" :key="index">
            <v-list-item-content>
              <v-list-item-title :class="{ 'user-message': message.role === '用户', 'system-message': message.role === '系统' }">
                {{ message.role }}:
              </v-list-item-title>
              <v-list-item-subtitle>{{ message.content }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-text-field
            v-model="userInput"
            label="请输入您的问题"
            append-icon="mdi-send"
            @click:append="sendMessage"
            @keyup.enter="sendMessage"
            :disabled="isLoading"
        ></v-text-field>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    userInput: '',
    messages: [],
    isLoading: false
  }),
  methods: {
    sendMessage() {
      if (!this.userInput.trim() || this.isLoading) return;

      const userMessage = { role: '用户', content: this.userInput };
      this.messages.push(userMessage);
      this.isLoading = true;

      axios.post('http://127.0.0.1:5000/api/chat', { prompt: this.userInput, history: this.messages })
          .then(response => {
            const systemMessage = { role: '系统', content: response.data.sql || '抱歉，我没有生成有效的SQL。' };
            this.messages.push(systemMessage);
          })
          .catch(error => {
            console.error('发生错误:', error);
            const errorMessage = { role: '系统', content: '抱歉，发生了错误。' };
            this.messages.push(errorMessage);
          })
          .finally(() => {
            this.isLoading = false;
            this.userInput = '';
            this.$nextTick(() => {
              this.scrollToBottom();
            });
          });
    },
    scrollToBottom() {
      const chatWindow = this.$refs.chatWindow;
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }
}
</script>

<style scoped>
.chat-window {
  height: 400px;
  overflow-y: auto;
}

.user-message {
  color: blue;
}

.system-message {
  color: green;
}
</style>