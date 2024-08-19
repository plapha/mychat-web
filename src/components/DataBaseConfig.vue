<template>
  <v-container>
    <v-card>
      <v-card-title>后端服务配置</v-card-title>
      <v-card-text>
        <v-form v-model="formValid">
          <v-text-field
              v-model="dbConfig.host"
              label="主机地址"
              required
          ></v-text-field>
          <v-text-field
              v-model="dbConfig.port"
              label="端口"
              type="number"
              required
          ></v-text-field>
          <v-text-field
              v-model="dbConfig.username"
              label="用户名"
              required
          ></v-text-field>
          <v-text-field
              v-model="dbConfig.password"
              label="密码"
              type="password"
              required
          ></v-text-field>
          <v-text-field
              v-model="dbConfig.database"
              label="后端服务器名称"
              required
          ></v-text-field>
          <v-btn
              :disabled="!formValid"
              color="primary"
              @click="saveConfig"
          >
            保存配置
          </v-btn>
          <v-btn
              :disabled="!formValid"
              color="secondary"
              @click="testConnection"
          >
            测试连接
          </v-btn>
          <v-btn color="green" @click="goToChatInput">
            返回对话
          </v-btn>
        </v-form>
        <v-alert
            v-if="testResult"
            :type="testResult.success ? 'success' : 'error'"
            class="mt-4"
        >
          {{ testResult.message }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formValid: false,
      dbConfig: {
        host: '',
        port: '',
        username: '',
        password: '',
        database: ''
      },
      testResult: null, // 存储测试连接的结果
    };
  },
  mounted() {
    // 在组件挂载时从 localStorage 加载配置
    const savedConfig = localStorage.getItem('dbConfig');
    if (savedConfig) {
      this.dbConfig = JSON.parse(savedConfig);
      console.log('加载保存的配置:', this.dbConfig);
    }
  },
  methods: {
    saveConfig() {
      console.log('保存后端配置:', this.dbConfig);

      try {
        // 将配置保存到 localStorage
        localStorage.setItem('dbConfig', JSON.stringify(this.dbConfig));
        this.testResult = {
          success: true,
          message: "配置保存成功！"
        };
        console.log('配置保存成功:', this.dbConfig);
      } catch (error) {
        console.error('配置保存失败:', error);
        this.testResult = {
          success: false,
          message: "配置保存失败：" + error.message
        };
      }
    },
    testConnection() {  // 修正了方法名称
      axios.post('http://127.0.0.1:5000/api/test-connection', this.dbConfig)
          .then(response => {
            // 使用 response，比如从 response 中提取数据
            const data = response.data;
            this.testResult = {
              success: true,
              message: data.message || "连接成功！"
            };
          })
          .catch(error => {
            this.testResult = {
              success: false,
              message: "连接失败：" + (error.response?.data?.message || error.message)
            };
          });
    },
    goToChatInput() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
/* 根据需要添加样式 */
</style>