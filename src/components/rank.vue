<template>
  <div style="background-color:white;">
    <dd>
      <span>位置:</span>
      <el-select v-model="province" placeholder="请选择省份" id="select" @change="currentSel">
        <el-option v-for="datas,key in provinceobj  " :key="key" :label="datas" :value="datas"></el-option>
      </el-select>
      <el-select v-model="city" placeholder="请选择城市" id="select" @change="currentSelArea">
        <el-option v-for="datas,key in cityobj" :key="key" :label="datas" :value="datas"></el-option>
      </el-select>
      <el-select v-model="area" placeholder="请选择区县" id="select">
        <el-option v-for="datas,key in areaobj" :key="key" :label="datas" :value="datas"></el-option>
      </el-select>
      <el-input type="text" placeholder="详细位置" v-model="location" id="location" />
    </dd>
    <dd class="house_type">
      <span>房型:</span>
      <el-input type="text" v-model="room" />
      <span>室</span>
      <el-input type="text" v-model="hall" />
      <span>厅</span>
      <el-input type="text" v-model="bathroom" />
      <span>卫</span>
    </dd>
    <dd>
      <span>楼层:</span>
      <el-input type="text" v-model="floor" style="width:250px" />
    </dd>
    <!-- <dd>
      <span>房屋设施:</span>
      <div id="facilities">
        <label
          v-for="(datas,key) in this.facilitiesObj"
          :key="datas.type"
          @click="check($event,datas.yes,datas.not,datas.type,key)"
        >
          <input type="checkbox" name="facilities" class="facilities" />
          <div style="width:50px; height:50px;">
            <img :src="datas.not" width="100%" height="100%" />
          </div>
          <span>{{datas.name}}</span>
        </label>
      </div>
    </dd>-->
    <dd>
      <span>月租:</span>
      <el-input type="text" placeholder="月租" v-model="price" style="width:250px" />

      <el-select v-model="time_limit" placeholder="起租时长" id="select">
        <el-option v-for="datas,key in datelength  " :key="key" :label="datas" :value="datas"></el-option>
      </el-select>
    </dd>
    <span>标题:</span>
    <el-input type="text" placeholder="标题" v-model="tittle" />
    <el-form :model="form">
      <el-form-item :label-width="formLabelWidth">
        <el-upload
          ref="upload"
          action="https://imgkr.com/api/files/upload"
          accept="image/png, image/gif, image/jpg, image/jpeg"
          list-type="picture-card"
          :limit="limitNum"
          :auto-upload="false"
          :on-exceed="handleExceed"
          :before-upload="handleBeforeUpload"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
        <el-button size="small">取消</el-button>
      </el-form-item>
    </el-form>
    <el-button @click="rank" style="margin-bottom: 10px;">确定出租</el-button>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import location from "../location";
