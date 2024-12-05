const BASE_URL = "https://lobby.spazon.com/v1/round/year-report";

export async function fetchCoins() {
  const response = await fetch(`${BASE_URL}/coins`);
  const json = await response.json();
  
  return json.splice(0,100);
}

export function fetchUserRound() {
  return fetch(`${BASE_URL}/round`).then((res) => res.json());
}
export function fetchBestCC() {
  return fetch(`${BASE_URL}/course`).then((res) => res.json());
}
export function fetchRanking() {
  return fetch(`${BASE_URL}/ranking`).then((res) => res.json());
}