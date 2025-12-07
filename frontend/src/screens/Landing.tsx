import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="p-4 flex gap-4 bg-[#743a30] h-screen">
        <div className="flex-1 w-1/2 rounded-3xl">
          <img
            className="w-full rounded-3xl"
            src="./chess-board.jpg"
            alt="Chess Board Image"
          />
        </div>
        <div className="flex flex-col gap-6 w-1/2">
          <div className="">
            <h1 className="text-6xl font-semibold text-emerald-100">
              Play Chess Online on the #1 Site!
            </h1>
            <div className="flex gap-2 mt-6">
              <p className="text-[#0b0402]">
                <span className="text-amber-200">12,13,5</span> Games Today
              </p>
              <p className="text-[#0b0402]">
                <span className="text-amber-200">12,13,5</span> Playing Now
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
                navigate("/game");
              }}
              className="p-6 bg-[#dab175] text-[#6c1304] rounded-xl text-3xl font-sans font-semibold hover:outline-1 hover:bg-[#6c1304] hover:text-[#dab175]"
            >
              Play Online
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
