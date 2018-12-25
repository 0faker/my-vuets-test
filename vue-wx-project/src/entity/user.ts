import { doctor } from './doctor';

export class userInfos {
   id?: number;
   name: string = '';
   height: number = 0;
   weight: number = 0;
   birthday: number = 0;
   sex: string = '';
   phone: string = '';
   email?: string;
   address?: string;
   vipLevel?: number;
   vipStartTime?: number;
   vipEndTime?: number;
   medicalHistory?: string;
   allergicHistory?: string;
   urgentName?: string;
   urgentPhone?: string;
   urgentName1?: string;
   urgentPhone1?: string;
   doctor?: doctor;
   addTime?: number;
   updateTime?: number;
   originType?: string;
   originAdderId?: number;
   idNumber?: string;
   lastLogonEquipmentType?: string;
   focused?: number;
   medicalRecordNum?: string;
   alarm_phase?: string;
   recoveryGoal?: string;
   patientList?: string;
   evaluateInfos?: string;
   prescriptionCount?: string;
   prescriptionExpired?: string;
   patientServiceDTO?: object;
   enabled?: boolean;
   password?: string;
   vip?: boolean;
   username?: string;
   accountNonExpired?: boolean;
   accountNonLocked?: boolean;
   authorities?: any;
   credentialsNonExpired?: boolean;
 // 康复目的
   equipmentNumber?: string;
}
