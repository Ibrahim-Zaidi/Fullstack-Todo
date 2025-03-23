import { useEffect } from "react";

function useFetch(url, method, body) {
  useEffect(function () {
    async function fetching() {
      const first_fetch = await fetch(url, {
        method: `${method}`,
        headers: { "content-type": "application/json" },
        body: `${body}`,
      });

      if (!first_fetch.ok) throw new Error("something went wrong");

      if (body) return await first_fetch.json();

      return;
    }
  }, []);
}

export default useFetch;
