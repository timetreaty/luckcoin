<template>
	<div class="record">
		<img src="../assets/returns.png" class="retu" @click="retur" />
		<div class="title">投注记录</div>
		<div class="main">
			<div class="list" v-for="(item,listKey) in list">
				<div class="list_title">
					<div class="title_l">
						<div class="date">{{item.lotteryId}}期</div>
						<div class="selects" v-if="item.starNum==5">
							五星<span v-if="item.type==0">直选</span><span v-if="item.type==1">复选</span><span v-if="item.type==2">组选</span>
						</div>
						<div class="selects" v-if="item.starNum==3">
							三星<span v-if="item.type==0">直选</span><span v-if="item.type==1">复选</span><span v-if="item.type==2">组选</span>
						</div>
						<div class="selects" v-if="item.starNum==2">
							二星<span v-if="item.type==0">直选</span><span v-if="item.type==1">复选</span><span v-if="item.type==2">组选</span>
						</div>
						<div class="selects" v-if="item.starNum==1">
							一星<span v-if="item.type==0">直选</span><span v-if="item.type==1">复选</span><span v-if="item.type==2">组选</span>
						</div>
						<div class="num">{{item.totalCount}}注</div>
						<div class="num">{{item.multiple}}倍</div>
					</div>
					<img src="../assets/triangle1.png" :id="'ctr'+listKey" class="title_r" @click="isShow(listKey)" />
				</div>
				<div class="txt">
					<div>投注号码</div>
					<span v-if="item.status==0">待开奖</span>
					<span v-if="item.status==1">未中奖</span>
					<span v-if="item.status==2">中奖</span>
				</div>
				<div :class="'numbers hideList hideList'+listKey" v-for="(num,ind) in item.luckyAsc">
					<div v-if="num.length==1">----{{num}}</div>
					<div v-if="num.length==2">---{{num}}</div>
					<div v-if="num.length==3">--{{num}}</div>
					<div v-if="num.length==4">-{{num}}</div>
					<div v-if="num.length==5">{{num}}</div>

					<span v-if="item.totalNum!=null&&ind<1">{{item.totalNum}}BIDT</span>
				</div>
				<div class="lottery">
					<div>开奖号码</div>
					<li v-if="item.status==1||item.status==2">
						<span v-for="i in item.fullNum">{{i}}</span>

					</li>
					<li v-if="item.status==0">
						<span>-</span>
						<span>-</span>
						<span>-</span>
						<span>-</span>
						<span>-</span>
					</li>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: '',
				showMore: false
			}
		},
		created() {
			this.getlist()
		},
		methods: {
			retur() {
				this.$router.push({
					path: '/'
				})
			},
			isShow: function(arg) {
				let vm = this;
				if($("#ctr" + arg).hasClass("close")) {
					$("#ctr" + arg).removeClass("close");
					$(".hideList" + arg).addClass("hideList");
				} else {
					$(".hideList" + arg).removeClass("hideList");
					$("#ctr" + arg).addClass("close");
				}

			},
			getlist() {
				let vm = this;
				$.ajax({
					type: "post",
					url: contextPath + "/api/lucky/LuckyRecord",
					async: true,
					dataType: 'json',
					data: {
						token: localStorage.luckycoin_token,
						page: 1,
						row: 20
					},
					success(res) {
						if(res.state.code === '20000') {
							vm.list = res.data;
						}
					}
				});
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
	.close {
		-webkit-transform: rotate(180deg);
		-moz-transform: rotate(180deg);
		-ms-transform: rotate(180deg);
		-o-transform: rotate(180deg);
		transform: rotate(180deg);
	}
	
	.hideList {
		display: none!important;
	}
	
	.record {
		width: 100%;
		box-sizing: border-box;
		padding: 0.3rem 0.25rem 0.3rem 0.25rem;
		.retu {
			width: 0.19rem;
			height: 0.36rem;
			display: block;
		}
		.title {
			margin-top: -0.38rem;
			text-align: center;
			font-size: 0.32rem;
			font-weight: 300;
			color: rgba(255, 255, 255, 1);
		}
		.main {
			margin-top: 0.52rem;
			width: 100%;
			.list {
				width: 100%;
				border-bottom: 1px dashed rgba(0, 255, 0, 1);
				border-color: #00FFEA #DD73F7;
				padding: 0.2rem 0;
				.list_title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.title_l {
						display: flex;
						align-items: center;
						.date {
							font-size: 0.26rem;
							color: rgb(255, 255, 255);
						}
						.selects {
							margin-left: 0.4rem;
							font-size: 0.26rem;
							background: linear-gradient(135deg, rgba(0, 255, 234, 1) 0.2685546875%, rgba(221, 115, 247, 1) 87.0361328125%);
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
						}
						.num {
							margin-left: 0.3rem;
							font-size: 0.26rem;
							color: rgb(255, 255, 255);
						}
					}
					.title_r {
						width: 0.26rem;
						height: 0.16rem;
					}
				}
				.txt {
					display: flex;
					justify-content: space-between;
					align-items: center;
					div,
					span {
						font-size: 0.26rem;
						color: rgb(255, 255, 255);
						margin-top: 0.18rem;
					}
					span {
						background: linear-gradient(135deg, rgba(245, 70, 85, 1) 0%, rgba(248, 88, 88, 1) 50%, rgba(251, 108, 92, 1) 100%);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}
				}
				.numbers {
					@extend .txt;
					margin-top: -0.08rem;
					margin-bottom: 0.2rem;
					div {
						letter-spacing: 0.2rem;
					}
				}
				.lottery {
					div {
						font-size: 0.26rem;
						color: rgb(255, 255, 255);
					}
					li {
						margin-top: 0.1rem;
						display: flex;
						span {
							font-size: 0.26rem;
							width: 0.35rem;
							height: 0.35rem;
							background: linear-gradient(135deg, rgba(245, 70, 85, 1) 0%, rgba(248, 88, 88, 1) 50%, rgba(251, 108, 92, 1) 100%);
							border-radius: 50%;
							color: rgb(255, 255, 255);
							text-align: center;
							line-height: 0.35rem;
							margin-right: 0.1rem;
						}
					}
				}
			}
		}
	}
</style>