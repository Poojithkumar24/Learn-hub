import Image from "next/image" ;

export const Logo = () => {
    return ( 
        <div className="flex flex-row">
            <Image 
                height={55}
                width={55}
                src="/logo.svg"
                alt="logo"
            />
            <p className=" mt-3 ml-0.5 text-4xl ">Learn Hub</p>
        </div>
     )
}
 
