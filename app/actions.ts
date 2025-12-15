'use server'

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Define the Testing Email (Your real email)
// In a real app with a domain, you wouldn't need this constant.
const TEST_EMAIL = 'faresbouzain@gmail.com';

const BookingSchema = z.object({
  customerName: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  date: z.string().refine((date) => new Date(date) > new Date(), {
    message: "Cannot book a date in the past",
  }),
  serviceId: z.string(),
});

export async function createBooking(prevState: any, formData: FormData) {
  const rawData = {
    customerName: formData.get('customerName'),
    email: formData.get('email'),
    date: formData.get('date'),
    serviceId: formData.get('serviceId'),
  };

  const result = BookingSchema.safeParse(rawData);

  if (!result.success) {
    return { message: "Validation Failed: You cannot book a date in the past." };
  }

  const data = result.data;
  
  const user = await db.user.findUnique({
    where: { email: 'demo@portfolio.com' }
  });

  if (!user) return { message: "Database Error: User not found." };

  await db.booking.create({
    data: {
      customerName: data.customerName,
      customerEmail: data.email,
      date: new Date(data.date),
      serviceId: data.serviceId,
      userId: user.id,
      status: 'PENDING'
    }
  });

  // --- EMAIL 1: NOTIFY BARBER ---
  try {
    await resend.emails.send({
      from: 'alert@resend.dev',
      to: TEST_EMAIL, // <--- Sending to YOU (acting as Barber)
      subject: 'New Booking Request!',
      html: `
        <h1>New Appointment Request</h1>
        <p><strong>Customer:</strong> ${data.customerName}</p>
        <p><strong>Customer Email:</strong> ${data.email}</p>
        <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
        <p><em>(Sent to ${TEST_EMAIL} for testing purposes)</em></p>
      `
    });
  } catch (error) {
    console.log("Barber notification email failed:", error);
  }

  revalidatePath('/');
  return { message: "Booking Request Sent! You will receive a confirmation email shortly." };
}

export async function updateStatus(formData: FormData) {
  const bookingId = formData.get('bookingId') as string;
  const status = formData.get('status') as string;

  const updatedBooking = await db.booking.update({
    where: { id: bookingId },
    data: { status: status }
  });

  // --- EMAIL 2: NOTIFY CUSTOMER ---
  try {
    await resend.emails.send({
      from: 'confirmation@resend.dev',
      to: TEST_EMAIL, // <--- Sending to YOU (acting as Customer)
      subject: `Your Booking has been ${status}`,
      html: `
        <h1>Booking Status Update</h1>
        <p>Hi ${updatedBooking.customerName},</p>
        <p>Your appointment for <strong>${updatedBooking.date.toLocaleDateString()}</strong> has been <strong>${status}</strong>.</p>
        <p>Original Customer Email: ${updatedBooking.customerEmail}</p>
        <p><em>(This email was redirected to ${TEST_EMAIL} because this is a Demo App)</em></p>
      `
    });
  } catch (error) {
    console.log("Customer confirmation email failed:", error);
  }

  revalidatePath('/');
}
// ... existing imports

export async function deleteBooking(formData: FormData) {
  const bookingId = formData.get('bookingId') as string;

  await db.booking.delete({
    where: { id: bookingId }
  });

  revalidatePath('/');
}