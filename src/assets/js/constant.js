import swal from 'sweetalert'
const CONSTANT={
  URL:"http://www.qyshm.net",
  STATUSCODE:{
    SUCCESS:200,
    FAILED:500,
    NOLOGIN:501
  },
  CONFIGID:1,
  MESSAGEBOX(message,icon,callback){
  return swal ( "系统提示" ,  message ,  icon ).then(callback)
}
};
export default CONSTANT
