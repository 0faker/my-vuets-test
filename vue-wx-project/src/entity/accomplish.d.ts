// import BaseEntity from "./base";

declare namespace Accomplished {
 // 康复记录
 export interface AccomplishedInfo {
  id: number;
  dailyPrescription: string;
  totalExerciseTime: number;
  effectiveExerciseTime: string;
  stepNumber: string;
  maxHrOfExercise: string;
  minHrOfExercise: string;
  avgHrOfExercise: string;
  minMets: string;
  maxMets: string;
  avgMets: string;
  metsLtoet3: string;
  metsLtoet5: string;
  metsLtoet8: string;
  metsGt8: string;
  addTime: string;
  addImei: string;
  height: string;
  weight: string;
  hardwareVersion: string;
  firmwareVersion: string;
  addEquipmentId: string;
  edFileId: string;
  etgFileId: string;
  warmFileId: string;
  relaxFileId: string;
  trainStartTime: number;
  // 训练开始时间
  trainEndTime: number;
  // 训练结束时间
  downloaded: string;
  borg: string;
  prescriptionDate: number;

 }
 // 请求结果
 export interface AccomplishedList {
  result: AccomplishedInfo[];
 }
 // 康复记录实例
 export interface AccomplishedInstance {
  date: number; // 训练日期时间戳
  Accomplished: AccomplishedInfo[]; // 记录列表
 }
}
