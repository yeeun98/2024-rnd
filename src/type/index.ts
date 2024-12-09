export interface IYearRound {
  totalPlayDateCount: number;
  totalPlayCCCount: number;
  gameRecord: {
    STROKE: number;
    SINGLE: number;
    TOURNAMENT: number;
    NX: number;
    PRO:number;
  },
  shotType: {
    STRAIGHT: number;
    HOOK: number;
    SLICE: number;
    PULL: number;
    PUSH: number;
    PULL_SLICE: number;
    PUSH_HOOK: number;
    DRAW: number;
    FADE: number;
  }
}

interface Common {
  ciCode: number;
  ccName: string;
  emblemImageUrl: string;
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