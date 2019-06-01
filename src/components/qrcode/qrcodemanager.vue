<!--suppress ALL -->
<template>
  <div>
    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">二维码管理</h1>
    <div class="row">
      <div class="col-12">
        <button class="btn btn-info" @click="openModal('#addModal')"><i class="fa fa-newspaper"></i> 添加技术研发信息</button>
      </div>
      <div class="col-12" style="padding-top:1rem">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th>二维码编号</th>
              <th>二维码图片</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in pageData.rows">
              <td>{{item.qid}}</td>
              <td><img :src="CONSTANT.URL+item.imgpath" alt=""></td>
              <td><button class="btn btn-info" @click="getData(item)">修改信息</button> <button class="btn btn-danger" @click="deleteData(item.qid)">删除信息</button></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>


    <!--新增Modal-->
    <div id="addModal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">添加二维码</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label>二维码图片</label>
                  <input type="file" @change="changeAddImage" class="form-control"  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addData()">保存</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>


    <!--修改Modal-->
    <div id="updateModal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">修改二维码</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label>二维码图片</label>
                  <input type="file" @change="changeUpdateImage" class="form-control"  />
                </div>
              </div>

            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="updateData()">保存</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import CONSTANT from "../../assets/js/constant";

  export default {
    name: "qrcodemanager",
    data() {
      return {
        pageData: {},
        CONSTANT:CONSTANT,
        add:{
          imgFile:''
        },
        update:{
          qid:0,
          imgpath:'',
          imgFile:''
        }

      }
    },
    mounted() {
      let that = this;

      this.getList();
    },
    methods:{
      getList()
      {
        this.axios.get("/admin/qrcode/selectAdminPageInfo")
          .then(json => {
            if (json.data.code !== CONSTANT.STATUSCODE.SUCCESS) {
              return CONSTANT.MESSAGEBOX(json.data.msg, 'error', () => {
                return false;
              });
            } else {
              this.pageData = json.data.result;
            }
          })
      },
      openModal(id)
      {
        jQuery(id).modal('show');
      },
      changeAddImage(e)
      {
        this.add.imgFile=e.target.files[0]
      },
      changeUpdateImage(e)
      {
        this.update.imgFile=e.target.files[0]
      },
      addData()
      {

        let that = this;

        let data = new FormData();
        if(this.add.imgFile!=="" ||this.add.imgFile!==null) {
          data.append("imgFile", this.add.imgFile);
        }
        let config = {
          //添加请求头
          headers: { "Content-Type": "multipart/form-data" },
        };

        this.axios.post("/admin/qrcode/insert",data,config)
          .then((json)=>{
            if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
            {
              CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                jQuery('#addModal').modal('hide');
                this.getList();
              })
            }
            else
            {
              CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                jQuery('#addModal').modal('hide');
              })
            }
          })
      },
      getData(data)
      {
        this.update=data;
        console.info(this.update)
        this.openModal("#updateModal");
      },
      /**
       * 更新二维码
       */
      updateData()
      {
        let that=this;

        let data = new FormData();
        if(this.update.imgFile!=="" ||this.update.imgFile!==null) {
          data.append("imgFile", this.update.imgFile);
        }
        data.append("qid",this.update.qid);
        data.append("qid",this.update.qid);
        data.append("imgpath",this.update.imgpath);
        let config = {
          //添加请求头
          headers: { "Content-Type": "multipart/form-data" },
        };

        this.axios.post("/admin/qrcode/update",data,config)
          .then((json)=>{
            if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
            {
              CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                jQuery('#updateModal').modal('hide');
                this.update.imgFile=''
                this.getList();
              })
            }
            else
            {
              CONSTANT.MESSAGEBOX(json.data.message,"error",()=>{
                jQuery('#updateModal').modal('hide');
              })
            }
          })

      },
      /**
       * 删除二维码
       * @param tid
       */
      deleteData(qid)
      {
        let flag = confirm("您确定要删除编号为["+qid+"]的二维码吗?");
        if(flag)
        {
          this.axios.get("/admin/qrcode/delete?qid="+qid)
            .then(json=>{
              if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
              {
                CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                  this.getList();
                })
              }
              else
              {
                CONSTANT.MESSAGEBOX(json.data.message,"error",()=>{
                  return false;
                })
              }
            })
        }
      }
    }
  }
</script>

<style scoped>

</style>
