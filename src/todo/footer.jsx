import '../assets/styles/footer.styl'
//引入样式

export default {
    data() {
        return {
            author: 'shawanning',
            wechat: '18052018623'
        }
    },
    render() {
        return (
            <div id="footer_style">
                <span>Power by {this.author}</span>
                <br/>
                <span>欢迎添加作者微信：{this.wechat}</span>
            </div>
        )
    }
}