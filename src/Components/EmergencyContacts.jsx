import React from 'react'
import Contact from './Contact';

const EmergencyContacts = () => {
    const contacts = [
        { id: 1, name: "Sarah Johnson", phone: "(555) 123-4567" },
        { id: 2, name: "Mark Davis", phone: "(555) 987-6543" },
        { id: 3, name: "Emily Smith", phone: "(555) 246-8013" },
        { id: 4, name: "Michael Brown", phone: "(555) 369-2584" },
        { id: 5, name: "Jessica Wilson", phone: "(555) 785-6321" },
        { id: 6, name: "David Martinez", phone: "(555) 147-8523" },
        { id: 7, name: "Jennifer Taylor", phone: "(555) 369-7412" },
        { id: 8, name: "Christopher Anderson", phone: "(555) 582-9641" },
        { id: 9, name: "Amanda Thomas", phone: "(555) 824-1357" },
        { id: 10, name: "James Garcia", phone: "(555) 639-7418" },
        { id: 11, name: "Ashley Hernandez", phone: "(555) 213-5874" },
        { id: 12, name: "Daniel Lopez", phone: "(555) 978-6541" },
        { id: 13, name: "Rachel Lee", phone: "(555) 321-9876" },
        { id: 14, name: "Matthew Clark", phone: "(555) 456-7890" },
        { id: 15, name: "Samantha Rodriguez", phone: "(555) 852-3694" }
    ];

    console.log(contacts);

    console.log(contacts);

    return (
        <>

            <div className=" bg-accent text-white  rounded-xl h-[35em] overflow-y-auto mb-10">

                <div className="heading text-center text-2xl font-bold bg-accent sticky top-0 py-2 rounded-xl">
                    Emergency Contacts
                </div>

                {
                    contacts.map(contact => (
                        <Contact
                            key={contact.id}
                            name={contact.name}
                            phone={contact.phone}
                        />
                    ))
                }
                <div className="bottom bg-accent sticky bottom-0 py-1 mb-3">
                    <div className="divider">Add A Contact</div>
                    <div className="action flex justify-center  gap-2">
                        <label className="input input-bordered text-primary flex items-center ">
                            Phone
                            <input required type="number" className="grow" placeholder="  8887776665" />
                        </label>

                        <button className=' btn btn-neutral font-semibold  text-lg'>
                            Add Contact
                        </button>
                    </div>
                </div>


            </div>

        </>
    )
}

export default EmergencyContacts