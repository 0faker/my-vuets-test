/**
 * 后台请求设置
 */
import axios from 'axios';
// import { serverUrl } from './configByEnv.js'
const Authorization = 'xxbearer:eyJhbGciOiJIUzUxMiJ9.eyJwaG9uZSI6IjE3MzI3ODgwNjc1IiwiZXhwIjoxNTQ4MjMxNDE1fQ.WkPO0hdU8Ng7EP9L7udblXtO4pdpRJdEoIhQGTGIfNH6k6BcHlZtxs-4_E3nqrTgID_6Fs4mMhk2SdMhdLH4lg';

axios.defaults.headers = {
  Authorization,
};
// axios.defaults.baseURL = serverUrl;
axios.defaults.baseURL = '/wx/server';

axios.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  const code = response.data.code;
  if (code === 'C700') {
    alert('登录信息失效'); location.href = '/wx/login'; return;
  }
  return response.data;
}, (error) => {
  console.log('error');
  console.log(error);
  return Promise.reject(error);
});
/**
 * 后台请求函数
 */
class Server implements Server.IServer {
  // 所有请求函数写在这里
  /**
   * 登录
   * @param curSlnId
   */
    login(option: any): Promise<any> {
    return axios({
      url: 'cp/auth/regist_patient_with_wx',
      method: 'post',
      // headers: {
      //  'Content-Type': 'application/form-data',
      // },
      data: option,
      transformRequest: [(data: any) => {
        const formData = new FormData();
        for (const key in data) {
          if (key) {
            formData.append(key, data[key]);
          }
        }
        return formData;
      }],
    });
  }
  /**
   * 登录第一步
   */
    getAuth(option: any): Promise<any> {
    return axios({
      url: 'cp/auth/get_patient_info_from_wx',
      method: 'post',
      headers: {
        'Content-Type': 'application/form-data',
      },
      data: option,
      transformRequest: [(data: any) => {
        const formData = new FormData();
        for (const key in data) {
          if (key) {
            formData.append(key, data[key]);
          }
        }
        return formData;
      }],
    });
  }
  /**
 * 登录获取验证码
 * @param {*} option
 */
    loginTest(phone: string): Promise<any> {
    return axios({
      url: 'cp/family/get_auth_code',
      params: {
        phone,
      },
    });
  }
  /**
 * 获取用户信息
 * @param {*} id
 */
    getUser(id: string): Promise<any> {
    return axios({
      url: 'cp/ep/patient/' + id,
      method: 'get',
      headers: {
        'Content-Type': 'application/form-data',
      },
    });
  }
  /**
   * 获取亲属列表
   * @param id
   */
    getPatient(id: string): Promise<any> {
    return axios({
      url: 'cp/family/' + id + '/binding_list',
      method: 'get',
    });
  }
  /**
   * 解绑
   * @param {*} id 用户id
   * @param {*} patientId 解绑的患者id
  */
    delPaitient(id: number, patientId: number): Promise<any> {
    return axios({
      url: 'cp/family/' + id + '/unbind',
      method: 'put',
      params: {
        patientId,
      },
    });
  }
  /**
   * 获取微信签名
   * @param {*} url 页面地址
   */
    getWxConfig(url: string): Promise<any> {
    return axios({
      url: 'cp/ep/wechat/signature',
      params: {
        url,
      },
    });
  }
  /**
 * 家属绑定患者发送验证码
 * @param {*} id:用户id
 * @param {*} phoen:添加的患者手机号
 */
    AddAutoCode(id: string, phone: number): Promise<any> {
    return axios({
      url: 'cp/family/' + id + '/get_auth_code',
      params: {
        phone,
      },
    });
  }
  /**
   * 家属通过手机号绑定患者
   * @param id 当前家属的id
   * @param phone 要绑定的患者的手机号
   * @param authCode 验证码
   */
    bindFamily(id: number, phone: string, authCode: string): Promise<any> {
    return axios({
      url: 'cp/family/' + id + '/binding',
      method: 'post',
      params: {
        phone,
        authCode,
      },
    });
  }
  /**
   * 修改用户信息
   * @param id 用户id
   * @param name
   * @param sex 0:男；1:女；2:未知
   * @param birthday YYYY-MM-DD
   * @param height
   * @param weight
   */
    modify(id: string, name: string | null, sex: string | null, birthday: string | null, height: number | null, weight: number | null): Promise<any> {
    return axios({
      url: '/cp/ep/patient/' + id,
      method: 'put',
      data: {
        name,
        sex,
        birthday,
        height,
        weight,
      },
    });
  }
  /**
   * 修改用户手机号
   * @param phone 新手机号
   * @param code 验证码
   */
    modifyUserPhone(phone: string, code: string): Promise<any> {
    return axios(
      {
        url: 'cp/auths/update_patient_phone',
        method: 'post',
        data: {
          newPhone: phone,
          authCode: code,
          //  登陆类型
          logonEquipmentType: 2,
          // 用户登陆ip
          logonIp: '127.0.0.1',
          // 登陆设备编号
          equipmentId: 'fromh5',
          logonMac: 'o.o.o.o',
        },
        headers: {
          'Content-Type': 'application/form-data',
        },
        transformRequest: [function(data) {
          const formData = new FormData();
          for (const key in data) {
            formData.append(key, data[key]);
          }
          return formData;
        }],
      },
    );
  }
  /**
   * 获取患者所有周期处方
   * @param id 患者id
   */
    getCyclePrescriptions(id: number): Promise<any> {
    return axios({
      url: '/cp/ep/patient/' + id + '/cycle_prescriptions',
    });
  }
  /**
   * 获取康复报告列表
   * @param id 患者id
   */
    getReportLists(id: number): Promise<any> {
    return axios({
      url: '/cp/patient/' + id + '/recovery_report_list',
      params: {
        currentPageNo: 1,
        pageSize: 10000,
      },
    });
  }
  /**
   * 获取康复报告
   * @param id 报告id
   */
    getReportInfo(id: string, recoveryReportId: string): Promise<any> {
    return axios({
      url: '/cp/patient/' + id + '/recovery_report_info',
      params: {
        recoveryReportId,
      },
    });
  }
  /**
   * 获取康复记录列表
   * @param id 用户id
   * @param prescriptionDate 选择的日期,不传默认全部
   * @param currentPageNo 当前页数
   * @param pageSize 每页条数
   */
    getAccomplishedList(id: string, prescriptionDate: string, currentPageNo: number, pageSize: number): Promise<any> {
    return axios({
      url: 'cp/patient/' + id + '/accomplished_info_list',
      params: {
        prescriptionDate,
        currentPageNo,
        pageSize,
      },
    });
  }
  /**
  * 获取预防记录列表
  * @param id 用户id
  * @param date 选择的日期,不传默认全部
  * @param currentPage 当前页数
  * @param pageSize 每页条数
  */
    getPrenventList(id: string, date: string, currentPage: number, pageSize: number): Promise<any> {
    return axios({
      url: 'cp/ep/patient/' + id + '/preventive_records',
      params: {
        date,
        currentPage,
        pageSize,
      },
    });
  }
  /**
* 获取预防记录列表
* @param id 用户id
* @param date 选择的日期,不传默认全部
* @param currentPage 当前页数
* @param pageSize 每页条数
*/
    getMonitortList(id: string, date: string, currentPage: number, pageSize: number): Promise<any> {
    return axios({
      url: 'cp/ep/patient/' + id + '/self_monitoring_records',
      params: {
        date,
        currentPage,
        pageSize,
      },
    });
  }
  /**
* 获取预防记录列表
* @param id 用户id
* @param date 选择的日期,不传默认全部
* @param currentPage 当前页数
* @param pageSize 每页条数
*/
    getAssessmentList(id: string, date: string, currentPage: number, pageSize: number): Promise<any> {
    return axios({
      url: 'cp/ep/patient/' + id + '/simple_assessments',
      params: {
        date,
        currentPage,
        pageSize,
      },
    });
  }
}

export default new Server();
