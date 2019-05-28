import swal from 'sweetalert'
const CONSTANT={
  URL:"http://127.0.0.1:8080",
  STATUSCODE:{
    SUCCESS:200,
    FAILED:500,
    NOLOGIN:501
  },
  MESSAGEBOX(message,icon,callback){
  return swal ( "系统提示" ,  message ,  icon ).then(callback)
}
};
export default CONSTANT
