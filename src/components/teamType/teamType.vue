<!--suppress ALL -->
<template>
  <div>
    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">团队类型管理</h1>
    <div class="row">
      <div class="col-12">
        <button class="btn btn-info" @click="openModal('#addModal')"><i class="fa fa-newspaper"></i> 添加团队类型</button>
      </div>
      <div class="col-12" style="padding-top:1rem">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>团队类型编号</th>
                <th>团队类型名称</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in pageData.rows">
                <td>{{item.ttypeid}}</td>
                <td>{{item.ttypename}}</td>
                <td><button class="btn btn-info" @click="getTeamType(item)">编辑</button> <button class="btn btn-danger" @click="deleteTeamType(item.ttypeid)">删除</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>


    <!--新增Modal-->
    <div id="addModal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">添加团队类型</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label>团队类型名称</label>
                  <input type="text" v-model="add.ttypename" class="form-control" placeholder="请输入团队类型名称" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addTeamType">保存</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>


    <!--修改Modal-->
    <div id="updateModal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">修改团队类型</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label>团队类型名称</label>
                  <input type="text" v-model="update.ttypename" class="form-control" placeholder="请输入团队类型名称" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="updateTeamType()">保存</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>

  import CONSTANT from "@/assets/js/constant";

  export default {
    name: "teamType",
    data(){
      return {
        add:{
          ttypename:'',
        },
        update:{
          ttypeid:0,
          ttypename:'',
        },
        pageData:{

        },
        CONSTANT:CONSTANT
      }
    },
    mounted(){
      this.getTeamTypeList();
    },
    methods: {
      getTeamTypeList(){
        this.axios.get("/admin/teamType/selectAdminPageInfo")
          .then((json)=>{
            if(json.data.code===200)
            {
              this.pageData=json.data.result
              console.info(this.pageData)
            }
            else
            {
              CONSTANT.MESSAGEBOX(json.data.msg,'failed');
              return false
            }
          })
      },
      openModal(id) {
        jQuery(id).modal('show');
      },
      addTeamType()
      {
        let data = new FormData();
        data.append("ttypename",this.add.ttypename);
        this.axios.post("/admin/teamType/insert",data)
          .then((json)=>{
            if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
            {
              CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                jQuery('#addModal').modal('hide');
                this.getTeamTypeList();
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
      /**
       * 删除轮播
       * @param bid
       */
      deleteTeamType(ttypeid)
      {
        let flag = confirm("您确定要删除编号为["+ttypeid+"]的轮播信息吗?");
        if(flag)
        {
          this.axios.get("/admin/teamType/delete?nid="+ttypeid)
            .then((json)=>{
              if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
              {
                CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                  this.getTeamTypeList();
                })
              }
              else
              {
                CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                })
              }
            })
        }
      },
      /**
       * 获取轮播
       */
      getTeamType(data){
        this.update=data;
        this.openModal("#updateModal");
      },
      /**
       * 修改轮播
       */
      updateTeamType(){
        let data = new FormData();
        data.append("ttypeid",this.update.ttypeid);
        data.append("ttypename",this.update.ttypename);
        this.axios.post("/admin/teamType/update",data)
          .then((json)=>{
            if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
            {
              CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                jQuery('#updateModal').modal('hide');
                this.update={}
                this.getTeamTypeList();
              })
            }
            else
            {
              CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                jQuery('#updateModal').modal('hide');
              })
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
