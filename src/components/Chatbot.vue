<!-- src/components/Chatbot.vue -->
<template>
  <div>
    <h1>Chat with GPT-turbo</h1>
    <div v-for="(message, index) in chatHistory" :key="index" :class="message.role">
      <strong>{{ message.role }}: </strong>
      {{ message.content }}
    </div>
    <input type="text" v-model="userQuery" @keydown.enter="handleSendMessage" />
    <button @click="handleSendMessage">Send</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      conversationId: 'user123',
      userQuery: '',
      chatHistory: [],
      apiUrl: 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions',
      apiKey: 'YOUR_OPENAI_API_KEY', // Replace with your GPT-turbo API key
    };
  },
  methods: {
    async handleSendMessage() {
      if (!this.userQuery.trim()) return;

      try {
        const response = await axios.post(this.apiUrl, {
          prompt: this.userQuery,
          max_tokens: 100,
          temperature: 0.7,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
        });

        const botResponse = response.data.choices[0].text;
        this.chatHistory.push({ role: 'user', content: this.userQuery });
        this.chatHistory.push({ role: 'bot', content: botResponse });
        this.userQuery = '';
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
};
</script>
