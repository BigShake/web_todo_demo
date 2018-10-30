<template>
    <!-- selction标签，section的作用是对页面上的内容进行分块，如各个有标题的版块、功能区或对文章进行分段 -->
    <section class="real-app">

        <!-- input输入框模块， 
            input标签，根据不同type属性值，输入字段拥有很多种形式。
            输入字段可以是文本字段text、按钮button，checkbox复选框，file选择文件，hidden隐藏，image图片，
            password掩码后的文本控件，radio原点选择框，reset重置，submit提交。
            class样式。
            autofocus输入字段在页面加载时是否获得焦点，即自动获取输入框定位。
            placeholder输入字段的提示。
            value默认输入内容。
            @keyup.enter 监听键盘enter事件，即按键盘上的enter键的时候，做出addTodo方法处理，也可以写为v-on:keyup.enter
            其他键盘名字：.enter .tab .delete .esc .space .up .down .left .right .ctrl .alt .shift
            .meta(window系统下是window键，mac下是command键) (Alt + C).alt.67  (Ctrl + Click)@click.ctrl
        -->
        <input type="text"
               class="add-input"
               autofocus="autofocus"
               placeholder="接下来要做什么?"
               @keyup.enter="addTodo"
        >

        <!-- 使用items组件 -->
        <!-- :todo_item="todo" 往子组件item.vue 传入 todo_item 对象,值为todo
             v-for="todo in filteredTodos" 遍历 todos 数组
             :key 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素
             这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。理想的 key 值是每项都有的唯一 id。
            为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。所以你需要用 v-bind 来绑定动态值 

             @del="deleteTodo" 接收子组件要触发的del方法
        -->
        <!-- 输入的todo事件的模块
            在父组件中子组件引用处添加函数v-on:delete_item="function1"； 
            //其中 delete_item 为子组件中使用函数，function1为父组件赋值函数 -->
        <APP_Item :todo_item="todo"
                  v-for="todo in filteredTodos"
                  v-bind:key="todo.id"
                  @delete_item="deleteTodo"
        >
        </APP_Item>

        <!-- 最下一行的的计数和清除操作模块 -->
        <!-- 使用tabs组件 -->
        <APP_Tabs :filter_tabs="filter"
                  :todos_tabs="todos"
                  @toggle_tabs="toggleFilter"
                  @clearAllCompleted_tabs="clearAllCompleted"
        >
        </APP_Tabs>
    </section>
</template>

<script>
    import APP_Item from './items.vue';
    import APP_Tabs from './tabs.vue';

    let id = 0;

    export default {
        // data() 声明数据
        data() {
            return {
                todos: [],
                filter: 'all'
            }
        },

        // 计算
        computed: {
            filteredTodos() {
                if (this.filter === 'all') {
                    return this.todos;
                }
                const completed = this.filter === 'completed';

                // 将todos数组中，completed为true的值过滤出来，并返回一个新数组
                return this.todos.filter(todo => completed === todo.completed);

            }
        },

        // 组件
        components: {
            APP_Item,
            APP_Tabs,
        },

        //方法
        methods: {
            //在methods下写方法函数的调用

            //添加todo事件的方法
            addTodo(e) {
                // e.target.value:指向事件执行时鼠标所点击区域的那个元素的值
                // trim():删除字符串开始和末尾的空格
                if (e.target.value.trim()) {
                    //unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
                    this.todos.unshift({
                        id: id++,
                        content: e.target.value.trim(),
                        completed: false
                    });
                    e.target.value = '';
                } else {
                    alert('输入不能为空 !');
                }
            },
            
            deleteTodo(id) {
                this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
            },

            toggleFilter(state) {
                this.filter = state;
            },
            
            clearAllCompleted() {
                // 给todos赋一个新的值（即todo.completed为false的值）
                this.todos = this.todos.filter(todo => todo.completed === false)
            }
        }
    };
</script>

<style lang="stylus" scoped>
    .real-app {
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }

    .add-input {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 36px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }
</style>