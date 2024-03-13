// 封装多个功能呢的接口请求函数

//1.查询产品库存列表
export function reqGraspList() {
  return request({
    url: "/grasp/list",
    method: "get",
  });
}

export function reqGraspAdd(data) {
  return request({
    url: "/grasp/add",
    method: "post",
    data,
  });
}
