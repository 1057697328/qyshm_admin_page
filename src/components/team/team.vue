<!--suppress ALL -->
<template>
	<div>
		<!-- Page Heading -->
		<h1 class="h3 mb-4 text-gray-800">团队管理</h1>
		<div class="row">
			<div class="col-12">
				<button class="btn btn-info" @click="openModal('#addModal')"><i class="fa fa-newspaper"></i> 添加产品</button>
			</div>
			<div class="col-12" style="padding-top:1rem" v-if="isLoad">
				<div class="table-responsive">
					<table class="table table-hover">
						<thead>
							<tr>
								<th>团队人员编号</th>
								<th>团队类型</th>
								<th>人员头像</th>
								<th>人员姓名</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in pageData.rows">
								<td>{{item.tid}}</td>
								<td>{{item.qteamtype.ttypename}}</td>
								<td><img :src="CONSTANT.URL+item.theadimg" alt=""></td>
								<td>{{item.name}}</td>
								<td><button class="btn btn-info" @click="getTeam(item)">编辑</button> <button class="btn btn-danger" @click="deleteTeam(item.pid)">删除</button></td>
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
						<h5 class="modal-title">添加团队</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-12">
								<div class="form-group">
									<label>团队类型</label>
									<select v-model="add.ttypeid" class="form-control">
										<option v-for="itemt in pageDataType.rows" :value="itemt.ttypeid">{{itemt.ttypename}}</option>
									</select>
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>人员姓名</label>
									<input type="text" v-model="add.name" class="form-control" placeholder="请输入人员姓名" />
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>人员头像</label>
									<input type="file" class="form-control-file" @change="changeAddImage" />
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>状态</label>
									<select v-model="add.status" class="form-control">
										<option value="0">循环为团队技术人员</option>
										<option value="1">只在前台展示详情</option>
									</select>
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>人员介绍详情</label>
									<div ref="addeditor" style="text-align:left"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" @click="addTeam()">保存</button>
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
						<h5 class="modal-title">修改团队</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-12">
								<div class="form-group">
									<label>团队类型</label>
									<select v-model="update.ttypeid" class="form-control">
										<option v-for="items in pageDataType.rows" :value="items.ttypeid">{{items.ttypename}}</option>
									</select>
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>人员姓名</label>
									<input type="text" v-model="update.name" class="form-control" placeholder="请输入人员姓名" />
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>人员头像</label>
									<input type="file" class="form-control-file" @change="changeUpdateImage" />
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>人员姓名</label>
									<select v-model="update.status" class="form-control">
										<option value="0">循环为团队技术人员</option>
										<option value="1">只在前台展示详情</option>
									</select>
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>人员介绍详情</label>
									<div ref="updateeditor" style="text-align:left"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" @click="updateTeam()">保存</button>
						<button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
					</div>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
	import CONSTANT from "@/assets/js/constant";
	import E from 'wangeditor'

	export default {
		name: "team",
		data() {
			return {
				isLoad:false,
				add: {
					name: '',
					ttypeid: '',
					imgFile: '',
					theadimg: '',
					tdetail: '',
					status: ''
				},
				update: {
					tid: 0,
					name: '',
					ttypeid: '',
					theadimg: '',
					imgFile: '',
					tdetail: '',
					status: ''
				},
				addeditor: null,
				updateeditor: null,
				pageData: {

				},
				pageDataType: {},
				CONSTANT: CONSTANT
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
				that.add.tdetail = html
				this.$emit('change', this.add.tdetail)
			}

			this.updateeditor = new E(this.$refs.updateeditor);
			this.updateeditor.customConfig.uploadImgServer = CONSTANT.URL + "/file/upload";
			this.updateeditor.customConfig.uploadFileName = "files";
			this.updateeditor.customConfig.onchange = (html) => {
				that.update.tdetail = html
				this.$emit('change', this.update.tdetail)
			}

			this.addeditor.create();
			this.updateeditor.create();

			this.getTeamList();
			this.getTeamTypeList();
			
			this.isLoad=true;
			
		},
		methods: {
			getTeamList() {
				this.axios.get("/admin/team/selectAdminPageInfo")
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
			// 获取分页数据
			getPage(pageindex) {
				this.axios.get("/admin/team/selectAdminPageInfo?page=" + pageindex)
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
			getTeamTypeList() {
				this.axios.get("/admin/teamType/selectAdminPageInfo")
					.then((json) => {
						if (json.data.code === 200) {
							this.pageDataType = json.data.result
							console.info(this.pageData);
							
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
			addTeam() {
				let data = new FormData();
				data.append("name", this.add.name);
				data.append("imgFile", this.add.imgFile);
				data.append("tdetail", this.add.tdetail);
				data.append("ttypeid", this.add.ttypeid);
				data.append("status", this.add.status);

				let config = {
					//添加请求头
					headers: {
						"Content-Type": "multipart/form-data"
					},
				};
				this.axios.post("/admin/team/insert", data, config)
					.then((json) => {
						if (json.data.code === CONSTANT.STATUSCODE.SUCCESS) {
							CONSTANT.MESSAGEBOX(json.data.message, "success", () => {
								jQuery('#addModal').modal('hide');
								this.getTeamList();
								this.getTeamTypeList();
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
			 * @param pid
			 */
			deleteTeam(pid) {
				let flag = confirm("您确定要删除编号为[" + tid + "]的轮播信息吗?");
				if (flag) {
					this.axios.get("/admin/team/delete?nid=" + tid)
						.then((json) => {
							if (json.data.code === CONSTANT.STATUSCODE.SUCCESS) {
								CONSTANT.MESSAGEBOX(json.data.message, "success", () => {
									this.getTeamList();
									this.getTeamTypeList();
								})
							} else {
								CONSTANT.MESSAGEBOX(json.data.message, "success", () => {})
							}
						})
				}
			},
			/**
			 * 获取
			 */
			getTeam(data) {
				this.update = data;
				this.updateeditor.txt.html(this.update.tdetail)
				this.openModal("#updateModal");
			},
			/**
			 * 修改
			 */
			updateTeam() {

				let data = new FormData();
				data.append("tid", this.update.tid);
				data.append("name", this.update.name);
				data.append("tdetail", this.update.tdetail);
				data.append("ttypeid", this.update.ttypeid);
				data.append("status", this.update.status);
				if (this.update.theadimg) {
					data.append("theadimg", this.update.theadimg);
				}
				data.append("imgFile", this.update.imgFile);
				let config = {
					//添加请求头
					headers: {
						"Content-Type": "multipart/form-data"
					},
				};
				this.axios.post("/admin/team/update", data, config)
					.then((json) => {
						if (json.data.code === CONSTANT.STATUSCODE.SUCCESS) {
							CONSTANT.MESSAGEBOX(json.data.message, "success", () => {
								jQuery('#updateModal').modal('hide');
								this.update = {}
								this.getTeamList();
								this.getTeamTypeList();
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
