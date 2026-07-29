import React, { useState, useEffect, useMemo } from "react";
import { Info, Flame, ChevronRight, X, Utensils, Leaf, Beef, Sparkles, RefreshCw, Plus, Trash2 } from "lucide-react";

// Raw data containing ALL items from the 5 images
// Format: Section | Name | Price | Type (V=Veg, NV=Non-Veg)
const RAW_MENU = `
Non-Veg Starter|Egg Omelette|40|NV
Non-Veg Starter|Egg Bhurji|60|NV
Non-Veg Starter|Chicken Pakoda|120|NV
Non-Veg Starter|Chicken Salt And Pepper|150|NV
Non-Veg Starter|Chicken Fry (Ad Style)|170|NV
Non-Veg Starter|Chilly Chicken (Bone)|170|NV
Non-Veg Starter|Ginger Chicken|170|NV
Non-Veg Starter|Chicken Majestic|170|NV
Non-Veg Starter|Hong Kong Chicken|170|NV
Non-Veg Starter|Schezwan Chicken|170|NV
Non-Veg Starter|Hunaan Chicken|170|NV
Non-Veg Starter|Chicken Tikka|170|NV
Non-Veg Starter|Angara Chicken Tikka|170|NV
Non-Veg Starter|Murga Lasuni Tikka|170|NV
Non-Veg Starter|Murga Achari Tikka|170|NV
Non-Veg Starter|Chicken 65|180|NV
Non-Veg Starter|Mallai Tikka|180|NV
Non-Veg Starter|Chicken Lollypop|180|NV
Non-Veg Starter|Dragon Chicken|180|NV
Non-Veg Starter|Chicken Manchurian|180|NV
Non-Veg Starter|Garlic Chicken|180|NV
Non-Veg Starter|Hariyali Tikka|180|NV
Non-Veg Starter|Murga Kasturi Tikka|180|NV
Non-Veg Starter|Murga Afghani Tikka|180|NV
Non-Veg Starter|Murga Reshmi Tikka|180|NV
Non-Veg Starter|Kalmi Kabab [2 Pc]|190|NV
Non-Veg Starter|Fish Tikka|200|NV
Non-Veg Starter|Tandoori Prawn|220|NV
Non-Veg Starter|Chilly Prawn|200|NV
Veg Starter|American Corn|130|V
Veg Starter|Crispy Babycorn|150|V
Veg Starter|Chilly Babycorn|150|V
Veg Starter|Mushroom Chilli|160|V
Veg Starter|Mushroom Manchurian|170|V
Veg Starter|Mushroom 65|170|V
Veg Starter|Paneer Tikka|170|V
Veg Starter|Panner 65|170|V
Veg Starter|Chilli Paneer|170|V
Veg Starter|Paneer Manchurian|170|V
Veg Starter|Paneer Bhurji|180|V
Veg Starter|Paneer Malai Tikka|180|V
Veg Starter|Paneer Achari Tikka|180|V
Veg Curry|Dal Fry|90|V
Veg Curry|Dal Butter Fry|100|V
Veg Curry|Mix Veg|120|V
Veg Curry|Veg Kadai|130|V
Veg Curry|Chana Masala|130|V
Veg Curry|Aloo Matar|130|V
Veg Curry|Mushroom Masala|170|V
Veg Curry|Mushroom Kadai|170|V
Veg Curry|Mushroom Do Pyaza|170|V
Veg Curry|Paneer Masala|180|V
Veg Curry|Paneer Butter Masala|180|V
Veg Curry|Kadai Paneer|180|V
Veg Curry|Paneer Do Pyaza|180|V
Veg Curry|Paneer Hyderabadi|180|V
Veg Curry|Paneer Korma|180|V
Veg Curry|Paneer Tikka Masala|190|V
Veg Curry|Sahi Paneer|190|V
Veg Curry|Paneer Jaipuri|190|V
Non-Veg Curry|Egg Masala|100|NV
Non-Veg Curry|Egg Bhurji Curry|110|NV
Non-Veg Curry|Egg Kadhai|110|NV
Non-Veg Curry|Fish Masala|160|NV
Non-Veg Curry|Chicken Masala|160|NV
Non-Veg Curry|Chicken Kasa|170|NV
Non-Veg Curry|Chicken Kima Masala|170|NV
Non-Veg Curry|Chicken Curry Home Style|170|NV
Non-Veg Curry|Chicken Do Pyaza|170|NV
Non-Veg Curry|Chicken Kadhai|170|NV
Non-Veg Curry|Chicken Kolhapuri|170|NV
Non-Veg Curry|Tandoori Chicken Masala|180|NV
Non-Veg Curry|Chicken Hyderabadi|180|NV
Non-Veg Curry|Chicken Mughlai|180|NV
Non-Veg Curry|Chicken Tikka Masala|180|NV
Non-Veg Curry|Chicken Butter Masala|180|NV
Non-Veg Curry|Chicken Patiala|180|NV
Non-Veg Curry|Chicken Korma|180|NV
Non-Veg Curry|Chicken Chettinadu|180|NV
Non-Veg Curry|Chicken Lababdar|180|NV
Non-Veg Curry|Chicken Bharta|180|NV
Non-Veg Curry|Mutton Curry|240|NV
Non-Veg Curry|Mutton Rogan Josh|260|NV
Non-Veg Curry|Mutton Kadhai|260|NV
Biryani|Veg Biryani|100|V
Biryani|Veg Biryani (Full)|120|V
Biryani|Mushroom Biryani|130|V
Biryani|Paneer Biryani|140|V
Biryani|Chicken Dum Biryani|150|NV
Biryani|Chicken Dum Biryani (Full)|170|NV
Biryani|Hyderabadi Chicken Biryani (Full)|200|NV
Biryani|Prawn Biryani|200|NV
Biryani|Fish Biryani (Boneless Fish)|200|NV
Biryani|Mutton Biryani|300|NV
Roti & Naan|Tandoori Roti|15|V
Roti & Naan|Tandoori Butter Roti|20|V
Roti & Naan|Plain Naan|30|V
Roti & Naan|Butter Naan|35|V
Roti & Naan|Rumali Roti|20|V
Roti & Naan|Butter Kulcha|25|V
Roti & Naan|Lachha Paratha|30|V
Roti & Naan|Garlic Naan|35|V
Roti & Naan|Masala Kulcha|35|V
Roti & Naan|Tandoori Paratha|35|V
Roti & Naan|Butter Garlic Naan|40|V
Roti & Naan|Paneer Kulcha|40|V
Roti & Naan|Masala Naan|40|V
Roti & Naan|Bread Basket|90|V
Rice|Plain Rice|50|V
Rice|Curd Rice|80|V
Rice|Veg Fried Rice|80|V
Rice|Jeera Rice|80|V
Rice|Lemon Rice|90|V
Rice|Green Peas Pulao|100|V
Rice|Veg Schezwan Fried Rice|100|V
Rice|Egg Fried Rice|100|NV
Rice|Veg Pulao|110|V
Rice|Mushroom Fried Rice|120|V
Rice|Chilly Garlic Fried Rice|120|V
Rice|Egg Schezwan Fried Rice|120|NV
Rice|Paneer Fried Rice|130|V
Rice|Chicken Fried Rice|130|NV
Rice|Hong Kong Chicken Fried Rice|140|NV
Rice|Chicken Schezwan Fried Rice|150|NV
Rice|Mix Non-Veg Fried Rice|150|NV
Soup|Green Salad|50|V
Soup|Veg Clear Soup|50|V
Soup|Hot & Sour Soup|70|V
Soup|Manchow Soup|70|V
Soup|Sweet Corn Soup|70|V
Soup|Lemon Coriander Soup|70|V
Soup|Chicken Clear Soup|70|NV
Soup|Cream Of Tomato Soup|80|V
Soup|Cream Of Mushroom Soup|80|V
Soup|Chicken Hot And Sour Soup|80|NV
Soup|Chicken Sweet Corn Soup|90|NV
Soup|Chicken Manchow Soup|90|NV
Soup|Sea Food Soup|100|NV
Noodles|Veg Hakka Noodles|80|V
Noodles|Veg Shanghai Noodles|90|V
Noodles|Mushroom Noodles|100|V
Noodles|Schezwan Veg Noodles|100|V
Noodles|Hong Kong Veg Noodles|110|V
Noodles|Paneer Noodles|130|V
Noodles|Mix Veg Noodles|140|V
Noodles|Egg Noodles|90|NV
Noodles|Egg Chicken Noodles|130|NV
Noodles|Schezwan Chicken Noodles|140|NV
Noodles|Mix Non-Veg Noodles|150|NV
Tandoori|Tandoori Chicken (Quarter)|150|NV
Tandoori|Tandoori Chicken (Half)|300|NV
Tandoori|Tandoori Chicken (Full)|550|NV
Grilled|Grilled Chicken (Quarter)|160|NV
Grilled|Grilled Chicken (Half)|300|NV
Grilled|Grilled Chicken (Full)|600|NV
Roll|Veg Roll|50|V
Roll|Egg Roll|60|NV
Roll|Double Egg Roll|70|NV
Roll|Egg Chicken Roll|70|NV
Roll|Paneer Roll|80|V
Roll|Mushroom Roll|80|V
Roll|Double Egg Chicken Roll|90|NV
Roll|Cheese Chicken Roll|90|NV
Roll|Chilli Mushroom Roll|90|V
Roll|Regular Shawarma Roll|100|NV
Roll|Paneer Chilli Roll|100|V
Roll|Arabian Shawarma Roll|110|NV
Roll|Periperi Shawarma Roll|110|NV
Roll|Barbeque Shawarma Roll|110|NV
Roll|Schezwan Shawarma Roll|110|NV
Roll|Overload Shawarma Roll|120|NV
Roll|Arabian Shawarma Roll (Bbq Sauce)|130|NV
Roll|Ckn Cheese Shawarma Roll|130|NV
Roll|Double Cheese Shawarma Roll|140|NV
Roll|Mexican Shawarma Roll|130|NV
Roll|Shawarma Chicken Salad|130|NV
Roll|Cheese Salad|130|V
Roll|Periperi Chicken Salad|140|NV
Roll|Special Shawarma Roll|140|NV
Roll|Shawarma Plate|140|NV
Roll|Arabian Chicken Salad|140|NV
Roll|Grilled Chicken Salad|160|NV
Roll|Shawarma Platter|160|NV
Others|Water Bottle|30|V
Others|Masala Cold Drink|40|V
`;

