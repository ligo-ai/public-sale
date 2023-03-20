<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@font-face {
  font-family: "Anita";
  src: local("Anita"),
   url(./fonts/anita.ttf) format("truetype");

} 

@font-face {
  font-family: "Pirulen";
  src: local("Pirulen"),
   url(./fonts/pirulen.ttf) format("truetype");

} 
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #00a388;
  font-family: Helvetica;
  
}


@media only screen and (max-width: 560px) {


.el-message-box {
  width: 268px !important;
}

}

.el-icon-success {
  display: none !important;
}

.el-icon-close {
  display: none !important;
}



.main {
  background-image:  url('assets/hero-bg.png');
  background-blend-mode: multiply;
  /* background-color: #ffffff; */
  background-size: cover;



}

.box0 {

padding-top: 20px;
margin-top: 10px;
padding-bottom: 20px;
border-style: solid;
border-width: 1px;
border-color: #175B5A;
border-radius: 10px;

background: #000;
display: flex;
width: 95vw;
max-width: 720px;
margin: 0px auto 0px auto;
position: relative;
text-align: left;
box-sizing: 1px;
border: none;
border: 1px solid #21A5B7;

box-shadow: 0 0 40px #00bfff6e;
}

.box1 {

  padding-top: 20px;
  margin-top: 10px;
  padding-bottom: 20px;
  border-style: solid;
  border-width: 1px;
  border-color: azure;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #06373A;
  display: flex;
  width: 95vw;
  max-width: 720px;
  margin: 0px auto 0px auto;
  position: relative;
  text-align: left;
  box-sizing: 1px;
  border: none;
  border: 1px solid #06373A;

  box-shadow: 0 0 40px #06373A6e;
}


.box2 {

  padding-bottom: 50px;
  width: 95vw;
  max-width: 720px;
  margin: 1rem;
  border-style: solid;
  border-width: 1px;
  border-color: azure;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: #175B5A ;
  margin: 0px auto 0px auto;
  position: relative;
  text-align: left;
  box-sizing: 1px;
  border: none;
  border: 1px solid #06373A;

  box-shadow: 0 0 60px #06373A6e;
}


.aw {
  color: rgba(102, 102, 102, 1);
  font-size: 34px;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #ffffff !important;
}
.el-radio__input.is-checked .el-radio__inner {
  border-color: #ffffff !important;
  background: #ffffff !important;
}
.el-radio__inner:hover {
  border: 1px solid #ffffff !important;
}
.sk {
  color: rgba(102, 102, 102, 1);
  font-size: 16px;
  font-weight: bold;
  margin-top: 30px;
}
.skbtn {
  width: 416px;
  height: 50px;
  border-radius: 4px;
  border: 1px solid #ddd;
  line-height: 50px;
  cursor: pointer;
  color: #ddd;
  text-align: center;
  font-size: 14px;
}



.bg-box {
  overflow: hidden;
  height: 188px;
  width: 100%;
}
.el-input__inner {
  background-color: #000 !important;
}

.el-select .el-input.is-focus .el-input__inner {
  border-color: #ffffff !important;
}
.el-select .el-input__inner:focus {
  border-color: #ffffff !important;
}
.el-select-dropdown__item.selected {
  color: #ffffff !important;
}
.el-input.is-active .el-input__inner, .el-input__inner:focus {
  border-color: #ffffff !important;
}
</style>
