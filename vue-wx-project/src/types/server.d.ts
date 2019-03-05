
declare namespace Server {
 // 本文件自己用的不用加export
 export interface LoginUser {
  //  登陆类型
  logonEquipmentType: number;
  // 用户登陆ip
  logonIp: string;
  // 登陆设备编号
  equipmentId: string;
  logonMac: string;
  origin: number;
  phone: string;
  authCode: string;
  unionId: number;
  openId: number;
 }
 export interface Auth {
  //  登陆类型
  logonEquipmentType: number;
  // 用户登陆ip
  logonIp: string;
  // 登陆设备编号
  equipmentId: string;
  logonMac: string;
  origin: number;
  code?: string;
 }
 export interface IServer {
  getAuth(option: Auth): Promise<login.logins>;
  login(loginUser: LoginUser): Promise<any>;
  /**
   * 登录获取验证码
   * @param phone
   */
  loginTest(phone: string): Promise<any>;
  getPatient(id: string): Promise<any>;
  getWxConfig(url: string): Promise<any>;
  getUser(id: string): Promise<any>;
  delPaitient(id: number, patientId: number): Promise<any>;
  AddAutoCode(id: string, phone: number): Promise<any>;
  /**
   * 修改用户信息
   * @param id
   * @param name
   * @param sex
   * @param birthday
   * @param height
   * @param weight
   */
  modify(id: string, name: string | null, sex: string | null, birthday: string | null, height: number | null, weight: number | null): Promise<any>;
  /**
   *修改手机号
   * @param phone
   * @param code
   */
  modifyUserPhone(phone: string, code: string): Promise<any>;
  getCyclePrescriptions(id: number): Promise<any>;
  /**
   * 获取周期处方
   * @param id
   */
  getReportLists(id: number): Promise<any>;
  bindFamily(id: number, phone: string, authCode: string): Promise<any>;
  getReportInfo(id: string, recordid: string): Promise<any>;
  getAccomplishedList(id: string, prescriptionDate: string | null, currentPageNo: number, pageSize: number): Promise<any>;
  getAccomplishedInfo(patientid: string, recordid: string): Promise<any>;
  getAccomplishedPrescription(id: string): Promise<any>;
  getAssessmentList(id: string, prescriptionDate: string | null, currentPageNo: number, pageSize: number): Promise<any>;
  getAssessmentInfo(id: string): Promise<any>;
  getMonitortList(id: string, prescriptionDate: string | null, currentPageNo: number, pageSize: number): Promise<any>;
  getMonitorInfo(id: string): Promise<any>;
  getPrenventList(id: string, prescriptionDate: string | null, currentPageNo: number, pageSize: number): Promise<any>;
  getPreventiveInfo(id: string): Promise<any>;
  getBorg(): Promise<any>;
  getPayPatient(phone: number): Promise<any>;
  RegistPatient(phone: string, code: string): Promise<any>;
  GetCityDoctors(pageSize: number, currentPage: number, cityId?: number, name?: string): Promise<any>;
  GetCityLists(): Promise<any>;
  GetCommonDoctorService(id: number, patientId: number): Promise<any>;
  GetThreeMinutesRecords(monitoringRecordId: number): Promise<any>;
  GetAnalysisResult(id: number): Promise<any>;
  GetStsTicket(): Promise<any>;
  /**
   * 扫码
   * @param userid 
   * @param qrcode 
   */
  addPaitienQRcode(userid: number, qrcode: any): Promise<any>
  GetWxPaySignature(orderId: number, openId: number): Promise<any>
  GetOpenid(code: string): Promise<any>
  GetOrderNews(id: number): Promise<any>
  GetPayOrder(productId: number, doctorId: number, patientId: number): Promise<any>
  /**
   * 获取城市id
   * @param cityName 城市姓名
   */
  GetCityId(cityName: string): Promise<any>
 }
}
