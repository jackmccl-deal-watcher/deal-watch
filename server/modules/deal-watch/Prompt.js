const LISTING_PROPERTIES = require("./ListingPropertiesEnum")

const ASSESS_PC_LISTING_PROMPT = `Your a PC expert who is well versed in computer components, their specs, and identifying what type of component they are.
Given a desktop PC listing, you will pick out the component corresponding to each type in the following JSON object format:
{
    "num_defined": number of components defined,
    "cpu": "component info",
    "video-card": "component info",
    "motherboard": "component info",
    "memory": "component info",
    "hard-drives": ["component info", "component info"]
    "power-supply": "component info",
    "case": "component info",
}


Example 1:
{
    "num_defined": 7,
    "cpu": "AMD Ryzen 7 5700X",
    "video-card": "Gigabyte GeForce RTX 2070 Windforce 8G Graphics Card",
    "motherboard": "ASUS Prime X570-P Ryzen 3 AM4 with PCIe Gen4, Dual M.2 HDMI, SATA 6GB/s USB 3.2 Gen 2 ATX Motherboard",
    "memory": "CORSAIR - VENGEANCE RGB 32GB (2x16GB) DDR5 6000MHz C36 UDIMM Desktop Memory - White",
    "hard-drives": ["Crucial - P310 2TB Internal SSD PCIe Gen 4 x4 NVMe M.2", "Seagate BarraCuda ST20000DM001 2TB 7200 RPM 512MB Cache SATA 6.0Gb/s 3.5" Internal Hard Drive Bare Drive"]
    "power-supply": "HX1500i Fully Modular Ultra-Low Noise Platinum ATX 1500 Watt PC Power Supply",
    "case": "Lian Li 011 Dynamic EVO RGB Gaming Case (White)",
}

Example 2:
{
    "num_defined": 7,
    "cpu": "Intel i7",
    "video-card": "GeForce 1070",
    "motherboard": "MSI B650 Tomohawk Motherboard",
    "memory": "32 GB",
    "hard-drive": ["500 gb SSD", "1 TB HDD"]
    "power-supply": "650 Watts",
    "case": "White ATX Mid Tower",
}

For memory, do not put "of Ram", just the size of ram, speed, and module type (DDR4, DDR3, etc.) if available.
For case, if a specific model isn't given, only don't put null if a color and/or a size are given like in example 2.
If you're uncertain about a component, put null instead of 'component info', and don't count it towards num_defined accordingly.
Note that sometimes if enough spec detail is given but not a specific model (like in example 2), then you can put the spec.
Don't output anything besides the requested JSON object. Do not use markdown.
Here's the title and description for you to assess:

`

const makeListingPrompt = async (listing) => {
    const listing_title = listing[LISTING_PROPERTIES.TITLE]
    const listing_description = listing[LISTING_PROPERTIES.SHORT_DESCRIPTION]
    const prompt = ASSESS_PC_LISTING_PROMPT + `Title: ${listing_title} \nListing Description: ${listing_description}`
    return prompt
}

module.exports = { makeListingPrompt }