"use client";
import React, { useEffect, useState } from "react";
import { getSession } from "./FetchData";
import ErrorPage from "@/app/error/page";

const HomePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [session, setsession] = useState<unknown>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [email, setemail] = useState<unknown>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [id, setid] = useState<unknown>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const currentSession = await getSession();
      setsession(currentSession.data.session);
      setemail(currentSession.data.session?.user.email);
      setid(currentSession.data.session?.user.id);
    };
    fetchSession();
  }, []);

  return (
    <div>
      <ErrorPage />
    </div>
  );
};

export default HomePage;
