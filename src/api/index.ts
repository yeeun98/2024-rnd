const BASE_URL = "https://lobby.spazon.com/v1/round/year-report";

const fetches = (url: string) => {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-golfxon-token': '3A5431183EA82DB09D111519DBA346366E6A5285C2C673F5DDF56467234481216BEFA619F85726401DD56B1B1EE451BE5AC4DD',
    }
  })
}

export function fetchUserRound() {
  return fetches(`${BASE_URL}/round`).then((res) => res.json());
}
export function fetchBestCC() {
  return fetches(`${BASE_URL}/course`).then((res) => res.json());
}
export function fetchRanking() {
  return fetches(`${BASE_URL}/ranking`).then((res) => res.json());
}