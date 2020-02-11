const Bed = { type: 0, name: '床', yes: 'http://gz.zfgou.cn/static/member/public/images/zficon01_on.png', not: 'http://gz.zfgou.cn/static/member/public/images/zficon01.png' }
const TV = { type: 1, name: '电视', yes: 'http://gz.zfgou.cn/static/member/public/images/zficon02_on.png', not: 'http://gz.zfgou.cn/static/member/public/images/zficon02.png' }
const WashingMachine = { type: 2, name: '洗衣机', yes: 'http://gz.zfgou.cn/static/member/public/images/zficon03_on.png', not: 'http://gz.zfgou.cn/static/member/public/images/zficon03.png' }//洗衣机
const Refrigerator = { type: 3, name: '冰箱', yes: 'http://gz.zfgou.cn/static/member/public/images/zficon06_on.png', not: 'http://gz.zfgou.cn/static/member/public/images/zficon06.png' }//冰箱
const WaterHeater = { type: 4, name: '热水器', yes: 'http://gz.zfgou.cn/static/member/public/images/zficon05_on.png', not: 'http://gz.zfgou.cn/static/member/public/images/zficon05.png' }//热水器
const AirConditioning = { type: 5, name: '空调', yes: 'http://gz.zfgou.cn/static/member/public/images/zficon04_on.png', not: 'http://gz.zfgou.cn/static/member/public/images/zficon04.png' }//空调
const Wifi = { type: 6, name: '无线网络', yes: 'http://gz.zfgou.cn/static/member/public/images/zficon07_on.png', not: 'http://gz.zfgou.cn/static/member/public/images/zficon07.png' }
const Kitchen = { type: 7, name: '厨房', yes: 'http://gz.zfgou.cn/static/member/public/images/zficon09_on.png', not: 'http://gz.zfgou.cn/static/member/public/images/zficon09.png' }
const Balcony = { type: 8, name: '阳台', yes: 'http://gz.zfgou.cn/static/member/public/images/zficon10_on.png', not: 'http://gz.zfgou.cn/static/member/public/images/zficon10.png' }//阳台
const Sofa = { type: 9, name: '沙发', yes: 'http://gz.zfgou.cn/static/member/public/images/zficon08_on.png', not: 'http://gz.zfgou.cn/static/member/public/images/zficon08.png' }
const Heating = { type: 10, name: '暖气', yes: 'http://gz.zfgou.cn/static/member/public/images/zficon15_on.png', not: 'http://gz.zfgou.cn/static/member/public/images/zficon15.png' }//暖气
const Elevator = { type: 11, name: '电梯', yes: 'http://gz.zfgou.cn/static/member/public/images/zficon14_on.png', not: 'http://gz.zfgou.cn/static/member/public/images/zficon14.png' }//电梯
const Bathroom = { type: 12, name: '独立卫生间', yes: 'http://gz.zfgou.cn/static/member/public/images/zficon11_on.png', not: 'http://gz.zfgou.cn/static/member/public/images/zficon11.png' }//独立卫生间
const Parking = { type: 13, name: '停车位', yes: 'http://gz.zfgou.cn/static/member/public/images/zficon12_on.png', not: 'http://gz.zfgou.cn/static/member/public/images/zficon12.png' }//停车位
const Facilities = [Bed, TV, WashingMachine, Refrigerator, WaterHeater, AirConditioning, Wifi, Kitchen, Balcony, Sofa, Heating, Elevator, Bathroom, Parking]
export default {
    Bed, TV, WashingMachine, Refrigerator, WaterHeater, AirConditioning, Wifi, Kitchen, Balcony, Sofa, Heating, Elevator, Bathroom, Parking, Facilities
}