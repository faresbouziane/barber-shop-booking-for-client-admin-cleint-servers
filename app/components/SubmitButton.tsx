// app/components/SubmitButton.tsx
'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      disabled={pending}
      // Added 'cursor-pointer' to the enabled state
      // Added 'cursor-not-allowed' to the pending state
      className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white transition-all
        ${pending ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 hover:scale-[1.02] cursor-pointer'}`}
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Processing...
        </span>
      ) : (
        'Confirm Booking'
      )}
    </button>
  )
}