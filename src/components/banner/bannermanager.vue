<!--suppress ALL -->
<template>
  <div>
    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">轮播管理</h1>
    <div class="row">
      <div class="col-12">
        <button class="btn btn-info" @click="openModal('#addModal')"><i class="fa fa-newspaper"></i> 添加轮播</button>
      </div>
      <div class="col-12" style="padding-top:1rem">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>轮播编号</th>
                <th>轮播图片</th>
                <th>轮播跳转地址</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in pageData.rows">
                <td>{{item.bid}}</td>
                <td><img :src="CONSTANT.URL+item.imgpath" alt=""></td>
                <td>{{item.href}}</td>
                <td><button class="btn btn-info" @click="getBanner(item)">编辑</button> <button class="btn btn-danger" @click="deleteBanner(item.bid)">删除轮播</button></td>
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
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">添加轮播</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label>轮播图片</label>
                  <input type="file" class="form-control-file" @change="changeAddImage" />
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label>跳转地址</label>
                  <input type="text" v-model="add.href" class="form-control" placeholder="请输入单击轮播后跳转的链接地址" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addBanner">保存</button>
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
            <h5 class="modal-title">修改轮播</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label>轮播图片(如不更换轮播图请勿选择图片)</label>
                  <input type="file" class="form-control-file" @change="changeUpdateImage" />
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label>跳转地址</label>
                  <input type="text" v-model="update.href" class="form-control" placeholder="请输入单击轮播后跳转的链接地址" />
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

  import CONSTANT from "@/assets/js/constant";

  export default {
    name: "bannermanager",
    data(){
      return {
        add:{
          href:'',
          imgFile:''
        },
        update:{
          bid:0,
          href:'',
          imgpath:'',
          imgFile:''
        },
        pageData:{

        },
        CONSTANT:CONSTANT
      }
    },
    mounted(){
      this.getBannerList();
    },
    methods: {
      getBannerList(){
        this.axios.get("/admin/banner/selectAdminPageInfo")
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
			// 获取分页数据
			getPage(pageindex)
			{
				this.axios.get("/admin/banner/selectAdminPageInfo?page="+pageindex)
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
       /**
       * 更改保存轮播图片框内容
       * @param e
       */
      changeAddImage(e)
      {
        this.add.imgFile=e.target.files[0]
      },
      /**
       * 修改模态框更换图片
       */
      changeUpdateImage(e)
      {
        this.update.imgFile=e.target.files[0]
      },
      addBanner()
      {
        let data = new FormData();
        data.append("href",this.add.href);
        data.append("imgFile",this.add.imgFile);
        let config = {
          //添加请求头
          headers: { "Content-Type": "multipart/form-data" },
        };
        this.axios.post("/admin/banner/insert",data,config)
          .then((json)=>{
            if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
            {
              CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                jQuery('#addModal').modal('hide');
                this.getBannerList();
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
      deleteBanner(bid)
      {
        let flag = confirm("您确定要删除编号为["+bid+"]的轮播信息吗?");
        if(flag)
        {
          this.axios.get("/admin/banner/delete?bid="+bid)
            .then((json)=>{
              if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
              {
                CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                  this.getBannerList();
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
      getBanner(data){
        this.update=data;
        this.openModal("#updateModal");
      },
      /**
       * 修改轮播
       */
      updateBanner(){
        let data = new FormData();
        data.append("bid",this.update.bid);
        data.append("href",this.update.href);
        if(this.update.imgpath)
        {
          data.append("imgpath",this.update.imgpath);
        }
        data.append("imgFile",this.update.imgFile);
        let config = {
          //添加请求头
          headers: { "Content-Type": "multipart/form-data" },
        };
        this.axios.post("/admin/banner/update",data,config)
          .then((json)=>{
            if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
            {
              CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                jQuery('#updateModal').modal('hide');
                this.update={}
                this.getBannerList();
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
