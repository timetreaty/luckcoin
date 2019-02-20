<template>
	<div class="my_assets">
		<img src="../assets/returns.png" class="retu" @click="retur"/>
		<div class="text">币达钱包</div>
		<div class="main">
			<img src="../assets/dassets.png"/>
			<div class="texts">总资产 <span>{{total}}</span>BIDT</div>
		</div>
		<footer>
			<div class="wallet">
				<div class="left">
					<img src="../assets/wallet.png" class="img_l"/>
					<div class="txt">交易记录</div>
				</div>
			</div>
		</footer>
		
		<div class="transtateList">
				<li v-for="item in list" >
					<div class="part" v-if="item.status==2">
						<div class="count">+{{item.totalNum}}BIDT</div>
						<div class="type">中奖金额</div>
						<div class="time">{{item.lotteryId}}期</div>
					</div>
					<div class="part">
						<div class="count">-{{item.totalCount*20*item.multiple}}BIDT</div>
						<div class="type">投注</div>
						<div class="time">{{item.createTime}}</div>
					</div>
				</li>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				total:0,
				coin:0,
				list:""
			}
		},
		created(){
			this.getassets();
			this.getLuckyRecord();
		},
		methods:{
			retur(){
				this.$router.push({
					path:'/mine'
				})
			},
			getLuckyRecord(){
				let vm=this;
				$.ajax({
					type:"post",
					url:contextPath+"/api/lucky/LuckyRecord",
					async:true,
					dataType:'json',
					data:{
						token:localStorage.luckycoin_token,
						page:1,
						row:20
					},
					success(res){
						if(res.state.code==='20000'){
							vm.list=res.data;
						}
					}
				});
			},
			getassets(){
				let vm=this;
				$.ajax({
					type:"post",
					url:contextPath1+"/app/api/content/getProperty",
					async:true,
					dataType:'json',
					data:{
						token:localStorage.luckycoin_token
					},
					success(res){
						vm.total=res.data.list[1].money;
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my_assets{
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: #23005C;
		box-sizing: border-box;
		padding: 0.3rem 0.25rem 0 0.25rem;
		.transtateList{
			li{
				.part{
					color: #FFFFFF;
				border-bottom: 1px solid #ffffff;
				.type{
					font-size: 0.24rem;
					line-height: 0.4rem;
				}
				.time{
					font-size: 0.2rem;
					line-height: 0.4rem;
				}
				.count{
					line-height: 0.8rem;
					font-size: 0.24rem;
					position: absolute;
					right: 0.2rem;
				}
				}
				
			}
		}
		.retu{
			width: 0.19rem;
			height: 0.36rem;
			display: block;
		}
		.text{
			margin-top: -0.38rem;
			text-align: center;
			font-size: 0.32rem;
			font-weight:300;
			color:rgba(255,255,255,1);
		}
		.main{
			margin-top: 0.4rem;
			text-align: center;
			img{
				width: 2.89rem;
				height: 2.89rem;
				border-radius: 50%;
			}
			.texts{
				margin-top: -0.2rem;
				font-size: 0.26rem;
				font-weight:400;
				color:rgba(255,255,255,1);
				span{
					font-size: 0.34rem;
					color: #A855F4;
				}
			}
		}
		footer{
			margin-top: 0.7rem;
			box-sizing: border-box;
			.wallet{
				margin-bottom: 0.4rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left{
					display: flex;
					align-items: center;
					.img_l{
						width: 0.36rem;
						height: 0.38rem;
					}
					.txt{
						margin-left: 0.1rem;
						font-size: 0.24rem;
						font-weight:300;
						color:rgba(255,255,255,1);
					}
				}
					
				.right{
					display: flex;
					align-items: center;
					font-size: 0.24rem;
					font-weight:300;
					color:rgba(255,255,255,1);
					img{
						width: 0.09rem;
						height: 0.16rem;
						margin-left: 0.2rem;
					}
				}
			}
		}
	}
</style>