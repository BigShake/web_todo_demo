<template>
    <div class="helper">
        <!-- 最下行左边部分的计算未完成的事件的数量 -->
        <span class="left">{{unFinishedTodoLength}}件待完成事件</span>
        
        <!-- 选择切换部分 
            filter_tabs是props中定义的数据，是从父组件中传递过来的。-->
        <span class="tabs">
            <span v-for="state in states"
                :key="state.id"
                :class="[filter_tabs === state.id ? 'actived' : '']"
                @click="toggleFilter(state.id)"
            >{{state.name}}</span>
        </span>
        
        <span class="clear" @click="clearAllCompleted()">
            清除已完成事件
        </span>
    </div>
</template>

<script>
    export default {
        // props 接收父组件传过来的值
        props: {
            filter_tabs: {
                type: String,
                required: true,
            },
            todos_tabs: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                states: [
                    {
                        id: 'all',
                        name: '全部'
                    },
                    {
                        id: 'active',
                        name: '进行中'
                    },
                    {
                        id: 'completed',
                        name: '已完成'
                    }
                ]
            }
        },
        //计算属性computed，处理一些复杂逻辑
        // 可以使用 methods 来替代 computed，效果上两个都是一样的，
        // 但是 computed 是基于它的依赖缓存，只有相关依赖发生改变时才会重新取值。
        // 而使用 methods ，在重新渲染的时候，函数总会重新调用执行。
        computed: {
            //unFinishedTodoLength是计算属性，
            // this指向本vue实例
            //函数unFinishedTodoLength依赖于todos_tabs，在todos_tabs发生改变时，unFinishedTodoLength也会更新
            unFinishedTodoLength() {
                //todos_tabs是用户输入的todo事件数组
                console.log(this.todos_tabs);
                //filter过滤数组
                return this.todos_tabs.filter((x) => {
                    //x是数组todos_tabs里的遍历。filter筛选之后会组成一个新的数组。
                    //filter(x => !x.completed)
                    console.log(x.completed);
                    if(!x.completed){
                        console.log(x);
                        return x;
                    }
                    }).length;
            }
        },
        methods: {
            toggleFilter(state) {
                this.$emit('toggle_tabs', state);
            },
            clearAllCompleted() {
                this.$emit('clearAllCompleted_tabs');
            }
        }
    }
</script>


<style lang="stylus" scoped>
    .helper {
        font-weight 100
        display flex
        justify-content space-between
        padding 5px 0
        line-height 30px
        background-color #ffffff
        font-size 14px
        font-smoothing: antialiased;
    }

    .left, .clear, .tabs {
        padding 0 10px
        box-sizing border-box
    }

    .left, .clear {
        width 150px
    }

    .left {
        text-align left
    }

    .clear {
        text-align: right
        cursor pointer
    }

    .tabs {
        width 200px
        display flex
        justify-content space-around
        * {
            display inline-block
            padding 0 10px
            cursor pointer
            border 1px solid rgba(175, 47, 47, 0)
            &.actived {
                border-color rgba(175, 47, 47, 0.4)
                border-radius 5px
            }
        }
    }

</style>