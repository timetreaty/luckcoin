<template>
	<div class="confirm">
		<router-link to="/betting" class="retur"><img src="../assets/returns.png" /></router-link>
		<div class="main">
			<img src="../assets/confirm1.png" class="confirm_img" />
			<div class="title">您投注的是<span>{{star_num_name[num.star]}}</span><span>{{pick_name[num.pick]}}</span></div>
			<div class="list" v-for="(item,ind) in obj" v-if="ind<obj.length">
				<div v-for="o in item"><span>{{o}}</span></div>
			</div>
			<img src="../assets/confirmtext.png" class="confirm_text" />
			<div class="numbers">
				您当前共选择了 <span>{{num.afew}}</span> 注 , 共 <span>{{num.bidt*inp_val}}</span> BIDT
			</div>
			<div class="inp">
				<div class="txt">我要投</div>
				<span class="minus" @click="minus">-</span>
				<input type="text" v-model="inp_val" />
				<span @click="add">+</span>
				<div class="txt">倍</div>
			</div>
			<footer>
				<div class="confirm_bg">如果中奖中奖奖金 <span>{{num.bonus*inp_val}}</span> BIDT哦!</div>
				<div class="btn_send" @click="judegarr"></div>
			</footer>
			<transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
				<div class="send_success" v-if="send_success">
					<div class="bg">
						<div class="checks">
							<div @click="check"></div>
						</div>
						<div class="closes" @click="close"></div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				send_success: false,
				inp_val: 1,
				num: JSON.parse(localStorage.num) || {
					afew: 0,
					bidt: 0,
					bonus: 0,
					a: [],
					b: [],
					c: [],
					d: [],
					e: []
				},
				nums: {
					afew: 0,
					bidt: 0,
					bonus: 0,
					a: [],
					b: [],
					c: [],
					d: [],
					e: []
				},
				obj: {},
				star_num_name: ["", "一星", "两星", "三星", "", "五星"],
				pick_name: ["直选", "复选", "组选"]
			}
		},
		mounted() {
			this.setlist();
		},
		methods: {
			//计算组合
			setlist() {
				let vm = this;
				var arr = this.num;
				var arrItem={};
				//直选
				if(arr.pick == 0) {
					if(arr.a.length == 0) {
						arr.a = ["-"];
					}
					if(arr.b.length == 0) {
						arr.b = ["-"];
					}
					if(arr.c.length == 0) {
						arr.c = ["-"];
					}
					if(arr.d.length == 0) {
						arr.d = ["-"];
					}
					if(arr.e.length == 0) {
						arr.e = ["-"];
					}
					[].push.apply(arrItem, (arr.e[0] + "" + arr.d[0] + "" + arr.c[0] + "" + arr.b[0] + "" + arr.a[0]).split(','))
				}
				//复选
				if(arr.pick == 1) {
					if(arr.a.length == 0) {
						arr.a = ["-"];
					}
					if(arr.b.length == 0) {
						arr.b = ["-"];
					}
					if(arr.c.length == 0) {
						arr.c = ["-"];
					}
					if(arr.d.length == 0) {
						arr.d = ["-"];
					}
					if(arr.e.length == 0) {
						arr.e = ["-"];
					}
					if(vm.num.star > 0) {
						[].push.apply(arrItem, ("-" + "" + "-" + "" + "-" + "" + "-" + "" + arr.a[0]).split(','));
						if(vm.num.star > 1) {
							[].push.apply(arrItem, ("-" + "" + "-" + "" + "-" + "" + arr.b[0] + "" + arr.a[0]).split(','));
							if(vm.num.star > 2) {
								[].push.apply(arrItem, ("-" + "" + "-" + "" + arr.c[0] + "" + arr.b[0] + "" + arr.a[0]).split(','));
								if(vm.num.star > 3) {
									[].push.apply(arrItem, (arr.e[0] + "" + arr.d[0] + "" + arr.c[0] + "" + arr.b[0] + "" + arr.a[0]).split(','));
								}
							}
						}
					}

				}
				//组选
				if(arr.pick == 2) {
					if(arr.a.length == 0) {
						arr.a = ["-"];
					}
					if(arr.b.length == 0) {
						arr.b = ["-"];
					}
					if(arr.c.length == 0) {
						arr.c = ["-"];
					}
					if(arr.d.length == 0) {
						arr.d = ["-"];
					}
					if(arr.e.length == 0) {
						arr.e = ["-"];
					}
					var maxShow = 0;
					for(var aa in arr.a) {
						for(var bb in arr.b) {
							for(var cc in arr.c) {
								for(var dd in arr.d) {
									for(var ee in arr.e) {
										maxShow++;
										if(maxShow < 100) {
											[].push.apply(arrItem, (arr.e[ee] + "" + arr.d[dd] + "" + arr.c[cc] + "" + arr.b[bb] + "" + arr.a[aa]).split(','))
										}
									}
								}
							}
						}
					}
					
				}
				vm.obj=arrItem;
			},
			//倍数--
			minus() {
				if(this.inp_val <= 1) {
					this.inp_val = 1;
				} else {
					this.inp_val--;
				}
			},
			//倍数++
			add() {
				this.inp_val++;
			},
			//判断数组
			judegarr() {
				let vm = this;
				var a, b, c, d, e;
				if(this.num.a[0] == '-') {
					a = '';
				} else {
					a = this.num.a.join('');
				}
				if(this.num.b[0] == '-') {
					b = '';
				} else {
					b = this.num.b.join('');
				}
				if(this.num.c[0] == '-') {
					c = '';
				} else {
					c = this.num.c.join('');
				}
				if(this.num.d[0] == '-') {
					d = '';
				} else {
					d = this.num.d.join('');
				}
				if(this.num.e[0] == '-') {
					e = '';
				} else {
					e = this.num.e.join('');
				}
				setTimeout(() => {
					vm.send(a, b, c, d, e)
				}, 100)
			},
			//确认选号
			send(a, b, c, d, e) {
				let vm = this;

				$.ajax({
					type: "post",
					url: contextPath + "/api/lucky/getProperty",
					async: true,
					dataType: 'json',
					data: {
						token: localStorage.luckycoin_token
					},
					success(res) {
						if(res.data > vm.num.bidt * vm.inp_val) {
							$.ajax({
								type: "post",
								url: contextPath + "/api/lucky/buyLucky",
								async: true,
								dataType: 'json',
								data: {
									token: localStorage.luckycoin_token,
									type: vm.num.pick,
									starNum: vm.num.star,
									chipNum: vm.num.afew,
									BIDTNum: vm.num.bidt * vm.inp_val,
									multiple: vm.inp_val,
									unitNum: a,
									decadeNum: b,
									hundredsNum: c,
									thousandNum: d,
									myriabitNum: e,
									blockId: localStorage.qkid
								},
								success(res) {
									if(res.state.code === '20000') {
										vm.send_success = true;
										localStorage.num = JSON.stringify(vm.nums);
										vm.num = vm.nums;
									}
								}
							});
						} else {
							mui.alert("您的BIDT余额不足,快让您的钱包鼓起来吧!")
						}

					}
				});

			},
			check() {
				this.$router.push({
					path: '/record'
				})
			},
			close() {
				this.send_success = false;
				this.$router.push({
					path: '/'
				})
			}
		}
	}
