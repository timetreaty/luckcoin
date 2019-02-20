<template>
	<div class="betting">
		<header>
			<div class="star_box" :class="fiveStra ? 'star_hover' : ''">
				<div class="star" @click="five_Star">五星</div>
				<div>奖金</div>
				<div>1000000BIDT</div>
			</div>
			<div class="star_box" :class="threeStra ? 'star_hover' : ''">
				<div class="star" @click="three_Star">三星</div>
				<div>奖金</div>
				<div>10000BIDT</div>
			</div>
			<div class="star_box" :class="towStra ? 'star_hover' : ''">
				<div class="star" @click="tow_Star">二星</div>
				<div>奖金</div>
				<div>1000BIDT</div>
			</div>
			<div class="star_box" :class="oneStra ? 'star_hover' : ''">
				<div class="star" @click="one_Star">一星</div>
				<div>奖金</div>
				<div>100BIDT</div>
			</div>
		</header>
		<div class="list" :class="fiveStra ? 'list_hover' : ''">
			<div class="list_title">万位号码</div>
			<div class="arrays" id="myriad">
				<div v-for="(item,index) in num"><span @click="myriad_hover(index)">{{item}}</span></div>
			</div>
		</div>
		<div class="list" :class="fiveStra ? 'list_hover' : ''">
			<div class="list_title">千位号码</div>
			<div class="arrays" id="thousand">
				<div v-for="(item,index) in num"><span @click="thousand_hover(index)">{{item}}</span></div>
			</div>
		</div>
		<div class="list" :class="threeStra||fiveStra ? 'list_hover' : ''">
			<div class="list_title">百位号码</div>
			<div class="arrays" id="hundred">
				<div v-for="(item,index) in num"><span @click="hundred_hover(index)">{{item}}</span></div>
			</div>
		</div>
		<div class="list" :class="towStra||threeStra||fiveStra ? 'list_hover' : ''">
			<div class="list_title">十位号码</div>
			<div class="arrays" id="ten">
				<div v-for="(item,index) in num"><span @click="ten_hover(index)">{{item}}</span></div>
			</div>
		</div>
		<div class="list" :class="oneStra||towStra||threeStra||fiveStra ? 'list_hover' : ''">
			<div class="list_title">个位号码</div>
			<div class="arrays" id="unit">
				<div v-for="(item,index) in num"><span @click="unit_hover(index)">{{item}}</span></div>
			</div>
		</div>
		<div class="selects" v-if="select_div">
			<div @click="methods_btn(0)">
				<img :src="img_t" class="img1"/>直选
			</div>
			<div @click="methods_btn(1)">
				<img :src="img_f" class="img2"/>复选
			</div>
		</div>
		<div class="text">
			<div>您当前选择了 <span>{{afew}}</span> 注,共 <span>{{bidt_num}}</span> BIDT</div>
			<div>注：所选号码和开奖号码{{bit}}一致即为中奖</div>
			<div class="colors">如果中奖奖金 <span>{{bonus}}</span> BIDT哦!</div>
		</div>
		<div class="send">
			<div class="send_img"><span @click="send"></span></div>
			<div class="send_txt">钱包余额：<span>{{assetss}}</span>BIDT</div>
		</div>
		<router-link class="returns" to="/">返回上页</router-link>
		<transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
			<div class="popup" v-if="popup">
				<div class="bg">
					<div class="popop_txt">{{popup_text}}</div>
					<div class="closes" @click="close"></div>
				</div>
			</div>
		</transition>
		
	</div>
</template>

