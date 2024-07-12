"use client"

import React, { useEffect, useRef, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { FaRegFileLines } from "react-icons/fa6";
import { TiPlus } from "react-icons/ti";
import AddModal from './AddModal';
import { motion } from 'framer-motion';


export default function Foreground() {

    const sampleData = [

        {
            id: 1,
            title: "My Usernames",
            desc: "Github: john_95 \n Linkedin: john69",
            isActive: true,
            date: "7/1/2024"
        },

        {
            id: 2,
            title: "To-Do List",
            desc: "Cook food \n Go to market",
            isActive: false,
            date: "7/5/2024"
        },

    ];

    const [data, setData] = useState<any>([])

    useEffect(() => {

        const oldData = localStorage.getItem('docsData') as any

        const gotOldData = JSON.parse(oldData)

        console.log(gotOldData?.length, gotOldData)

        if (gotOldData?.length > 0) {
            console.log("inside if")
            console.log(gotOldData)
            setData(gotOldData)
        } else {
            console.log("inside else")
            setData(sampleData)
        }

    }, [])

    useEffect(() => {
        console.log("data is: ", data)
        saveToLS()
    }, [data])

    const [addModalStatus, setAddModalStatus] = useState<boolean>(false);

    const saveToLS = () => {
        const stringifiedData = JSON.stringify(data)
        localStorage.setItem('docsData', stringifiedData)
    }

    const replaceNewLines = (str: string) => {
        return str.split('\n').join('<br />');
    };

    const handleDelete = (id: any) => {
        setData(data.filter((task: any) => task.id !== id))
    }

    const handleActive = (id: any) => {
        setData(data.map((task: any) => task.id === id ? { ...task, isActive: !task.isActive } : task))
    }

    const ref = useRef(null)

    return (

        <div ref={ref} className='relative z-0 w-full p-4 sm:p-12 flex flex-wrap items-start gap-12 select-none h-screen overflow-auto no-scrollbar'>

            {data.map((task: any, index: any) => {

                return (<motion.div drag dragConstraints={ref} whileDrag={{ scale: "1.1" }} dragElastic={100} draggable key={index} className='bg-zinc-900 rounded-[50px] overflow-hidden flex flex-col w-60 h-72 transition' >

                    <div className='p-7 pb-0 text-white flex items-center truncate gap-3'>

                        <FaRegFileLines color='white' />

                        <span className='font-medium'>{task.title}</span>

                    </div>

                    <div className='flex-grow px-6 py-7 line-clamp-3  text-white'>

                        <div dangerouslySetInnerHTML={{ __html: replaceNewLines(task.desc) }} />

                    </div>

                    <div className='w-full flex items-center justify-between p-5 pt-6 text-white'>

                        <div className='text-xs opacity-60 tracking-widest'>{task.date}</div>

                        <button className='bg-zinc-600 rounded-full p-1.5 hover:scale-110 transition' onClick={() => handleDelete(task.id)}>
                            <RxCross2 size={12} />
                        </button>

                    </div>

                    <button onClick={() => { handleActive(task.id) }} className={`h-12 text-white flex items-center justify-center text-sm transition font-medium ${task.isActive ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600  hover:bg-red-700 hover:text-gray-200'} `}>

                        {task.isActive ? 'Active' : 'Inactive'}

                    </button>

                </motion.div>
                )
            })}

            <button onClick={() => { setAddModalStatus(true) }} className='fixed z-50 bottom-10 right-10 text-white bg-zinc-600 py-4 px-10 rounded-full flex items-center gap-2 font-medium hover:scale-105 transition'>
                <span>Add</span>
                <TiPlus size={22} />
            </button>

            {
                addModalStatus && <AddModal
                    isOpen={addModalStatus}
                    closeModal={() => { setAddModalStatus(false); }}
                    data={data}
                    setData={setData}
                />
            }

        </div >
    )
}