"use client";

import axios from "axios";

export const fetchUser = async () => {
  try {
    const res = await axios.get("/api/userdata");


    if (res.data) return res.data;
    else return null;
  } catch (error) {
    console.error("Error:", error);
  }
};
