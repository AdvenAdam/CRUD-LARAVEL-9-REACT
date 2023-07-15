import NewsList from '@/Components/HomePage/NewsList';
import Paginate from '@/Components/HomePage/Paginate';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { router, Link } from '@inertiajs/react'
import { useEffect, useState } from 'react';

export default function Dashboard(props) {
    const listData = props.myNewsLists
    const updatedData = props.myNews
    const init = {
        title: '',
        description: '',
        category: ''
    }

    const [data, setData] = useState({ init })
    const [isNotif, setIsNotif] = useState(false)

    const handleSubmit = () => {
        if (listData) {
            router.post('/news', data)
        } else if (updatedData) {
            router.post('/news/update', data)
        }
        // reset form
        setData(init)
        // notification show 
        setIsNotif(true)
        setTimeout(() => {
            setIsNotif(false)
        }, 3000)
    }

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        // cek if data come from edit 
        if (updatedData) {
            setData({
                title: updatedData.title,
                description: updatedData.description,
                category: updatedData.category,
                id: updatedData?.id
            })
        }
    }, [updatedData])


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{props.header}</h2>}
        >
            <Head title={props.header} />
            <div className="py-12">
                {/* form for input & edit data */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-10">
                    <div className="p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {isNotif && props.flash.message &&
                            <div className="alert alert-success">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{props.flash.message}</span>
                            </div>
                        }
                        <input
                            type="text"
                            name='title'
                            placeholder="Title"
                            className="m-2 p-2 input input-bordered input-info w-full max-w-x"
                            value={data?.title}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name='category'
                            placeholder="Category"
                            className="m-2 p-2 input input-bordered input-info w-full max-w-x"
                            value={data?.category}
                            onChange={handleChange}
                        />
                        <textarea
                            className="textarea textarea-md textarea-info w-full max-w-x m-2 mb-2"
                            name='description'
                            placeholder="Description"
                            value={data?.description}
                            onChange={handleChange}
                        /><br />
                        {
                            updatedData &&
                            <Link href={route('dashboard')} method="get" as="button">
                                <a
                                    className='btn btn-secondary m-2'
                                >
                                    Back
                                </a>
                            </Link>
                        }
                        <button
                            className='btn btn-primary m-2'
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </button>
                    </div>
                </div>
                {/* card of user's news */}
                {listData &&
                    <div className='flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-4 p-4'>
                        <div className='flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch 
                         items-center gap-4 p-4'>
                            <NewsList News={listData.data} isDashboard={true} />
                        </div>
                        {listData.data.length > 3 && (
                            <div className='flex justify-center items-center'>
                                <Paginate meta={listData.meta} />
                            </div>
                        )}
                    </div>
                }
            </div>
        </AuthenticatedLayout >
    );
}
