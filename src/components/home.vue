<template>
	<div class="home">
		<div class="header">
			<router-link to="/game_description"><img src="../assets/homeplay.png" class="play"/></router-link>
			<img src="../assets/homemy.png" class="my" @click="tomine"/>
		</div>
		<div class="swiper_inner">
			<swiper :options="swiperOption">
				<swiper-slide v-for="(item,key) in homedata.winners" :key="key">
					<p>恭喜{{item.account}}中{{parseInt(item.bidtNum)}}BIDT</p>
				</swiper-slide>
			</swiper>
		</div>
		<div class="date">第{{maindata.lotteryId}}期开奖结果</div>
		<div class="num">
			<li class="padding_l">{{maindata.myriabitNum}}</li>
			<li class="padding_r">{{maindata.thousandNum}}</li>
			<li class="padding_r">{{maindata.hundredsNum}}</li>
			<li class="padding_r">{{maindata.decadeNum}}</li>
			<li>{{maindata.unitNum}}</li>
		</div>
		<div class="nexttime">
			<li class="minute">{{minutes_ten}}</li>
			<li>{{seconds_ten}}</li>
		</div>
		<div class="timeleft">
			<li class="minute">{{minutes_eight}}</li>
			<li>{{seconds_eight}}</li>
		</div>
		<div class="betting" @click="betting"></div>
		<div class="more">
			<img src="../assets/more.png" @click="more">
		</div>
		<div class="lottery">
			<div class="list" v-for="(item,index) in homedata.previousVoList" v-if="index<=2">
				<div class="time">{{item.lotteryId}}</div>
				<div class="numbers">
					<li>{{item.myriabitNum}}</li>
					<li>{{item.thousandNum}}</li>
					<li>{{item.hundredsNum}}</li>
					<li>{{item.decadeNum}}</li>
					<li>{{item.unitNum}}</li>
				</div>
			</div>
		</div>
		<transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
			<div class="prize" v-if="prize">
				<div class="prize_main">
					<div class="prize_bg">
						<div class="prize_txt">中奖金额{{prize_txt}}BIDT</div>
						<div class="prize_btn"></div>
						<div class="closes" @click="close_prize"></div>
					</div>
					<div class="prize_code">
						<div>长按识别二维码<br />和我一起赢取大奖</div>
						<img src="../assets/code.png"/>
					</div>
				</div>
			</div>
		</transition>
		<transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
			<div class="when" v-if="when">
				<div class="when_main">
					<div class="when_close" @click="when_close"></div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from "vue-awesome-swiper";
	import "swiper/dist/css/swiper.css";
	export default{
		data(){
			return{
				homedata:'',
				maindata:'',
				swiperOption: {
			        // loop: true,
			        slidesPerView: 2,
			        slidesPerGroup: 2,
			        direction: "vertical",
			        // spaceBetween: 30,
			        // centeredSlides: true,
			        autoplay: {
			          delay: 2500,
			          disableOnInteraction: false
			        }
		      	},
		      	timeTen:'',
		      	minutes_ten:'00',
				seconds_ten:'00',
		      	timeEight:'',
				minutes_eight:'00',
				seconds_eight:'00',
		      	prize:false,
		      	prize_txt:0,
		      	when:false,
		      	wheTime:''
			}
		},
		components:{
			swiper, 
			swiperSlide
		},
		created(){
			this.getData()
			this.getprize()
		},
		methods:{
			//关闭开奖中
			when_close(){
				this.when=false;
			},
			getData(){
				let vm=this;
				$.ajax({
					type:"get",
					url:contextPath+"/api/lucky/homeLucky",
					async:true,
					dataType:'json',
					success(res){
						if(res.state.code==='20000'){
							vm.homedata=res.data;
						}
					}
				});
			},
			getprize(){
				let vm=this;
				$.ajax({
					type:"get",
					url:contextPath+"/api/lucky/getNewLucky",
					async:true,
					dataType:'json',
					success(res){
						if(res.state.code==='20000'){
							vm.maindata=res.data;
							vm.timeTen=setInterval(()=>{
								vm.setTime_ten(res.data.endTimestamp)
							},1000)
							vm.timeEight=setInterval(()=>{
								vm.setTime_eight(res.data.betEndTimestamp)
							},1000)
						}
					}
				});
			},
			tomine(){
				if(!localStorage.luckycoin_token){
					this.$router.push({path:'/login'})
				}else{
					this.$router.push({
						path:'/mine'
					})
				}
			},
			betting(){
				if(!localStorage.luckycoin_token){
					this.$router.push({path:'/login'})
				}else if(this.minutes_eight!='00'||this.seconds_eight!='00'){
					this.$router.push({
						path:'/betting'
					})
				}else{
					mui.alert('投注时间已截止！')
				}
			},
			more(){
				this.$router.push({
					path:'/lottery_history'
				})
			},
			setTime_ten(time){
        		let vm=this;
        		var NowTime = new Date();
			    if(time>NowTime.getTime()){
			    	var t =time - NowTime.getTime();
			    	var d,t,h,m,s
				    d = Math.floor(t/86400000)
		        	t -= d * 86400000;
		        	h = Math.floor(t/3600000)
		        	t -= h * 3600000;
		        	m = Math.floor(t/60000)
		        	t -= m * 60000;
		        	s = Math.floor(t/1000)
				    d <10 ? d = '0' +d :d =d;
				    h <10 ? h = '0' +h :h =h;
				    m <10 ? m = '0' +m :m =m;
				    s <10 ? s = '0' +s :s =s;
					vm.minutes_ten=m;
					vm.seconds_ten=s;
			    }else{
						vm.minutes_ten="00";
						vm.seconds_ten="00";
						clearInterval(vm.timeTen);
						let v=1;
						let str=vm.maindata.lotteryId;
						vm.wheTime=setInterval(()=>{
							if(Number(str.substr(str.length-3))<288){
								vm.when=true;
								$.ajax({
									type:"post",
									url:contextPath+"/api/lucky/whetherWinner",
									async:true, 
									dataType:'json',
									data:{
										token:localStorage.luckycoin_token,
										lotteryId:vm.maindata.newlotteryId
									},
									success(res){
										if(res.state.code==='20000'){
											v++;
											if(res.data.totalCount==1){
												vm.when=false;
												setTimeout(()=>{
													vm.getData();
													vm.getprize();
												},1000)
												clearInterval(vm.wheTime);
												if(res.data.totalBIDTCount>0){
													vm.prize=true;
													vm.prize_txt=res.data.totalBIDTCount;
												}
											}else if(v>=13){
												clearInterval(vm.wheTime);
												vm.when=false;
											}
										}
									},
									error(res){
										clearInterval(vm.wheTime)
										vm.when=false;
									}
								});
							}
						},1000)
					}
		    },
		    setTime_eight(time){
        		let vm=this;
			    var NowTime = new Date();
			    if(time>NowTime.getTime()){
			    	var t =time - NowTime.getTime();
				    var d,t,h,m,s
				    d = Math.floor(t/86400000)
		        	t -= d * 86400000;
		        	h = Math.floor(t/3600000)
		        	t -= h * 3600000;
		        	m = Math.floor(t/60000)
		        	t -= m * 60000;
		        	s = Math.floor(t/1000)
				    d <10 ? d = '0' +d :d =d;
				    h <10 ? h = '0' +h :h =h;
				    m <10 ? m = '0' +m :m =m;
				    s <10 ? s = '0' +s :s =s;
					vm.minutes_eight=m;
					vm.seconds_eight=s;
			    }else{
			    	vm.minutes_eight="00";
					vm.seconds_eight="00";
					clearInterval(vm.timeEight)
			    }
		    },
			close_prize(){
				this.prize=false;
			}
		},
		destroyed(){
			clearInterval(this.timeEight)
			clearInterval(this.timeTen)
			clearInterval(this.wheTime)
		}
	}
