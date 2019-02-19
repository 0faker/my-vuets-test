declare namespace Monitor {
 export interface MonitorInfo {
  startTime: string;
  // 开始运动时间
  endTime: string;
  // 结束运动时间
  motionDuration: string;
  // 运动时长 s
  maxHr: string;
  // 最大心率
  minHr: string;
  // 最小心率
  avgHr: string;
  // 平均心率
  mets: string;
  // mets值
  conclusion: string;
  // 结论
  doctorId: number;
  // 医生id
  currentDoctorId: number;
  // 当前医生id
  motionDurations: number;
  // 计划运动时长 单位:分;
  effectiveMotionTime: number;
  // 有效运动时长 单位:秒;(注意单位转换)
  schemeName: string;
  // 采用的方案类型 I期 II期等
  // -----------ui------
  allTime: number; // 运动总时长
  effectiveMotionTimeRate: string; // 有效运动时长占比
 }
}
