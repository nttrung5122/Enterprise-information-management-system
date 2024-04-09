const { Recipe, RecipeDetail, Food, SectionMenu, SectionDetail, Menu, MenuDetail, Bill, BillDetail } = require("../models");
const recipeMockupData = [
    {
        id:1,
        nameRecipe: "Gà rán phần",
    },
    {
        id:2,
        nameRecipe: "6 miếng gà + 3 khoai vừa",
    },
    {
        id:3,
        nameRecipe: "8 miếng gà + 4 khoai vừa",
    },
    {
        id:4,
        nameRecipe: "Hamburger bò",
    },
    {
        id:5,
        nameRecipe: "Hamburger gà",
    },
    {
        id:6,
        nameRecipe: "Khoai tây lớn",
    },
    {
        id:7,
        nameRecipe: "Khoai tây vừa",
    },
    {
        id:8,
        nameRecipe: "Hotdog",
    }
]

const recipeDetailsMockupData = [
    //Gà rán phần
    [
        {
            recipeId: 1,
            ingredientId:902,
            quantity:0.2
        }
    ],
    //6 miếng gà + 3 khoai vừa
    [
        {
            recipeId: 2,
            ingredientId:902,
            quantity:1.2
        },
        {
            recipeId: 2,
            ingredientId:904,
            quantity:0.3
        }
    ],
    //8 miếng gà + 4 khoai vừa
    [
        {
            recipeId: 3,
            ingredientId:902,
            quantity:1.6
        },
        {
            recipeId: 3,
            ingredientId:904,
            quantity:0.4
        }
    ],
    //Hamburger bò
    [
        {
            recipeId: 4,
            ingredientId:908,
            quantity:0.1
        },
        {
            recipeId: 4,
            ingredientId:907,
            quantity:1
        },
        {
            recipeId: 4,
            ingredientId:903,
            quantity:0.01
        }
    ],
    //Hamburger gà
    [
        {
            recipeId: 5,
            ingredientId:902,
            quantity:0.1
        },
        {
            recipeId: 5,
            ingredientId:907,
            quantity:1
        },
        {
            recipeId:5,
            ingredientId:903,
            quantity:0.01
        }
    ],
    //Khoai tây lớn
    [
        {
            recipeId: 6,
            ingredientId:904,
            quantity:0.15
        }
    ],
    //Khoai tây vừa
    [
        {
            recipeId: 7,
            ingredientId:904,
            quantity:0.1
        }
    ],
    //Hotdog
    [
        {
            recipeId: 8,
            ingredientId:905,
            quantity:1
        },
        {
            recipeId: 8,
            ingredientId:906,
            quantity:0.1
        }
    ]
]

const foodMockupData = [
    {
        id:1,
        nameFood: "Gà rán phần",
        info:"1 miếng gà rán",
        price: 35000,
        recipeId:1
    },
    {
        id:2,
        nameFood: "Combo gà rán 6 miếng",
        info: "6 miếng gà rán, 3 phần khoai tây chiên vừa",
        price: 250000,
        recipeId:2
    },
    {
        id:3,
        nameFood: "Combo gà rán 8 miếng",
        info: "8 miếng gà rán, 4 phần khoai tây chiên vừa",
        price: 330000,
        recipeId:3
    },
    {
        id:4,
        nameFood: "Hamburger bò",
        info: "",
        price: 45000,
        recipeId:4
    },
    {
        id:5,
        nameFood: "Hamburger gà",
        info: "",
        price: 40000,
        recipeId:5
    },
    {
        id:6,
        nameFood: "Khoai tây chiên lớn",
        info: "",
        price: 25000,
        recipeId:6
    },
    {
        id:7,
        nameFood: "Khoai tây chiên vừa",
        info: "",
        price: 20000,
        recipeId:7
    },
    {
        id:8,
        nameFood: "Hotdog",
        info: "Bánh mì, xúc xích, phô mai",
        price: 35000,
        recipeId:8
    },
    {
        id:9,
        nameFood: "Khoai tây nghiền lớn",
        info: "",
        price: 25000,
        recipeId:6
    },
    {
        id:10,
        nameFood: "Khoai tây nghiền vừa",
        info: "",
        price: 20000,
        recipeId:7
    }
]
const menuMockupData = [
    {
        id:1,
        nameMenu: "Menu 1",
        info: "Menu sáng",
    }
]

const sectionMenuMockupData = [
    {
        id:1,
        nameSection: "Gà rán",
        info: "Các món gà rán",
    },
    {
        id:2,
        nameSection: "Hamburger, Hotdog",
        info: "Các món hamburger và hotdog",
    },
    {
        id:3,
        nameSection: "Các món ăn kèm",
        info: "Khoai tây chiên, khoai tây nghiền",
    }
]

const menuDetailMockupData = [
    //Menu1
    [
        {
            menuId: 1,
            sectionMenuId:1
        },
        {
            menuId:1,
            sectionMenuId:2
        },
        {
            menuId:1,
            sectionMenuId:3
        }
    ]
]

const sectionDetailMockupData= [
    //Gà rán
    [
        {
            sectionMenuId: 1,
            foodId:1
        },
        {
            sectionMenuId: 1,
            foodId:2
        },
        {
            sectionMenuId: 1,
            foodId:3
        }
    ],
    //Hamburger, Hotdog
    [
        {
            sectionMenuId: 2,
            foodId:4
        },
        {
            sectionMenuId: 2,
            foodId:5
        },
        {
            sectionMenuId: 2,
            foodId:8
        }
    ],
    //Các món ăn kèm
    [
        {
            sectionMenuId: 3,
            foodId:6
        },
        {
            sectionMenuId: 3,
            foodId:7
        },
        {
            sectionMenuId: 3,
            foodId:9
        },
        {
            sectionMenuId: 3,
            foodId:10
        }
    ]
]
const quantity =  2;
const totalPrice = foodMockupData.reduce((pre,cur)=>{
    return pre + cur.price
},0) * quantity;

const billTemplate = {
    employeeId: 103,
    totalPrice,
}

const months = [2,3];
const year = 2024;
const billMockupData = months.map((month)=>{
    const arr = []; 
    for(let i = 1; i <= 28; i++){
        for(let j = 1; j <=10;j++){
            arr.push({
                ...billTemplate,
                date: new Date(year, month, i),
            })
        }
    }
    return arr
});
const billDetailMockupData = billMockupData.flat(Infinity).map((bill,index)=>{
    return foodMockupData.map((food,foodId)=>{
        return {
            billId: index+1,
            quantity,
            totalPrice: food.price * quantity,
            foodId: foodId+1
        }
    });
});
// console.log(billMockupData)
console.log(billDetailMockupData)
module.exports = async () => {
    await Recipe.bulkCreate(recipeMockupData)
    await RecipeDetail.bulkCreate(recipeDetailsMockupData.flat(Infinity))
    await Food.bulkCreate(foodMockupData)
    await SectionMenu.bulkCreate(sectionMenuMockupData)
    await SectionDetail.bulkCreate(sectionDetailMockupData.flat(Infinity))
    await Menu.bulkCreate(menuMockupData)
    await MenuDetail.bulkCreate(menuDetailMockupData.flat(Infinity))
    await Bill.bulkCreate(billMockupData.flat(Infinity));
    await BillDetail.bulkCreate(billDetailMockupData.flat(Infinity));
}

