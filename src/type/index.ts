export interface IYearRound {
  totalPlayDateCount: number;
  totalPlayCCCount: number;
  gameMode: string;
  gameType: string;
  userPlayType: string;
  gameDifficultyLevel: string;
  softwareLog: {
    VISION: number;
    TWO_VISION: number;
    NX: number;
  },
  shotLog: {
    PULL: number;
    HOOK: number;
    DRAW: number;
    SLICE: number;
    PULL_SLICE: number;
    STRAIGHT: number;
    FADE: number;
    PUSH_HOOK: number;
    PUSH: number;
  }
}

interface Common {
  ciCode: number;
  ccName: string;
  emblemImageUrl: string;
  address: string;
}
export interface IBestCourse extends Common{
  count: number;
}
export interface IHIOTop3 extends Common {
  holeInOneCount: number;
}
export interface IUserRank {
  userNo: number;
  nickname: string;
  userImage: string;
  grade: string;
  handy: number;
  rank: number;
  shopName: string;
}
export interface UserInfo {
  userNo: number;
  userId: string;
  userName: string;
  userNickname: string;
  sex: string;
  userBirthYear: number;
  userAgeGroup: number;
  userType: number;
  isSo: string;
  isRest: string;
  isSerial: number;
  /** 로그인 유무
   * 
   * @type 0: 비로그인
   * @type 1: 로그인
   * @type 2: 미인증 회원
   */
  loginType: 0 | 1 | 2;
  isMembership: string;
  isPremiumMembership: string;
  membershipStatus: number;
  gradeName: string;
  gradeCode: string;
  ghandy: number;
}