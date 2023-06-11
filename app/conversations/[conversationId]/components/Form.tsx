"use client";

import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className="py-4 px-4 bg-gray-800 flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{
          maxFiles: 1,
        }}
        onUpload={handleUpload}
        uploadPreset="c4v4ibca"
      >
        <HiPhoto className="text-teal-500" size={30} />
      </CldUploadButton>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Type a message"
        />

        <button
          type="submit"
          className="rounded-full p-2 bg-teal-500 cursor-pointer hover:bg-teal-600 transition"
        >
          <HiPaperAirplane className="text-white" size={18} />
        </button>
      </form>
    </div>
  );
};

export default Form;
