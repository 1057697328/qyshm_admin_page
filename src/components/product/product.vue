<!--suppress ALL -->
<template>
	<div>
		<!-- Page Heading -->
		<h1 class="h3 mb-4 text-gray-800">产品管理</h1>
		<div class="row">
			<div class="col-12">
				<button class="btn btn-info" @click="openModal('#addModal')"><i class="fa fa-newspaper"></i> 添加产品</button>
			</div>
			<div class="col-12" style="padding-top:1rem">
				<div class="table-responsive">
					<table class="table table-hover">
						<thead>
							<tr>
								<th>产品编号</th>
								<th>产品名称</th>
								<th>产品封面图</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in pageData.rows">
								<td>{{item.pid}}</td>
								<td>{{item.pname}}</td>
								<td><img :src="CONSTANT.URL+item.qcoverimg" alt=""></td>
								<td><button class="btn btn-info" @click="getProduct(item)">编辑</button> <button class="btn btn-danger" @click="deleteProduct(item.pid)">删除轮播</button></td>
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
						<h5 class="modal-title">添加产品</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-12">
								<div class="form-group">
									<label>产品名称</label>
									<input type="text" v-model="add.pname" class="form-control" placeholder="请输入产品名称" />
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>产品封面图</label>
									<input type="file" class="form-control-file" @change="changeAddImage" />
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>产品详情</label>
									<div ref="addeditor" style="text-align:left"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" @click="addProduct()">保存</button>
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
						<h5 class="modal-title">添加产品</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-12">
								<div class="form-group">
									<label>产品名称</label>
									<input type="text" v-model="update.pname" class="form-control" placeholder="请输入产品名称" />
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>产品封面图</label>
									<input type="file" class="form-control-file" @change="changeUpdateImage" />
								</div>
							</div>
							<div class="col-12">
								<div class="form-group">
									<label>产品详情</label>
									<div ref="updateeditor" style="text-align:left"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" @click="updateProduct()">保存</button>
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
		name: "product",
		data() {
			return {
				add: {
					pname: '',
					imgFile: '',
					qcoverimg: '',
					qdetail: '',
				},
				update: {
					pid: 0,
					pname: '',
					qcoverimg: '',
					imgFile: '',
					qdetail: ''
				},
				addeditor: null,
				updateeditor: null,
				pageData: {

				},
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
				this.add.qdetail = html
				this.$emit('change', this.add.qdetail)
			}

			this.updateeditor = new E(this.$refs.updateeditor);
			this.updateeditor.customConfig.uploadImgServer = CONSTANT.URL + "/file/upload";
			this.updateeditor.customConfig.uploadFileName = "files";
			this.updateeditor.customConfig.onchange = (html) => {
				that.update.qdetail = html
				this.$emit('change', this.update.qdetail)
			}

			this.addeditor.create();
			this.updateeditor.create();

			this.getProductList();
		},
		methods: {
			getProductList() {
				this.axios.get("/admin/product/selectAdminPageInfo")
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
			addProduct() {
				let data = new FormData();
				data.append("pname", this.add.pname);
				data.append("imgFile",this.add.imgFile);
				data.append("qdetail", this.add.qdetail);

				let config = {
					//添加请求头
					headers: {
						"Content-Type": "multipart/form-data"
					},
				};
				this.axios.post("/admin/product/insert", data, config)
					.then((json) => {
						if (json.data.code === CONSTANT.STATUSCODE.SUCCESS) {
							CONSTANT.MESSAGEBOX(json.data.message, "success", () => {
								jQuery('#addModal').modal('hide');
								this.getProductList();
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
			deleteProduct(pid) {
				let flag = confirm("您确定要删除编号为[" + pid + "]的轮播信息吗?");
				if (flag) {
					this.axios.get("/admin/product/delete?nid=" + pid)
						.then((json) => {
							if (json.data.code === CONSTANT.STATUSCODE.SUCCESS) {
								CONSTANT.MESSAGEBOX(json.data.message, "success", () => {
									this.getProductList();
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
			getProduct(data) {
				this.update = data;
				this.updateeditor.txt.html(this.update.qdetail)
				this.openModal("#updateModal");
			},
			/**
			 * 修改
			 */
			updateProduct() {
				let data = new FormData();
				data.append("pid", this.update.pid);
				data.append("pname", this.update.pname);
				data.append("qdetail", this.update.qdetail);
				if (this.update.qcoverimg) {
					data.append("qcoverimg", this.update.qcoverimg);
				}
				data.append("imgFile", this.update.imgFile);
				let config = {
					//添加请求头
					headers: {
						"Content-Type": "multipart/form-data"
					},
				};
				this.axios.post("/admin/product/update", data, config)
					.then((json) => {
						if (json.data.code === CONSTANT.STATUSCODE.SUCCESS) {
							CONSTANT.MESSAGEBOX(json.data.message, "success", () => {
								jQuery('#updateModal').modal('hide');
								this.update = {}
								this.getProductList();
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
