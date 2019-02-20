<template>
  <div class="blockIdentity">
      <div class="title">区块身份</div>
    <div class="content">
      <div class="logo">
        <img src="../../img/logo.png" alt="">
        <p class="tip">一个区块身份</p>
        <p class="tip">畅行整个区块链生态</p>
        <!--<p class="tip1" v-if="hasbd == 0">您还未绑定您的区块身份，请登录并绑定</p>-->
      </div>
      <div class="qkid">
        <p class="inp">
          <i></i><input type="text" v-model="username" placeholder="区块ID"></p>
        <p class="inp">
          <i></i><input type="password" v-model="psd" placeholder="密码"></p>
        <em class="forgetpassword" @click="gofindword">忘记密码</em>
        <div class="sub">
          <p class="login" @click="mylogin">登录</p>
          <p class="apply1">还没拥有区块身份？
            <router-link to="/reg" tag="em">注册申请</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import heador from "./header";
export default {
  data() {
    return {
      hasbd:0,
      username:"",
      psd:"",
      datainfo:""
    }
  },
  methods : {
    mylogin () {
      let vm = this;
      $.ajax({
						url:  contextPath1+"/api/reg/beautifulLogin",
						type: "post",
						async: true,
						dataType: "json",
						data: {
              pwd: vm.psd,
              username:vm.username,
						},
						success: function(data) {
							  if(data.state.code==='20000'){
							  	localStorage.qkid = data.data.id;
	//              sessionStorage.mynum = JSON.parse(sessionStorage.egg_userData).phoneNum;
	                localStorage.luckycoin_token = data.data.token;
									vm.$router.push("/");
							  }
	                
						}
					});
    },
    gofindword () {
      this.$router.push('/findpassword');
    }
  }
};
</script>

<style scoped lang="scss">
.blockIdentity {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f7f7f7;
  overflow: hidden;
  .title{
  	width: 100%;
  	height: 0.8rem;
  	font-size: 0.35rem;
  	text-align: center;
  	line-height: 0.8rem;
  	color: rgb(255,255,255);
  	background: #006b8d;
  }
  .logo {
    width: 5rem;
    margin: 0.2rem auto;
    margin-top: 0.4rem;
    img {
      display: block;
      width: 1rem;
      height: 1.1rem;
      margin: 0 auto;
      margin-bottom: 0.1rem;
    }
    .tip {
      text-align: center;
      font-size: 0.28rem;
      line-height: 0.32rem;
      font-weight: 300;
      color: #666666;
    }
    .tip1 {
      margin-top: 0.6rem;
      text-align: center;
      font-size: 0.2rem;
      font-weight: 300;
      color: #999999;
    }
  }
  .qkid {
    width: 4.45rem;
    margin: 0 auto;
    .sub {
      clear: both;
      .login {
        width: 100%;
        height: 0.58rem;
        background: #169bd5;
        color: #fff;
        font-size: 0.3rem;
        text-align: center;
        line-height: 0.58rem;
      }
      .apply1 {
        margin-top: 0.2rem;
        text-align: center;
        font-size: 0.2rem;
        font-size: 0.2rem;
        color: #333;
        em {
          color: #169BD5;
          font-style: normal;
        }
      }
    }

    .forgetpassword {
      display: block;
      float: right;
      font-size: 0.2rem;
      color: #999;
      margin-top: 0.15rem;
      font-weight: 300;
      margin-bottom: 1rem;
    }
    .inp {
      height: 0.86rem;
      line-height: 0.86rem;
      border-bottom: 0.01rem solid #c3c3c3;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      i {
        display: inline-block;
        width: 0.35rem;
        height: 0.34rem;
      }
      input {
        flex: 1;
        display: inline-block;
        border: none;
        background: #f7f7f7;
        height: 0.8rem;
        margin-bottom: 0;
        font-size: 0.25rem;
        color: #999;
        padding-left: 0.1rem;
      }
      &:nth-of-type(1) {
        i {
          background: url("../../img/person.png") no-repeat;
          background-size: 100%;
        }
      }
      &:nth-of-type(2) {
        i {
          width: 0.3rem;
          height: 0.35rem;
          background: url("../../img/mima.png") no-repeat;
          background-size: 100%;
        }
      }
    }
  }
}
</style>