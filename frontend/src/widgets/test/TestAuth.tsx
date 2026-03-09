/* eslint-disable @typescript-eslint/no-explicit-any */
// components/TestAuth.tsx
"use client";

import { apiClient } from "@/libs/api/clients";
import { useState } from "react";

export function TestAuth() {
  const [status, setStatus] = useState("");

  const handleClick = async () => {
    setStatus("Запрос...");
    try {
      const res = await apiClient.user.me();
      setStatus(`✅ ОК: ${res.data.user?.email}`);
      setTimeout(() => setStatus(""), 15000);
    } catch (e: any) {
      setStatus(`❌ ${e.response?.status || e.message}`);
      setTimeout(() => setStatus(""), 15000);
    }
  };

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", margin: 20 }}>
      <button onClick={handleClick}>Проверить куки</button>
      <p style={{ marginTop: 10 }}>{status}</p>
    </div>
  );
}