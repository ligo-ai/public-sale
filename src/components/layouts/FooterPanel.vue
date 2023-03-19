<template>
  <div class="footer-panel">
    <div class="footer-box">
      <div class="t-and-c">
        <a
          href="https://ligoai.com/pages/presale.html"
          target="_blank"
          rel="noopener"
          ><span style="color: #ddd">Sale T&C</span></a
        >
        © 2023 Ligo AI
      </div>

      <div class="contact"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterPanel",
};
</script>

<style lang="scss">
.footer-panel {
  height: auto;
  color: #001127;
  background-color: #001127;
  position: relative;
}
.footer-box {
  width: auto;
  justify-content: center;
  margin: 0 auto;
}

.t-and-c {
  text-align: left;
  display: inline-block;
  margin: 5px;
  color: #ddd;
}
</style>

