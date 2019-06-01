<!--suppress ALL -->
<template>
  <div id="wrapper">
    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" :class="{'toggled':toggled}"
        id="accordionSidebar">

      <!-- Sidebar - Brand -->
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-cogs"></i>
        </div>
        <div class="sidebar-brand-text mx-3">后台管理面板</div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item">
        <a class="nav-link" href="index.html">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>仪表盘</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        基本管理
      </div>

      <!-- Nav Item - Pages Collapse Menu -->
      <li class="nav-item" :class="{'active':showComponent==='bannermanager'}">
        <a class="nav-link" href="javascript:void(0)" @click="showComponent='bannermanager'">
          <i class="fas fa-fw fa-image"></i>
          <span>轮播管理</span>
        </a>
      </li>

      <li class="nav-item" :class="{'active':showComponent==='newspaper'}">
        <a class="nav-link" href="javascript:void(0)" @click="showComponent='newsmanager'">
          <i class="fas fa-fw fa-newspaper"></i>
          <span>新闻管理</span>
        </a>
      </li>

      <li class="nav-item" :class="{'active':showComponent==='Productmanager'}">
        <a class="nav-link" href="javascript:void(0)" @click="showComponent='Productmanager'">
          <i class="fas fa-fw fa-newspaper"></i>
          <span>产品管理</span>
        </a>
      </li>


      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        技术团队
      </div>


      <li class="nav-item" :class="{'active':showComponent==='Teammanager'}">
        <a class="nav-link" href="javascript:void(0)" @click="showComponent='Teammanager'">
          <i class="fas fa-fw fa-users-cog"></i>
          <span>技术团队管理</span>
        </a>
      </li>

      <li class="nav-item" :class="{'active':showComponent==='Teamtypemanager'}">
        <a class="nav-link" href="javascript:void(0)" @click="showComponent='Teamtypemanager'">
          <i class="fas fa-fw fa-user-cog"></i>
          <span>技术团队类型管理</span>
        </a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        合作机构
      </div>

      <li class="nav-item" :class="{'active':showComponent==='Coopmanager'}">
        <a class="nav-link" href="javascript:void(0)" @click="showComponent='Coopmanager'">
          <i class="fas fa-fw fa-user-cog"></i>
          <span>合作机构管理</span>
        </a>
      </li>
      <li class="nav-item" :class="{'active':showComponent==='Cooptypemanager'}">
        <a class="nav-link" href="javascript:void(0)" @click="showComponent='Cooptypemanager'">
          <i class="fas fa-fw fa-user-cog"></i>
          <span>合作机构类型管理</span>
        </a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        技术研发
      </div>

      <li class="nav-item" :class="{'active':showComponent==='Techdevmanager'}">
        <a class="nav-link" href="javascript:void(0)" @click="showComponent='Techdevmanager'">
          <i class="fas fa-fw fa-user-cog"></i>
          <span>技术研发管理</span>
        </a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        站点基础信息
      </div>

      <li class="nav-item" :class="{'active':showComponent==='Configmanager'}">
        <a class="nav-link" href="javascript:void(0)" @click="showComponent='Configmanager'">
          <i class="fas fa-fw fa-user-cog"></i>
          <span>基础信息管理</span>
        </a>
      </li>

      <li class="nav-item" :class="{'active':showComponent==='Qrcodemanager'}">
        <a class="nav-link" href="javascript:void(0)" @click="showComponent='Qrcodemanager'">
          <i class="fas fa-fw fa-user-cog"></i>
          <span>二维码管理</span>
        </a>
      </li>

      <li class="nav-item" :class="{'active':showComponent==='Bottommenumanager'}">
        <a class="nav-link" href="javascript:void(0)" @click="showComponent='Bottommenumanager'">
          <i class="fas fa-fw fa-user-cog"></i>
          <span>底部菜单管理</span>
        </a>
      </li>


      <!-- Divider -->
      <hr class="sidebar-divider d-none d-md-block">

      <!-- Sidebar Toggler (Sidebar) -->
      <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle" @click="toggled?toggled=false:toggled=true"></button>
      </div>

    </ul>
    <!-- End of Sidebar -->
    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content">

        <!-- Topbar -->
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

          <!-- Sidebar Toggle (Topbar) -->




          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">

            <!-- Nav Item - Search Dropdown (Visible Only XS) -->


            <!-- Nav Item - Alerts -->


            <!-- Nav Item - Messages -->


            <div class="topbar-divider d-none d-sm-block"></div>

            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
              <a class="nav-link dropdown-toggle" href="javascript:void(0)" @click="showProfile?showProfile=false:showProfile=true" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small">操作</span>
                <img class="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60">
              </a>
              <!-- Dropdown - User Information -->
              <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" :class="{'show':showProfile}" aria-labelledby="userDropdown">
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                  <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  退出系统
                </a>
              </div>
            </li>

          </ul>

        </nav>
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">

          <Newsmanager v-if="showComponent==='newsmanager'"></Newsmanager>
          <Bannermanager v-if="showComponent==='bannermanager'"></Bannermanager>

          <Techdevmanager v-if="showComponent==='Techdevmanager'"></Techdevmanager>
          <Configmanager v-if="showComponent==='Configmanager'"></Configmanager>
          <Qrcodemanager v-if="showComponent==='Qrcodemanager'"></Qrcodemanager>
          <Bottommenumanager v-if="showComponent==='Bottommenumanager'"></Bottommenumanager>

          <Newsmanager v-if="showComponent==='Newsmanager'"></Newsmanager>
          <Productmanager v-if="showComponent==='Productmanager'"></Productmanager>
          <Coopmanager v-if="showComponent==='Coopmanager'"></Coopmanager>
          <Cooptypemanager v-if="showComponent==='Cooptypemanager'"></Cooptypemanager>
          <Teammanager v-if="showComponent==='Teammanager'"></Teammanager>
          <Teamtypemanager v-if="showComponent==='Teamtypemanager'"></Teamtypemanager>




        </div>
        <!-- /.container-fluid -->

      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <Footer></Footer>
      <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->



  </div>
</template>

<script>
  import Footer from '@/components/footer/footer'

  import Bannermanager from '@/components/banner/bannermanager'

  /**
   * 技术研发管理
   */
  import Techdevmanager from '@/components/techdev/techdevmanager'
  /**
   * 基础信息管理
   */
  import Configmanager from '@/components/config/configmanager';

  /**
   * 二维码管理
   */
  import Qrcodemanager from '@/components/qrcode/qrcodemanager';

  import Bottommenumanager from '@/components/bottommenu/bottommenumanager';

  import Newsmanager from '@/components/news/newsmanager'

  import Productmanager from '@/components/product/product'

  import Coopmanager from '@/components/coop/coop'

  import Cooptypemanager from '@/components/coopType/coopType'

  import Teammanager from '@/components/team/team'

  import Teamtypemanager from '@/components/teamType/teamType'



  export default {
    name: "navbar",
    components: {
      Footer,
      Newsmanager,
      Bannermanager,
      Techdevmanager,
      Configmanager,
      Qrcodemanager,
      Bottommenumanager,
      Newsmanager,
      Productmanager,
      Coopmanager,
      Cooptypemanager,
      Teammanager,
      Teamtypemanager
    },
    data() {
      return {
        toggled: false,
        showComponent:null,
        showProfile:false
      }
    }
  }
</script>

<style>

</style>
