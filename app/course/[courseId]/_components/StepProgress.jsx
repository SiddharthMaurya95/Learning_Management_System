import { Button } from '@/components/ui/button';
import React from 'react';
export default function StepProgress({ data, stepCount, setStepCount }) {
  return (
    <div className='flex gap-5 items-center'>
      {stepCount !== 0 && (
        <Button variant='outline' size='sm' onClick={() => setStepCount(stepCount - 1)}>
          Previous
        </Button>
      )}
      {data?.map((item, index) => (
        <div
          key={index}
          className={`w-full h-2 rounded-full ${index <= stepCount ? 'bg-green-500' : 'bg-gray-200 '}`}
        ></div>
      ))}
      {stepCount <data.length && (
        <Button variant='outline' size='sm' onClick={() => setStepCount(stepCount + 1)}>
          Next
        </Button>
      )}
    </div>
  );
}