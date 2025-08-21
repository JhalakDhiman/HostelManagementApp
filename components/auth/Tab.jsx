import React from 'react'

const Tab = ({tabData,setAccountType,accountType}) => {
  return (
    <div className="flex rounded-full my-3 gap-2 text-[16px] p-1 bg-richblack-700 w-fit text-richblack-200">
      {
        tabData.map((tab,index)=>(
          <div key={index} onClick={()=>setAccountType(tab.type)} className={`${accountType===tab.type ? "bg-richblack-900 text-richblack-5" : ""} px-4 py-2 rounded-full cursor-pointer`}>
            {tab.name}
          </div>
        ))
      }
    </div>
  )
}

export default Tab
