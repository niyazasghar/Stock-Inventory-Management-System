import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing data...');
  // Clear existing data (Order matters due to relations)
  await prisma.invoice.deleteMany();
  await prisma.purchaseOrderItem.deleteMany();
  await prisma.purchaseOrder.deleteMany();
  await prisma.salesOrderItem.deleteMany();
  await prisma.salesOrder.deleteMany();
  await prisma.stockMovement.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.warehouse.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding new data...');

  // 1. Users
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@stockops.demo',
      role: 'ADMIN',
    },
  });

  // 2. Warehouses
  const whBLR = await prisma.warehouse.create({
    data: { name: 'Bengaluru Central Warehouse', location: 'Bengaluru, KA', manager: 'Rahul M.', status: 'ACTIVE', capacity: 5000 },
  });
  const whMUM = await prisma.warehouse.create({
    data: { name: 'Mumbai South Hub', location: 'Mumbai, MH', manager: 'Sonia P.', status: 'ACTIVE', capacity: 3000 },
  });
  const whDEL = await prisma.warehouse.create({
    data: { name: 'Delhi NCR Distribution Center', location: 'Delhi, NCR', manager: 'Amit S.', status: 'NEAR_CAPACITY', capacity: 4500 },
  });

  // 3. Suppliers
  const supApex = await prisma.supplier.create({
    data: { name: 'Apex Wholesale Co.', contactPerson: 'Arun K.', email: 'orders@apex.demo', phone: '+919876543210' },
  });
  const supFresh = await prisma.supplier.create({
    data: { name: 'FreshLine Suppliers', contactPerson: 'Priya R.', email: 'supply@freshline.demo', phone: '+919876543211' },
  });
  const supBuild = await prisma.supplier.create({
    data: { name: 'BuildMax Materials', contactPerson: 'Vijay S.', email: 'sales@buildmax.demo', phone: '+919876543212' },
  });

  // 4. Customers
  const custUrban = await prisma.customer.create({
    data: { name: 'UrbanMart Retail', contactPerson: 'Nitin J.', email: 'purchasing@urbanmart.demo', phone: '+919876543213' },
  });
  const custPrime = await prisma.customer.create({
    data: { name: 'PrimeCare Supplies', contactPerson: 'Dr. Ramesh', email: 'procurement@primecare.demo', phone: '+919876543214' },
  });
  const custNova = await prisma.customer.create({
    data: { name: 'NovaStyle Commerce', contactPerson: 'Anjali V.', email: 'sourcing@novastyle.demo', phone: '+919876543215' },
  });

  // 5. Categories
  const catElectronics = await prisma.category.create({ data: { name: 'Electronics' } });
  const catGrocery = await prisma.category.create({ data: { name: 'Grocery' } });
  const catHardware = await prisma.category.create({ data: { name: 'Hardware' } });
  const catMedical = await prisma.category.create({ data: { name: 'Medical Supplies' } });

  // 6. Products
  const prodScanner = await prisma.product.create({
    data: {
      sku: 'SKU-ELEC-1042',
      name: 'Wireless Barcode Scanner',
      description: 'Handheld 2D wireless barcode scanner',
      categoryId: catElectronics.id,
      supplierId: supApex.id,
      unitPrice: 25.0,
      sellingPrice: 45.0,
      reorderLevel: 20,
    },
  });

  const prodRice = await prisma.product.create({
    data: {
      sku: 'SKU-GROC-7781',
      name: 'Organic Rice Pack',
      description: '5kg pack of organic basmati rice',
      categoryId: catGrocery.id,
      supplierId: supFresh.id,
      unitPrice: 5.0,
      sellingPrice: 12.0,
      reorderLevel: 100,
    },
  });

  const prodHandle = await prisma.product.create({
    data: {
      sku: 'SKU-HARD-4420',
      name: 'Steel Door Handle',
      description: 'Stainless steel lever door handle',
      categoryId: catHardware.id,
      supplierId: supBuild.id,
      unitPrice: 8.5,
      sellingPrice: 18.0,
      reorderLevel: 50,
    },
  });

  const prodMasks = await prisma.product.create({
    data: {
      sku: 'SKU-MED-9014',
      name: 'Medical Face Masks',
      description: 'Box of 50 3-ply surgical masks',
      categoryId: catMedical.id,
      supplierId: supApex.id,
      unitPrice: 1.5,
      sellingPrice: 4.0,
      reorderLevel: 200,
    },
  });

  // 7. Inventory
  await prisma.inventory.createMany({
    data: [
      { productId: prodScanner.id, warehouseId: whBLR.id, quantity: 45 },
      { productId: prodScanner.id, warehouseId: whMUM.id, quantity: 15 }, // low stock
      { productId: prodRice.id, warehouseId: whDEL.id, quantity: 400 },
      { productId: prodHandle.id, warehouseId: whBLR.id, quantity: 80 },
      { productId: prodHandle.id, warehouseId: whDEL.id, quantity: 20 }, // low stock
      { productId: prodMasks.id, warehouseId: whMUM.id, quantity: 500 },
    ],
  });

  // 8. Stock Movements
  await prisma.stockMovement.createMany({
    data: [
      { productId: prodScanner.id, type: 'IN', quantity: 60, destinationWarehouseId: whBLR.id, reason: 'Initial Stock' },
      { productId: prodScanner.id, type: 'TRANSFER', quantity: 15, sourceWarehouseId: whBLR.id, destinationWarehouseId: whMUM.id, reason: 'Internal transfer to Mumbai' },
      { productId: prodRice.id, type: 'IN', quantity: 400, destinationWarehouseId: whDEL.id, reason: 'Bulk Purchase' },
    ],
  });

  // 9. Purchase Orders
  const po1 = await prisma.purchaseOrder.create({
    data: {
      poNumber: 'PO-24091',
      supplierId: supApex.id,
      status: 'APPROVED',
      totalAmount: 1250.0,
      expectedDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      items: {
        create: [
          { productId: prodScanner.id, quantity: 50, unitPrice: 25.0, total: 1250.0 },
        ],
      },
    },
  });

  // 10. Sales Orders
  const so1 = await prisma.salesOrder.create({
    data: {
      soNumber: 'SO-54031',
      customerId: custUrban.id,
      status: 'PROCESSING',
      totalAmount: 900.0,
      items: {
        create: [
          { productId: prodScanner.id, quantity: 20, unitPrice: 45.0, total: 900.0 },
        ],
      },
    },
  });

  // 11. Invoices
  await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-88012',
      type: 'SALES',
      amount: 900.0,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      paymentStatus: 'PENDING',
      salesOrderId: so1.id,
    },
  });

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
