import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { RiFacebookBoxFill } from "react-icons/ri";
import { RiTwitterFill } from "react-icons/ri";
import { RiInstagramLine } from "react-icons/ri";
import { RiGithubFill } from "react-icons/ri";
import { RiMailFill } from "react-icons/ri";

export const Footer = () => {
    const t = useTranslations()
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">{t("social_media")}</h3>
                        <div className="space-y-2">
                            <p className="text-sm">{t("discover_jobs")}</p>
                            <div className="flex space-x-4 mt-4">
                                <RiFacebookBoxFill size={20} className="hover:text-white cursor-pointer" />
                                <RiTwitterFill size={20} className="hover:text-white cursor-pointer" />
                                <RiInstagramLine size={20} className="hover:text-white cursor-pointer" />
                                <RiGithubFill size={20} className="hover:text-white cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    {/* Solutions */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">{t("shortcuts")}</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-sm hover:text-white">{t("home")}</Link></li>
                            <li><Link href="#" className="text-sm hover:text-white">{t("about_us")}</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">{t("support")}</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-sm hover:text-white">{t("documentation")}</Link></li>
                            <li><Link href="#" className="text-sm hover:text-white">{t("guides")}</Link></li>
                            <li><Link href="#" className="text-sm hover:text-white">{t("help")}</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">{t("subscribe")}</h3>
                        <p className="text-sm">{t("stay_uptodate")}</p>
                        <div className="flex mt-2">
                            <input
                                type="email"
                                placeholder={t("enter_email")}
                                className="px-4 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition duration-150">
                                <RiMailFill size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm">
                            {t("rights")}
                        </div>
                        <div className="flex space-x-6">
                            <Link href="#" className="text-sm hover:text-white">{t("privacy_policy")}</Link>
                            <Link href="#" className="text-sm hover:text-white">{t("terms_of_service")}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

