<!--suppress ALL -->
<template>
  <div>
    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">合作类型管理</h1>
    <div class="row">
      <div class="col-12">
        <button class="btn btn-info" @click="openModal('#addModal')"><i class="fa fa-newspaper"></i> 添加合作类型</button>
      </div>
      <div class="col-12" style="padding-top:1rem">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>合作类型编号</th>
                <th>合作类型名称</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in pageData.rows">
                <td>{{item.ctypeid}}</td>
                <td>{{item.ctypename}}</td>
                <td><button class="btn btn-info" @click="getCoopType(item)">编辑</button> <button class="btn btn-danger" @click="deleteCoopType(item.ctypeid)">删除</button></td>
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
            <h5 class="modal-title">添加合作类型</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label>合作类型名称</label>
                  <input type="text" v-model="add.ctypename" class="form-control" placeholder="请输入合作机构类型名称" />
                </div>
              </div>
							<div class="col-12">
							  <div class="form-group">
							    <label>是否展示详情</label>
									<select v-model="add.showdetail" class="form-control">
										<option value="0">展示详情</option>
										<option value="1">不展示详情</option>
									</select>
							  </div>
							</div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addCoopType">保存</button>
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
            <h5 class="modal-title">修改合作类型</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label>合作类型名称</label>
                  <input type="text" v-model="update.ctypename" class="form-control" placeholder="请输入合作类型名称" />
                </div>
              </div>
							<div class="col-12">
							  <div class="form-group">
							    <label>是否展示详情</label>
									<select v-model="update.showdetail" class="form-control">
										<option value="0">展示详情</option>
										<option value="1">不展示详情</option>
									</select>
							  </div>
							</div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="updateCoopType()">保存</button>
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
    name: "CoopType",
    data(){
      return {
        add:{
          ttypename:'',
					showdetail:''
        },
        update:{
          ttypeid:0,
          ttypename:'',
					showdetail:''
        },
        pageData:{

        },
        CONSTANT:CONSTANT
      }
    },
    mounted(){
      this.getCoopTypeList();
    },
    methods: {
      getCoopTypeList(){
        this.axios.get("/admin/coopType/selectAdminPageInfo")
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
      addCoopType()
      {
        let data = new FormData();
        data.append("ctypename",this.add.ctypename);
				data.append("showdetail",this.add.showdetail);
        this.axios.post("/admin/coopType/insert",data)
          .then((json)=>{
            if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
            {
              CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                jQuery('#addModal').modal('hide');
                this.getCoopTypeList();
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
      deleteCoopType(ctypeid)
      {
        let flag = confirm("您确定要删除编号为["+ctypeid+"]的轮播信息吗?");
        if(flag)
        {
          this.axios.get("/admin/coopType/delete?cid="+ctypeid)
            .then((json)=>{
              if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
              {
                CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                  this.getCoopTypeList();
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
      getCoopType(data){
        this.update=data;
        this.openModal("#updateModal");
      },
      /**
       * 修改轮播
       */
      updateCoopType(){
        let data = new FormData();
        data.append("ctypeid",this.update.ctypeid);
        data.append("ctypename",this.update.ctypename);
				 data.append("showdetail",this.update.showdetail);
        this.axios.post("/admin/coopType/update",data)
          .then((json)=>{
            if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
            {
              CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                jQuery('#updateModal').modal('hide');
                this.update={}
                this.getCoopTypeList();
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