</script>
<style>
	body {
		background: #23005C;
	}
</style>
<style lang="scss" scoped>
	.confirm {
		width: 6.4rem;
		box-sizing: border-box;
		padding: 0.3rem 0.25rem 0 0.25rem;
		.retur {
			img {
				display: block;
				width: 0.19rem;
				height: 0.36rem;
			}
		}
		.main {
			width: 100%;
			margin-top: -0.4rem;
			.confirm_img {
				display: block;
				width: 3.36rem;
				height: 2.56rem;
				margin: 0 auto;
			}
			.title {
				margin-top: 0.3rem;
				margin-bottom: 0.25rem;
				text-align: center;
				font-size: 0.26rem;
				background: linear-gradient(200deg, rgba(211, 96, 243, 1) 0%, rgba(102, 68, 246, 1) 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				span {
					background: linear-gradient(70deg, rgba(102, 68, 246, 1) 0%, rgba(211, 96, 243, 1) 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}
			.list {
				margin-bottom: 0.15rem;
				display: flex;
				justify-content: center;
				div {
					margin: 0 0.05rem;
					width: 0.52rem;
					height: 0.52rem;
					border-radius: 50%;
					box-sizing: border-box;
					border: 1px solid rgba(19, 252, 255, 0.4);
					display: flex;
					justify-content: center;
					align-items: center;
					span {
						font-size: 0.24rem;
						width: 0.44rem;
						height: 0.44rem;
						background: #D570ED;
						color: rgb(255, 255, 255);
						border-radius: 50%;
						text-align: center;
						line-height: 0.44rem;
					}
				}
			}
			.confirm_text {
				display: block;
				width: 3.79rem;
				height: 0.54rem;
				margin: 0 auto;
				margin-top: 0.35rem;
			}
			.numbers {
				margin-top: 0.1rem;
				text-align: center;
				font-size: 0.22rem;
				color: rgb(255, 255, 255);
				span {
					color: #BD5EF4;
				}
			}
			.inp {
				margin-top: 0.15rem;
				display: flex;
				justify-content: center;
				align-items: center;
				.txt {
					font-size: 0.22rem;
					color: rgb(255, 255, 255);
					margin-right: 0.15rem;
					margin-left: 0.1rem;
				}
				input {
					margin: 0 0.06rem;
					width: 1.6rem;
					height: 0.46rem;
					background: rgba(213, 112, 237, 0.12);
					border-radius: 0.1rem;
					box-sizing: border-box;
					border: 1px solid RGBA(19, 252, 255, 0.4);
					text-align: center;
					color: rgb(255, 255, 255);
					font-size: 0.26rem;
				}
				span {
					width: 0.46rem;
					height: 0.46rem;
					box-sizing: border-box;
					border: 1px solid RGBA(19, 252, 255, 0.4);
					border-radius: 50%;
					text-align: center;
					line-height: 0.41rem;
					color: rgb(255, 255, 255);
					font-size: 0.4rem;
				}
				.minus {
					line-height: 0.37rem;
				}
			}
			footer {
				margin-top: 0.2rem;
				width: 100%;
				.confirm_bg {
					width: 3.85rem;
					height: 0.65rem;
					margin: 0 auto;
					text-align: center;
					line-height: 0.61rem;
					font-size: 0.2rem;
					color: rgb(255, 255, 255);
					background: url(../assets/confirmbottom.png)no-repeat;
					background-size: 100% 100%;
					span {
						color: #BD5EF4;
					}
				}
				.btn_send {
					width: 3.79rem;
					height: 0.93rem;
					margin: 0 auto;
					margin-top: 0.2rem;
					background: url(../assets/confirm_btn.png)no-repeat;
					background-size: 100% 100%;
				}
			}
			.send_success {
				position: fixed;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				z-index: 10;
				background: rgba(0, 0, 0, 0.5);
				display: flex;
				justify-content: center;
				align-items: center;
				.bg {
					width: 5.45rem;
					height: 5.87rem;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: flex-end;
					background: url(../assets/confirm_success.png)no-repeat;
					background-size: 100% 100%;
					.checks {
						width: 2.3rem;
						height: 0.8rem;
						margin-bottom: 0.72rem;
						border-radius: 0.4rem;
						div {
							width: 2.3rem;
							height: 0.8rem;
							border-radius: 0.4rem;
						}
					}
					.closes {
						width: 0.5rem;
						height: 0.5rem;
						border-radius: 50%;
					}
				}
			}
		}
	}
</style>