const HERO_IMAGES = {
  "Non-Veg Starter": "https://placehold.co/800x600/8b1c00/ffffff?text=Chicken+Tikka",
  "Veg Starter": "https://placehold.co/800x600/006837/ffffff?text=Crispy+Babycorn",
  "Veg Curry": "https://placehold.co/800x600/a34a00/ffffff?text=Paneer+Butter+Masala",
  "Non-Veg Curry": "https://placehold.co/800x600/5e1700/ffffff?text=Mutton+Curry",
  "Biryani": "https://placehold.co/800x600/8b4500/ffffff?text=Chicken+Dum+Biryani",
  "Roti & Naan": "https://placehold.co/800x600/d48800/ffffff?text=Butter+Naan",
  "Rice": "https://placehold.co/800x600/c75100/ffffff?text=Fried+Rice",
  "Soup": "https://placehold.co/800x600/a32800/ffffff?text=Hot+%26+Sour+Soup",
  "Noodles": "https://placehold.co/800x600/a37b00/ffffff?text=Hakka+Noodles",
  "Tandoori": "https://placehold.co/800x600/8b1c00/ffffff?text=Tandoori+Chicken",
  "Grilled": "https://placehold.co/800x600/c73000/ffffff?text=Grilled+Chicken",
  "Roll": "https://placehold.co/800x600/a32800/ffffff?text=Special+Shawarma",
  "Others": "https://placehold.co/800x600/292524/ffffff?text=Beverages"
};

