export const aMixin = {
    data () {
        return {
            query: {
                page: 1,
                size: 10,
                keyword: null
            },
            total: 0
        }
    },
    methods: {
        // 最大页
        handleSizeChange (callback, value) {
            this.query.size = value
            callback()
        },
        // 当前页
        handleCurrentChange (callback, value) {
            this.query.page = value
            callback()
        },
        // 清除搜索框
        clearIpt (callback) {
            this.query.keyword = null
            callback()
        },
        // 通过id删除
        deleteById (delCallback, fetchCallback, id, info) {
            this.$confirm('此操作将永久删除该' + info + ', 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error',
                center: true
            }).then(async () => {
                const { success, message } = await delCallback(id)
                if (success) {
                    this.$message.success('删除成功')
                    fetchCallback()
                } else {
                    this.$message.error(message)
                }
            }).catch(() => {
                this.$message.info('已取消删除')
            })
        },
        // 清除对话框表单
        clearDialog (formName) {
            // console.log(formName)
            this.$refs[formName].resetFields()
        },
        // 请求判断
        showMsgBySuccess (success, info, callback) {
            if (success) {
                this.$message.success(`${info}成功!`)
                callback()
            } else {
                this.$message.error(`${info}失败!`)
            }
        }
    }
}
