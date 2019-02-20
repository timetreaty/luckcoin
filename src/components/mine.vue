<template>
	<div class="mine">
		<header>
			<img src="../assets/returns.png" @click="retur"/>
			<!--<div @click="tobuy">购买BIDT</div>-->
		</header>
		<div class="main">
			<img src="../assets/minehead.png"/>
			<div class="text">区块身份BID：{{id}}</div>
		</div>
		<footer>
			<div class="assets" @click="toassets">
				<div class="left">
					<img src="../assets/assetss.png" class="img_l"/>
					<div class="txt">币达钱包</div>
				</div>
				<div class="right">
					<div>{{num}} BIDT</div>
					<img src="../assets/mores.png"/>
				</div>
			</div>
			<div class="recording" @click="torecord">
				<div class="left">
					<img src="../assets/recording.png" class="img_l"/>
					<div class="txt">投注记录</div>
				</div>
				<div class="right">
					<img src="../assets/mores.png"/>
				</div>
			</div>
		</footer>
		<div class="end" @click="end()">退出登录</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				id:localStorage.qkid,
				num:0
			}
		},
		created(){
			this.getassets()
		},
		methods:{
			getassets(){
				let vm=this;
				$.ajax({
					type:"post",
					url:contextPath+"/api/lucky/getProperty",
					async:true,
					dataType:'json',
					data:{
						token:localStorage.luckycoin_token
					},
					success(res){
						if(res.state.code==='20000'){
							vm.num=res.data;
						}
					}
				});
			},
			retur(){
				this.$router.push({
					path:'/'
				})
			},
			toassets(){
				this.$router.push({
					path:'/my_assets'
				})
			},
			tobuy(){
				this.$router.push({
					path:'/buy_bidt'
				})
			},
			torecord(){
				this.$router.push({
					path:'/record'
				})
			},
			end(){
				localStorage.clear();
				this.$router.push({
					path:'/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mine{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background:rgba(35,0,92,1);
		header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 0.3rem 0.25rem 0 0.25rem;
			img{
				width: 0.19rem;
				height: 0.36rem;
			}
			div{
				font-size: 0.26rem;
				font-weight:400;
				color:rgba(255,255,255,1);
			}
		}
		.main{
			margin-top: -0.3rem;
			text-align: center;
			img{
				width: 2.89rem;
				height: 2.89rem;
				border-radius: 50%;
			}
			.text{
				margin-top: -0.2rem;
				font-size: 0.26rem;
				font-weight:400;
				color:rgba(255,255,255,1);
			}
		}
		footer{
			margin-top: 0.68rem;
			box-sizing: border-box;
			padding: 0 0.25rem;
			.assets{
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
			.recording{
				@extend .assets;
			}
		}
		.end{
			position: fixed;
			bottom: 0.5rem;
			width: 100%;
			text-align: center;
			font-size: 0.24rem;
			color: #f54655;
		}
	}
</style>