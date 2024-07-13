import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaRegFileLines } from 'react-icons/fa6'
import { RxCross2 } from 'react-icons/rx';
import ViewModal from './ViewModal';

function Card({ task, reference, data, setData }: any) {

    const replaceNewLines = (str: string) => {
        return str.split('\n').join('<br />');
    };

    const handleDelete = (id: any) => {
        setData(data.filter((task: any) => task.id !== id))
    }

    const handleActive = (id: any) => {
        const newData = data.map((task: any) => task.id === id ? { ...task, isActive: !task.isActive } : task)
        setData(newData)
    }

    const [viewModalStatus, setViewModalStatus] = useState<boolean>(false)

    return (
        <motion.div drag dragConstraints={reference} whileDrag={{ scale: "1.05" }} dragElastic={100} draggable className='bg-zinc-900 rounded-[50px] overflow-hidden flex flex-col w-60 h-72 transition' >

            <div className='p-7 pb-0 text-white flex items-center truncate gap-3'>

                <FaRegFileLines color='white' />

                <span className='font-medium'>{task.title}</span>

            </div>

            <div onClick={() => { setViewModalStatus(true) }} className='flex-grow px-6 py-7 line-clamp-3  text-white'>

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


            {
                viewModalStatus && <ViewModal
                    isOpen={viewModalStatus}
                    closeModal={() => { setViewModalStatus(false); }}
                    id={task.id}
                    data={data}
                    setData={setData}
                />
            }

        </motion.div>
    )
}

export default Card