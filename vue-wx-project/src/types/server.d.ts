
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
  phone?: number;
  authCode?: string;
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
  getAssessmentList(id: string, prescriptionDate: string | null, currentPageNo: number, pageSize: number): Promise<any>;
  getMonitortList(id: string, prescriptionDate: string | null, currentPageNo: number, pageSize: number): Promise<any>;
  getPrenventList(id: string, prescriptionDate: string | null, currentPageNo: number, pageSize: number): Promise<any>;
 }
}
