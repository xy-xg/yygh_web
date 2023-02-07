<template>
  <div class="addHospital" style="padding: 20px">
    <div>{{ textE }}</div>
    <el-form label-width="120px" >
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname" />
      </el-form-item>

      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode" />
      </el-form-item>

      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUri" />
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input :value="hospitalSet.contactsName" />
      </el-form-item>

      <el-form-item label="联系人手机">
        <el-input :value="hospitalSet.contactsPhone" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
import hospset from '@/api/hospset'
export default {
  data() {
    return {
      hospitalSet: {},
      textE: ''
    }
  },
  created() { // 页面渲染之前执行
    // 获取路由id值 调用接口得到医院设置信息
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getById(id)
      this.textE = '医院设置修改'
    } else {
      this.hospitalSet = {}
      this.textE = '医院设置添加'
    }
  },

  methods: {
    // 根据id查询
    getById(id) {
      hospset.getHospSet(id)
        .then(resp => {
          this.hospitalSet = resp.data
        })
    },
    saveOrUpdate() {
      // 判断添加还是修改
      if (!this.hospitalSet.id) { // 没有id，做添加
        this.save()
      } else { // 修改
        this.update()
      }
    },

    save() {
      hospset.saveHospitalSet(this.hospitalSet).then(resp => {
        this.$notify({
          title: 'sur',
          offset: 100,
          message: '添加成功'
        })
        this.$router.push('list')
      }).catch(() => {
        this.$notify({
          title: 'err',
          offset: 100,
          message: '添加失败'
        })
      })
    },
    // 修改
    update() {
      hospset.updateHospSet(this.hospitalSet)
        .then(response => {
          // 提示
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 跳转列表页面，使用路由跳转方式实现
          this.$router.push({ path: '/hospSet/list' })
        })
    }
  }
}
</script>

<style scoped>

</style>
