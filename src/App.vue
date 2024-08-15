<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>Chat2DB</v-card-title>
              <v-card-text>
                <ChatInput />
                <DataDisplay
                    :response-data="responseData"
                    :response-headers="responseHeaders"
                    :response-type="responseType"
                    :is-loading="isLoading"
                    :error="error"
                />
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
import DataDisplay from './components/DataDisplay'

export default {
  components: {
    ChatInput,
    DataDisplay
  },
  data: () => ({
    responseData: null,
    responseHeaders: [],
    responseType: null,
    isLoading: false,
    error: null
  })
}
</script>