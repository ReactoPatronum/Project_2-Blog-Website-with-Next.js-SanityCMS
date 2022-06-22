import React, { useEffect, useState } from "react";
import {
  ClockIcon,
  CodeIcon,
  MenuIcon,
  UserIcon,
  MoonIcon,
  XIcon,
} from "@heroicons/react/outline";
import { SunIcon } from "@heroicons/react/solid";
import DateObject from "react-date-object";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/nightSlice";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const night = useSelector((state) => state.night.dark);
  const [dayOrNight, setDayOrNight] = useState(false);
 
 
  const NightMode = () => {
    setDayOrNight(!dayOrNight);
    dispatch(update((night = { dark: dayOrNight })));
  };
  const date = new DateObject();
  const [btc, setBtc] = useState([]);
  const [eth, setEth] = useState([]);
  const [dollar, setDollar] = useState([]);

  const Btc = () => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    )
      .then((r) => r.json())
      .then((r) => setBtc(r.bitcoin.usd))
      .catch(() => setBtc("???"));
  };
  const Eth = () => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    )
      .then((r) => r.json())
      .then((r) => setEth(r.ethereum.usd))
      .catch(() => setEth("???"));
  };
  const DollarTl = () => {
    fetch(
      `https://free.currconv.com/api/v7/convert?q=USD_TRY&compact=ultra&apiKey=50cf60bbd268c61c26f1`
    )
      .then((r) => r.json())
      .then((r) => setDollar(r.USD_TRY.toFixed(2)))
      .catch(() => setDollar("Hesaplanıyor.."));
  };
  useEffect(() => {
    Btc();
    Eth();
    DollarTl();
  }, []);
 
  return (
    <header className="relative">
      <div className="shadow-xl ">
        <div className="border-x border-b-2 border-purple-300 p-2 flex justify-around bg-[#ee5b41]">
          <div className="flex space-x-2 ">
            <ClockIcon className="w-5" />
            <p className="font-semibold ">{date.format("DD/MM/YYYY")}</p>
          </div>
          <div className="">
            <div className="hidden md:flex space-x-4  2xl:mr-[800px]">
              <h2>
                Btc: <span className="font-semibold">{btc} $</span>
              </h2>
              <hr className="border-2 h-6 border-gray-500" />
              <h2>
                Eth: <span className="font-semibold">{eth} $</span>
              </h2>
              <hr className="border-2 h-6 border-gray-500" />
              <h2>
                Dolar/TL: <span className="font-semibold">{dollar} </span>
              </h2>
            </div>
          </div>
          <div>
            <div
              onClick={NightMode}
              className="w-12 h-6 bg-slate-700 rounded-xl flex items-center cursor-pointer"
            >
              <div className="flex">
                <SunIcon className="w-6 text-yellow-400" />
                <MoonIcon className="w-6 text-white " />
                <motion.div
                  animate={!dayOrNight ? { x: 0 } : { x: 24 }}
                  className="h-6 w-6 rounded-full bg-white absolute"
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-around">
          <div className="md:hidden cursor-pointer">
            
          </div>
          <Link href="/">
            <div className="cursor-pointer flex flex-col items-center">
              <CodeIcon className="w-8" />
              <h2>Codefab</h2>
            </div>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/">
              <a className="hover:bg-red-600  hover:text-white py-5 px-2 transition-all duration-200">
                <h2 className=" ">Anasayfa</h2>
              </a>
            </Link>
            <Link href="/blogs">
              <a>
                <h2 className="hover:bg-red-600 hover:text-white py-5 px-2 transition-all duration-200">
                  Bloglar
                </h2>
              </a>
            </Link>
          </div>
          <div
            onClick={session ? signOut : signIn}
            className="flex items-center cursor-pointer"
          >
            <UserIcon
              className={`w-6 ${session ? "text-green-500" : "text-red-500"}`}
            />
            <p className="hidden md:inline">
              {session
                ? `Hoşgeldiniz ${session.user.name.toUpperCase().substring(
                    0,
                    session.user.name.indexOf(" ")
                  )}`
                : "Giriş Yapınız"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
