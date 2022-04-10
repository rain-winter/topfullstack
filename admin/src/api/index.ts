import $request from '../utils/request'

export default {
  deleteCourse(params: any) {
    return $request({
      method: 'delete',
      url: `/courses/${params._id}`,
    })
  },
  createCourse(params) {
    return $request({
      method: 'post',
      url: `/courses`,
      data: params,
    })
  },
  // updateCourse(params) {
  //   return $request({
  //     method: 'post',
  //     url: `/courses`,
  //     data: params,
  //   })
  // },
}
