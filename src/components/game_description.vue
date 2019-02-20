<template>
	<div class="game">
		<header>
			<router-link to="/"><img src="../assets/returns.png" class="returns" /></router-link>
			<div>玩法介绍</div>
			<router-link to="/"><img src="../assets/home.png" class="homes" /></router-link>
		</header>
		<div class="text">
			1、每5分钟开奖一次，开奖号码为一个五位数号码，分为个、十、百、千、万位。
			<br /><br /> 2、每期投注时间4分钟，开奖前1分钟停止投注。
			<br /><br /> 3、设立
			<span>一星</span>、<span>二星</span>、<span>三星</span>、<span>五星</span>4个奖项，按投注号码与中奖号码按位相符情况确定中奖奖级，中奖号码从个位对起：</br>
			&nbsp;&nbsp;&nbsp;&nbsp;<span>5星奖</span>：单注投注号码的5个号码与当期中奖号码的5位号码按位全部相符，即中奖，单注奖金1000000BIDT；
			<br /> &nbsp;&nbsp;&nbsp;&nbsp;
			<span>3星奖</span>：单注投注号码与当期中奖号码的连续后3位号码按位相符（百位+十位+个位），即中奖，单注奖金10000BIDT；
			<br /> &nbsp;&nbsp;&nbsp;&nbsp;
			<span>2星奖</span>：单注投注号码与当期中奖号码的连续后2位号码按位相符（十位+个位），即中奖，单注奖金1000BIDT；
			<br /> &nbsp;&nbsp;&nbsp;&nbsp;
			<span>1星奖</span>：单注投注号码与当期中奖号码的个位号码按位相符，即中奖，单注奖金100BIDT。
			<br /> 4、每期奖金自动发放到玩家币达钱包账户。
			<br /><br /> 5、玩家需按所选星级在对应的每个位数中，从0-9十个数字任选号码参与投注。
			<br /><br /> 6、无论选择参与几星的投注，每注金额为20 BIDT。
			<br /><br /> 7、投注方式分直选、复选、组选3种。
		</div>
		<div class="tit">假设当期的开奖号码为：12345</div>
		<table>
			<tr>
				<td rowspan="2">星级</td>
				<td rowspan="2">中奖条件</td>
				<td rowspan="2">奖金</td>
				<td colspan="3">投注方式</td>
			</tr>
			<tr>
				<td>单选</td>
				<td>组合复式</td>
				<td>复选复式</td>
			</tr>
			<tr>
				<td>五星</td>
				<td>五位全中<br />如:12345</td>
				<td>1000000<br />BIDT</td>
				<td>
					如购买<br />12345
				</td>
				<td>如购买<br />万位:123<br />千位:123<br />百位:123<br />十位:124<br />个位:45<br />此组选投注</br>共计:162注</td>
				<td>如购买<br />万位:1<br />千位:2<br />百位:3<br />十位:4<br />个位:5<br />此复选投注</br>共计:4注 <br />由以下4注构成<br />12345(五星),<br />345(三星),<br />45(两星),<br />5(一星)</td>
			</tr>
			<tr>
				<td>三星</td>
				<td>中后三位<br />(百、十、<br />个),如:345</td>
				<td>10000<br />BIDT</td>
				<td>如购买<br />345</td>
				<td>如购买<br />百位:123<br />十位:124<br />个位:45<br />此组选投注</br>共计:18注</td>
				<td>如购买<br />百位:3<br />十位:4<br />个位:5<br />此复选投注</br>共计:3注 <br />由以下3注构成<br />345(三星),<br />45(两星),<br />5(一星)</td>
			</tr>
			<tr>
				<td>二星</td>
				<td>中后两位<br />(十、个)<br />,如:45</td>
				<td>1000<br />BIDT</td>
				<td>如购买<br />45</td>
				<td>如购买<br />十位:124<br />个位:45<br />此组选投注</br>共计:6注</td>
				<td>如购买<br />十位:4<br />个位:5<br />此复选投注</br>共计:2注<br /> 由以下2注构成<br />45(两星),<br />5(一星)</td>
			</tr>
			<tr>
				<td>一星</td>
				<td>中最后一<br />位(个),<br />如:5</td>
				<td>100<br />BIDT</td>
				<td>如购买<br />5</td>
				<td>如购买个位:1和5,</br>此组选投注</br>共计:2注</td>
				<td>无</td>
			</tr>
		</table>
		<div class="text">
			8、本活动只为BIDT持有者提供娱乐用途，请合理安排娱乐时间，享受健康生活。未成年人不得参与。任何人不得用于非法用途，否则责任自负。
			<br /><br /> 9、本活动最终解释权归LuckyCoin运营团队所有。
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.game {
		box-sizing: border-box;
		padding: 0.3rem 0.25rem;
		padding-bottom: 0.4rem;
		background: rgba(35, 0, 92, 1);
		header {
			margin-bottom: 0.39rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.returns {
				display: block;
				width: 0.19rem;
				height: 0.36rem;
			}
			div {
				font-size: 0.26rem;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
			}
			.homes {
				display: block;
				width: 0.45rem;
				height: 0.39rem;
			}
		}
		.text {
			font-size: 0.18rem;
			color: #FFFFFF;
			line-height: 0.4rem;
			span {
				font-size: 0.18rem;
				color: #83ACF2;
			}
		}
		.tit {
			margin-top: 0.1rem;
			width: 100%;
			box-sizing: border-box;
			padding: 0.1rem 0.02rem;
			font-size: 0.2rem;
			color: rgb(255, 255, 255);
			border: 1px solid rgb(255, 255, 255);
		}
		table {
			margin-bottom: 0.1rem;
			width: 100%;
			text-align: center;
			font-size: 0.2rem;
			color: rgb(255, 255, 255);
			border: 1px solid rgb(255, 255, 255);
			td {
				padding: 0.1rem 0.1rem;
				border: 1px solid rgb(255, 255, 255);
			}
		}
	}
</style>