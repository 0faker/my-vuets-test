/**
 * 后台请求设置
 */
import axios from 'axios';
import ls from 'local-storage'
// import { serverUrl } from './configByEnv.js'
const Authorization = 'xxbearer:eyJhbGciOiJIUzUxMiJ9.eyJwaG9uZSI6IjE3MzI3ODgwNjc1IiwiZXhwIjoxNTUzMDQ3ODM1fQ.76Q4r80bXFL5OKBd75QgIrqZAl7g0Om7DSNjlK8Lsgy-AfYxhB-F2aSwNuuvSrtPLAa40a5K--UVm9wnUsOHDw';
// const Authorization = ls.get('Authorization');
axios.defaults.headers = {
  Authorization,
};
// axios.defaults.baseURL = serverUrl;
axios.defaults.baseURL = '/ppay/testserver';

axios.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  const code = response.data.code;
  if (code === 'C700') {
    alert('登录信息失效');
    //  location.href = '/wx/login'; return;
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
  public login(option: any): Promise<any> {
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
  public getAuth(option: any): Promise<any> {
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
  public loginTest(phone: string): Promise<any> {
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
  public getUser(id: string): Promise<any> {
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
  public getPatient(id: string): Promise<any> {
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
  public delPaitient(id: number, patientId: number): Promise<any> {
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
  public getWxConfig(url: string): Promise<any> {
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
  public AddAutoCode(id: string, phone: number): Promise<any> {
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
  public bindFamily(id: number, phone: string, authCode: string): Promise<any> {
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
 * 
 * @param {*} option 
 */
  public addPaitienQRcode(userid: number, qrcode: any): Promise<any> {
    return axios({
      url: "cp/family/" + userid + "/qrcode_binding",
      data: {
        qrcode
      },
      method: 'post',
    })
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
  public modify(id: string, name: string | null, sex: string | null, birthday: string | null, height: number | null, weight: number | null): Promise<any> {
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
  public modifyUserPhone(phone: string, code: string): Promise<any> {
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
        transformRequest: [function (data) {
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
  public getCyclePrescriptions(id: number): Promise<any> {
    return axios({
      url: '/cp/ep/patient/' + id + '/cycle_prescriptions',
    });
  }
  /**
   * 获取康复报告列表
   * @param id 患者id
   */
  public getReportLists(id: number): Promise<any> {
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
  public getReportInfo(id: string, recoveryReportId: string): Promise<any> {
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
  public getAccomplishedList(id: string, prescriptionDate: string, currentPageNo: number, pageSize: number): Promise<any> {
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
   * 康复记录详情
   * @param patientid
   * @param recordid
   */
  public getAccomplishedInfo(patientid: string, recordid: string): Promise<any> {
    return axios({
      url: 'cp/patient/' + patientid + '/accomplished_info/' + recordid,
    });
  }
  /**
   * 康复记录的日处方
   * @param id   康复记录id
   */
  public getAccomplishedPrescription(id: string): Promise<any> {
    return axios({
      url: 'cp/ep/prescription_accomplished_info/' + id + '/corresponding_daily_prescription'
      ,
    });
  }
  /**
  * 获取预防记录列表
  * @param id 用户id
  * @param date 选择的日期,不传默认全部
  * @param currentPage 当前页数
  * @param pageSize 每页条数
  */
  public getPrenventList(id: string, date: string, currentPage: number, pageSize: number): Promise<any> {
    return axios({
      url: 'cp/ep/patient/' + id + '/preventive_records',
      params: {
        date,
        currentPage,
        pageSize,
      },
    });
  }
  public getPreventiveInfo(id: string): Promise<any> {
    return axios({
      url: 'cp/ep/patient/preventive_record/' + id,
    });
  }
  /**
  * 获取监测记录列表
  * @param id 用户id
  * @param date 选择的日期,不传默认全部
  * @param currentPage 当前页数
  * @param pageSize 每页条数
  */
  public getMonitortList(id: string, date: string, currentPage: number, pageSize: number): Promise<any> {
    return axios({
      url: 'cp/ep/patient/' + id + '/self_monitoring_records',
      params: {
        date,
        currentPage,
        pageSize,
      },
    });
  }
  public getMonitorInfo(id: String): Promise<any> {
    return axios({
      url: 'cp/ep/patient/self_monitoring_record/' + id,

    });
  }
  /**
  * 获取评估记录列表
  * @param id 用户id
  * @param date 选择的日期,不传默认全部
  * @param currentPage 当前页数
  * @param pageSize 每页条数
  */
  public getAssessmentList(id: string, date: string, currentPage: number, pageSize: number): Promise<any> {
    return axios({
      url: 'cp/ep/patient/' + id + '/simple_assessments',
      params: {
        date,
        currentPage,
        pageSize,
      },
    });
  }
  /**
   * 获取评估详情
   * @param id
   */
  public getAssessmentInfo(id: string): Promise<any> {
    return axios({
      url: 'cp/ep/patient/simple_assessments/' + id,
    });
  }

  public getBorg(): Promise<any> {
    return axios({
      url: '/cp/patient/borg_category_list',
    });
  }
  /**
   * 获取购买的患者是否已存在
   * @param phone 手机号
   */
  public getPayPatient(phone: number): Promise<any> {
    return axios({
      url: '/cp/ep/patient/' + phone + '/wx',
    });
  }
  /**
   * 购买时注册用户
   * @param phone
   * @param code
   */
  public RegistPatient(phone: string, code: string): Promise<any> {
    return axios({
      url: '/cp/ep/wx/register_patient',
      params: {
        phone, code,
      },
      method: 'post',
    });
  }
  /**
 * 获取专家医生服务
 * @param {*} option
 */
  public GetCommonDoctorService(id: number, patientId: number): Promise<any> {
    return axios({
      url: '/cp/ep/product/common_doctor_service',
      params: {
        doctorId: id,
        version: '2.4.2',
        patientId,
      },
    });
  }
  /**
   * 获取城市的医生服务
   * @param cityId ;
   * @param name ;
   * @param pageSize ;
   * @param currentPage ;
   */
  public GetCityDoctors(pageSize: number, currentPage: number, cityId?: number, name?: string): Promise<any> {
    return axios({
      url: 'cp/ep/city/doctors',
      params: {
        cityId, name, pageSize, currentPage,
      },
    });
  }
  /**
 * 获取城市列表
 * @param {*} option
 */
  public GetCityLists(): Promise<any> {
    return axios({
      url: '/cp/ep/cities',
    });
  }
  /**
   * 三分钟心电记录列表
   * @param monitoringRecordId 自主监测记录id
   */
  public GetThreeMinutesRecords(monitoringRecordId: number): Promise<any> {
    return axios({
      url: '/cp/ep/patient/1/three_minutes_records',
      params: {
        monitoringRecordId,
      },
    });
  }
  /**
   * 三分钟分析结果
   * @param {*} id 三分纪录id
   */
  public GetAnalysisResult(id: number): Promise<any> {
    return axios({
      url: '/cp/ep/three_minutes_record/' + id + '/analysis_result',
    });
  }
  /**
   * 获取sts签名
   */
  public GetStsTicket(): Promise<any> {
    return axios({
      url: '/cp/ep/patient/sts_token',
    });
  }
  /**
   * 获取微信支付签名
   * @param orderId 订单号
   * @param ip 用户ip
   * @param payType 支付方式
   * @param openId 微信openId
   */
  public GetWxPaySignature(orderId: number, openId: number): Promise<any> {
    return axios({
      url: 'cp/ep/order/' + orderId + '/pub_pre_pay',
      method: "post",
      params: {
        orderId,
        openId,
        'payType': 3,
        'ip': '127.0.0.1',
      }
    });
  }
  /**
   * 获取openid
   */
  public GetOpenid(code: string): Promise<any> {
    return axios({
      url: 'cp/ep/order/openid',
      params: {
        code
      }
    });
  }
  /**
   * 获取订单详情
   * @param {*} id 三分纪录id
   */
  public GetOrderNews(id: number): Promise<any> {
    return axios({
      url: '/cp/ep/three_minutes_record/' + id + '/analysis_result',
    });
  }
  /**
   * 生成订单
   * @param productId 服务id
   * @param doctorId  医生id
   * @param patientId 患者id
   */
  public GetPayOrder(
    productId: number,
    doctorId: number,
    patientId: number): Promise<any> {
    return axios({
      url: "/cp/ep/order",
      method: "post",
      data: {
        productId: productId.toString(),
        doctorId,
        patientId
      },
      transformRequest: [function (data) {
        var formData = new FormData();
        for (let key in data) {
          formData.append(key, data[key]);
        }
        return formData
      }],
    })
  }
}

export default new Server();
