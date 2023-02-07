import request from '../utils/request'
export default {
  getHospSetList(current, limit, searchObj) {
    return request({
      url: `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
      method: 'post',
      data: searchObj // 使用json
    })
  },

  // 逻辑删除单个医院设置
  removeDataById(id) {
    return request({
      url: `/admin/hosp/hospitalSet/${id}`,
      method: 'delete'
    })
  },

  // 逻辑删除单个医院设置
  removeHospitalByIds(isList) {
    return request({
      url: '/admin/hosp/hospitalSet/batchRemove',
      method: 'delete',
      data: isList
    })
  },

  // 切换状态
  lockHospitalSet(id, status) {
    return request({
      url: `/admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
      method: 'put'
    })
  },
  // 添加医院设置
  saveHospitalSet(hospitalSet) {
    return request({
      url: '/admin/hosp/hospitalSet/saveHospitalSet',
      method: 'post',
      data: hospitalSet
    })
  },
  // 院设置id查询
  getHospSet(id) {
    return request({
      url: `/admin/hosp/hospitalSet/getHospSet/${id}`,
      method: 'get'
    })
  },
  // 修改医院设置
  updateHospSet(hospitalSet) {
    return request({
      url: `/admin/hosp/hospitalSet/updateHospitalSet`,
      method: 'post',
      data: hospitalSet
    })
  }
}
