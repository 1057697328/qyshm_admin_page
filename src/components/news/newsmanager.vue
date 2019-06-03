<!--suppress ALL -->
<template>
  <div>
    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">新闻管理</h1>
    <div class="row">
      <div class="col-12">
        <button class="btn btn-info" @click="openModal('#addModal')"><i class="fa fa-newspaper"></i> 添加新闻</button>
      </div>
      <div class="col-12" style="padding-top:1rem">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th>新闻编号</th>
              <th>新闻标题</th>
              <th>新闻封面图片</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in pageData.rows">
              <td>{{item.nid}}</td>
              <td>{{item.ntitle}}</td>
              <td><img :src="CONSTANT.URL+item.coverimg" alt=""></td>
              <td><button class="btn btn-info" @click="getNews(item)">修改新闻</button> <button class="btn btn-danger" @click="deleteNews(item.nid)">删除新闻</button></td>
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
            <h5 class="modal-title">添加新闻</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label>新闻标题</label>
                  <input type="text" v-model="add.ntitle" class="form-control" placeholder="请输入新闻标题" />
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label>新闻封面图片</label>
                  <input type="file" class="form-control-file" @change="changeAddImage" />
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label>作者</label>
                  <input type="text" v-model="add.author" class="form-control" placeholder="请输入新闻作者" />
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label>新闻详情</label>
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
                  <label>新闻标题</label>
                  <input type="text" v-model="update.ntitle" class="form-control" placeholder="请输入新闻标题" />
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label>新闻封面图片</label>
                  <input type="file" class="form-control-file" @change="changeUpdateImage" />
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label>作者</label>
                  <input type="text" v-model="update.author" class="form-control" placeholder="请输入新闻作者" />
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label>新闻详情</label>
                  <div ref="updateeditor" style="text-align:left"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="updateNews()">保存</button>
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
          ntitle:'',
          coverimg:'',
          ndetail:'',
          author:'',
          imgFile:''
        },
        update:{
          nid:0,
          ntitle:'',
          coverimg:'',
          ndetail:'',
          author:'',
          imgFile:''
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
        this.add.ndetail=html
        this.$emit('change', this.add.ndetail)
      }

      this.updateeditor = new E(this.$refs.updateeditor);
      this.updateeditor.customConfig.uploadImgServer=CONSTANT.URL+"/file/upload";
      this.updateeditor.customConfig.uploadFileName="files";
      this.updateeditor.customConfig.onchange=(html)=>{
        that.update.ndetail=html
        this.$emit('change', this.update.ndetail)
      }

      this.addeditor.create();
      this.updateeditor.create();

      this.getNewsList();
    },
    methods:{
      getNewsList()
      {
        this.axios.get("/admin/news/selectAdminPageInfo")
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
				this.axios.get("/admin/news/selectAdminPageInfo?page=" + pageindex)
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
      addData()
      {
        let data = new FormData();
        if(this.add.imgFile!=="" ||this.add.imgFile!==null) {
          data.append("imgFile", this.add.imgFile);
        }
        data.append("author",this.add.author);
        data.append("ntitle",this.add.ntitle);
        data.append("ndetail",this.add.ndetail);
        let config = {
          //添加请求头
          headers: { "Content-Type": "multipart/form-data" },
        };
        this.axios.post("/admin/news/insert",data,config)
          .then((json)=>{
            if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
            {
              CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                jQuery('#addModal').modal('hide');
                this.getNewsList();
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
      getNews(data)
      {
        this.update=data;
        this.updateeditor.txt.html(this.update.ndetail);
        this.openModal("#updateModal");
      },
      /**
       * 更新新闻信息
       */
      updateNews()
      {
        let data = new FormData();
        if(this.update.imgFile!=="" ||this.update.imgFile!==null) {
          data.append("imgFile", this.update.imgFile);
        }
        data.append("coverimg",this.update.coverimg);
        data.append("author",this.update.author);
        data.append("ntitle",this.update.ntitle);
        data.append("ndetail",this.update.ndetail);
        data.append("nid",this.update.nid);

        let config = {
          //添加请求头
          headers: { "Content-Type": "multipart/form-data" },
        };
        this.axios.post("/admin/news/update",data,config)
          .then((json)=>{
            if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
            {
              CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                jQuery('#updateModal').modal('hide');
                this.getNewsList();
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
       * 删除新闻
       * @param nid
       */
      deleteNews(nid)
      {
        let flag = confirm("您确定要删除编号为["+nid+"]的新闻信息吗?");
        if(flag)
        {
          this.axios.get("/admin/news/delete?nid="+nid)
            .then(json=>{
              if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
              {
                CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                  this.getNewsList();
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
