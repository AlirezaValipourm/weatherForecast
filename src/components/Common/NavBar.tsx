import React from 'react'
import LocaleSwitcher from './LocaleSwitcher'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import DarkModeToggle from './ThemeToggle'

export const NavBar = () => {
    const t = useTranslations()
    return (
        <div className="navbar dark:bg-slate-900">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-black dark:text-slate-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><Link className='text-black dark:text-slate-100' href={"/"}>{t("home")}</Link></li>
                        <li><Link className='text-black dark:text-slate-100' href={"/jobs"}>{t("jobs")}</Link></li>
                    </ul>
                </div>
                <Link href={"/"} className="btn btn-ghost text-xl text-black dark:text-white">{t("applicube")}</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li className='text-black dark:text-slate-100'><Link href={"/"}>{t("home")}</Link></li>
                    <li className='text-black dark:text-slate-100'><Link href={"/jobs"}>{t("jobs")}</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <DarkModeToggle />
                <LocaleSwitcher />
            </div>
        </div>
    )
}