import reg from "../reg";
// import Facilities from "../assets/Facilities";
import cookie from "../cookie";
export default {
  data() {
    return {
      landlord: null,
      phone: null,
      email: null,
      userid: null,
      location: null,
      price: null,
      tittle: null,
      dialogImageUrl: "",
      dialogVisible: false,
      formLabelWidth: "80px",
      limitNum: 3,
      deposit: null,
      form: {},
      pro: 0,
      cityobj: [],
      provinceobj: [],
      areaobj: [],
      datelength: [
        "一月",
        "二月",
        "三月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      room: null,
      bathroom: null,
      hall: null,
      floor: null,
      time_limit: null,
      city: null,
      province: null,
      area: null,
      pic: [],
      is_price: null
      // facilitiesObj: Facilities.Facilities,
      // facilitiesArr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
  },
  computed: {
    ...mapState(["user", "house_list"])
  },
  methods: {
    ...mapActions(["request_house_list"]),
    // 上传文件之前的钩子
    handleBeforeUpload(file) {
      let size = file.size / 1024 / 1024 / 2;
      if (
        !(
          file.type === "image/png" ||
          file.type === "image/gif" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg"
        )
      ) {
        this.$notify.warning({
          title: "警告",
          message:
            "请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片"
        });
      } else if (size > 2) {
        this.$notify.warning({
          title: "警告",
          message: "图片大小必须小于2M"
        });
      }
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$notify.error({
        title: "添加失败",
        message: "只能上传三张图片"
      });
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      var removeTarget = file.response.data;
      for (let i = 0; i < this.pic.length; i++) {
        if (removeTarget == this.pic[i]) {
          this.pic.splice(i, 1);
        }
      }
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadFile() {
      this.$refs.upload.submit();
    },
    handleAvatarSuccess(response, file, fileList) {
      this.pic.push(response.data);
    },
    currentSel(setVal) {
      this.city = null;
      this.area = null;
      for (let i = 0; i < this.provinceobj.length; i++) {
        if (this.provinceobj[i] == setVal) {
          this.cityobj = [];
          this.areaobj = [];
          for (let j = 0; j < location.provinceList[i].cityList.length; j++) {
            this.cityobj.push(location.provinceList[i].cityList[j].name);
          }
          this.pro = i;
          return;
        } else {
          continue;
        }
      }
    },
    currentSelArea(setVal) {
      this.area = null;
      for (let i = 0; i < this.cityobj.length; i++) {
        if (this.cityobj[i] == setVal) {
          this.areaobj = [];
          for (
            let j = 0;
            j < location.provinceList[this.pro].cityList[i].areaList.length;
            j++
          ) {
            this.areaobj.push(
              location.provinceList[this.pro].cityList[i].areaList[j]
            );
          }
          for (let a = 0; a < this.areaobj.length; a++) {
            if (this.areaobj[a] == "市辖区") {
              this.areaobj.splice(a, 1);
            }
          }
          return;
        } else {
          continue;
        }
      }
    },
    getMsg() {
      this.axios({
        url: "/getPersonal",
        methods: "get",
        params: {
          user: window.document.cookie.split("=")[1]
        }
      }).then(res => {
        this.userid = res.data.user;
        this.landlord = res.data.name;
        this.email = res.data.email;
        this.phone = res.data.phone;
      });
    },
    rank() {
      if (
        this.location == null ||
        this.price == null ||
        this.tittle == null ||
        this.city == null ||
        this.hall == null ||
        this.floor == null ||
        this.room == null ||
        this.bathroom == null ||
        this.province == null ||
        this.time_limit == null
      ) {
        this.$notify.error({
          title: "出租失败",
          message: "请填写完整"
        });
        return;
      }
      if (!reg.price(this.price)) {
        this.$notify.error({
          title: "出租失败",
          message: "请正确填写月租数额"
        });
        return;
      }
      if (!reg.price(this.room)) {
        this.$notify.error({
          title: "出租失败",
          message: "请正确填写房屋类型"
        });
        return;
      }
      if (!reg.price(this.hall)) {
        this.$notify.error({
          title: "出租失败",
          message: "请正确填写房屋类型"
        });
        return;
      }
      if (!reg.price(this.bathroom)) {
        this.$notify.error({
          title: "出租失败",
          message: "请正确填写房屋类型"
        });
        return;
      }
      if (this.pic.length == 0) {
        this.$notify.error({
          title: "出租失败",
          message: "请上传图片以便客户参考"
        });
        return;
      }
      this.axios({
        methods: "post",
        url: "/rank",
        params: {
          userid: this.userid,
          landlord: this.landlord,
          email: this.email,
          phone: this.phone,

          location: this.location,
          price: this.price,
          tittle: this.tittle,
          // user: this.user.user,
          // phone: this.user.phone,
          // email: this.user.email,
          city: this.city,
          provinces: this.province,
          area: this.area,
          time_limit: this.time_limit,
          pic: this.pic.join(","),
          room: this.room + "/" + this.bathroom + "/" + this.hall,
          floor: this.floor
        }
      })
        .then(
          this.$notify({
            title: "出租成功",
            message: "出租成功",
            type: "success"
          }),
          (this.city = null),
          (this.province = null),
          (this.area = null),
          (this.location = null),
          (this.price = null),
          (this.pic = []),
          (this.tittle = null),
          (this.time_limit = null),
          (this.room = null),
          (this.bathroom = null),
          (this.hall = null),
          (this.floor = null),
          this.$refs.upload.clearFiles()
        )
        .then(this.request_house_list());
    }
  },
  mounted() {
    this.getMsg();
  },
  created() {
    for (let i = 0; i < location.provinceList.length; i++) {
      this.provinceobj.push(location.provinceList[i].name);
    }
  },
  watch: {
    price: function(price) {
      if (!reg.price(price)) {
        this.is_price = 1;
      } else {
        this.is_price = 0;
      }
    }
  }
};
</script>
<style scoped>
.house_type.el-input__inner {
  margin: 10px;
  width: 100px;
}
div.el-input {
  width: 400px;
  margin: 10px;
}
dd {
  text-align: center;
}
.el-select {
  width: 120px;
}
#location {
  display: inline;
}
#facilities input {
  display: none;
}
#facilities {
  display: flex;
  padding-left: 25%;
}
label {
  margin: 5px;
}
span {
  display: inline;
}
.house_type div {
  width: 100px;
}
.house_type input {
  width: 80px;
}
</style>