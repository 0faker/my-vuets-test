declare namespace Patient {
 export interface PatientInfo {
  id: number;
  name: string;
  // 患者姓名
  vipLevel: string;
  vipStartTime: number;
  // vip开始时间
  vipEndTime: number;
  // vip结束时间
  birthday: string;
  // 生日
  sex: string;
  // 性别 0:男；1:女；2:未知
  phone: string;
  // 手机号
  email: string;
  address: string;
  medicalHistory: string;
  allergicHistory: string;
  height: string;
  // 身高cm
  weight: string;
  // 体重kg
  urgentName: string;
  urgentPhone: string;
  doctor: string;
  addTime: string;
  updateTime: string;
  originType: string;
  originAdderId: string;
  idNumber: string;
  lastLogonEquipmentType: string;
  patientList: string;
  prescriptionCount: string;
  enabled: boolean;
  password: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  username: string;
  // --ui------

  isShowCancel: boolean; // 取消关注显示
  CancelWords: boolean; // 取消关注显示文字 true:取消关注 false 确认取消关注
 }


 export interface PatientList extends BaseEntity.BaseEntityResult {
  result: Patient.PatientInfo[];
 }
}
