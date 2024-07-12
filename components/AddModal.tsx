import React, { useEffect, useState } from "react";
import { Modal } from "antd/lib";
import { styleText } from "util";

interface ModuleModalProps {
    isOpen: boolean;
    closeModal: () => void;
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

const AddModal = ({
    isOpen,
    closeModal,
    data,
    setData
}: ModuleModalProps) => {

    const getFormattedDate = () => {

        const currentDate = new Date();

        const day = String(currentDate.getDate());
        const month = String(currentDate.getMonth() + 1);
        const year = currentDate.getFullYear();

        const formattedDate = `${month}/${day}/${year}`;

        return formattedDate;

    }

    const currentTimeInMs = Date.now();
    getFormattedDate()

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

        // console.log(formData)

    };

    const handleSubmit = async () => {

        setData([...data, formData])
        console.log(data)
        closeModal()

    }

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
                    <input value={formData.title} onChange={handleChange} type="text" name="title" id="title" placeholder="Title" className="w-full outline-none py-3 px-6 bg-zinc-700 rounded-xl" maxLength={16} />
                </div>

                <div className="w-full flex flex-col gap-3">
                    <label htmlFor="desc" className="pl-1 text-lg">Description</label>
                    <textarea value={formData.desc} onChange={handleChange} id="desc" name="desc" placeholder="Description" className="w-full outline-none py-3 px-6 bg-zinc-700 rounded-xl resize-none no-scrollbar" />
                </div>

                <div className="w-full flex justify-end gap-5 items-center my-4">

                    <button onClick={closeModal} className="py-3 px-8 rounded-lg border-2 border-gray-700 hover:bg-gray-700 transition">Close</button>

                    <button onClick={handleSubmit} className="py-3 px-8 rounded-lg bg-gray-600 hover:bg-gray-700 transition">Save</button>

                </div>

            </div>

        </Modal >
    );

};

export default AddModal;
