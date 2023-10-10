import React from "react";
import { IconType } from "react-icons";

interface MobileSidebarItemProps {
    icon: IconType,
    action: () => void;
    selected?: boolean;
    label: string
}

const MobileSidebarItem: React.FC<MobileSidebarItemProps> = ({
    icon: Icon,
    action,
    selected,
    label
}) => {
    return (
        <div className={`w-1/4 flex justify-center p-3 rounded-lg hover:bg-neutral-700 transform duration-200 cursor-pointer
        ${selected && "border-[1px] border-white hover:bg-neutral-800"}
        `}
            onClick={() => { action() }}
        >
            <div className="h">
                <div
                    className="text-white"
                >
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <Icon
                            className="h-3 w-3 sm:w-5 sm:h-5 md:h-7 md:w-7"
                        />
                        <p className="text-white font-light text-[13px] sm:text-xs">{label}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MobileSidebarItem;
