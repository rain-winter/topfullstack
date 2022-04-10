import $request from '../utils/request'

export default {
  deleteCourse(params: any) {
    return $request({
      method: 'delete',
      url: `/courses/${params._id}`,
    })
  },
}
