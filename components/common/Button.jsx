import React from 'react'

const Button = ({text,clickHandler}) => {
  return (
    <div>
      <button onClick={clickHandler} className='bg-blue-200 text-richblack-900 px-4 py-2 rounded-md font-semibold hover:bg-blue-100 transition duration-200'>
        {text}
      </button>
    </div>
  )
}

export default Button
