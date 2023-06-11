"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import axios from "axios";
import { set } from "react-hook-form";
import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        className="w-full relative flex items-center space-x-3 bg-gray-900 p-3 hover:bg-gray-800 rounded-lg transition cursor-pointer"
        onClick={handleClick}
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-white">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
