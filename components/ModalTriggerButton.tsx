import React from "react";
import { ModalTrigger } from "./Modal";

interface IProps {
  title: string;
  icon: React.ReactNode;
}

const ModalTriggerButton: React.FC<IProps> = ({ title, icon }) => {
  return (
    <ModalTrigger
      className={
        "group/modal-btn flex items-center justify-center gap-1 cursor-pointer font-medium rounded-lg text-sm px-4 py-2 bg-[#1565C0] text-white transition-colors"
      }
    >
      <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 font-bold">
        {title}
      </span>
      <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 z-20">
        {icon}
      </div>
    </ModalTrigger>
  );
};

export default ModalTriggerButton;
