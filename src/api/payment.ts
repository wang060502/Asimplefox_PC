import request from '@/utils/request'


//创建订单
export const getCreateOrder =()=>{
  return request.get('/paypalv2/cap',{
    params:{
      price:1
    }
  })
}


//取消订单
export const CloseOrder = (token:string)=>{
  return request.get('/paypalv2/cancel',{
    params:{
      token
    }
  })
}
