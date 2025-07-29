// import { Badge } from '@mui/material'
import React from 'react'
import { Badge } from '../../../components/ui/badge'

const data=[
  "Price",
  "Rating",
  "Category",
  "Brand"
]
export default function Filtering() {
  return (
    <div className='flex  justify-center items-center flex-wrap gap-6' >
     
{
  data.map((item,index)=>{
    return (
      <Badge className='py-1 px-2 ' key={index}>
        {item}
      </Badge>
    )
  })
}
    </div>
  )
}
