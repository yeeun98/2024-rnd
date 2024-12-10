import { IBestCourse, IHIOTop3, IUserRank, IYearRound, UserInfo } from "../type";

const BASE_URL = "https://lobby.spazon.com/v1/round/year-report";

const fetches = (url: string) => {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-golfzon-session': '3A5431183EA82DB09D111519DBA346366E6A5205E3C9B3CC6210B8C893A6CBB8E99C9B50422E7730154E6058AC3057BB6976F0',
    }
  })
}

export function fetchUserRound(){
  return fetches(`${BASE_URL}/round`).then((res) => res.json());
}
export function fetchBestCC() {
  return fetches(`${BASE_URL}/course`).then((res) => res.json());
}
export function fetchRanking() {
  return fetches(`${BASE_URL}/ranking`).then((res) => res.json());
}
export function fetchHIOTop3() {
  return fetches(`${BASE_URL}/hole-in-one`).then((res) => res.json());
}
export function fetchUserInfo(): Promise<UserInfo> {
  return fetches(`https://lobby.spazon.com/v1/user/status/info`).then((res) => res.json());
}