// Generates procedural authentic-looking details based on dish name
const generateDetails = (name, type) => {
  let ingredients = ["Secret Spices", "Salt", "Premium Oil"];
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('chicken')) ingredients.unshift("Tender Chicken", "Ginger Garlic Paste", "Onions");
  else if (lowerName.includes('paneer')) ingredients.unshift("Fresh Paneer Cubes", "Capsicum", "Tomatoes");
  else if (lowerName.includes('mushroom')) ingredients.unshift("Fresh Button Mushrooms", "Spring Onions");
  else if (lowerName.includes('egg')) ingredients.unshift("Farm Fresh Eggs", "Green Chillies");
  else if (lowerName.includes('mutton')) ingredients.unshift("Tender Mutton", "Whole Spices", "Yogurt");
  else if (lowerName.includes('prawn') || lowerName.includes('fish')) ingredients.unshift("Fresh Seafood", "Lemon", "Mustard Oil");
  else if (type === 'NV') ingredients.unshift("Premium Meat");
  else ingredients.unshift("Fresh Mixed Vegetables");

  // Deterministic pseudo-random generation based on name string
  let hash = 0;
  for(let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  hash = Math.abs(hash);
  
  const baseCal = (hash % 400) + 200; // 200 - 600 kcal
  
  let taste = "Aromatic & Savory";
  if (lowerName.includes('chilli') || lowerName.includes('schezwan') || lowerName.includes('spicy')) taste = "Fiery & Tangy";
  else if (lowerName.includes('butter') || lowerName.includes('malai') || lowerName.includes('cream')) taste = "Rich, Mild & Creamy";
  else if (lowerName.includes('tikka') || lowerName.includes('tandoori')) taste = "Smoky & Spicy";

  return {
    ingredients,
    taste,
    calories: baseCal,
    nutrients: {
      protein: (hash % 35 + 10) + "g",
      carbs: (hash % 60 + 15) + "g",
      fat: (hash % 25 + 5) + "g",
    }
  };
};

