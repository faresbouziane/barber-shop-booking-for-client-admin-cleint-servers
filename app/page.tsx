import { db } from '@/lib/db';
import { updateStatus, deleteBooking } from './actions';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server'; // Import Clerk
import { UserButton } from '@clerk/nextjs'; // The "Profile/Logout" bubble

export default async function Dashboard() {
  // 1. Get the Logged In User
  const user = await currentUser();

  // 2. Security Check: Block anyone who isn't YOU
  // REPLACE 'faresbouzain@gmail.com' WITH YOUR EXACT CLERK LOGIN EMAIL
  if (!user || user.emailAddresses[0].emailAddress !== 'faresbouzain@gmail.com') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p>You do not have permission to view this dashboard.</p>
        <UserButton />
      </div>
    );
  }

  // 3. Fetch Data (Same as before)
  const dbUser = await db.user.findUnique({
    where: { email: 'demo@portfolio.com' },
    include: {
      bookings: { orderBy: { date: 'desc' }, include: { service: true } }
    }
  });

  if (!dbUser) return <div className="p-10 text-black">Database User not found</div>;

  const now = new Date();

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - NOW WITH USER BUTTON */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-extrabold text-black tracking-tight">Barber Admin</h1>
            {/* This is the Profile Bubble that lets you Logout */}
            <UserButton />
          </div>

          <Link href="/book" target="_blank" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 shadow-md">
            View Public Booking Page ↗
          </Link>
        </div>

        {/* ... TABLE CODE STAYS EXACTLY THE SAME AS BEFORE ... */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-200 text-black uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Contact Email</th>
                <th className="px-6 py-4">Appointment Date</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dbUser.bookings.map((booking) => {
                const isPast = new Date(booking.date) < now;
                const isCancelled = booking.status === 'CANCELLED';
                const showDelete = isPast || isCancelled;

                return (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-black">{booking.customerName}</td>
                    <td className="px-6 py-4 text-blue-600 underline">
                      <a href={`mailto:${booking.customerEmail}`}>{booking.customerEmail}</a>
                    </td>
                    <td className="px-6 py-4 text-black font-medium">
                      {booking.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                      {isPast && <span className="ml-2 text-xs text-gray-500">(Past)</span>}
                    </td>
                    <td className="px-6 py-4 text-gray-800 font-medium">{booking.service.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800 border-green-200' : 
                        booking.status === 'CANCELLED' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {!isPast && booking.status === 'PENDING' && (
                        <div className="flex justify-end gap-3">
                          <form action={updateStatus}>
                            <input type="hidden" name="bookingId" value={booking.id} />
                            <input type="hidden" name="status" value="CONFIRMED" />
                            <button className="text-green-700 hover:text-green-900 font-bold border border-green-200 bg-green-50 px-3 py-1 rounded cursor-pointer">Accept</button>
                          </form>
                          <form action={updateStatus}>
                            <input type="hidden" name="bookingId" value={booking.id} />
                            <input type="hidden" name="status" value="CANCELLED" />
                            <button className="text-red-700 hover:text-red-900 font-bold border border-red-200 bg-red-50 px-3 py-1 rounded cursor-pointer">Reject</button>
                          </form>
                        </div>
                      )}
                      {showDelete && (
                        <div className="flex justify-end">
                           <form action={deleteBooking}>
                            <input type="hidden" name="bookingId" value={booking.id} />
                            <button className="text-gray-500 hover:text-red-600 font-bold underline text-xs uppercase tracking-wide cursor-pointer">
                              Delete Record
                            </button>
                          </form>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}