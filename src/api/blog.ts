import request from '@/utils/request'

// 获取博客列表
export const GetarticleList = (pn:number) => {
  return request.get('/api/article/list', {
    params: {
      pn,
      ps: 8
    }
  })
}


//查询单个博客详情
export const Getarticledetail =(id:number)=>{
  return request.get('/api/article/get',{
    params:{
      id
    }
  })
}
