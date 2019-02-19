import { doctor } from './doctor';

export class userInfos {
   public id?: number;
   public name: string = '';
   public height: number = 0;
   public weight: number = 0;
   public birthday: number = 0;
   public sex: string = '';
   public phone: string = '';
   public email?: string;
   public address?: string;
   public vipLevel?: number;
   public vipStartTime?: number;
   public vipEndTime?: number;
   public medicalHistory?: string;
   public allergicHistory?: string;
   public urgentName?: string;
   public urgentPhone?: string;
   public urgentName1?: string;
   public urgentPhone1?: string;
   public doctor?: doctor;
   public addTime?: number;
   public updateTime?: number;
   public originType?: string;
   public originAdderId?: number;
   public idNumber?: string;
   public lastLogonEquipmentType?: string;
   public focused?: number;
   public medicalRecordNum?: string;
   public alarm_phase?: string;
   public recoveryGoal?: string;
   public patientList?: string;
   public evaluateInfos?: string;
   public prescriptionCount?: string;
   public prescriptionExpired?: string;
   public patientServiceDTO?: object;
   public enabled?: boolean;
   public password?: string;
   public vip?: boolean;
   public username?: string;
   public accountNonExpired?: boolean;
   public accountNonLocked?: boolean;
   public authorities?: any;
   public credentialsNonExpired?: boolean;
 // 康复目的
   public equipmentNumber?: string;
}
