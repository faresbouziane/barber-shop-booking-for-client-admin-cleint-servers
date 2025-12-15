'use client'

import { useActionState } from 'react'; // <--- CHANGED THIS IMPORT
import { createBooking } from '../actions';
import { SubmitButton } from '../components/SubmitButton';

const initialState = {
  message: '',
}

export function BookingForm({ services }: { services: any[] }) {
  // <--- CHANGED HOOK NAME BELOW
  const [state, formAction] = useActionState(createBooking, initialState);

  return (
    <form action={formAction} className="space-y-6">
      
      {/* Success/Error Message Box */}
      {state.message && (
        <div className={`p-4 rounded-lg text-sm font-bold ${
          state.message.includes('Successful') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {state.message}
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-gray-900 mb-1">Your Name</label>
        <input required name="customerName" type="text" placeholder="John Doe" 
          className="block w-full px-3 py-3 border border-gray-400 rounded-lg text-black focus:ring-2 focus:ring-black" />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-900 mb-1">Email Address</label>
        <input required name="email" type="email" placeholder="john@example.com" 
          className="block w-full px-3 py-3 border border-gray-400 rounded-lg text-black focus:ring-2 focus:ring-black" />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-900 mb-1">Pick a Date</label>
        <input required name="date" type="date" 
          className="block w-full px-3 py-3 border border-gray-400 rounded-lg text-black focus:ring-2 focus:ring-black" />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-900 mb-1">Select Service</label>
        <select name="serviceId" className="block w-full px-3 py-3 border border-gray-400 rounded-lg text-black bg-white focus:ring-2 focus:ring-black">
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} - ${s.price / 100}
            </option>
          ))}
        </select>
      </div>

      <SubmitButton />
    </form>
  );
}