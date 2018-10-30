<template>
<!-- class样式包含两个，第一个是todo_item-item， 第二个样式要看todo_item的值是否包含completed字段，
        如果包含，则使用completed，否则，不添加样式-->
<div :class="['todo-item', todo_item.completed ? 'completed' : '']">

    <!-- checkbox复选框 
        v-model双向数据绑定，负责监听用户的输入事件以更新数据
        此处绑定了todo事件的是否完成字段completed-->
    <input type="checkbox"
        class="toggle"
        v-model="todo_item.completed"
    >
    <!-- label标签为 input 元素定义标注（标记）。 -->
    <label>{{todo_item.content}}</label>
    
    <!-- 删除按钮
        @click触发点击事件 -->
    <button class="destroy" @click="deleteTodo"></button>
</div>
</template>

<script>
export default {
    // props定义 在父组件获得 回传给子组件的属性
    // todo_item参数是对象类型的，在父组件中使用该参数，回传给本文件处理数据
    props: {
        todo_item: {
            type: Object,
            require: true
        }
    },
    methods: {
        deleteTodo() {
            // 往父组件传递 delete_item 方法，参数为当前id
            //this.emit("function", parm), 其中function为父组件函数，pram为需要传递参数
            this.$emit('delete_item', this.todo_item.id)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .todo-item{
        position relative
        background-color #fff
        font-size 24px
        border-bottom 1px solid rgba(0,0,0,0.06)
        &:hover{
            .destroy:after{
                content: '×'
            }
        }
        label{
            white-space: pre-line;
            word-break: break-all;
            padding: 15px 60px 15px 15px;
            margin-left: 45px;
            display: block;
            line-height: 1.2;
            transition: color 0.4s;
        }
        &.completed{
            label{
                color: #d9d9d9;
                text-decoration line-through
            }
        }
    }
    .toggle{
        text-align: center;
        width: 40px;
        height: 40px;
        line-height: 40px
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none;
        appearance: none;
        outline none
        padding-left 5px
        cursor pointer
        &:after{
            content: url('../assets/images/round.svg')
        }
        &:checked:after{
            content: url('../assets/images/done.svg')
        }
    }
    .destroy{
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
        background-color transparent
        appearance none
        border-width 0
        cursor pointer
        outline none
    }
</style>