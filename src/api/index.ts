const BASE_URL = "https://lobby.spazon.com/v1/round/year-report";

export function fetchUserRound() {
  return fetch(`${BASE_URL}/round`).then((res) => res.json());
}
export function fetchBestCC() {
  return fetch(`${BASE_URL}/course`).then((res) => res.json());
}
export function fetchRanking() {
  return fetch(`${BASE_URL}/ranking`).then((res) => res.json());
}