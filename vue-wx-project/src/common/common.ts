import { SexEnum } from '../enum/sex.enum';
import moment from 'moment';
var pinyin: any = require('chinese-to-pinyin');
class Common {
  /**
   * 转换手机号码334格式
   * @param input
   */
  public change(input: string): string {
    const value = input.replace(/\s*/g, '');
    const result = [];
    for (let i = 0; i < value.length; i++) {
      if (i === 3 || i === 7) {
        result.push(' ' + value.charAt(i));
      } else {
        result.push(value.charAt(i));
      }
    }
    return result.join('');
  }
  /**
   * 手机号码正则
   */
  public regPhone(input: number) {
    const result = input.toString();
    const reg = /^1[0-9][0-9]\d{8}$/;
    if (!reg.test(result)) {
      return false;
    } else {
      return true;
      // 可用
    }
  }
  /**
   * 判断手机类型
   *
   */
  public getPhoneType() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      // ios返回ios其他返回other;
      return 'ios';
    } else {
      return 'other';
    }
  }
  /**
   * 转换性别
   */
  public getSex(input: string) {
    let result: string = '';
    if (+input === SexEnum.man) {
      result = '男';
    } else if (+input === SexEnum.weman) {
      result = '女';
    } else {
      result = '未填写';
    }
    return result;
  }
  /**
   * 计算年龄
   * @param input
   */
  public computeAge(input: number) {
    return +moment().format('YYYY') - +moment(input).format('YYYY');
  }
  /**
   * 计算BMI 体重/身高(m)的平方
   * @param height cm
   * @param weight kg
   * 两位小数
   */
  public computedBMI(height: number, weight: number) {
    if (height && weight) {
      return Math.round(weight / (height * height / 10000) * 100) / 100;
    } else {
      return 0;
    }
  }
  /**
   * 转换运动形式
   * @param input 运动形式
   */
  public getExerciseType(input: string) {
    let result = '';
    if (input === '1') {
      result = '散步';
    } else if (input === '2') {
      result = '步行 做操 ';
    } else if (input === '3') {
      result = '慢跑 打羽毛球 跳广场舞';
    } else if (input === '4') {
      result = '快跑 跳绳 登山';
    }
    return result;
  }
  /**
   * 更改日期格式转换时分秒
   * @param s 秒数
   */
  public changeSEC(s: number) {
    let t;
    if (s > -1) {
      const hour = Math.floor(s / 3600);
      const min = Math.floor(s / 60) % 60;
      const sec = s % 60;
      if (hour < 10) {
        t = '0' + hour + ':';
      } else {
        t = hour + ':';
      }
      if (min < 10) {
        t += '0';
      }
      t += min + ':';
      if (sec < 10) {
        t += '0';
      }
      t += sec.toFixed(0);
    }
    return t;
  }
  /**
   * 时间戳=>字符串
   */
  public getDate(input: number, type: string) {
    switch (type) {
      case 'd': return moment(input).format('YYYY-MM-DD'); // 天
      case 'hms': return moment(input).format('HH:mm:ss'); // 秒
      case 'point': return moment(input).format('YYYY.MM.DD'); // 点拼接
    }
  }
  /**
  * 时间戳=>字符串 
  */
  public getDayMonth(input: number) {
    return moment(input).format('M月d日');
  }
  /**
   * 转换记录列表数据(除康复记录)
   * @param arr
   */
  public changeMsg(arr: any[]) {
    console.log(arr);
    if (arr.length != 0) {
      const listArr = [arr[0]];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1].day != arr[i].day) {
          listArr.push(arr[i]);
        } else {
          // arr[i].objectList = arr[i].objectList.concat(arr[i + 1].objectList);
          // listArr.pop();
          // listArr.push(arr[i]);
          listArr[listArr.length - 1].objectList = listArr[
            listArr.length - 1
          ].objectList.concat(arr[i].objectList);
          console.log(listArr[listArr.length - 1].objectList);
        }
      }
      listArr.forEach((Element) => {
        Element.totaltime = 0;
        Element.objectList.forEach((Elements: any) => {
          Element.totaltime += Elements.totalExerciseTime;
        });
      });
      return listArr;
    } else {
      return [];
    }
  }
  /**
   * BMI对应的文字说明
   * @param bmi
   */
  public BMIExplain(bmi: number) {
    let BMIExplain = '';
    if (bmi < 18.5) {
      BMIExplain = '（过轻）';
    } else if (bmi >= 18.5 && bmi <= 24) {
      BMIExplain = '（健康）';
    } else if (bmi > 24 && bmi <= 29) {
      BMIExplain = '（过重）';
    } else if (bmi > 29 && bmi <= 40) {
      BMIExplain = '（肥胖）';
    } else if (bmi > 40) {
      BMIExplain = '（极度肥胖）';
    }
    return BMIExplain;
  }
  /**
   * 数组去重
   */
  public deleteRepeat(array: any[]) {
    const result: any[] = [];
    for (let i = 0; i < array.length; i++) {
      if (result.indexOf(array[i]) == -1) {
        result.push(array[i]);
      }
    }
    return result;
  }
  /**
   * 获取字符串首字母
   * @param str
   */
  public getInitials(str: string) {
    let result = '';
    pinyin(str, { noTone: true }).split(' ').forEach((element: String) => {
      result += element[0];
    });
    //小写转大写
    return result.toUpperCase();
  }
  /**
   * 获取字符串全拼音
   * @param str
   */
  public getPinyin(str: string) {
    let result = '';
    result = pinyin(str, { noTone: true }).split(' ').join('')
    //小写转大写
    return result.toUpperCase();
  }
  /**
   * 显示toast提示
   * @param type 提示类型 success normal fail
   * @param msg 提示文字
   */
  showToast(type: string, msg: string) {

  }
}


export default new Common();
