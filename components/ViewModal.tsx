import React, { useEffect, useState } from "react";
import { Modal } from "antd/lib";

interface ModuleModalProps {
    isOpen: boolean;
    closeModal: () => void;
    id: any;
    data: any;
    setData: any;
}

interface FormDataProps {
    id: number
    title: string
    desc: string
    isActive: boolean
    date: any
}

const ViewModal = ({
    isOpen,
    closeModal,
    id,
    data,
    setData
}: ModuleModalProps) => {

    // console.log("rendering view")

    const [editable, setEditable] = useState<boolean>(false);

    const getFormattedDate = () => {

        const currentDate = new Date();

        const day = String(currentDate.getDate());
        const month = String(currentDate.getMonth() + 1);
        const year = currentDate.getFullYear();

        const formattedDate = `${month}/${day}/${year}`;

        return formattedDate;

    }

    const currentTimeInMs = Date.now();

    const [formData, setFormData] = useState<FormDataProps>({
        id: currentTimeInMs,
        title: "",
        desc: "",
        isActive: true,
        date: getFormattedDate()
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };

    const handleEdit = () => {

        const newData = data.map((task: any) => task.id === id ? { ...task, title: formData.title, desc: formData.desc } : task)
        setData(newData)

    }

    useEffect(() => {

        const task = data.find((task: any) => task.id === id)

        if (task) {
            setFormData(task)
        }

    }, [id, data])

    return (
        <Modal
            open={isOpen}
            onCancel={closeModal}
            footer={null}
            closeIcon={null}
            centered
            width={600}
            styles={{ content: { backgroundColor: "#27272a", borderRadius: "20px" } }
            }

        >
            <div className="w-full flex flex-col items-center justify-between gap-6 py-5 sm:px-5 text-zinc-200 text-base">

                <div className="w-full flex flex-col gap-3">
                    <label htmlFor="title" className="pl-1 text-lg">Title</label>
                    <input value={formData.title} disabled={!editable} onChange={handleChange} type="text" name="title" id="title" placeholder="Title" className={`w-full outline-none py-3 px-6  rounded-xl ${editable ? 'bg-zinc-700 text-white' : 'bg-zinc-900'}`} maxLength={16} />
                </div>

                <div className="w-full flex flex-col gap-3">
                    <label htmlFor="desc" className="pl-1 text-lg">Description</label>
                    <textarea rows={5} value={formData.desc} disabled={!editable} onChange={handleChange} id="desc" name="desc" placeholder="Description" className={`w-full outline-none py-3 px-6 resize-none no-scrollbar rounded-xl ${editable ? 'bg-zinc-700 text-white' : 'bg-zinc-900'}`} />
                </div>

                <div className="w-full flex justify-between gap-5 items-center my-4">

                    <button onClick={closeModal} className="py-3 px-8 rounded-lg border-2 border-gray-700 hover:bg-gray-700 transition">Close</button>

                    <button className="py-3 px-8 rounded-lg bg-gray-600 hover:bg-gray-700 transition"
                        onClick={() => { if (!editable) { setEditable(true) } else if (editable) { handleEdit(); setEditable(false); closeModal() } }}>
                        {editable && <span>Save</span>}
                        {!editable && <span>Edit</span>}
                    </button>

                </div>

            </div>

        </Modal >
    );

};

export default ViewModal;
