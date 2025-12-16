import { db } from '@/lib/db';
import { BookingForm } from './booking-form';
import { MapPin, Phone, Mail, Star, Clock } from 'lucide-react'; // Import Icons

export default async function BookingPage() {
  const services = await db.service.findMany();

  return (
    <div className="min-h-screen bg-white">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* LEFT COLUMN: Business Info & Reviews */}
        <div className="space-y-12">
          
          {/* Header & Contact */}
          <div>
            <h1 className="text-5xl font-extrabold text-black tracking-tight mb-6">SYX Barber.</h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Experience the best grooming service in town. Professional cuts, 
              relaxing atmosphere, and premium products.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-800">
                <div className="bg-gray-100 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="font-bold">Visit Us</p>
                  <p className="text-gray-600">123 Rue Didouche Mourad, Algiers</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-800">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="font-bold">Call Us</p>
                  <p className="text-gray-600">+213 555 000 000</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-800">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <p className="text-gray-600">booking@portfoliobarber.com</p>
                </div>
              </div>
              
               <div className="flex items-center gap-4 text-gray-800">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="font-bold">Working Hours</p>
                  <p className="text-gray-600">Mon - Sat: 9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t pt-10">
            <h3 className="text-2xl font-bold text-black mb-6">Recent Reviews from google maps</h3>
            <div className="space-y-6">
              
              {/* Review 1 */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-700 italic">"Best fade I've had in years!"</p>
                <p className="text-sm font-bold mt-4 text-gray-900">- Ahmed K.</p>
              </div>

              {/* Review 2 */}
              <div className="bg-gray-50 p-6 rounded-xl">
                 <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-700 italic">"Very professional service."</p>
                <p className="text-sm font-bold mt-4 text-gray-900">- Sarah M.</p>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Form */}
        <div className="bg-white p-8 lg:p-10 rounded-3xl border border-gray-200 shadow-2xl sticky top-10">
          <div className="mb-8">
             <h2 className="text-2xl font-bold text-black">Book Appointment</h2>
             <p className="text-gray-500">Select a service and time below.</p>
          </div>
          
          <BookingForm services={services} />
        </div>

      </div>
    </div>
  );
}
