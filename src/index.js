// 组件挂载到html中
import Vue from 'vue'

//引入app.vue页面
import App from './app.vue'

// 引入图片和样式
// import './assets/styles/style.css'
// import './assets/styles/test-style.styl'
// import './assets/images/1.jpg'
import './assets/styles/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)

// h参数是vue中的createApp参数
// 实例化vue对象
new Vue({
    render:(h) => h(App)  // 声明了组件渲染出来的是app的内容
}).$mount(root) //然后挂载到节点上

// render函数是渲染一个视图，然后提供给el挂载，如果没有render那页面什么都不会出来 
// 接受传入的参数 h 函数，返回 h(App) 