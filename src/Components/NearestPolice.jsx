import React from 'react'
import Station from './Station';

const policeStations = [
    {
      id: 1,
      name: "Police Station PS Haibowal",
      longitude: 30.923941,
      latitude: 75.806293,
      contactNumber: "9592914733",
      address: "Near Pani di tanki, Corporation Park"
    },
    {
      id: 2,
      name: "Police Station PS Daresi",
      longitude: 30.923665,
      latitude: 75.867007,
      contactNumber: "0161-2750078",
      address: "Daresi Road, Near Daresi Ground"
    },
    {
      id: 3,
      name: "Police Station PS Division No. 1 (Kotwali)",
      longitude: 30.972486,
      latitude: 75.842512,
      contactNumber: "0161-2555703",
      address: "Chaura Bazar, Near Clock Tower"
    },
    {
      id: 4,
      name: "Police Station PS N.R.I.",
      longitude: 30.902737,
      latitude: 75.892467,
      contactNumber: "01612413888",
      address: "CPRC Building, CP Complex"
    },
    {
      id: 5,
      name: "Police Station Division No. 2",
      longitude: 30.908495,
      latitude: 75.858659,
      contactNumber: "0161-2555704",
      address: "Near Civil Hospital, Old Jail Road"
    },
    {
      id: 6,
      name: "Police Station PS Division No. 3",
      longitude: 30.915645,
      latitude: 75.862345,
      contactNumber: "0161-2555705",
      address: "Near Vashno Devi Chowk"
    },
    {
      id: 7,
      name: "Police Station PS Division No. 4",
      longitude: 31.326944,
      latitude: 75.575125,
      contactNumber: "9592914725",
      address: "Near Durga Mata Mandir"
    },
    {
      id: 8,
      name: "Police Station PS Division No. 6 (Dholewal)",
      longitude: 30.893904,
      latitude: 75.871258,
      contactNumber: "0161-2555299",
      address: "Near Dholewal Chowk"
    },
    {
      id: 9,
      name: "Police Station PS Ladhowal",
      longitude: 30.978987,
      latitude: 75.792956,
      contactNumber: "9592914739",
      address: "G.T. Road, Ladhowal Chowk"
    },
    {
      id: 10,
      name: "Police Station PS Division No. 7 (Vardhman)",
      longitude: 31.287561,
      latitude: 75.596223,
      contactNumber: "0161-2555697",
      address: "Near Vardhman Mill"
    },
    {
      id: 11,
      name: "Police Station PS Koom Kalan",
      longitude: 30.916439,
      latitude: 76.066396,
      contactNumber: "0161-2832273",
      address: "Near Gurdwara, Koom Kalan, Ludhiana -141126"
    },
    {
      id: 12,
      name: "Police Station PS Division No. 8",
      longitude: 30.914539,
      latitude: 75.843673,
      contactNumber: "0161-2414944",
      address: "Near Iqbal Nursing, Sadar Quarter"
    },
    {
      id: 13,
      name: "Police Station PS DUGRI",
      longitude: 30.868306,
      latitude: 75.843005,
      contactNumber: "9592914776",
      address: "Near MD School, MIG Flats"
    }
  ];
    

const NearestPolice = () => {
  return (
    <>
    
    

            <div className=" bg-accent text-white  rounded-xl h-[35em] overflow-y-auto mb-10">

                <div className="heading text-center text-2xl font-bold bg-accent sticky top-0 py-2 rounded-xl">
                   Nearest Police Stations
                </div>

                {
                    policeStations.map(station => (
                        <Station
                            key={station.id}
                            name={station.name}
                            phone={station.contactNumber}
                            address={station.address}
                        />
                    ))
                }
               
            </div>

        </>
    
  )
}

export default NearestPolice