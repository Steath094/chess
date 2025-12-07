import type React from "react"

export const Button = ({onClick,children}: {onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> void, children:React.ReactNode}) => {
    return <button
              onClick={onClick}
              className="p-6 bg-[#dab175] text-[#6c1304] rounded-xl text-3xl font-sans font-semibold hover:outline-1 hover:bg-[#6c1304] hover:text-[#dab175]"
            >
              {children}
    </button>
}