const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&family=Rowdies:wght@400;700&display=swap');
    
    body {
      font-family: 'Poppins', sans-serif;
      /* Vibrant Red-Orange Background */
      background: linear-gradient(135deg, #b91c1c 0%, #ea580c 50%, #c2410c 100%);
      background-attachment: fixed;
      color: #fafaf9;
      overflow-x: hidden;
    }
    
    .font-display {
      font-family: 'Rowdies', cursive;
    }

    .fire-text {
      background: linear-gradient(to top, #fde047, #facc15, #ffffff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0px 4px 15px rgba(250, 204, 21, 0.4);
    }

    .glass-card {
      background: rgba(0, 0, 0, 0.5); 
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
    }
    
    .list-item-card {
      background: rgba(0, 0, 0, 0.3);
      border-left: 4px solid #facc15;
      transition: all 0.2s ease;
    }
    
    .list-item-card:hover {
      background: rgba(0, 0, 0, 0.6);
      transform: translateX(4px);
      border-left-color: #fbbf24;
    }

    .spin-wheel-container {
      position: relative;
      width: 320px;
      height: 320px;
      border-radius: 50%;
      box-shadow: 0 0 40px rgba(250, 204, 21, 0.6), inset 0 0 20px rgba(0,0,0,0.8);
      border: 8px solid #450a0a; /* Very dark red */
      overflow: hidden;
      background: #7f1d1d;
    }

    .spin-wheel {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transition: transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99);
      position: relative;
    }

    .wheel-pointer {
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-top: 30px solid #facc15; /* Yellow pointer */
      z-index: 10;
      filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.6));
    }
    
    .floating {
      animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    /* Scrollbar adapted for bright theme */
    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: #7f1d1d; }
    ::-webkit-scrollbar-thumb { background: #facc15; border-radius: 5px; }
    ::-webkit-scrollbar-thumb:hover { background: #eab308; }
  `}} />
);

export default function ShawarmaExpressApp() {
  const [selectedDish, setSelectedDish] = useState(null);
  const [spinItems, setSpinItems] = useState([]);
  
  // Spin Wheel State
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState(null);

  // Process raw string data into objects
  const menuData = useMemo(() => {
    const lines = RAW_MENU.trim().split('\n');
    return lines.map((line, idx) => {
      const [section, name, price, typeCode] = line.split('|');
      const type = typeCode === 'V' ? 'veg' : 'non-veg';
      const details = generateDetails(name, type);
      
      return {
        id: `item-${idx}`,
        section,
        name,
        price: parseInt(price),
        type,
        ...details
      };
    });
  }, []);

  // Group by sections and separate hero item from the rest
  const groupedMenu = useMemo(() => {
    const groups = {};
    menuData.forEach(dish => {
      if (!groups[dish.section]) {
        groups[dish.section] = { hero: null, list: [] };
      }
      
      // First item becomes the hero, rest are list items
      if (!groups[dish.section].hero) {
        dish.image = HERO_IMAGES[dish.section]; // Assign static hero image
        groups[dish.section].hero = dish;
      } else {
        // Fallback image just in case it's viewed in modal
        dish.image = HERO_IMAGES[dish.section]; 
        groups[dish.section].list.push(dish);
      }
    });
    return groups;
  }, [menuData]);

  const handleAddToSpin = (dish) => {
    if (spinItems.length >= 5) return;
    if (spinItems.find(item => item.id === dish.id)) return;
    setSpinItems([...spinItems, dish]);
  };

  const handleRemoveFromSpin = (id) => {
    setSpinItems(spinItems.filter(item => item.id !== id));
    setSpinResult(null); // Reset result if wheel changes
  };

  const executeSpin = () => {
    if (spinItems.length < 5 || isSpinning) return;
    
    setIsSpinning(true);
    setSpinResult(null);
    
    const randomIdx = Math.floor(Math.random() * 5);
    const sliceAngle = 360 / 5;
    
    // Land exactly in the middle of the selected slice
    const targetDegree = 360 - (randomIdx * sliceAngle) - (sliceAngle / 2);
    const spinTurns = (Math.floor(Math.random() * 4) + 6) * 360; 
    
    const newRotation = rotation + spinTurns + targetDegree + (360 - (rotation % 360));
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSpinResult(spinItems[randomIdx]);
    }, 4000); 
  };

  const Modal = () => {
    if (!selectedDish) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="relative w-full max-w-lg overflow-hidden bg-stone-900 border border-stone-700 rounded-3xl shadow-2xl shadow-black/50 animate-in fade-in zoom-in duration-300">
          <button 
            onClick={() => setSelectedDish(null)}
            className="absolute top-4 right-4 z-20 p-2 text-white bg-black/50 rounded-full hover:bg-red-500 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="relative h-64 overflow-hidden bg-black">
            <img 
              src={selectedDish.image || "https://placehold.co/800x600/292524/ffffff?text=Delicious+Dish"} 
              alt={selectedDish.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                {selectedDish.type === 'veg' ? 
                  <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-950/90 border border-green-500/30 px-2 py-1 rounded-full"><Leaf size={12}/> VEG</span> : 
                  <span className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-950/90 border border-red-500/30 px-2 py-1 rounded-full"><Beef size={12}/> NON-VEG</span>
                }
                <span className="text-xs font-bold text-yellow-400 bg-yellow-950/90 border border-yellow-500/30 px-2 py-1 rounded-full">
                  ₹{selectedDish.price}
                </span>
              </div>
              <h2 className="text-3xl font-display font-bold text-white leading-tight shadow-sm">{selectedDish.name}</h2>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center bg-stone-800 p-4 rounded-2xl border border-stone-700">
              <div className="text-center flex-1">
                <p className="text-stone-400 text-xs uppercase tracking-wider mb-1">Taste Profile</p>
                <p className="font-semibold text-yellow-400">{selectedDish.taste}</p>
              </div>
              <div className="w-px h-10 bg-stone-700 mx-2"></div>
              <div className="text-center flex-1">
                <p className="text-stone-400 text-xs uppercase tracking-wider mb-1">Calories</p>
                <p className="font-semibold text-orange-400 flex items-center gap-1 justify-center">
                  <Flame size={14} /> {selectedDish.calories} kcal
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-yellow-500" />
                Major Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedDish.ingredients.map((ing, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-stone-800 rounded-lg text-sm text-stone-200 border border-stone-700">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                <Info size={18} className="text-blue-400" />
                Nutritional Est.
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-stone-800 p-3 rounded-xl text-center border-b-2 border-green-500">
                  <p className="text-xl font-bold text-white">{selectedDish.nutrients.protein}</p>
                  <p className="text-xs text-stone-400 mt-1">Protein</p>
                </div>
                <div className="bg-stone-800 p-3 rounded-xl text-center border-b-2 border-yellow-500">
                  <p className="text-xl font-bold text-white">{selectedDish.nutrients.carbs}</p>
                  <p className="text-xs text-stone-400 mt-1">Carbs</p>
                </div>
                <div className="bg-stone-800 p-3 rounded-xl text-center border-b-2 border-red-500">
                  <p className="text-xl font-bold text-white">{selectedDish.nutrients.fat}</p>
                  <p className="text-xs text-stone-400 mt-1">Fat</p>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <button 
                onClick={() => {
                  handleAddToSpin(selectedDish);
                  setSelectedDish(null);
                }}
                disabled={spinItems.length >= 5 || spinItems.some(i => i.id === selectedDish.id)}
                className="w-full py-4 px-4 rounded-xl font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-900/20 flex items-center justify-center gap-2 text-lg"
              >
                <Plus size={20} />
                {spinItems.some(i => i.id === selectedDish.id) 
                  ? "Added to Wheel" 
                  : spinItems.length >= 5 
                    ? "Wheel is Full (5/5)" 
                    : "Add to Spin & Win"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWheel = () => {
    // 5 vibrant contrasting colors for the slices
    const colors = ['#eab308', '#ec4899', '#3b82f6', '#10b981', '#f97316'];
    
    let gradient = "conic-gradient(";
    for (let i = 0; i < 5; i++) {
      gradient += `${colors[i]} ${i * 72}deg ${(i + 1) * 72}deg${i < 4 ? ', ' : ''}`;
    }
    gradient += ")";

    return (
      <div className="flex flex-col items-center">
        <div className="spin-wheel-container mb-8 border-4 border-yellow-500">
          <div className="wheel-pointer"></div>
          <div 
            className="spin-wheel"
            style={{ 
              background: spinItems.length === 5 ? gradient : '#450a0a',
              transform: `rotate(${rotation}deg)` 
            }}
          >
            {spinItems.length === 5 && spinItems.map((item, index) => {
              const rotationAngle = (index * 72) + 36; 
              return (
                <div 
                  key={index}
                  className="absolute inset-0 flex justify-center"
                  style={{ transform: `rotate(${rotationAngle}deg)` }}
                >
                  <div className="pt-8 w-28 text-center">
                    <p className="text-sm font-bold text-white leading-tight line-clamp-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] px-2">
                      {item.name}
                    </p>
                  </div>
                </div>
              );
            })}
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-950 rounded-full flex items-center justify-center border-4 border-yellow-400 z-10 shadow-[0_0_15px_rgba(0,0,0,0.8)]">
              <RefreshCw className={`text-yellow-400 ${isSpinning ? 'animate-spin' : ''}`} size={24} />
            </div>
          </div>
        </div>

        <div className="h-24 w-full flex items-center justify-center">
          {spinResult && (
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 bg-white p-4 rounded-2xl shadow-2xl text-center border-4 border-yellow-400 w-full max-w-sm transform scale-110">
              <p className="text-red-600 text-xs font-bold uppercase tracking-wider mb-1">Fate has chosen!</p>
              <h3 className="text-2xl font-display text-black">{spinResult.name}</h3>
              <p className="text-sm mt-1 text-gray-600 font-bold">Only ₹{spinResult.price}</p>
            </div>
          )}
          {!spinResult && isSpinning && (
            <p className="text-2xl font-display text-yellow-300 animate-pulse drop-shadow-md">Deciding your feast...</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20 relative">
      <CustomStyles />
      
      {/* Dynamic Background Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 glass-card border-b-0 border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-2.5 rounded-xl shadow-lg shadow-yellow-900/30">
              <Utensils size={28} className="text-red-700" />
            </div>
            <div>
              <h1 className="text-2xl font-display tracking-wide text-white leading-none drop-shadow-md">Shawarma</h1>
              <p className="text-[11px] tracking-[0.35em] text-yellow-300 uppercase font-black leading-none mt-1">Express</p>
            </div>
          </div>
          <a href="#spin-section" className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-red-900 text-sm font-black rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
            <RefreshCw size={16} /> Spin & Win
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-20 text-center">
        <div className="inline-block mb-6 px-5 py-2 rounded-full border border-yellow-400/50 bg-black/30 backdrop-blur-sm text-yellow-300 text-sm font-bold uppercase tracking-widest floating shadow-xl">
          <span className="flex items-center gap-2"><Flame size={16} className="text-orange-400" /> Complete Foodlicious Menu</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-display font-black text-white mb-6 leading-tight drop-shadow-2xl">
          Taste the <span className="fire-text">Fire.</span>
        </h2>
        <p className="text-yellow-100/90 max-w-3xl mx-auto text-lg md:text-xl mb-10 font-medium drop-shadow-md">
          Explore our massive selection of over 140 authentic dishes! Discover secret ingredients, check stats, and select 5 favorites for the Wheel of Destiny.
        </p>
      </div>

      {/* Complete Menu Display */}
      <div className="max-w-7xl mx-auto px-4 space-y-20 relative z-10">
        {Object.entries(groupedMenu).map(([sectionTitle, { hero, list }]) => (
          <div key={sectionTitle} className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white drop-shadow-lg">{sectionTitle}</h3>
              <div className="h-1 flex-1 bg-gradient-to-r from-yellow-400 to-transparent rounded-full opacity-70"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Side: HERO Dish */}
              {hero && (
                <div className="lg:col-span-5">
                  <div 
                    className="glass-card rounded-3xl overflow-hidden group cursor-pointer hover:shadow-[0_0_30px_rgba(250,204,21,0.3)] transition-all duration-300 h-full flex flex-col"
                    onClick={() => setSelectedDish(hero)}
                  >
                    <div className="h-64 lg:h-72 overflow-hidden relative">
                      <img 
                        src={hero.image} 
                        alt={hero.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                      
                      <div className="absolute top-4 left-4">
                        {hero.type === 'veg' ? 
                          <div className="bg-green-500 text-white p-2 rounded-lg shadow-lg border border-green-400"><Leaf size={18}/></div> :
                          <div className="bg-red-500 text-white p-2 rounded-lg shadow-lg border border-red-400"><Beef size={18}/></div>
                        }
                      </div>
                      
                      <div className="absolute bottom-4 right-4 bg-yellow-400 text-red-900 px-4 py-1.5 rounded-xl font-black text-lg shadow-lg">
                        ₹{hero.price}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-bold rounded-lg mb-3 border border-yellow-500/30">
                          Signature Dish
                        </div>
                        <h4 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors mb-2 leading-tight">
                          {hero.name}
                        </h4>
                        <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                          {hero.ingredients.join(" • ")}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4 border-t border-white/10 pt-4">
                        <span className="flex items-center text-sm font-semibold text-yellow-400 gap-1 group-hover:gap-2 transition-all">
                          Reveal Details <ChevronRight size={16} />
                        </span>
                        <div className="flex gap-3 text-xs text-gray-300 font-medium">
                           <span className="flex items-center gap-1"><Flame size={12} className="text-orange-400"/> {hero.calories} kcal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Right Side: LIST of other dishes */}
              <div className="lg:col-span-7">
                <div className="glass-card rounded-3xl p-4 sm:p-6 h-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-full max-h-[450px] overflow-y-auto pr-2 pb-2">
                    {list.map((dish) => (
                      <div 
                        key={dish.id} 
                        onClick={() => setSelectedDish(dish)}
                        className="list-item-card rounded-xl p-3 sm:p-4 cursor-pointer flex justify-between items-center group"
                      >
                        <div className="flex items-center gap-3 pr-2">
                          <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm ${dish.type === 'veg' ? 'bg-green-400 shadow-green-400/50' : 'bg-red-400 shadow-red-400/50'}`}></div>
                          <p className="text-white font-semibold text-sm sm:text-base group-hover:text-yellow-400 transition-colors leading-tight">
                            {dish.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-yellow-300 font-bold bg-black/40 px-2 py-1 rounded-md text-sm">₹{dish.price}</span>
                          <ChevronRight size={16} className="text-white/30 group-hover:text-yellow-400 transition-colors hidden sm:block" />
                        </div>
                      </div>
                    ))}
                    {list.length === 0 && (
                      <div className="col-span-full h-full flex flex-col items-center justify-center text-white/50 p-8">
                        <Sparkles size={32} className="mb-2 opacity-50" />
                        <p>Our sole masterpiece for this category.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Spin & Win Section */}
      <div id="spin-section" className="max-w-6xl mx-auto px-4 py-24 mt-20 relative z-10">
        <div className="glass-card p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-yellow-400/30 overflow-hidden relative">
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Left side: Instructions & List */}
            <div className="flex-1 w-full">
              <h2 className="text-4xl md:text-5xl font-display font-black mb-4 text-white drop-shadow-md">
                Wheel of <span className="text-yellow-400">Destiny</span>
              </h2>
              <p className="text-yellow-100/90 mb-8 text-lg font-medium">
                Overwhelmed by 140+ choices? Select exactly <strong className="text-white bg-black/30 px-2 py-0.5 rounded">5 dishes</strong> from the menu above and let fate decide your meal!
              </p>

              <div className="bg-black/40 p-6 rounded-3xl border border-white/10 mb-8 backdrop-blur-sm shadow-inner">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-white text-lg">Your Contenders</h4>
                  <span className="text-sm font-black px-4 py-1.5 bg-yellow-400 text-red-900 rounded-full shadow-md">
                    {spinItems.length} / 5
                  </span>
                </div>
                
                <div className="space-y-3 min-h-[250px]">
                  {spinItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-white/40 py-10 border-2 border-dashed border-white/20 rounded-2xl">
                      <RefreshCw size={36} className="mb-3 opacity-50" />
                      <p className="font-medium">No dishes selected.</p>
                      <p className="text-sm mt-1">Tap dishes on the menu to add them.</p>
                    </div>
                  ) : (
                    spinItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white/10 p-3.5 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${item.type === 'veg' ? 'bg-green-400' : 'bg-red-400'} shadow-sm`}></div>
                          <span className="font-bold text-white">{item.name}</span>
                        </div>
                        <button 
                          onClick={() => handleRemoveFromSpin(item.id)}
                          className="text-white/50 hover:text-red-400 transition-colors p-2 bg-black/20 rounded-lg hover:bg-black/40"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))
                  )}
                  
                  {/* Empty placeholders */}
                  {[...Array(Math.max(0, 5 - spinItems.length))].map((_, idx) => (
                    <div key={`empty-${idx}`} className="h-14 border border-dashed border-white/20 rounded-xl bg-black/20"></div>
                  ))}
                </div>
              </div>

              <button 
                onClick={executeSpin}
                disabled={spinItems.length < 5 || isSpinning}
                className="w-full py-5 rounded-2xl font-display text-2xl tracking-wider text-red-900 bg-yellow-400 hover:bg-yellow-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(250,204,21,0.5)] relative overflow-hidden group border-2 border-yellow-200"
              >
                <div className="absolute inset-0 w-full h-full bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out skew-x-12"></div>
                {isSpinning ? "CONSULTING THE GODS..." : spinItems.length < 5 ? `NEED ${5 - spinItems.length} MORE DISHES` : "SPIN THE WHEEL!"}
              </button>
            </div>

            {/* Right side: Wheel */}
            <div className="flex-1 flex justify-center w-full mt-10 lg:mt-0">
              {renderWheel()}
            </div>
            
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-12 py-10 text-center text-yellow-100/60 font-medium">
        <p>© 2026 Shawarma Express. 140+ ways to spice up your cravings.</p>
        <p className="text-xs mt-2">Plot-61, K3 B, Kalinga Nagar, BBSR, Odisha, 751003</p>
      </footer>

      {/* Render Modal */}
      <Modal />
      
    </div>
  );
}