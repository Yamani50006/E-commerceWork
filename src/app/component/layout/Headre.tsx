
import { Bell } from "lucide-react";
import { Cart } from "../Cart/Cart";
import Image from "next/image";
import imgprofile from "../../../../public/images/2.png";


export default function Headrs() {
    return (
    <div>
      <header className="bg-[#1e1e1e] shadow-lg border-b border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 mb-2 rounded-lg ">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex justify-between items-center  ">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100  ">
            E-commerce
          </h1>
          <div className="flex items-center space-x-3 sm:space-x-6 ">
            {/* <Image
              src={flag}
              alt="Logo"
              width={25}
              height={18}
              className="rounded-full shadow-md"
            /> */}
            <div className="relative ">
              <Bell className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300 cursor-pointer hover:text-white" />
            </div>
            <div className="flex  items-center space-x-2 sm:space-x-3  ">
              <Image
                src={imgprofile}
                alt=""
                className="rounded-full shadow-lg border border-gray-300 overflow-clip w-10 h-10"
                width={30}
                height={30}
              />
              <span className="hidden sm:block text-gray-100 font-medium">
                Admin{" "}
              </span>
              <Cart />
        {/* <Link href={"/cart"} className="relative">
             <IconButton aria-label="cart" >
      <StyledBadge badgeContent={count} color="primary">
        <ShoppingCartIcon className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300" />
      </StyledBadge>
    </IconButton>
    </Link> */}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}


