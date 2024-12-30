import { useAuth } from "@/app/_hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRouteGuard = () => {
  const router = useRouter();
  const { session } = useAuth();

  useEffect(() => {
    if (session === undefined) return; // sessionがundefinedの場合は読み込み中なので何もしない

    const fetcher = async () => {
      if (session === null) {
        router.replace("/login");
      }
    };

    fetcher();
  }, [router, session]);
};
