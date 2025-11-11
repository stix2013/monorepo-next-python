import { API_BASE_URL } from "@stocks/shared";

async function getData() {
  const res = await fetch(`${API_BASE_URL}/api/data`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default async function Home() {
  const data = await getData();
  
  return (
    <main>
      <h1>Next.js + Python Monorepo</h1>
      <p>Data from Python: {data.message}</p>
    </main>
  );
}