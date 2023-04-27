<template>
    <div class="room">
        <div v-for="(message, index) in messages" :key="index" class="message-item">
            <span>
                {{ message.user.username }}
            </span>
            <span>
                {{ message.text }}
            </span>
        </div>
        <van-field class="input-area" v-model="message" center clearable placeholder="请说点什么吧">
            <template #button>
                <van-button size="small" type="primary" @click="sendMessage">发送</van-button>
            </template>
        </van-field>
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
    initWebSocket()
})
//初始化websocket
const initWebSocket = () => {
    //websocket连接
    websocket.value = io('http://localhost:8080')
    websocket.value.emit('joinGroup', {
        userId: '6449d6a03561c65cd6b85b44',
        groupId: '6449dde1f5103bd97ed2b3c3'
    }, (res: any) => {
        console.log(res);
    })
    //监听消息返回
    websocket.value.on('message_received', (msg: any) => {
        console.log(msg);
        messages.push({
            user: msg.user,
            text: msg.text,
            id: msg.id
        })
    })
}
const sendMessage = () => {
    const textMessage = {
        text: message.value,
        type: 1,
        group: '6449dde1f5103bd97ed2b3c3'
    }
    websocket.value.emit('sendMessage', textMessage, (event: any) => {
        if (event) {
            message.value = ''
        }
    })
}
</script>

<style scoped lang="scss">
.message {}

.input-area {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #dadada;
}
</style>