let date = new Date("2020-12-14");
import Mock from 'mockjs'

//这里本该通过后台返回的格式化的数据转换成表格所需要的格式，但因为没有后台的数据模型，所以只能mock了
//基本的表格数据
let dateList = []
for (let i = 0; i < 7; i++) {
    let md = [date.getMonth() + 1, date.getDate()].join("-");
    date.setDate(date.getDate() + 1);
    dateList.push(md);
}

let tableData = [
    "08:00-10:00",
    "10:00-12:00",
    "12:00-14:00",
    "14:00-16:00",
    "16:00-18:00",
    "18:00-20:00",
    "20:00-22:00",
    "22:00-00:00",
];

tableData = tableData.map((item) => {
    let obj = {
        time: item,
    };

    dateList.forEach((date) => {
        obj[date] = Mock.Random.integer(100, 300);
    });

    return obj;
});

Mock.mock(/\/mock\/getdynamictable/, {
    code: 20000,
    data: {
        tableData,
        dateList
    }
})
