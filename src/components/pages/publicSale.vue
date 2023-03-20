<template>
  <div class="main">
    <div class="buylogo" v-show="address == null">
      <img src="../../assets/barr.png" alt="bar" class="buyimg" />
    </div>


    <div v-if="step == 1">
      <Access @unlock="unlock"></Access>
    </div>
    <div v-if="step == 2" style="padding-bottom: 90px">
      <div class="box1" v-show="address != null && currentChainId == '0x38'">
        <div
          class="bnblogo"
          v-show="address != null && currentChainId == '0x38'"
        >
          <img src="../../assets/bnb.png" alt="bnb logo" class="bnbimg" />
        </div>

        <div
          class="wallet-address"
          v-show="address != null && currentChainId == '0x38'"
        >
          <div
            class="address-title"
            v-show="address != null && currentChainId == '0x38'"
          >
            <span class="noDisplay" style="color: #1BE2DF; font-weight: normal; font-family: Anita;"
              > {{ address }}
            </span>
          </div>

          <span class="displayIt" style="color: white; font-family: Anita;"> Connected wallet: {{ shortAddress }}</span>

          <div
            class="address-title"
            v-show="address != null && currentChainId == '0x38'"
          >
           
            <span style="color: #1BE2DF; font-weight: normal; font-family: Anita;">{{ balance }} BNB</span>

          </div>

          <div
            class="address-title"
            v-show="address != null && currentChainId == '0x38'"
          >
          <span style="color: #FFF; font-weight: normal; font-family: Anita;">    ≈ ${{ balance * bnbprice }}</span>
        
          </div>
        </div>
      </div>

      <div class="box0" v-show="address != null && currentChainId != '0x38'">
        <div class="ntrk" v-show="address != null && currentChainId != '0x38'">
          <div>Please switch to Binance Smart Chain network!</div>
        </div>
        <div
          class="bnblogo"
          v-show="address != null && currentChainId == '0x38'"
        >
          <img src="../../assets/bnb.png" alt="bnb logo" class="bnbimg" />
        </div>

        <div
          class="wallet-address"
          v-show="address != null && currentChainId == '0x38'"
        >
          <div
            class="address-title"
            v-show="address != null && currentChainId == '0x38'"
          >
            <span class="noDisplay" style="color: #7192b3; font-weight: bold"
              > {{ address }}
            </span>
          </div>

          <span class="displayIt" style="color: white;  font-family: Anita;">{{ address }}</span>

          <div
            class="address-title"
            v-show="address != null && currentChainId == '0x38'"
          >
            <span style="color: #7192b3; font-weight: bold"></span
            ><span style="color: white">{{ balance }}</span>
            <span style="color: #ffffff"> BNB</span>
          </div>

          <div
            class="address-title"
            v-show="address != null && currentChainId == '0x38'"
          >
            ≈ ${{ balance * bnbprice }}
          </div>
        </div>
      </div>

      <div class="box2" v-show="address != null && currentChainId == '0x38'">
        <div class="info-box"></div>
        <div class="bnb-lai-rate">1 BNB = 100,000 LAI</div>
        <div class="lai-usd-rate">1 LAI = ${{ bnbprice / 100000 }}</div>

        <div class="itemNeat">
          <p style="font-size: 14px"></p>
          <input
            class="inputs"
            v-model="amountToBuy"
            placeholder="Amount to buy"
            @keyup="totalUSDcalc()"
          />
        </div>
        <div class="neatrate-bnb">≈ {{ totalUSD }} USD</div>
        <div class="neatrate-bnb">≈ {{ totalBNB }} BNB</div>

        <div class="btn" v-show="address != null && currentChainId == '0x38'">
          <button id="gtButton" @click="neatBuy">{{ "Let's Buy" }}</button>
        </div>
      </div>
<!-- 
      <div class="noteText2">
        <div class="dashboard1" v-show="address == null">
          🛈 Official contract owner:
       
            <div class="ct-address">0x3559fba03e66dc51Fb1010122086261eB5998225</div> 
        
        </div>
      </div> -->

      <div class="noteText">
        <div
          class="info-text"
          v-show="address == null || currentChainId != '0x38'"
        >
           To manually switch to Binance
          Smart Chain (BSC) network, tap on "Wrong Network" found on the
          top of the page.
        </div>

        <div class="info-text">
          By using the Ligo AI website, you hereby agree with our Sale T&C found at
          the bottom of this page.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Access from "./modules/access";
