<!--suppress ALL -->
<template>
  <div>
    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">技术研发管理</h1>
    <div class="row">
      <div class="col-12">
        <button class="btn btn-info" @click="openModal('#addModal')"><i class="fa fa-newspaper"></i> 添加技术研发信息</button>
      </div>
      <div class="col-12" style="padding-top:1rem">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th>技术研发编号</th>
              <th>技术研发标题</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in pageData.rows">
              <td>{{item.tid}}</td>
              <td>{{item.ttitle}}</td>
              <td><button class="btn btn-info" @click="getTechDev(item)">修改信息</button> <button class="btn btn-danger" @click="deleteTechDev(item.tid)">删除信息</button></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
				<!-- 分页 -->
			<div>
				<nav aria-label="Page navigation example">
					<ul class="pagination">
						<li class="page-item"><a class="page-link" href="javascript:void(0)" @click="getPage(1)">首页</a></li>
						<li class="page-item" v-for="num in pageData.totalPage"><a class="page-link" href="javascript:void(0)" @click="getPage(num)">{{num}}</a></li>
						<li class="page-item"><a class="page-link" href="javascript:void(0)" @click="getPage(pageData.totalPage)">尾页</a></li>
					</ul>
				</nav>
			</div>
    </div>


    <!--新增Modal-->
    <div id="addModal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">添加技术研发信息</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label>技术研发标题</label>
                  <input type="text" v-model="add.ttitle" class="form-control" placeholder="请输入技术研发标题" />
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label>技术研发详情</label>
                  <div ref="addeditor" style="text-align:left"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addTechDev()">保存</button>
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
            <h5 class="modal-title">修改技术研发信息</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label>技术标题</label>
                  <input type="text" v-model="update.ttitle" class="form-control" placeholder="请输入技术研发标题" />
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label>技术研发详情</label>
                  <div ref="updateeditor" style="text-align:left"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="updateTechDev()">保存</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import CONSTANT from "../../assets/js/constant";
  import E from 'wangeditor'

  export default {
    name: "newsmanager",
    data() {
      return {
        pageData: {},
        CONSTANT:CONSTANT,
        add:{
          ttitle:'',
          tdetail:'',
        },
        update:{
          tid:0,
          ttitle:'',
          createtime:'',
          tdetail:'',
        },
        addeditor:null,
        updateeditor:null

      }
    },
    watch: {
      isClear (val) {
        // 触发清除文本域内容
        if (val) {
          this.editor.txt.clear()
        }
      },
      value (val) {
        // 使用 v-model 时，设置初始值
        this.editor.txt.html(val)
      }
    },
    mounted() {
      let that = this;

      this.addeditor = new E(this.$refs.addeditor);
      this.addeditor.customConfig.uploadImgServer=CONSTANT.URL+"/file/upload";
      this.addeditor.customConfig.uploadFileName="files";
      this.addeditor.customConfig.onchange=(html)=>{
        this.add.tdetail=html
        this.$emit('change', this.add.tdetail)
      }

      this.updateeditor = new E(this.$refs.updateeditor);
      this.updateeditor.customConfig.uploadImgServer=CONSTANT.URL+"/file/upload";
      this.updateeditor.customConfig.uploadFileName="files";
      this.updateeditor.customConfig.onchange=(html)=>{
        that.update.tdetail=html
        this.$emit('change', this.update.tdetail)
      }

      this.addeditor.create();
      this.updateeditor.create();

      this.getTechDevList();
    },
    methods:{
      getTechDevList()
      {
        this.axios.get("/admin/techdev/selectAdminPageInfo")
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
			// 获取分页数据
			getPage(pageindex) {
				this.axios.get("/admin/techdev/selectAdminPageInfo?page=" + pageindex)
					.then((json) => {
						if (json.data.code === 200) {
							this.pageData = json.data.result
							console.info(this.pageData)
						} else {
							CONSTANT.MESSAGEBOX(json.data.msg, 'failed');
							return false
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
      addTechDev()
      {

        let that = this;

        this.axios.post("/admin/techdev/insert",
          {
            "ttitle":that.add.ttitle,
            "tdetail":that.add.tdetail,
          })
          .then((json)=>{
            if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
            {
              CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                jQuery('#addModal').modal('hide');
                this.getTechDevList();
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
      getTechDev(data)
      {
        this.update=data;
        this.updateeditor.txt.html(this.update.tdetail);
        this.openModal("#updateModal");
      },
      /**
       * 更新技术研发信息
       */
      updateTechDev()
      {
        let that=this;

        this.axios.post("/admin/techdev/update",
          {
            "ttitle":that.update.ttitle,
            "createtime":that.update.createtime,
            "tdetail":that.update.tdetail,
            "tid":that.update.tid
          }
        )
          .then((json)=>{
            if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
            {
              CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                jQuery('#updateModal').modal('hide');
                this.getTechDevList();
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
       * 删除技术研发信息
       * @param tid
       */
      deleteTechDev(tid)
      {
        let flag = confirm("您确定要删除编号为["+tid+"]的技术研发信息吗?");
        if(flag)
        {
          this.axios.get("/admin/techdev/delete?tid="+tid)
            .then(json=>{
              if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
              {
                CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                  this.getTechDevList();
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
