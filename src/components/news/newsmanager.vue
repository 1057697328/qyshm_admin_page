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
              <td><button class="btn btn-info">修改新闻</button> <button class="btn btn-info">删除新闻</button></td>
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
            <button type="button" class="btn btn-primary" @click="addNews()">保存</button>
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
            <button type="button" class="btn btn-primary" @click="updateBanner()">保存</button>
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
      addNews()
      {
        let data = new FormData();
        data.append("href",this.add.href);
        data.append("imgFile",this.add.imgFile);
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
    }
  }
</script>

<style scoped>

</style>
