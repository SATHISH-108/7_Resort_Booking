"use server";

import DBConnection from "../utils/configure/db";
import { auth } from "../auth";
import UserModel from "../utils/models/user";
import BookingModel from "../utils/models/booking";
const bookingAction = async (bookingDetails) => {
  const session = await auth();
  console.log("email_check", session);
  //   email_check {
  //     user: { name: 'harish', email: 'harish@gmail.com' },expires: '2025-03-24T18:24:52.487Z',
  //     userId: '67b8c1389c25fe645f70fa81', username: 'harish', role: 'user', email: 'harish@gmail.com'
  //   }
  try {
    await DBConnection();
    console.log("bookingDetails", bookingDetails);
    //   bookingDetails {
    //     record: {
    //       _id: '67b88a3a8883db74cdf8c1df', title: 'luxury room', description: 'jhcjkmkskld',
    //       price: 4000, offer: '10', image: '/uploads/1_suite-hotels.jpg',
    //       amenitie: [  'Ac',   'Greyser',  'Tv', 'Wi-Fi', 'Elevator','Break-fast',  'swimming pool'],
    //     },
    //     selectedDates: { startDate: '2/23/2025', endDate: '2/28/2025' }
    // }

    const user = await UserModel.findOne({ email: session.email });
    //database loni email ni session.email tho match (compare) chesthunnam.
    console.log("BookingAction_user", user);
    //aa user name tho book ainaa bookings and user details vosthayi.
    // {
    //   _id: new ObjectId('67ba3854c5ba4f01ed5b29a0'), username: 'harish', email: 'harish@gmail.com',
    //   password: 'Harish@', role: 'user',
    //   bookings: [
    //     new ObjectId('67ba3a30c5ba4f01ed5b29c4'),
    //     new ObjectId('67ba3a4dc5ba4f01ed5b29cc')
    //   ],
    //   createdAt: 2025-02-22T20:49:24.478Z,
    //   updatedAt: 2025-02-22T20:57:49.985Z,
    //   __v: 0
    // }

    if (!user) {
      return { success: false, message: "user not found" };
    }
    const userId = user._id.toString();
    console.log("booking check", bookingDetails);

    //{
    //   record: {
    //     _id: '67ba3649c5ba4f01ed5b298f',   title: 'Business Stay',
    //     description: "The Business Stay Room at our resort is designed for professionals seeking comfort and convenience. This modern room features a plush bed, a spacious work desk, high-speed Wi-Fi, and a flat-screen TV. The room includes a private bathroom with premium toiletries, ensuring a refreshing experience. Guests can also enjoy complimentary coffee and tea facilities. Ideal for business travelers, the room offers a quiet environment for work and relaxation, with easy access to the resort's business center and other amenities, making it perfect for a productive stay.\r\n",
    //     price: 2200,  offer: '10',image: '/uploads/2_Suite-Living-Room.webp',
    //     amenitie: ['Ac',  'Greyser','Tv','Wi-Fi','Elevator',   'Break-fast', 'Projector']
    //}
    //   selectedDates: { startDate: '2/24/2025', endDate: '2/26/2025' }
    // }

    const userBookingDetails = await BookingModel.create({
      startDate: bookingDetails.selectedDates.startDate,
      endDate: bookingDetails.selectedDates.endDate,
      productName: bookingDetails.record.title,
      price: bookingDetails.record.price,
      offer: bookingDetails.record.offer,
      image: bookingDetails.record.image,
    });
    console.log("from_BookingActions  userBookingDetails", userBookingDetails);

    // { startDate: '2/18/2025',  endDate: '2/26/2025',productName: '3 Bed Family Comfort',
    //   price: '2500',offer: '10', image: '/uploads/3_image.jpg',
    //   _id: new ObjectId('67bb2c81b0abf56fdb9a84e5'),
    // }

    await UserModel.findByIdAndUpdate(
      userId,
      { $push: { bookings: userBookingDetails._id } },
      { new: true }
    );
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to create booking" };
  }
};
export default bookingAction;
