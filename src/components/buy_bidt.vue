<template>
	<div class="buy_bidt">
		<img src="../assets/returns.png" class="retu" @click="retur"/>
		<div class="title">购买BIDT</div>
		<div class="text">您的BIDT钱包余额不足，是否购买BIDT<br />兑换抽奖次数继续赢取大奖呢？</div>
		<div class="list">
			<li>
				<div class="txt">50BIDT</div>
				<div class="money">￥5</div>
			</li>
			<li>
				<div class="txt">50BIDT</div>
				<div class="money">￥5</div>
			</li>
			<li>
				<div class="txt">50BIDT</div>
				<div class="money">￥5</div>
			</li>
			<li>
				<div class="txt">50BIDT</div>
				<div class="money">￥5</div>
			</li>
			<li>
				<div class="txt">50BIDT</div>
				<div class="money">￥5</div>
			</li>
			<li>
				<div class="txt">50BIDT</div>
				<div class="money">￥5</div>
			</li>
		</div>
		<div class="pay">
			<img src="../assets/pay.png"/>
			<img src="../assets/wxpay.png"/>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			retur(){
				this.$router.push({
					path:'/mine'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.buy_bidt{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: #23005C;
		box-sizing: border-box;
		padding: 0.3rem 0.25rem 0 0.25rem;
		.retu{
			width: 0.19rem;
			height: 0.36rem;
			display: block;
		}
		.title{
			margin-top: -0.38rem;
			text-align: center;
			font-size: 0.32rem;
			font-weight:300;
			color:rgba(255,255,255,1);
		}
		.text{
			text-align: center;
			margin-top: 1.16rem;
			font-size: 0.22rem;
			line-height: 0.35rem;
			color: rgb(255,255,255);
			margin-bottom: 0.3rem;
		}
		.list{
			width: 100%;
			box-sizing: border-box;
			padding: 0 0.7rem;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			li{
				width:1.4rem;
				height:1rem;
				background:rgba(255,255,255,1);
				border-radius:0.03rem;
				margin-bottom: 0.15rem;
				text-align: center;
				line-height: 1rem;
				position: relative;
            	.txt{
            		font-size: 0.2rem;
					background-image: -webkit-linear-gradient(bottom, #D360F3,#6644F6);
	            	-webkit-background-clip: text;
	            	-webkit-text-fill-color: transparent;
            	}
            	.money{
            		position: absolute;
            		right: 0;
            		bottom: 0;
            		width: 0.65rem;
            		height: 0.25rem;
            		text-align: center;
            		font-size: 0.12rem;
            		line-height: 0.25rem;
            		background:linear-gradient(0deg,#D360F3 0%,#6644F6 100%);
            		box-shadow:-3px 3px 10px 0px rgba(29,53,184,0.35);
            		color: white;
            		border-top-left-radius: 25%;
            	}
			}
		}
		.pay{
			width: 100%;
			margin-top: 0.2rem;
			box-sizing: border-box;
			padding: 0 0.7rem;
			display: flex;
			justify-content: space-between;
			img{
				width: 2.1rem;
				height: 0.56rem;
			}
		}
	}
</style>