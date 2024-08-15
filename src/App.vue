<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>Chat2DB</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item v-for="(message, index) in messages" :key="index">
                    <v-list-item-content>
                      <v-list-item-title>{{ message.role }}: {{ message.content }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <ChatInput @message-sent="handleMessageSent" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ChatInput from './components/ChatInput'

export default {
  components: {
    ChatInput
  },
  data: () => ({
    messages: []
  }),
  methods: {
    handleMessageSent(message) {
      this.messages.push(message);
    }
  }
}
</script>