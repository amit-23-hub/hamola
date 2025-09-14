const productCategory = [
    { id : 1, label : "Sofas & Couches", value : "sofas", icon: "🛋️"},
    { id : 2, label : "Chairs", value : "chairs", icon: "🪑"},
    { id : 3, label : "Tables", value : "tables", icon: "🪑"},
    { id : 4, label : "Beds", value : "beds", icon: "🛏️"},
    { id : 5, label : "Storage", value : "storage", icon: "🗄️"},
    { id : 6, label : "Dining", value : "dining", icon: "🍽️"},
    { id : 7, label : "Office", value : "office", icon: "💼"},
    { id : 8, label : "Outdoor", value : "outdoor", icon: "🌿"},
    { id : 9, label : "Lighting", value : "lighting", icon: "💡"},
    { id : 10, label : "Decor", value : "decor", icon: "🎨"},
    { id : 11, label : "Rugs", value : "rugs", icon: "🪞"},
    { id : 12, label : "Mattresses", value : "mattresses", icon: "🛌"},
]

const roomTypes = [
    { id : 1, label : "Living Room", value : "living-room", icon: "🛋️"},
    { id : 2, label : "Bedroom", value : "bedroom", icon: "🛏️"},
    { id : 3, label : "Dining Room", value : "dining-room", icon: "🍽️"},
    { id : 4, label : "Kitchen", value : "kitchen", icon: "🍳"},
    { id : 5, label : "Office", value : "office", icon: "💼"},
    { id : 6, label : "Outdoor", value : "outdoor", icon: "🌿"},
    { id : 7, label : "Kids Room", value : "kids-room", icon: "🧸"},
    { id : 8, label : "Bathroom", value : "bathroom", icon: "🛁"},
]

const materials = [
    "Wood", "Metal", "Fabric", "Leather", "Glass", "Plastic", "Rattan", "Bamboo", "Marble", "Stone"
]

const colors = [
    "Black", "White", "Brown", "Gray", "Beige", "Navy", "Green", "Blue", "Red", "Yellow", "Pink", "Purple"
]

const priceRanges = [
    { label: "Under $100", min: 0, max: 100 },
    { label: "$100 - $500", min: 100, max: 500 },
    { label: "$500 - $1000", min: 500, max: 1000 },
    { label: "$1000 - $2000", min: 1000, max: 2000 },
    { label: "Over $2000", min: 2000, max: Infinity }
]


export default productCategory
export { roomTypes, materials, colors, priceRanges }