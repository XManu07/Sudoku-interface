interface SidebarButtonProps {
  action: () => void;
  buttonName: string;
}

export default function SidebarButton({
  action,
  buttonName,
}: SidebarButtonProps) {
  return (
    <div>
      <button
        onClick={action}
        className="px-4 py-2 bg-gray-900 rounded-2xl text-white  hover:border-violet-300 hover:text-violet-300 transition-colors 
                  w-full  border-2 border-violet-950 hover:shadow-[0px_0px_4px_2px_rgb(180,180,255)] cursor-pointer"
      >
        {buttonName}
      </button>
    </div>
  );
}
