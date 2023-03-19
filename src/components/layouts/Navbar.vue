<template>
  <div class="nav-container">
    <div class="nav-panel">
      <div class="common-inline-block ic" style="">
        <div class="connBtn" v-show="address != null">
          <button id="connectButton" @click="switchToBSCChain">
            <div class="conColor2">{{ address }}</div>
          </button>
        </div>

        <div class="connBtn" v-show="address == null">
          <button id="connectButton" @click="switchToBSCChain">
            <div class="conColor2">{{ "Wallet not found" }}</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavPanel",
  data() {
    return {
      curNav: "Home",
      searchContent: "",
      otherSearch: "",
      currentChainId: "",
      chainId: "0x38",
      testChainId: "0x20d",
      address: null,
      shortAddress: "null",
      isTestNetwork: true,
      walletNF: null,
    };
  },
  created() {
    this.getLocaction();
  },
  mounted() {
    this.initialize();
    this.checkWallet();
  },
  methods: {
    hh() {
      console.log(this);
    },

    checkWallet() {
      if (this.walletNF == null) {
        console.log("not found");
      } else {
        console.log("wallet found");
      }
    },

    strTrim(str) {
      str = str + "";
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    highlight(index) {
      this.curNav = index;
    },

    getLocaction() {
      this.isTestNetwork =
        window.location.hostname.substr(0, 4) === "test" ||
        window.location.hostname.substr(0, 4) === "loca";
    },

    async initialize() {
      this.currentChainId = await ethereum.request({ method: "eth_chainId" });
      ethereum.on("chainChanged", (_chainId) => {
        this.connectAccount(_chainId);
      });

      ethereum.on("accountsChanged", (_accounts) => {
        this.requestAccount();
      });

      this.requestAccount();
    },

    async requestAccount() {
      this.currentChainId = await ethereum.request({ method: "eth_chainId" });
      try {
        if (this.currentChainId !== this.chainId) {
          this.connectAccount();
        } else {
          this.address = `BNB Smart Chain`;
          this.shortAddress = `${accounts[0].substr(
            0,
            6
          )}...${accounts[0].slice(-4)}`;
        }
      } catch (e) {
        console.log("request accounts error:");
      }
    },

    async connectAccount() {
      try {
        if (this.currentChainId !== this.chainId) {
          this.address = this.$t("wrongNetwork");
        } else {
          const accounts = await ethereum.request({ method: "eth_accounts" });
          this.shortAddress = `${accounts[0].substr(
            0,
            6
          )}...${accounts[0].slice(-4)}`;
        }
      } catch (e) {
        console.log("request accounts error:", e);
        this.address = this.$t("Wallet not found");
      }
    },

    async switchToBSCChain() {
      let chainIds = "0x38";
      let rpc = "https://bsc-dataseed.binance.org/";
      let browser = "https://bscscan.com";
      let chainName = "BNB Smart Chain";

      try {
        this.currentChainId = await ethereum.request({ method: "eth_chainId" });
        if (this.currentChainId === chainIds) {
          window.alert("BNB Smart Chain has been added to Metamask.");
        }

        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIds }],
        });
      } catch (e) {
        if (e.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: chainIds,
                  chainName: chainName,
                  nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18,
                  },
                  rpcUrls: [rpc],
                  blockExplorerUrls: [browser],
                },
              ],
            });

            this.currentChainId = await ethereum.request({
              method: "eth_chainId",
            });
          } catch (e) {
            console.log("add network error", e);
          }
        }
      }
    },
  },
};
</script>

