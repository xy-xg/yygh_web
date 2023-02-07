<template>
  <div class="app-container">
    <div>医院搜索列表</div>
    <div class="header">
      <el-input v-model="searchObj.hosname" style="width: 200px;" placeholder="医院名称" />
      <el-input v-model="searchObj.hoscode" style="width: 200px;margin-left: 20px" placeholder="医院编号"/>
      <el-button type="success" style="margin-left: 5px;" @click="getList()">搜索</el-button>
    </div>

    <div class="body">
      <div>
        <el-button type="danger" icon="el-icon-delete" style="margin-left: 5px;" @click="removeRows()">批量删除</el-button>
      </div>
      <el-table
        :data="list"
        :row-class-name="tableRowClassName"
        style="width: 100%"
        @selection-change="handleCheckAllChange">
        <el-table-column
          type="selection"
          width="50"/>
        <el-table-column
          label="序号"
          type="index"
          width="50"/>
        <el-table-column
          prop="hosname"
          label="医院名字"
          width="85"/>
        <el-table-column
          prop="hoscode"
          label="医院编号"
          width="85"/>

        <el-table-column
          prop="apiUrl"
          label="api基础路径"
          width="120"/>

        <el-table-column
          prop="contactsName"
          label="联系人姓名"
          width="95"/>

        <el-table-column
          prop="contactsPhone"
          label="联系人手机"
          width="95"/>

        <el-table-column
          label="状态"
          width="80">
          <template slot-scope="scope">
            {{ scope.row.status === 1 ? '可用' : '不可用' }}
          </template>
        </el-table-column>

        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDataById(scope.row.id)">
              删除
            </el-button>
            <el-button v-if="scope.row.status==1" type="primary" size="mini" @click="lockHospitalSet(scope.row.id,0)">
              锁定
            </el-button>
            <el-button v-if="scope.row.status==0" type="danger" size="mini" @click="lockHospitalSet(scope.row.id,1)">
              取消锁定
            </el-button>
            <router-link :to="'/hospSet/edit/'+scope.row.id">
              <el-button type="primary" size="mini" icon="el-icon-edit"/>
            </router-link>

          </template>

        </el-table-column>

      </el-table>
    </div>
    <div class="block">
      <el-pagination
        :current-page="1"
        :page-size="limit"
        :total="total"
        background
        layout="total, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
import hospset from '@/api/hospset'
export default {
  // 定义变量和初始值
  data() {
    return {
      current: 1, // 当前页面
      limit: 2, // 分页数量
      searchObj: {}, // 条件对象
      list: [], // 数据
      total: 0,
      selectionEls: [] // 选中的列表
    }
  },
  created() { // 在页面渲染之前执行  一般是methods定义的方法得到数据
    this.getList()
  },
  methods: { // 定义方法 进行构造函数
    //  获取全选框的id
    handleCheckAllChange(selection) {
      this.selectionEls = selection
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
    },
    // 查询所有医院设置
    getList() {
      hospset.getHospSetList(this.current, this.limit, this.searchObj)
        .then(resp => { // 请求成功执行
          this.list = resp.data.records
          this.total = resp.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 删除医院设置
    removeDataById(id) {
      this.$confirm('此操作将删除医院, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hospset.removeDataById(id)
          .then(resp => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.current = 1
            this.getList()
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 批量删除成功
    removeRows(isList) {
      this.$confirm('此操作将删除多个医院设置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // map循环数组拿出id属性
        hospset.removeHospitalByIds(this.selectionEls.map(v => v.id))
          .then(resp => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.current = 1
            this.getList()
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 锁定和取消锁定
    lockHospitalSet(id, status) {
      hospset.lockHospitalSet(id, status)
        .then(resp => {
          this.getList()
        })
    },
    // 分页参数
    handleSizeChange(val) {
      this.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getList()
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
