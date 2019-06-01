<!--suppress ALL -->
<template>
  <div>
    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">基础信息管理</h1>
    <div class="row">

      <div class="col-12" style="padding-top:1rem">
        <div class="col-12">
          <div class="form-group">
            <label>联系地址</label>
            <input type="text" v-model="config.address" class="form-control" placeholder="请输入公司联系地址" />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>联系电话1</label>
            <input type="text" v-model="config.phone1" class="form-control" placeholder="请输入手机号码" />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>联系电话2</label>
            <input type="text" v-model="config.phone2" class="form-control" placeholder="请输入公司座机号码" />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>电子邮件1</label>
            <input type="text" v-model="config.email1" class="form-control" placeholder="请输入电子邮件地址" />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>电子邮件2</label>
            <input type="text" v-model="config.email2" class="form-control" placeholder="请输入电子邮件地址" />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>官网域名</label>
            <input type="text" v-model="config.website" class="form-control" placeholder="请输入官网域名地址" />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label>关于我们信息</label>
            <div ref="updateeditor" style="text-align:left"></div>
          </div>
        </div>
        <div class="col-12">
          <button class="btn btn-info" @click="updateConfig()">更新信息</button>
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

        CONSTANT:CONSTANT,
        config:{
          about:''
        },
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


      this.updateeditor = new E(this.$refs.updateeditor);
      this.updateeditor.customConfig.uploadImgServer=CONSTANT.URL+"/file/upload";
      this.updateeditor.customConfig.uploadFileName="files";
      this.updateeditor.customConfig.onchange=(html)=>{
        this.config.about=html
        this.$emit('change', this.config.about)
      }

      this.updateeditor.create()


      this.getConfig();
    },
    methods:{
      getConfig()
      {
        this.axios.get("/admin/config/selectById?cid="+CONSTANT.CONFIGID)
          .then(json => {
            if (json.data.code !== CONSTANT.STATUSCODE.SUCCESS) {
              return CONSTANT.MESSAGEBOX(json.data.msg, 'error', () => {
                return false;
              });
            } else {
              this.config = json.data.result;
              this.updateeditor.txt.html(json.data.result.about)
            }
          })
      },

      /**
       * 更新基础信息
       */
      updateConfig()
      {
        let that=this;

        this.axios.post("/admin/config/update",
          {
            "cid":that.config.cid,
            "address":that.config.address,
            "phone1":that.config.phone1,
            "phone2":that.config.phone2,
            "email1":that.config.email1,
            "email2":that.config.email2,
            "website":that.config.website,
            "about":that.config.about,
          }
        )
          .then((json)=>{
            if(json.data.code===CONSTANT.STATUSCODE.SUCCESS)
            {
              CONSTANT.MESSAGEBOX(json.data.message,"success",()=>{
                this.getConfig();
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
</script>

<style scoped>

</style>