<style lang="scss">
.nav-container {
  box-shadow: 0px 4px 8px 0px rgba(230, 230, 230, 0.6);
  background-color: #001127;
  height: auto;
  .nav-panel {
    text-align: center;

    margin: 0 auto;

    .ii {
      vertical-align: middle;
    }
    .ic {
      margin-left: 10px;
      width: auto;
      & a {
        margin-right: 15px;
        color: #666666;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          color: #ffffff;
          transition: all 0.3s ease-in-out;
        }
        span {
          vertical-align: middle;
        }
      }
      .d-meun {
        margin-right: 15px;
        color: #666666;
        font-weight: 500;
        position: relative;
        line-height: 22px;

        .nav-icon {
          display: inline-block;
          font-weight: bold;
          margin-left: 5px;
          vertical-align: middle;
          transition: all 0.3s;
        }

        &:hover {
          .m-title {
            color: #ffffff;
          }
          .nav-icon {
            transform: rotate(180deg);
          }
          .menu-box {
            height: auto;
            padding: 10px 0;
          }
        }
        .menu-box {
          position: absolute;
          top: 22px;
          left: -20px;
          list-style: none;
          margin: 0;
          padding: 0;
          height: 0;
          overflow: hidden;

          background: #ffffff;
          box-shadow: 0 0 8px 0 rgb(230, 230, 230);
          z-index: 100;
          transition: all 0.5s;
          .menu-item {
            height: 25px;
            line-height: 25px;
            padding: 5px 10px;
            font-size: 16px;
            & > a {
              display: inline-block;
              width: 100%;
              min-width: 125px;
            }
            &:hover {
              background-color: #f3f3f3;
              & > a {
                color: #ffffff;
              }
            }
          }
        }
      }
      .nav-logo {
        width: 48px;
      }
      .vg {
        position: relative;
        top: -2px;
        display: inline-block;
        height: 55px;
        &:hover > .chain-dropdown {
          display: block !important;
        }
        .chain-dropdown {
          position: absolute;
          width: 110px;
          top: 45px;
          box-shadow: 0px 6px 10px 0px #ccc;
          background-color: #000;
          padding: 10px 15px;
          left: -16px;
          font-size: 14px;
          display: none;
          z-index: 1000;
          .chain-dropdown-i {
            cursor: pointer;
          }
          .chain-dropdown-i:not(:first-child) {
            margin-top: 8px;
          }
          .chain-dropdown-i:hover {
            color: #ffffff;
          }
        }
        .triangle {
          display: inline-block;
          width: 0;
          height: 0;
          border-width: 7px 7px 0;
          border-style: solid;
          border-color: #999 transparent transparent;
          margin-left: 8px;
          vertical-align: middle;
        }
      }
      .nav-active {
        color: #ffffff;
      }
      .triangle-active {
        border-color: #ffffff transparent transparent !important;
      }
    }
    .help:hover {
      color: #ffffff;
      padding-bottom: 2px;
      border-bottom: 2px solid #ffffff;
    }
    .conColor1 {
      color: red;
    }
    .conColor2 {
      color: #000;
      font-family: Anita;
      margin: 10px;
      font-weight: bold;
    }
    .iv {
      height: 52px;
      line-height: 52px;
      float: right;
      & input {
        width: 280px;
        box-sizing: border-box;
        height: 37px;
        padding-left: 10px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border: 1px solid #ccc;
        border-right: none !important;
        outline: none;
        vertical-align: middle;
      }
      & span {
        display: inline-block;
        width: 53px;
        height: 37px;
        line-height: 3;
        background-color: #3a3cda;
        text-align: center;
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
        vertical-align: middle;
      }
      .search-icon {
        background-size: cover;
        display: inline-block;
        width: 24px;
        height: 22px;
      }
    }

    #connectButton {
      width: 200px;
      height: 42px;
      color: #000000;
      border: 1px solid #000;
      border-radius: 10px;
      background-color: #ffffff;
      font-size: 14px;

      cursor: pointer;
    }

    #connectButton:hover {
      background-color: #ffffffb0;
    }
  }
}
.common-inline-block {
  cursor: pointer;
}

.connBtn {
  padding: 0.5rem;
  margin: auto;
  width: 50%;
}
</style>
