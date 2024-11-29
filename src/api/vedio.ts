import request from '@/utils/request'

// 获取猜你喜欢视频列表
export const GetVedioList = () => {
  return request.get('/api/videos/random', {
    params: {
      count: 10
    }
  }
  )
}

// 获取单个视频列表
export const GetOneVedioList = (id:number,ftype:number) => {
  return request.get('/api/videos', {
    params: {
      id,
      ftype
    }
  })
}



// 视频详情列表
export const SelVediodetail = (vid:number) => {
  return request.get('/api/video/list', {
    params: {
      vid
    }
  })
}
