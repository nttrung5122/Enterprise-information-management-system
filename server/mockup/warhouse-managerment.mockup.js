const {
  CancellationForm,
  CancellationFormDetail,
  ReceiptDetail,
  Ingredient,
  Warehouse,
  Supplier,
  Receipt,
  ReasonCancellation,
} = require("../models");

const supplierMockupData = [
  {
    id: 401,
    name: "Nhà cung cấp 1",
    email: "email1@example.com",
    phoneNumber: "123456789",
  },
  {
    id: 402,
    name: "Nhà cung cấp 2",
    email: "email2@example.com",
    phoneNumber: "123456789",
  },
  {
    id: 403,
    name: "Nhà cung cấp 3",
    email: "email3@example.com",
    phoneNumber: "123456789",
  },
];
const ingredientMockupData = [
  {
    id: 902,
    nameIngredient: "Gà",
    unitCal: "kg",
  },
  {
    id: 903,
    nameIngredient: "Phô mai miếng",
    unitCal: "kg",
  },
  {
    id: 904,
    nameIngredient: "Khoai Tây",
    unitCal: "kg",
  },
  {
    id: 905,
    nameIngredient: "bánh hotdog",
    unitCal: "cái",
  },
  {
    id: 906,
    nameIngredient: "Xúc xích",
    unitCal: "kg",
  },
  {
    id: 907,
    nameIngredient: "Bánh hamburger",
    unitCal: "cái",
  },
  {
    id: 908,
    nameIngredient: "Thịt bò xay",
    unitCal: "kg",
  },
];

const reasonCancellationMockupData = [
  {
    id: 100,
    name: "Quá hạn/Hư hỏng",
    description:
      "Nguyên liệu hết hạn sự dụng hoặc hư hỏng trong quá trình bảo quản",
  },
  {
    id: 101,
    name: "Hao hục",
    description: "Nguyên liệu hao hục trong quá trình sản xuất",
  },
  {
    id: 102,
    name: "Khác",
    description: "Các lý do khác",
  },
];

const arrayMonthData = [1, 2, 3, 4];

const receiptTemplate = (month) => [
  {
    date: new Date(2024, month - 1, 1),
    priceTotal: 300000,
    employeeId: 100,
    supplierId: 401,
  },
  {
    date: new Date(2024, month - 1, 15),
    priceTotal: 300000,
    employeeId: 101,
    supplierId: 402,
  },
  {
    date: new Date(2024, month - 1, 28),
    priceTotal: 300000,
    employeeId: 100,
    supplierId: 403,
  },
];

const receiptMockupData = arrayMonthData
  .map((month) => {
    return receiptTemplate(month);
  })
  .flat(1);

const cancellationFormTemplate = (month) => [
  {
    date: new Date(2024, month - 1, 2),
    employeeId: 100,
    reasonCancellationId: 101,
  },
  {
    date: new Date(2024, month - 1, 14),
    employeeId: 101,
    reasonCancellationId: 102,
  },
  {
    date: new Date(2024, month - 1, 27),
    employeeId: 100,
    reasonCancellationId: 100,
  },
];

const cancellationFormMockupData = arrayMonthData
  .map((month) => {
    return cancellationFormTemplate(month);
  })
  .flat(1);

module.exports = async () => {
  const ingredients = await Ingredient.bulkCreate(ingredientMockupData);
  await Warehouse.bulkCreate(
    ingredientMockupData.map((ingredient) => {
      return {
        ingredientId: ingredient.id,
        quantity: 100,
      };
    })
  );

  await Supplier.bulkCreate(supplierMockupData);

  const receipts = await Receipt.bulkCreate(receiptMockupData);

  await ReceiptDetail.bulkCreate(
    receipts
      .map((receipt) => {
        const sample = {
          quantity: 10,
          price: 100000,
          pricePerUnit: 10000,
        };
        return ingredientMockupData.map((ingredient) => {
          return {
            ...sample,
            ingredientId: ingredient.id,
            receiptId: receipt.id,
          };
        });
      })
      .flat(Infinity)
  );

  await ReasonCancellation.bulkCreate(reasonCancellationMockupData);

  const cancellationForms = await CancellationForm.bulkCreate(
    cancellationFormMockupData
  );

  await CancellationFormDetail.bulkCreate(
    cancellationForms
      .map((cancellationForm) => {
        const sample = {
          quantity: 5,
        };
        return ingredientMockupData.map((ingredient) => {
          return {
            ...sample,
            ingredientId: ingredient.id,
            cancellationFormId: cancellationForm.id,
          };
        });
      })
      .flat(Infinity)
  );
};
