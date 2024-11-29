import request from '@/utils/request'


// 获取轮播图
export const GetBannerList = () => {
  return request.get('/api/carousel')
}

// 获取首页推荐列表数据
export const Getreclist = () => {
  return request.get('/api/tags', {
    params: {
      tag: 'rec'
    }
  })
}

// 获取热门推荐列表数据
export const Gethotlist = () => {
  return request.get('/api/tags', {
    params: {
      tag: 'hot'
    }
  })
}

// 获取最新列表数据
export const Getnewlist = () => {
  return request.get('/api/tags', {
    params: {
      tag: 'new'
    }
  })
}

// 获取搜索列表
export const GetSearch = (keyword:string) => {
  return request.get('/api/videos/search', {
    params: {
      keyword
    }
  })
}

// 获取单个首页推荐
export const Getweekone = () => {
  return request.get('/api/videos/weekone')
}


// 获取分类视频
export const GetClassify = ( pn:number,ftype:number,types:string) => {
  return request.get('/api/videos', {
    params: {
      ps: 12,
      pn,
      ftype,
      types
    }
  })
}


//获取分类标签
export const GetClassifyTag=()=>{
  return request.get('/api/types')
}