import EyeInput from "./modules/eyeInput";
import neatioapi from "neatioapi";
import axios from "axios";
import { watch } from "vue";
const Utils = neatioapi.utils;
const Web3 = require("web3");
const web3 = new Web3("https://bsc-dataseed.binance.org/");

export default {
  data() {
    return {
      step: 2,
      balance: "",
      fullbalance: "",
      address: null,
      addresss: null,
      shortAddress: null,
      privateKey: "",
      currentChainId: "",
      chainID: "0x38",
      staking: "",
      rewards: "",
      amount: "",
      limit: "",
      price: "",
      inStake: "",
      circulating: "",
      validators: null,
      aprPercent: "",
      amountToBuy: null,
      amountBNB: "",
      bnbprice: "",
      totalUSD: "",
      totalBNB: "",
    };
  },

  components: {
    Access,
    EyeInput,
  },

  mounted() {
    this.connectAccount();
    this.initialize();
    this.bnbrate();
    this.checkWallet();
  },

  methods: {
    initialize() {
      ethereum.on("chainChanged", (_chainId) => {
        this.getGasPrice();
        this.getBalance();
      });

      ethereum.on("accountsChanged", (_accounts) => {
        this.address = _accounts[0];
        this.getBalance();
      });
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

    refresher() {
      // WIP Code
    },

    async requestAccount() {
      this.currentChainId = await ethereum.request({ method: "eth_chainId" });
      try {
        if (this.currentChainId !== this.chainId) {
          this.connectAccount();
        } else {
          this.addresss = `Binance Smart Chain`;
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
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        this.address = accounts[0];
        this.getBalance();
        this.getGasPrice();
        //this.refresher();
        this.shortAddress = `${accounts[0].substr(0, 6)}...${accounts[0].slice(
          -4
        )}`;
      } catch (e) {
        console.log("request accounts error:", e);
      }
    },

    async switchToBSCChain() {
      let chainIds = "0x38";
      let rpc = "https://bsc-dataseed.binance.org/";
      let browser = "https://bscscan.com";
      let chainName = "Binance Smart Chain";

      try {
        this.currentChainId = await ethereum.request({ method: "eth_chainId" });
        if (this.currentChainId === chainIds) {
          window.alert("Binance Smart Chain has been added to Metamask.");
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

    getBalance() {
      ethereum
        .request({
          method: "eth_getBalance",
          params: [this.address],
        })
        .then((result) => {
          this.balance = Utils.toNEAT(result);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    },

    getGasPrice() {
      ethereum
        .request({
          method: "eth_gasPrice",
          params: [],
        })
        .then((result) => {
          console.log("gasprice", result);
          this.price = Utils.toNEAT(result);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },

    bnbrate() {
      const bnburl =
        "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT";
      axios
        .get(bnburl)
        .then((response) => (this.bnbprice = response.data.price));
    },

    totalUSDcalc() {
      this.totalUSD = this.amountToBuy * 0.00338;
      this.totalBNB = this.totalUSD / this.bnbprice;
    },

    async neatBuy() {
      let bnbAmountToSend = this.amountToBuy * (0.00338 / this.bnbprice);

      const params = [
        {
          from: this.address,
          to: "0x3559fba03e66dc51Fb1010122086261eB5998225",
          value: Utils.toHex(Utils.fromNEAT(`${bnbAmountToSend}`)),
          gas: Utils.toHex("21000"),
          gasPrice: Utils.toHex(Utils.fromNEAT(this.price)),
        },
      ];

      ethereum
        .request({
          method: "eth_sendTransaction",
          params,
        })
        .then((result) => {
          console.log("hash", result);
          this.$alert(
            
            `You bought ${this.amountToBuy} $LAI`,
            "Your tokens will be sent to you shortly",
            {
              confirmButtonText: this.$t("CLOSE"),
              type: "success",
            }
          );
        })
        .catch((error) => {
          console.log("tx error", error);
        });
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width: 800px) {
  .main {
    width: 80%;
    padding: 10px;
  }

  .right {
    width: 100%;
  }
}
@media only screen and (max-width: 500px) {
  .menu,
  .main,
  .address-title {
  margin-bottom: 5px;
  margin-top: 10px;
  font-size: 12px;
  width: auto;
}
  .right {
    width: auto;
    padding: 10px;
  }
  .ct-address{
  font-size: 12px;
  font-family: Anita;
  font-weight: bold;
  color:#175B5A;
  text-align: center;
}
}

button {
  border: none;
  min-width: 40px;
  font-family: Anita, Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  cursor: pointer;
  color: #ffffff;
  box-shadow: inset 0 0 0.1em #ffffff, 0 0 0.1em #ffffff;
  border: #ffffff solid 1px;
  background-color: #24292f;
  border-radius: 4px;
  outline: none;
  margin: 0px 0px 0px 60px;
}

.info {
  display: inline-block;
  margin-left: 10px;
  margin-top: 50px;
}

.ntrk {
  margin: 0 auto;
  justify-content: center;
}

.main {
  padding: 10px;
}

.address-title {
  margin-bottom: 5px;
  margin-top: 10px;
  width: auto;
}

.wallet-address {
  margin-bottom: 5px;
  margin-left: 48px;
  margin-top: 10px;
  width: auto;
  color: #7192b3;
}

.inputs {
  background-color: #000;
  border-radius: 10px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #ffffff;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  width: 100%;
  text-align: center;
}
::-webkit-input-placeholder {
  text-align: center;
}

:-moz-placeholder {
  text-align: center;
}
.ct-address{
  font-size: 16px;
  font-family: Anita;
  font-weight: bold;
  color:#175B5A;
  text-align: center;
}
.offset-bar {
   margin: 0 auto;
   width: 50%;
}
.progress-item {
  border-bottom: 1px solid rgba(250,250,250,0.1);
  margin-bottom: 50px;
  padding-bottom: 50px;
}
.progress-bar {
  width: 70%;
  height: 6px;
  border-radius: 3px;
  background-color: #06373A;
  position: relative;
}
.progress-status {
  position: absolute;
  z-index: 99;
  width: 0px;
  height: 6px;
  background-color: #31c1bf;
  border-radius: 3px;
}
.dashboard1 {
  font-size: 16px;
  font-family: Anita;
  font-weight: bold;
  color:#175B5A;
  text-align: center;
}

.info-text {

  font-size: 18px;
  font-family: Anita;
  
  margin-top: 20px;
  color: #175B5A;
}

.noteText {
  padding: 40px;
}

.noteText2 {
  margin: 10px;
}

@media only screen and (max-width: 540px) {
  .wallet-address {
    margin-bottom: 5px;
    margin-left: 18px;
    margin-top: 10px;
    width: auto;
    color: #7192b3;
  }

  .bnblogo {
    margin-left: 12px;
    margin-top: 32px;
  }

  .noDisplay {
    display: none;
  }
}

@media only screen and (min-width: 1200px) {
  .displayIt {
    display: none;
  }
}

.bnblogo {
  margin-left: 36px;
  margin-top: 32px;
}
.info-box {
  padding-top: 40px;
  text-align: center;
  margin: 0 auto;
}

.card-text {
  background-color: #000;
  padding-top: 10px;
  padding-bottom: 5px;
}
.bnbimg {
  width: 48px;
  height: 48px;
}

.buyimg {
  width: 100vw;
  margin-top: 40px;
  max-width: 840px;
}

.card-number {
  color: #ffffff;
  margin-top: 10px;
  margin-bottom: 10px;
}

.gt {
  width: 280px;
  height: 44px;
  margin-left: 450px;
  margin-top: 50px;
  color: #000;
}

.button {
  color: #000;
  text-align: center;
  width: 50%;
  margin: 0 auto;
}
.itemNeat {
  width: 50%;
  margin: 0 auto;
  text-align: center;
}
.bnb-lai-rate {
  text-align: center;
  color: #ffffff;
  margin-bottom: 15px;
  font-size: 24px;
}

.lai-usd-rate {
  text-align: center;
  color: #1BE2DF;
  margin-bottom: 15px;
  font-size: 28px;
}


.neatrate-bnb {
  text-align: center;
  color: #fff;
  margin-top: 5px;
}

.btn {
  display: flex;
}
#gtButton {
  width: 140px;
  height: 40px;
  color: #000000;
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 50px;
  font-weight: bold;
}

#gtButton:hover {
  background-color: #ffffff;
}
</style>

<style>
.el-message-box__message p {
  margin: 0 !important;
  line-height: 24px !important;
}
.el-message-box__title {
  text-align: center !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
.el-message-box__message {
  text-align: center !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
</style>