<script>
	import radiofalse from '../assets/radiof.png'
	import radiotrue from '../assets/radiot.png'
	export default{
		data(){
			return{
				num:[0,1,2,3,4,5,6,7,8,9],
				oneStra:true,
				towStra:false,
				threeStra:false,
				fiveStra:false,
				star_num:1,
				unit_arr:[],
				ten_arr:[],
				hundred_arr:[],
				thousand_arr:[],
				myriad_arr:[],
				popup:false,
				popup_text:'',
				select_div:true,
				afew:'?',
				bidt_num:0,
				bonus:0,
				pick:0,
				img_t:radiotrue,
				img_f:radiofalse,
				assetss:0,
				bit:"'个位'"
			}
		},
		created(){
//			console.log(this.unit_arr.length)
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
							vm.assetss=res.data;
						}
					}
				});
		},
		watch:{
			//个位
			unit_arr(val){
				if(val.length>=2||this.ten_arr.length>=2||this.hundred_arr.length>=2||this.thousand_arr.length>=2||this.myriad_arr.length>=2){
					this.select_div=false;
					this.pick=2;
					this.count();
				}else{
					this.select_div=true;
					if(this.img_t == radiotrue){
						this.pick=0;
					}else{
						this.pick=1;
					}
					this.count();
				}
				
			},
			//十位
			ten_arr(val){
				if(this.unit_arr.length>=2||val.length>=2||this.hundred_arr.length>=2||this.thousand_arr.length>=2||this.myriad_arr.length>=2){
					this.select_div=false;
					this.pick=2;
					this.count();
				}else{
					this.select_div=true;
					if(this.img_t == radiotrue){
						this.pick=0;
					}else{
						this.pick=1;
					}
					this.count();
				}
			},
			//百位
			hundred_arr(val){
				if(this.unit_arr.length>=2||this.ten_arr.length>=2||val.length>=2||this.thousand_arr.length>=2||this.myriad_arr.length>=2){
					this.select_div=false;
					this.pick=2;
					this.count();
				}else{
					this.select_div=true;
					if(this.img_t == radiotrue){
						this.pick=0;
					}else{
						this.pick=1;
					}
					this.count();
				}
			},
			//千位
			thousand_arr(val){
				if(this.unit_arr.length>=2||this.ten_arr.length>=2||this.hundred_arr.length>=2||val.length>=2||this.myriad_arr.length>=2){
					this.select_div=false;
					this.pick=2;
					this.count();
				}else{
					this.select_div=true;
					if(this.img_t == radiotrue){
						this.pick=0;
					}else{
						this.pick=1;
					}
					this.count();
				}
			},
			//万位
			myriad_arr(val){
				if(this.unit_arr.length>=2||this.ten_arr.length>=2||this.hundred_arr.length>=2||this.thousand_arr.length>=2||val.length>=2){
					this.select_div=false;
					this.pick=2;
					this.count();
				}else{
					this.select_div=true;
					if(this.img_t == radiotrue){
						this.pick=0;
					}else{
						this.pick=1;
					}
					this.count();
				}
			}
		},
		methods:{
			//清除数组
			removeArrs(){
				this.unit_arr=[];
				this.ten_arr=[];
				this.hundred_arr=[];
				this.thousand_arr=[];
				this.myriad_arr=[];
			},
			//计算
			count(){
				if(this.pick==0){
					//直选
					this.afew=1;
					this.bidt_num=20;
					if(this.fiveStra==true){
						this.bonus=1000000;
					}else if(this.threeStra==true){
						this.bonus=10000;
					}else if(this.towStra==true){
						this.bonus=1000;
					}else if(this.oneStra==true){
						this.bonus=100;
					}else{
						this.afew=0;
						this.bidt_num=0;
						this.bonus=0;
					}
				}else if(this.pick==1){
					//复选
					if(this.fiveStra==true){
						this.afew=4;
						this.bidt_num=80;
						this.bonus=1011100;
					}else if(this.threeStra==true){
						this.afew=3;
						this.bidt_num=60;
						this.bonus=11100;
					}else if(this.towStra==true){
						this.afew=2;
						this.bidt_num=40;
						this.bonus=1100;
					}else if(this.oneStra==true){
						this.afew=1;
						this.bidt_num=20;
						this.bonus=100;
					}else{
						this.afew=0;
						this.bidt_num=0;
						this.bonus=0;
					}
				}else{
					//组选
					console.log()
					var g=this.unit_arr.length;
					var s=this.ten_arr.length;
					var b=this.hundred_arr.length;
					var q=this.thousand_arr.length;
					var w=this.myriad_arr.length;
					if(this.myriad_arr.length==0){
						w=1;
					}else if(this.thousand_arr.length==0){
						q=1;
					}else if(this.hundred_arr.length==0){
						b=1;
					}else if(this.ten_arr.length==0){
						s=1;
					}
					setTimeout(()=>{
						if(this.fiveStra==true){
							this.afew=g*s*b*q*w;
							this.bidt_num=this.afew*20;
							this.bonus=1000000;
						}else if(this.threeStra==true){
							this.afew=g*s*b;
							this.bidt_num=this.afew*20;
							this.bonus=10000;
						}else if(this.towStra==true){
							this.afew=g*s;
							this.bidt_num=this.afew*20;
							this.bonus=1000;
						}else if(this.oneStra==true){
							this.afew=g;
							this.bidt_num=this.afew*20;
							this.bonus=100;
						}else{
							this.afew=0;
							this.bidt_num=0;
							this.bonus=0;
						}
					},100)
				}
			},
			//弹框关闭
			close(){
				this.popup=false;
			},
			//直选复选
			methods_btn(e){
				if(e==0){
					this.img_t=radiotrue;
					this.img_f=radiofalse;
					this.pick=0;
					this.count();
				}else{
					this.img_t=radiofalse;
					this.img_f=radiotrue;
					this.pick=1;
					this.count();
				}
			},
			//跳转传值
			passVale(){
				let vm=this;
				localStorage.num=JSON.stringify({
					star:vm.star_num,
					afew:vm.afew,
					bidt:vm.bidt_num,
					bonus:vm.bonus,
					pick:vm.pick,
					a:vm.unit_arr,b:vm.ten_arr,
					c:vm.hundred_arr,
					d:vm.thousand_arr,
					e:vm.myriad_arr
				})
				vm.$router.push({path:'/confirm'})
			},
			//确认选号
			send(){
				let vm=this;
//				if(vm.assetss<vm.bidt_num){
//					
//				}
				if(vm.star_num===0){
					vm.popup=true;
					vm.popup_text='请选择星级并选号！';
				}else if(vm.fiveStra){
					if(vm.myriad_arr.length<=0||vm.thousand_arr.length<=0||vm.hundred_arr.length<=0||vm.ten_arr.length<=0||vm.unit_arr.length<=0){
						vm.popup_text='请在万位、千位、百位、十位、个位至少各选1个号码 !';
						vm.popup=true;
					}else{
						this.passVale()
					}
				}else if(vm.threeStra){
					if(vm.hundred_arr.length<=0||vm.ten_arr.length<=0||vm.unit_arr.length<=0){
						vm.popup_text='请在百位、十位、个位至少各选1个号码 !';
						vm.popup=true;
					}else{
						this.passVale()
					}
				}else if(vm.towStra){
					if(vm.ten_arr.length<=0||vm.unit_arr.length<=0){
						vm.popup_text='请在十位、个位至少各选1个号码 !';
						vm.popup=true;
					}else{
						this.passVale()
					}
				}else if(vm.oneStra){
					if(vm.unit_arr.length<=0){
						vm.popup_text='请在个位至少选1个号码 !';
						vm.popup=true;
					}else{
						this.passVale()
					}
				}
			},
			//一星
			one_Star(){
				let vm=this;
				this.oneStra = !this.oneStra; 
				this.towStra=false;this.threeStra=false;this.fiveStra=false;
				if(vm.oneStra!=true){
					vm.star_num=0;
					this.count();
					this.removeArrs();
					this.bit="";
				}else{
					this.count();
					$('#hundred span').removeClass('hundred_hovers')
					$('#thousand span').removeClass('thousand_hovers')
					$('#myriad span').removeClass('myriad_hovers')
					$('#ten span').removeClass('ten_hovers')
					vm.star_num=1;
					vm.ten_arr=[];
					vm.hundred_arr=[];
					vm.thousand_arr=[];
					vm.myriad_arr=[];
					vm.bit="'个位'";
				}
			},
			//二星
			tow_Star(){
				this.towStra = !this.towStra;
				this.oneStra=false;this.threeStra=false;this.fiveStra=false;
				if(this.towStra!=true){
					this.star_num=0;
					this.count();
					this.removeArrs();
					this.bit="";
				}else{
					this.count();
					$('#hundred span').removeClass('hundred_hovers')
					$('#thousand span').removeClass('thousand_hovers')
					$('#myriad span').removeClass('myriad_hovers')
					this.star_num=2;
					this.hundred_arr=[];
					this.thousand_arr=[];
					this.myriad_arr=[];
					this.bit="'个、十位'";
				}
			},
			//三星
			three_Star(){
				this.threeStra = !this.threeStra;
				this.oneStra=false;this.towStra=false;this.fiveStra=false;
				if(this.threeStra!=true){
					this.star_num=0;
					this.count();
					this.removeArrs();
					this.bit="";
				}else{
					this.count();
					$('#thousand span').removeClass('thousand_hovers')
					$('#myriad span').removeClass('myriad_hovers')
					this.star_num=3;
					this.thousand_arr=[];
					this.myriad_arr=[];
					this.bit="'个、十、百位'";
				}
			},
			//五星
			five_Star(){
				this.fiveStra = !this.fiveStra;
				this.oneStra=false;this.towStra=false;this.threeStra=false;
				if(this.fiveStra!=true){
					this.star_num=0;
					this.count();
					this.removeArrs();
					this.bit="";
				}else{
					this.count();
					this.star_num=5;
					this.bit="'个、十、百、千、万位'";
				}
			},
			//个位选择
			unit_hover(ind){
				if(this.oneStra||this.towStra||this.threeStra||this.fiveStra){
					$('#unit span').eq(ind).toggleClass('unit_hovers');
					if($('#unit span').eq(ind).hasClass('unit_hovers')==true){
						this.unit_arr.push(ind)
					}else{
						this.removeArr(this.unit_arr,ind)
					}
				}
			},
			//十位选择
			ten_hover(ind){
				if(this.towStra||this.threeStra||this.fiveStra){
					$('#ten span').eq(ind).toggleClass('ten_hovers');
					if($('#ten span').eq(ind).hasClass('ten_hovers')==true){
						this.ten_arr.push(ind)
					}else{
						this.removeArr(this.ten_arr,ind)
					}
				}
			},
			//百位选择
			hundred_hover(ind){
				if(this.threeStra||this.fiveStra){
					$('#hundred span').eq(ind).toggleClass('hundred_hovers');
					if($('#hundred span').eq(ind).hasClass('hundred_hovers')==true){
						this.hundred_arr.push(ind)
					}else{
						this.removeArr(this.hundred_arr,ind)
					}
				}
			},
			//千位选择
			thousand_hover(ind){
				if(this.fiveStra){
					$('#thousand span').eq(ind).toggleClass('thousand_hovers');
					if($('#thousand span').eq(ind).hasClass('thousand_hovers')==true){
						this.thousand_arr.push(ind)
					}else{
						this.removeArr(this.thousand_arr,ind)
					}
				}
			},
			//万位选择
			myriad_hover(ind){
				if(this.fiveStra){
					$('#myriad span').eq(ind).toggleClass('myriad_hovers');
					if($('#myriad span').eq(ind).hasClass('myriad_hovers')==true){
						this.myriad_arr.push(ind)
					}else{
						this.removeArr(this.myriad_arr,ind)
					}
				}
			},
			//删除某个号码
			removeArr(arr,ind){
				for (var i=0;i<arr.length;i++) {
					if(arr[i]==ind){
						return arr.splice(i,1);
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.betting{
		width: 100%;
		background: #23005C;
		box-sizing: border-box;
		padding: 0.3rem 0.2rem 0.33rem 0.2rem;
		header{
			width: 100%;
			box-sizing: border-box;
			padding: 0 0.1rem;
			display: flex;
			justify-content: space-around;
			.star_box{
				width:1.4rem;
				display: flex;
				flex-direction: column;
				align-items: center;
				.star{
					width: 0.9rem;
					height: 0.87rem;
					font-size: 0.18rem;
					color: white;
					text-align: center;
					line-height: 0.87rem;
					background: url(../assets/star.png)no-repeat;
					background-size: 100% 100%;
				}
				div{
					font-size: 0.2rem;
					color: rgb(255,255,255);
				}
			}
			.star_hover{
				.star{
					background: url(../assets/starhover.png)no-repeat;
					background-size: 100% 100%;
				}
				div{
					font-size: 0.2rem;
					color:#F54655;
				}
			}
		}
		.list{
			width: 100%;
			margin: 0.3rem 0;
			.list_title{
				font-size: 0.2rem;
				color: white;
			}
			.arrays{
				margin-top: 0.1rem;
				display: flex;
				justify-content: space-between;
				div{
					width: 0.52rem;
					height: 0.52rem;
					border-radius: 50%;
					box-sizing: border-box;
					border: 1px solid #ABAFB0;
					display: flex;
					justify-content: center;
					align-items: center;
					span{
						font-size: 0.24rem;
						color: #929292;
						width: 0.44rem;
						height: 0.44rem;
						background: #D8D8D8;
						border-radius: 50%;
						text-align: center;
						line-height: 0.44rem;
					}
				}
			}
		}
		.list_hover{
			.arrays{
				div{
					border:1px solid rgba(19, 252, 255, 0.35);
					span{
						background: #D570ED;
						color: rgb(255,255,255);
					}
					.unit_hovers,.ten_hovers,.hundred_hovers,.thousand_hovers,.myriad_hovers{
						background: rgba(248, 88, 88, 1);
					}
				}
			}
		}
		.selects{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 0.22rem;
			color: rgb(255,255,255);
			div{
				display: flex;
				align-items: center;
				img{
					width: 0.34rem;
					height: 0.34rem;
					margin-left: 0.45rem;
					margin-right: 0.1rem;
				}
			}
		}
		.text{
			margin: 0.3rem 0;
			text-align: center;
			font-size: 0.22rem;
			line-height: 0.4rem;
			color: rgb(255,255,255);
			span{
				color: #BD5EF4;
			}
			.colors{
				font-size: 0.22rem;
				color:rgba(255,255,255,1);
				background:linear-gradient(135deg,rgba(255,213,4,1) 0%, rgba(250,238,31,1) 50%, rgba(250,252,155,1) 100%);
				-webkit-background-clip:text;
				-webkit-text-fill-color:transparent;
			}
		}
		.send{
			margin-bottom: 0.33rem;
			text-align: center;
			.send_img{
				width: 3.81rem;
				height: 0.95rem;
				background: url(../assets/bettingsend.png)no-repeat;
				background-size: 100% 100%;
				margin: 0 auto;
				span{
					display: block;
					height: 0.9rem;
					width: 2.5rem;
					margin: 0 auto;
				}
			}
			.send_txt{
				font-size: 0.22rem;
				color: rgb(255,255,255);
				span{
					color: #BD5EF4;
				}
			}			
		}
		.returns{
			display: block;
			text-align: center;
			font-size: 0.2rem;
			color: #CD5EF3;	
		}
		.popup{
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
			.bg{
				width: 4.4rem;
				height: 4.45rem;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-end;
				background: url(../assets/betting.png)no-repeat;
				background-size: 100% 100%;
				.popop_txt{
					width: 70%;
					text-align: center;
					margin: 0 auto;
					padding-left: 0.15rem;
					line-height: 0.3rem;
					font-size: 0.2rem;
					color: rgb(255,255,255);
					margin-bottom: 1rem;
				}
				.closes{
					width: 0.5rem;
					height: 0.5rem;
					border-radius: 50%;
				}
			}
		}
	}
</style>