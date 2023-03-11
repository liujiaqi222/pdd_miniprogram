import http from "k6/http";

export default function () {
  http.get("http://test.k6.io");
}
