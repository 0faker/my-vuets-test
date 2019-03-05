declare namespace ReportInfo {
 export interface ReportInfos {
  id: number;
  recoveryGoal: string;
  recoveryTarget: string;
  content: string;
  cyclePrescription: object;
  doctor: object;
  addTime: number;
  updateTime: string;
  sex: string;
  age: string;
  patientName: string;
  height: string;
  weight: string;
  doctorName: string;
  hospital: string;
  office: string;
  sNumber: string;
  bmi: string;
  prescriptionAccomplishedNum: string;
  cyclePrescriptionCycle: string;
  dgszbNum: string;
  cdszbNum: string;
  ssNum: string;
  sxellNum: string;
  sxsllNum: string;
  sszbNum: string;
  cdsszbNum: string;
  sssNum: string;
  ssxellNum: string;
  ssxsllNum: string;
  tbNum: string;
  fcNum: string;
  fpNum: string;
  xlbqNum: string;
  xdgsNum: string;
  xdghNum: string;
  sdMaxHrOfExercise: string;
  sdMinHrOfExercise: string;
  sdExerciseFrequencySum: string;
  sdExerciseTimeSum: string;
  sdExerciseType: string;
  jcMaxHrOfExercise: string;
  jcMinHrOfExercise: string;
  jcAvgHrOfExercise: string;
  jcMaxMets: string;
  jcMinMets: string;
  jcAvgMets: string;
  jcExerciseFrequencySum: string;
  jcExerciseTimeSum: string;
  jcExerciseType: string;
  startTime: number;
  endTime: number;
  exceptionInfoStatus: string;
  chartDTOList: chartDTOList[];
 }
 export interface ReportInfoLists {
  result: ReportInfos[];
 }
 export interface ReportInfoResult {
  result: ReportInfos;
 }
 export interface chartDTOList {
  prescriptionDate: number;
  // 训练日期，对应图表横坐标
  maxHr: number;
  // 最大心率
  minHr: number;
  // 最小心率
  avgHr: number;
  // 平均心率
  effectiveExerciseTime: number;
  // 有效运动时长 单位：分钟
  metsLtoet3: number;
  // METs小于等于3的百分比
  metsLtoet5: number;
  // METs小于等于5大于3的百分比
  metsLtoet8: number;
  // METs小于等于8大于5的百分比
  metsGt8: number;
  // METs大于8的百分比
  effectiveExerciseTimePercent: number;
  // 有效运动时长占比
 }
}
