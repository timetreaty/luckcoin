<template>
	<div class="lotteryhistory">
		<header>
			<div class="head">
				<router-link to="/" class="retur"><img src="../assets/returns.png"/></router-link>
				<div>往期开奖号码</div>
			</div>
			<div class="title">
				<div class="title_date">期号</div>
				<div class="title_num">开奖号码</div>
			</div>
		</header>
		<div class="main">
			<div class="list" v-for="item in list">
				<div class="list_date">{{item.lotteryId}}</div>
				<div class="list_num">
					<span>{{item.myriabitNum}}</span>
					<span>{{item.thousandNum}}</span>
					<span>{{item.hundredsNum}}</span>
					<span>{{item.decadeNum}}</span>
					<span>{{item.unitNum}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				list:''
			}
		},
		created(){
			this.getlist()
		},
		methods:{
			getlist(){
				let vm=this;
				$.ajax({
					type:"get",
					url:contextPath+"/api/lucky/getOldLucky",
					async:true,
					dataType:'json',
					data:{
						page:1,
						row:50
					},
					success(res){
						if(res.state.code==='20000'){
							vm.list=res.data;	
						}
					}
				});
			}
		}
	}
</script>
<style>
	body{
		background: #23005C;
	}
</style>
<style lang="scss" scoped>
	.lotteryhistory{
		width: 6.4rem;
		header{
			width: 100%;
			height: 2.34rem;
			box-sizing: border-box;
			padding: 0.3rem 0.25rem;
			background: url(../assets/lotteryhistory.png)no-repeat;
			background-size: 100% 100%;
			.head{
				margin-bottom: 0.5rem;
				display: flex;
				align-items: center;
				.retur{
					img{
						display: block;
						width: 0.19rem;
						height: 0.36rem;
					}
				}
				div{
					flex: 1;
					text-align: center;
					font-size:0.32rem;
					color:rgba(255,255,255,1);
				}
			}
			.title{
				display: flex;
				/*justify-content: center;*/
				align-items: center;
				.title_date,.title_num{
					font-size:0.3rem;
					font-weight:bold;
					color:rgba(255,255,255,1);
					background:linear-gradient(0deg,rgba(211,96,243,1) 0%, rgba(102,68,246,1) 100%);
					-webkit-background-clip:text;
					-webkit-text-fill-color:transparent;
				}
				.title_date{
					margin-left: 0.75rem;
					margin-right: 1.1rem;
				}
			}	
		}
		.main{
			width: 100%;
			margin-top: -0.8rem;
			.list{
				width: 100%;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding: 0.3rem 0.25rem;
				.list_date{
					/*margin-left: 0.85rem;
					margin-right: 0.6rem;*/
					margin-left: 0.2rem;
					margin-right: 0.4rem;
					font-size: 0.24rem;
					color:rgba(255,255,255,1);
					background:linear-gradient(0deg,rgba(211,96,243,1) 0%, rgba(102,68,246,1) 100%);
					-webkit-background-clip:text;
					-webkit-text-fill-color:transparent;
				}
				.list_num{
					display: flex;
					span{
						margin-right: 0.12rem;
						width: 0.48rem;
						height: 0.48rem;
						text-align: center;
						line-height: 0.48rem;
						border-radius: 50%;
						font-size: 0.24rem;
						color: rgb(255,255,255);
						background:linear-gradient(0deg,rgba(245,70,85,1) 0%,rgba(248,88,88,1) 50%,rgba(251,108,92,1) 100%);
					}
				}
			}
		}
	}
</style>