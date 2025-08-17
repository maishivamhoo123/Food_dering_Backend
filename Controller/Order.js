const Order = require("../Schema/OrderSchema");
const Partner = require("../Schema/DeliveryPartner");

// ✅ Get all pending orders (no food details)
async function GetPendingOrders(req, res) {
  try {
    const orders = await Order.find({ status: "pending" }).select(
      "customerName customerAddress restaurantId dropLocation status"
    );
    res.status(200).json({ msg: "Pending orders fetched", orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}

// ✅ Accept an order
async function acceptOrder(req, res) {
  try {
    const orderId = req.params.id; // fixed typo: req.parmas -> req.params
    const { partnerId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    order.status = "accepted";
    order.deliveryPartnerId = partnerId;

    await order.save();
    res.status(200).json({
      msg: "Order accepted",
      orderId: order._id,
      customerAddress: order.customerAddress,
      dropLocation: order.dropLocation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}

// ✅ Update delivery partner location (live tracking)
async function updatePartnerLocation(req, res) {
  try {
    const partnerId = req.params.id;
    const { latitude, longitude } = req.body;

    const partner = await Partner.findById(partnerId);
    if (!partner) return res.status(404).json({ msg: "Partner not found" });

    partner.currentLocation = { latitude, longitude };
    await partner.save();

    res.status(200).json({ msg: "Location updated", currentLocation: partner.currentLocation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}

// ✅ Get single order details (optional)
async function getOrderDetails(req, res) {
  try {
    const order = await Order.findById(req.params.id).select(
      "customerName customerAddress dropLocation status deliveryPartnerId"
    );
    if (!order) return res.status(404).json({ msg: "Order not found" });

    res.status(200).json({ msg: "Order details", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}
async function createOrder(req , res){
   try {
    const { foodId, customerName, customerAddress, restaurantId, dropLocation } = req.body;

    if (!customerName) {
      return res.status(400).json({ msg: "customerName is required" });
    }

    const newOrder = new Order({
      foodId,            // string ID like "F005"
      customerName,      // now required
      customerAddress,
      restaurantId,
      status: "pending",
      dropLocation
    });

    await newOrder.save();
    res.status(201).json({ msg: "Order created", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}


module.exports = {
  GetPendingOrders,
  acceptOrder,
  updatePartnerLocation,
  getOrderDetails,
  createOrder,
};
