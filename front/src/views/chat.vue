<template>
    <div>
        <h1>WebSocket 聊天室</h1>
        <ul>
            <li v-for="message in messages" :key="message.id">
                {{ message.user }}: {{ message.text }}
            </li>
        </ul>
        <form @submit.prevent="sendMessage">
            <input type="text" v-model="message" />
            <button type="submit">发送</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { io } from 'socket.io-client';
let messages = reactive([{
    user: '',
    text: '',
    id: ''
}])
let message = ref('')
let websocket = ref()
onMounted(() => {
    websocket.value = io('http://localhost:8080')
    //监听消息返回
   websocket.value.on('updateChat',(res:any)=>{

   })
})

const sendMessage = () => {
    websocket.value.emit('findAllChat', (res: any) => {
        console.log(res);

    })
}
</script>

<style scoped></style>