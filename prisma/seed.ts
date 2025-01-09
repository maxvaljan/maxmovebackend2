import { PrismaClient, UserType, VehicleType, DriverStatus, OrderStatus, PaymentMethod, PaymentStatus, NotificationType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const customer = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      password: "securepassword",
      user_type: UserType.customer,
      profile_picture: null,
    },
  });

  const driverUser = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "0987654321",
      password: "securepassword",
      user_type: UserType.driver,
      profile_picture: null,
    },
  });

  // Seed Driver
  const driver = await prisma.driver.create({
    data: {
      id: driverUser.id,
      vehicle_type: VehicleType.car,
      vehicle_number: "XYZ1234",
      status: DriverStatus.available,
      latitude: 40.7128,
      longitude: -74.0060,
      rating: 4.5,
    },
  });

  // Seed Orders
  const order = await prisma.order.create({
    data: {
      customer_id: customer.id,
      driver_id: driver.id,
      pickup_address: "123 Pickup St",
      dropoff_address: "456 Dropoff Ave",
      pickup_latitude: 40.73061,
      pickup_longitude: -73.935242,
      dropoff_latitude: 40.650002,
      dropoff_longitude: -73.949997,
      status: OrderStatus.pending,
      price: 25.5,
    },
  });

  // Seed Payment
  const payment = await prisma.payment.create({
    data: {
      order_id: order.id,
      amount: 25.5,
      payment_method: PaymentMethod.card,
      status: PaymentStatus.completed,
    },
  });

  // Seed Ratings
  await prisma.rating.create({
    data: {
      order_id: order.id,
      rater_id: customer.id,
      ratee_id: driverUser.id,
      rating: 5,
      comments: "Great service!",
    },
  });

  // Seed Location
  await prisma.location.create({
    data: {
      user_id: customer.id,
      address: "123 Main St",
      latitude: 40.73061,
      longitude: -73.935242,
      label: "Home",
    },
  });

  // Seed Notification
  await prisma.notification.create({
    data: {
      user_id: customer.id,
      type: NotificationType.order_update,
      message: "Your order is on the way!",
    },
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
