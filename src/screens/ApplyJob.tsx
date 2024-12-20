import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetJobById } from '../core/apis/queries/useGetJobById';
import { Loading } from '../components/Common/Loading';
import { useTranslations } from 'next-intl';
import { CustomInput } from '../components/Common/CustomInput';
import { ItemSelector } from '../components/Common/ItemSelector';
import { Item } from '../types/models/Item';
import { useFormik } from "formik"
import { array, number, object, string, } from "yup"
import { useApplyForPosition } from '../core/apis/mutations/useApplyForPosition';
import { Application, ApplicationForm } from '../types/models/Applications';
import toast from 'react-hot-toast';
import { RiBriefcase2Fill } from "react-icons/ri";
import { RiUserLocationLine } from "react-icons/ri";

const availableSkills: Item[] = [
    { id: '1', name: 'React' },
    { id: '2', name: 'TypeScript' },
    { id: '3', name: 'Node.js' },
    { id: '4', name: 'Python' },
    { id: '5', name: 'AWS' },
    { id: '6', name: 'Docker' },
    { id: '7', name: 'GraphQL' },
    { id: '8', name: 'PostgreSQL' },
    { id: '9', name: 'MongoDB' },
    { id: '10', name: 'Redis' },
    { id: '11', name: 'Vue.js' },
    { id: '12', name: 'Angular' },
];


export const ApplyJobScreen = () => {
    const t = useTranslations()
    const router = useRouter();
    const jobId = router.query.id as string;
    const { data: jobData, isLoading, isError } = useGetJobById(jobId)
    const data = jobData?.data
    const [submittedData, setSubmittedData] = useState<Application | undefined>(undefined)
    const applyMutation = useApplyForPosition()
    useEffect(() => {
        if (isError) {
            router.back()
        }
    }, [isError])

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        yoe: 0,
        selectedSkills: []
    });

    const itemSchema = object({
        id: string().required(t("required")),
        name: string().required(t("required"))
    })

    const validationSchema = object({
        firstName: string().required(t("required")),
        lastName: string().required(t("required")),
        email: string().email(t("email_error")).required(t("required")),
        yoe: number().required(t("required")),
        phone: string()
            .matches(
                /^\+?[0-9]\d{1,14}$/,
                'Phone number is not valid'
            ).required(t("required")),
        selectedSkills: array().of(itemSchema).required(t("required")).min(5, t("select_five"))
    })

    const formik = useFormik({
        initialValues: formData,
        onSubmit: (values) => {
            const application: ApplicationForm = {
                createdAt: new Date(),
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                skills: values.selectedSkills,
                yoe: values.yoe,
                phone: values.phone,
                positionId: jobId
            }
            applyMutation.mutate(application, {
                onSuccess(data) {
                    console.log("success", data)
                    toast.success(t("apply_success"))
                    setSubmittedData(data.data)
                },
                onError(error) {
                    console.log("error", error)
                    toast.error(t("apply_error"))
                },
            })
        },
        validationSchema: validationSchema,
        // validates on submit
        validateOnMount: false,
        validateOnBlur: false,
        validateOnChange: false
    })

    return (
        <div className="min-h-screen py-8">

            {data && !isLoading ? <div className="max-w-6xl mx-auto px-4">
                {/* Job Details Section */}
                <div className="bg-slate-100 dark:bg-slate-700 border border-gray-200 rounded-xl shadow-sm mb-8 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold text-gray-900">{data?.title}</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center text-gray-600 dark:text-slate-100">
                            <RiBriefcase2Fill className="w-5 h-5 mr-2" />
                            <span>{t(data.workTime)}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-slate-100">
                            <RiUserLocationLine className="w-5 h-5 mr-2" />
                            <span>{`${data.location} (${t(data.workType)})`}</span>
                        </div>
                    </div>

                    <div className="prose max-w-none">
                        <h2 className="text-xl font-semibold mb-4">{t("about_role")}</h2>
                        <p className="text-gray-600 mb-4 dark:text-slate-100">
                            {data.description}
                        </p>

                    </div>
                </div>

                {/* Application Form */}
                <div className="bg-slate-100 dark:bg-slate-700 border border-gray-200 rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-6">{t("submit_application")}</h2>
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2 ">
                                    {t("firstName")}
                                </label>
                                <CustomInput
                                    error={formik.errors.firstName}
                                    name='firstName'
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    type='text'
                                    placeHolder={t("firstName")}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
                                    {t("lastName")}
                                </label>
                                <CustomInput
                                    name='lastName'
                                    error={formik.errors.lastName}
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    type='text'
                                    placeHolder={t("lastName")}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
                                    {t("email")}
                                </label>
                                <CustomInput
                                    error={formik.errors.email}
                                    type='email'
                                    name='email'
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    placeHolder={t("email")}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
                                    {t("phone_number")}
                                </label>
                                <CustomInput
                                    type='text'
                                    error={formik.errors.phone}
                                    name='phone'
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                    placeHolder={t("phone_number")}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
                                    {t("yoe")}
                                </label>
                                <CustomInput
                                    name='yoe'
                                    type='number'
                                    placeHolder={t("yoe")}
                                    onChange={formik.handleChange}
                                    value={formik.values.yoe}
                                    error={formik.errors.yoe}
                                />
                            </div>
                            <div>
                                <ItemSelector
                                    label={t("skills")}
                                    selectedItems={formik.values.selectedSkills}
                                    availableItems={availableSkills}
                                    onChange={items => {
                                        console.log("items", items)
                                        formik.setFieldValue("selectedSkills", items)
                                    }}
                                    error={formik.errors.selectedSkills ?? ""}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end space-x-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {applyMutation.isLoading ? <Loading size='sm' /> : t("submit")}
                            </button>
                        </div>
                    </form>
                    {submittedData && <div className="mt-4 bg-slate-100 dark:bg-slate-700 border border-gray-200 rounded-xl shadow-sm p-6">
                        <h2 className="text-2xl font-bold mb-6">{t("application_data")}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2 ">
                                    {t("firstName")}
                                </label>
                                <CustomInput
                                    disabled
                                    name='firstName'
                                    value={submittedData.firstName}
                                    onChange={() => { }}
                                    type='text'
                                    placeHolder={t("firstName")}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2 ">
                                    {t("firstName")}
                                </label>
                                <CustomInput
                                    disabled
                                    name='lastName'
                                    value={submittedData.lastName}
                                    onChange={() => { }}
                                    type='text'
                                    placeHolder={t("firstName")}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
                                    {t("email")}
                                </label>
                                <CustomInput
                                    disabled
                                    type='email'
                                    name='email'
                                    onChange={() => { }}
                                    value={submittedData.email}
                                    placeHolder={t("email")}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
                                    {t("phone_number")}
                                </label>
                                <CustomInput
                                    disabled
                                    type='text'
                                    name='phone'
                                    onChange={() => { }}
                                    value={submittedData.phone}
                                    placeHolder={t("phone_number")}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
                                    {t("yoe")}
                                </label>
                                <CustomInput
                                    disabled
                                    name='yoe'
                                    type='number'
                                    placeHolder={t("yoe")}
                                    onChange={() => { }}
                                    value={submittedData.yoe}
                                />
                            </div>
                            <div>
                                <ItemSelector
                                    label={t("skills")}
                                    selectedItems={submittedData.skills}
                                    availableItems={[]}
                                    onChange={() => { }}
                                />
                            </div>
                        </div>
                    </div>}
                </div>
            </div> : <div className='w-full h-full flex justify-center items-center'><Loading size='full' /></div>}
        </div>
    );
};