</script>

<style lang="scss" scoped>
	.home{
		width: 6.4rem;
		height: 15rem;
		background: url(../assets/homebg.png)no-repeat;
		background-size: 100% 100%;
		.header{
			width: 100%;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0.3rem 0.1rem;
			padding-right:0.2rem;
			.play{
				display: block;
				width: 0.83rem;
				height: 0.92rem;
			}
			.my{
				width: 0.52rem;
				height: 0.92rem;
			}					
		}
		.swiper_inner{
			width: 3.85rem;
			margin: 0 auto;
			.swiper-container{
				height: 1rem;
				margin-top: 3.65rem;
				.swiper-wrapper{
					height: 1rem;
					.swiper-slide{
						height: 0.5rem !important;
						line-height: 0.5rem;
						p{
							margin: 0;
							padding: 0;
							font-size: 0.22rem;
			  				color: rgb( 255, 255, 255 );
			  				text-align: center;
			  				box-sizing: border-box;
						}
					}
				}
			}
		}
		.date{
		  	font-size: 0.22rem;
		  	color: rgb( 255, 255, 255 );
		  	text-align: center;
		  	margin-top: 0.52rem;
		}
		.num{
			width: 4.6rem;
			margin: 0 auto;
			margin-top: 0.02rem;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			padding-left: 0.05rem;
			li{
				width: 0.8rem;
				height: 0.8rem;
				border-radius: 50%;
				text-align: center;
				line-height: 0.8rem;
  				font-size: 0.26rem;
  				color: rgb( 0, 0, 0 );
			}
		}
		.nexttime{
			width: 3.1rem;
			margin: 0 auto;
			margin-top: 0.32rem;
			display: flex;
			justify-content: flex-end;
			li{
				height: 0.5rem;
				line-height: 0.5rem;
				width: 0.62rem;
				text-align: center;
				font-size: 0.3rem;
				color: rgb(255,255,255);
				letter-spacing:0.1rem;
			}
			.minute{
				margin-right: 0.12rem;
				text-align: center;
			}
		}
		.timeleft{
			@extend .nexttime;
			margin-top: 0.28rem;
		}
		.betting{
			width: 2.2rem;
			height: 0.8rem;
			margin: 0 auto;
			margin-top: 0.5rem;
		}
		.more{
			width: 5.8rem;
			margin-top: 0.7rem;
			display: flex;
			justify-content: flex-end;
			img{
				width: 0.8rem;
				height: 0.8rem;
				border-radius: 50%;	
			}			
		}
		.lottery{
			/*width: 3.85rem;*/
			width: 5rem;
			margin: 0 auto;
			margin-top: -0.05rem;
			.list{
				margin-top: 0.2rem;
				display: flex;
				justify-content: space-between;
				.time{
					font-size:0.24rem;
		            background-image: -webkit-linear-gradient(bottom, #D360F3, #6644F6);
		            -webkit-background-clip: text;
		            -webkit-text-fill-color: transparent;
		            line-height: 0.48rem;
		            margin-left: 0.07rem;
				}
				.numbers{
					display: flex;
					li{
						width:0.48rem;
						height:0.48rem;
						background:linear-gradient(0deg,rgba(211,96,243,1) 0%,rgba(102,68,246,1) 100%);
						border-radius:50%;
						color: rgb(255,255,255);
						font-size: 0.24rem;
						text-align: center;
						line-height: 0.48rem;
						margin-right: 0.11rem;
					}
				}
			}
		}
		.prize{
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 10;
			background: rgba(0,0,0,0.5);
			display: flex;
			justify-content: center;
			align-items: center;
			.prize_main{
				display: flex;
				flex-direction: column;
				align-items: center;
				.prize_bg{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					width: 5.45rem;
					height: 5.87rem;
					background: url(../assets/homepopup1.png)no-repeat;
					background-size: 100% 100%;
					.prize_txt{
						text-align: center;
						color: rgb(255,255,255);
						font-size: 0.28rem;
						margin-top: 2.55rem;
					}
					.prize_btn{
						width: 2.31rem;
						height: 0.74rem;
					}
					.closes{
						width: 0.5rem;
						height: 0.5rem;
						border-radius: 50%;
					}
				}
				.prize_code{
					position: fixed;
					bottom: 0.2rem;
					z-index: 11;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 6rem;
					height: 1.34rem;
					background: rgb(255,255,255);
					border-radius: 0.12rem;
					div{
						text-align: center;
						font-size: 0.3rem;
						line-height: 0.5rem;
						letter-spacing: 10px;
					}
					img{
						width: 0.9rem;
						height: 0.9rem;
						margin-left: 0.3rem;
					}
				}
			}
		}
		.when{
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 10;
			background: rgba(0,0,0,0.5);
			display: flex;
			justify-content: center;
			align-items: center;
			.when_main{
				width: 5.45rem;
				height: 5.87rem;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				align-items: center;
				background: url(../assets/when.png)no-repeat;
				background-size: 100% 100%;
				.when_close{
					width: 0.5rem;
					height: 0.5rem;
					border-radius: 50%;
				}
			}
		}
	}
</style>