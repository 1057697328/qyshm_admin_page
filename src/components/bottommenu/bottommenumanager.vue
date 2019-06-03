<!--suppress ALL -->
<template>
  <div>
    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">底部菜单管理</h1>
    <div class="row">
      <div class="col-12">
        <button class="btn btn-info" @click="openModal('#addModal')"><i class="fa fa-newspaper"></i> 添加底部菜单</button>
      </div>
      <div class="col-12" style="padding-top:1rem">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th>底部菜单编号</th>
              <th>底部菜单标题</th>
              <th>底部菜单跳转类型</th>
              <th>底部菜单跳转地址</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in pageData.rows">
              <td>{{item.bmid}}</td>
              <td>{{item.bmtitle }}</td>
              <td>{{item.bmstatus==0?'跳转链接':'展示详情'}}</td>
              <td>{{item.bmhref=='' || !item.bmhref?'无跳转链接':item.bmhref}}</td>
              <td>
                <button class="btn btn-info" @click="getData(item)">修改信息</button>
                <button class="btn btn-danger" @click="deleteData(item.bmid)">删除</button>
              </td>
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
            <h5 class="modal-title">添加底部菜单</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label>底部菜单标题</label>
                  <input type="text" v-model="add.bmtitle" class="form-control" placeholder="请输入底部菜单标题"/>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label>底部菜单打开方式</label>
                  <select class="form-control" v-model="add.bmstatus">
                    <option :value="0">跳转链接</option>
                    <option :value="1">展示详情信息</option>
                  </select>
                </div>
              </div>
              <div class="col-12" v-show="add.bmstatus===0">
                <div class="form-group">
                  <label>跳转链接地址</label>
                  <input type="text" class="form-control" v-model="add.bmhref" placeholder="请输入跳转链接地址"/>
                </div>
              </div>
              <div class="col-12" v-show="add.bmstatus===1">
                <div class="form-group">
                  <label>底部菜单详情信息</label>
                  <div ref="addeditor" style="text-align:left"></div>
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
            <h5 class="modal-title">修改轮播</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label>底部菜单标题</label>
                  <input type="text" v-model="update.bmtitle" class="form-control" placeholder="请输入底部菜单标题"/>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label>底部菜单打开方式</label>
                  <select class="form-control" v-model="update.bmstatus">
                    <option :value="0">跳转链接</option>
                    <option :value="1">展示详情信息</option>
                  </select>
                </div>
              </div>
              <div class="col-12" v-show="update.bmstatus===0">
                <div class="form-group">
                  <label>跳转链接地址</label>
                  <input type="text" class="form-control" v-model="update.bmhref" placeholder="请输入跳转链接地址"/>
                </div>
              </div>
              <div class="col-12" v-show="update.bmstatus===1">
                <div class="form-group">
                  <label>底部菜单详情信息</label>
                  <div ref="updateeditor" style="text-align:left"></div>
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
  import E from 'wangeditor'

  export default {
    name: "newsmanager",
    data() {
      return {
        pageData: {},
        CONSTANT: CONSTANT,
        add: {
          bmtitle: '',
          bmhref: '',
          bmstatus: 0,
          bmdetail: ''
        },
        update: {
          bmid: 0,
          bmtitle: '',
          bmhref: '',
          bmstatus: 0,
          bmdetail: ''
        },
        addeditor: null,
        updateeditor: null

      }
    },
    watch: {
      isClear(val) {
        // 触发清除文本域内容
        if (val) {
          this.editor.txt.clear()
        }
      },
      value(val) {
        // 使用 v-model 时，设置初始值
        this.editor.txt.html(val)
      }
    },
    mounted() {
      let that = this;

      this.addeditor = new E(this.$refs.addeditor);
      this.addeditor.customConfig.uploadImgServer = CONSTANT.URL + "/file/upload";
      this.addeditor.customConfig.uploadFileName = "files";
      this.addeditor.customConfig.onchange = (html) => {
        this.add.bmdetail = html
        this.$emit('change', this.add.bmdetail)
      }

      this.updateeditor = new E(this.$refs.updateeditor);
      this.updateeditor.customConfig.uploadImgServer = CONSTANT.URL + "/file/upload";
      this.updateeditor.customConfig.uploadFileName = "files";
      this.updateeditor.customConfig.onchange = (html) => {
        that.update.bmdetail = html
        this.$emit('change', this.update.bmdetail)
      }

      this.addeditor.create();
      this.updateeditor.create();

      this.getList();
    },
    methods: {
      getList() {
        this.axios.get("/admin/bottommenu/selectAdminPageInfo")
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
				this.axios.get("/admin/bottommenu/selectAdminPageInfo?page=" + pageindex)
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
      openModal(id) {
        jQuery(id).modal('show');
      },
      changeAddImage(e) {
        this.add.imgFile = e.target.files[0]
      },
      changeUpdateImage(e) {
        this.update.imgFile = e.target.files[0]
      },
      addData() {

        this.axios.post("/admin/bottommenu/insert", {
          bmtitle: this.add.bmtitle,
          bmhref: this.add.bmhref,
          bmstatus: this.add.bmstatus,
          bmdetail: this.add.bmdetail
        })
          .then((json) => {
            if (json.data.code === CONSTANT.STATUSCODE.SUCCESS) {
              CONSTANT.MESSAGEBOX(json.data.message, "success", () => {
                jQuery('#addModal').modal('hide');
                this.getList();
              })
            } else {
              CONSTANT.MESSAGEBOX(json.data.message, "success", () => {
                jQuery('#addModal').modal('hide');
              })
            }
          })
      },
      getData(data) {
        this.update = data;
        console.info()
        if(this.update.bmdetail==null)
        {
          this.updateeditor.txt.html("");
        }
        this.updateeditor.txt.html(this.update.bmdetail);
        this.openModal("#updateModal");
      },
      /**
       * 更新底部菜单
       */
      updateData() {
        let that = this;
        this.axios.post("/admin/bottommenu/update", {
          bmtitle: this.update.bmtitle,
          bmhref: this.update.bmhref,
          bmstatus: this.update.bmstatus,
          bmdetail: this.update.bmdetail,
          bmid: this.update.bmid
        })
          .then((json) => {

            if (json.data.code === CONSTANT.STATUSCODE.SUCCESS) {
              CONSTANT.MESSAGEBOX(json.data.message, "success", () => {
                jQuery('#updateModal').modal('hide');
                that.update = {
                  bmid:0,
                  bmtitle:'',
                  bmhref:'',
                  bmstatus:0,
                  bmdetail:''
                }
                this.getList();
              })
            } else {
              CONSTANT.MESSAGEBOX(json.data.message, "error", () => {
                jQuery('#updateModal').modal('hide');
              })
            }
          })

      },
      /**
       * 删除底部菜单
       * @param bmid
       */
      deleteData(bmid) {
        let flag = confirm("您确定要删除编号为[" + bmid + "]的底部菜单吗?");
        if (flag) {
          this.axios.get("/admin/bottommenu/delete?bmid=" + bmid)
            .then(json => {
              if (json.data.code === CONSTANT.STATUSCODE.SUCCESS) {
                CONSTANT.MESSAGEBOX(json.data.message, "success", () => {
                  this.getList();
                })
              } else {
                CONSTANT.MESSAGEBOX(json.data.message, "error", () => {
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
