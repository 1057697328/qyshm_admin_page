<!--suppress ALL -->
<template>
	<div>
		<!-- Page Heading -->
		<h1 class="h3 mb-4 text-gray-800">合作机构管理</h1>
		<div class="row">
			<div class="col-12">
				<button class="btn btn-info" @click="openModal('#addModal')"><i class="fa fa-newspaper"></i> 添加合作机构</button>
			</div>
			<div class="col-12" style="padding-top:1rem" v-if="isLoad">
				<div class="table-responsive">
					<table class="table table-hover">
						<thead>
							<tr>
								<th>合作机构编号</th>
								<th>合作机构图片</th>
								<th>合作机构类型</th>
								<th>合作机构名称</th>
								<th>合作机构英文名称</th>
								<th>合作机构跳转地址</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in pageData.rows">
								<td>{{item.cid}}</td>
								<td><img :src="CONSTANT.URL+item.coverimg" alt=""></td>
								<td>{{item.qcoopType!==null?item.qcoopType.ctypename:''}}</td>
								<td>{{item.cname}}</td>
								<td>{{item.engname}}</td>
								<td>{{item.href}}</td>
								<td><button class="btn btn-info" @click="getCoop(item)">编辑</button> <button class="btn btn-danger" @click="deleteCoop(item.cid)">删除合作机构</button></td>
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
						<h5 class="modal-title">添加合作机构</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-12">
								<div class="form-group">
									<label>合作机构图片</label>
									<input type="file" class="form-control-file" @change="changeAddImage" />
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>跳转地址</label>
									<select v-model="add.ctypeid" class="form-control">
										<option v-for="itemt in pageTypeData.rows" :value="itemt.ctypeid">{{itemt.ctypename}}</option>
									</select>
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>合作机构名称</label>
									<input type="text" v-model="add.cname" class="form-control" placeholder="请输入合作机构名称" />
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>合作机构英文名称</label>
									<input type="text" v-model="add.engname" class="form-control" placeholder="请输入合作机构英文名称" />
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>跳转地址</label>
									<input type="text" v-model="add.href" class="form-control" placeholder="请输入单击合作机构后跳转的链接地址" />
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" @click="addCoop">保存</button>
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
						<h5 class="modal-title">修改合作机构</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-12">
								<div class="form-group">
									<label>合作机构图片</label>
									<input type="file" class="form-control-file" @change="changeUpdateImage" />
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>合作机构类型</label>
									<select v-model="update.ctypeid" class="form-control">
										<option v-for="itemt in pageTypeData.rows" :value="itemt.ctypeid">{{itemt.ctypename}}</option>
									</select>
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>合作机构名称</label>
									<input type="text" v-model="update.cname" class="form-control" placeholder="请输入合作机构名称" />
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>合作机构英文名称</label>
									<input type="text" v-model="update.engname" class="form-control" placeholder="请输入合作机构英文名称" />
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>跳转地址</label>
									<input type="text" v-model="update.href" class="form-control" placeholder="请输入单击合作机构后跳转的链接地址" />
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" @click="updateCoop()">保存</button>
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
		name: "coop",
		data() {
			return {
				isLoad:false,
				add: {
					href: '',
					ctypeid: '',
					cname: '',
					engname: '',
					imgFile: ''
				},
				update: {
					cid: 0,
					href: '',
					ctypeid: '',
					cname: '',
					engname: '',
					imgFile: '',
					coverimg: ''
				},
				pageData: {

				},
				pageTypeData: {

				},
				CONSTANT: CONSTANT
			}
		},
		mounted() {
			this.getCoopList();
			this.getCoopTypeList();
		},
		methods: {
			getCoopList() {
				this.axios.get("/admin/coop/selectAdminPageInfo")
					.then((json) => {
						if (json.data.code === 200) {
							this.pageData = json.data.result
							console.info(this.pageData)
							this.isLoad=true;
						} else {
							CONSTANT.MESSAGEBOX(json.data.msg, 'failed');
							return false
						}
					})
			},
			getCoopTypeList() {
				this.axios.get("/admin/coopType/selectAdminPageInfo")
					.then((json) => {
						if (json.data.code === 200) {
							this.pageTypeData = json.data.result
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
			/**
			 * 更改保存图片框内容
			 * @param e
			 */
			changeAddImage(e) {
				this.add.imgFile = e.target.files[0]
			},
			/**
			 * 修改模态框更换图片
			 */
			changeUpdateImage(e) {
				this.update.imgFile = e.target.files[0]
			},
			addCoop() {
				let data = new FormData();
				data.append("ctypeid", this.add.ctypeid);
				data.append("cname", this.add.cname);
				data.append("engname", this.add.engname);
				data.append("href", this.add.href);
				data.append("imgFile", this.add.imgFile);
				let config = {
					//添加请求头
					headers: {
						"Content-Type": "multipart/form-data"
					},
				};
				this.axios.post("/admin/coop/insert", data, config)
					.then((json) => {
						if (json.data.code === CONSTANT.STATUSCODE.SUCCESS) {
							CONSTANT.MESSAGEBOX(json.data.message, "success", () => {
								jQuery('#addModal').modal('hide');
								this.getCoopList();
								this.getCoopTypeList();
							})
						} else {
							CONSTANT.MESSAGEBOX(json.data.message, "success", () => {
								jQuery('#addModal').modal('hide');
							})
						}
					})
			},
			/**
			 * 删除
			 * @param bid
			 */
			deleteCoop(cid) {
				let flag = confirm("您确定要删除编号为[" + cid + "]的合作机构信息吗?");
				if (flag) {
					this.axios.get("/admin/coop/delete?cid=" + cid)
						.then((json) => {
							if (json.data.code === CONSTANT.STATUSCODE.SUCCESS) {
								CONSTANT.MESSAGEBOX(json.data.message, "success", () => {
									this.getCoopList();
									this.getCoopTypeList();
								})
							} else {
								CONSTANT.MESSAGEBOX(json.data.message, "success", () => {})
							}
						})
				}
			},
			// 获取分页数据
			getPage(pageindex) {
				this.axios.get("/admin/coop/selectAdminPageInfo?page=" + pageindex)
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
			/**
			 * 获取
			 */
			getCoop(data) {
				this.update = data;
				this.openModal("#updateModal");
			},
			/**
			 * 修改
			 */
			updateCoop() {
				let data = new FormData();
				data.append("cid", this.update.cid);
				data.append("ctypeid", this.update.ctypeid);
				data.append("cname", this.update.cname);
				data.append("engname", this.update.engname);
				data.append("href", this.update.href);
				if (this.update.coverimg) {
					data.append("coverimg", this.update.coverimg);
				}
				data.append("imgFile", this.update.imgFile);
				let config = {
					//添加请求头
					headers: {
						"Content-Type": "multipart/form-data"
					},
				};
				this.axios.post("/admin/coop/update", data, config)
					.then((json) => {
						if (json.data.code === CONSTANT.STATUSCODE.SUCCESS) {
							CONSTANT.MESSAGEBOX(json.data.message, "success", () => {
								jQuery('#updateModal').modal('hide');
								this.update = {}
								this.getCoopList();
								this.getCoopTypeList();
							})
						} else {
							CONSTANT.MESSAGEBOX(json.data.message, "success", () => {
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
