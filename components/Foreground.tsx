"use client"

import React, { useEffect, useRef, useState } from 'react'
import { TiPlus } from "react-icons/ti";
import AddModal from './AddModal';
import { sampleData } from '@/data/SampleData';
import Card from './Card';


export default function Foreground() {

    // console.log("rendering foreground")

    const [data, setData] = useState<any>([])

    const [addModalStatus, setAddModalStatus] = useState<boolean>(false);

    const ref = useRef(null)

    useEffect(() => {

        const oldData = localStorage.getItem('docsData') as any

        const gotOldData = JSON.parse(oldData)

        // console.log(gotOldData?.length, gotOldData)

        if (gotOldData?.length > 0) {
            // console.log("inside if")
            // console.log(gotOldData)
            setData(gotOldData)
        } else {
            // console.log("inside else")
            setData(sampleData)
        }

    }, [])

    const saveToLS = () => {
        const stringifiedData = JSON.stringify(data)
        localStorage.setItem('docsData', stringifiedData)
    }

    useEffect(() => {
        // console.log("data is: ", data)
        saveToLS();
    }, [data])



    return (

        <div ref={ref} className='relative z-0 w-full p-4 sm:p-12 flex flex-wrap items-start gap-x-12 select-none h-screen overflow-y-auto overflow-x-hidden no-scrollbar'>

            {data.map((task: any, index: any) => {
                return (<div key={index}>
                    <Card task={task} reference={ref} data={data} setData={setData} />
                </div>)
            }
            )}

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