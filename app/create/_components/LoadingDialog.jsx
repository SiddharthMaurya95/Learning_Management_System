import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'
function LoadingDialog({loading}) {
  return (
      <AlertDialog open={loading}>
 
  <AlertDialogContent className='bg-white'>
    <AlertDialogTitle></AlertDialogTitle>
        <div className='flex flex-col items-center py-10'>
            <Image alt='loading' src={'/loader.gif'} width={100} height={100}></Image>
            please wait... AI working on your course
        </div>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default LoadingDialog
