
<?php
header("Content-type: application/json");

$products = [
    ['name' => 'Apple iPhone 12 Pro Max', 'price' => 1099.00, 'description' => '6.7-inch Super Retina XDR display. Ceramic Shield with 4x better drop performance. Incredible low-light photography with the best Pro camera system on an iPhone, and 5x optical zoom range. Cinema-grade Dolby Vision video recording, editing, and playback. Night mode portraits and next-level AR experiences with the LiDAR Scanner. Powerful A14 Bionic chip. 5G capable. And new MagSafe accessories for easy attach and faster wireless charging.'],
    ['name' => 'Samsung Galaxy S21 Ultra 5G', 'price' => 1199.99, 'description' => 'Introducing the Samsung Galaxy S21 Ultra 5G, the ultimate flagship smartphone experience. With a 6.8-inch Dynamic AMOLED 2X display, 108MP camera, 8K video recording, and 5G connectivity, this phone is designed to take your mobile experience to the next level.'],
    ['name' => 'Sony PlayStation 5', 'price' => 499.99, 'description' => 'Experience lightning-fast loading with an ultra-high-speed SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio, and an all-new generation of incredible PlayStation games.'],
    ['name' => 'Microsoft Xbox Series X', 'price' => 499.99, 'description' => 'Introducing the Xbox Series X, the fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles—all games look and play best on Xbox Series X. At the heart of Series X is the Xbox Velocity Architecture, which pairs a custom SSD with integrated software for faster, streamlined gameplay with significantly reduced load times.'],
    ['name' => 'Apple MacBook Pro 16-inch', 'price' => 2399.00, 'description' => 'Designed for those who defy limits and change the world, the new MacBook Pro is by far the most powerful notebook we’ve ever made. With an immersive 16-inch Retina display, superfast processors, next-generation graphics, the largest battery capacity ever in a MacBook Pro, a new Magic Keyboard, and massive storage, it’s the ultimate pro notebook for the ultimate user.'],
    ['name' => 'Dell XPS 13', 'price' => 999.99, 'description' => 'The XPS 13 is the ultimate ultraportable laptop. With a 13.4-inch InfinityEdge display, 11th Gen Intel Core processors, and up to 16GB of RAM, this laptop is designed to keep up with your busy lifestyle.'],
    ['name' => 'LG OLED CX Series 4K Smart TV', 'price' => 1799.99, 'description' => 'Experience stunning picture quality with the LG OLED CX Series 4K Smart TV. With self-lit pixels, this TV delivers perfect black and infinite contrast, while the a9 Gen 3 AI Processor 4K provides true-to-life images with incredibly rich colors, sharpness, and depth.'],
    ['name' => 'Bose QuietComfort 35 II Wireless Headphones', 'price' => 299.00, 'description' => 'The Bose QuietComfort 35 II Wireless Headphones are engineered with world-class noise cancellation. And now they’re even better. With your Google Assistant and Amazon Alexa built-in, you can control music, send and receive texts, and get answers using just your voice.'],
    ['name' => 'Apple AirPods Pro', 'price' => 249.00, 'description' => 'Active Noise Cancellation for immersive sound. Transparency mode for hearing and connecting with the world around you. A more customizable fit for all-day comfort. Sweat and water resistant. All in a super light, in-ear headphone that’s easy to set up with all your Apple devices.'],
    ['name' => 'Logitech MX Master 3 Wireless Mouse', 'price' => 99.99, 'description' => 'The Logitech MX Master 3 Wireless Mouse is the ultimate precision mouse for power users. Harness the power of Logitech Flow and seamlessly move content between three computers. Scroll through documents and web pages faster and easier with the hyper-fast scroll wheel.'],
    ['name' => 'Samsung Galaxy Z Fold2 5G', 'price' => 1999.99, 'description' => 'Introducing the Samsung Galaxy Z Fold2 5G, the ultimate foldable smartphone experience. With a 7.6-inch Dynamic AMOLED 2X display, 12GB of RAM, and 5G connectivity, this phone is designed to take your mobile experience to the next level.'],
    ['name' => 'Google Pixel 5', 'price' => 699.00, 'description' => 'Meet Pixel 5, the ultimate Google phone. With a 6.0-inch OLED display, 5G connectivity, and an amazing camera, this phone is designed to keep you connected and capture your memories in stunning detail.'],
    ['name' => 'Amazon Echo Dot (4th Gen)', 'price' => 49.99, 'description' => 'Meet the all-new Echo Dot - Our most popular smart speaker with Alexa. The sleek, compact design delivers crisp vocals and balanced bass for full sound.'],
    ['name' => 'Fitbit Sense', 'price' => 329.95, 'description' => 'Meet Fitbit Sense—the advanced smartwatch that helps you tune in to your body and guides you toward better health.'],
    ['name' => 'GoPro HERO9 Black', 'price' => 449.99, 'description' => 'More power. More clarity. More stability. The groundbreaking HERO9 Black sports a beastly 23.6MP sensor for ridiculous 5K video and stunning 20MP photos. A dazzling new front display delivers a live preview for easy framing, while a large rear touch screen with touch zoom provides fast, intuitive control.'],
    ['name' => 'Razer Blade 15', 'price' => 1499.99, 'description' => 'The Razer Blade 15 is the world’s smallest 15.6-inch gaming laptop, striking the perfect balance of power and portability. We’ve redesigned the laptop to be more compact yet contain even more power and features. The larger, near-bezeless 15.6-inch display stretches edge-to-edge and is available with 144Hz refresh rates.'],
    ['name' => 'Canon EOS R5', 'price' => 3899.00, 'description' => 'The Canon EOS R5 is a full-frame mirrorless camera with groundbreaking features that will take your photography and filmmaking to the next level. With a 45MP sensor, 8K video recording, and advanced autofocus, this camera is designed to meet the needs of professional photographers and videographers.'],
    ['name' => 'Microsoft Surface Laptop 4', 'price' => 999.99, 'description' => 'The Microsoft Surface Laptop 4 is the ultimate laptop for productivity and creativity. With a 13.5-inch or 15-inch PixelSense touchscreen display, 11th Gen Intel Core processors, and up to 19 hours of battery life, this laptop is designed to keep up with your busy lifestyle.'],
    ['name' => 'Sony WH-1000XM4 Wireless Headphones', 'price' => 349.99, 'description' => 'Experience the next level of silence with the Sony WH-1000XM4 wireless headphones. With industry-leading noise cancellation, these headphones let you enjoy your music without any distractions.'],
    ['name' => 'Samsung Odyssey G9 Gaming Monitor', 'price' => 1499.99, 'description' => 'The Samsung Odyssey G9 is the ultimate gaming monitor. With a 49-inch curved display, 240Hz refresh rate, and 1ms response time, this monitor is designed to give you the ultimate gaming experience.'],
    ['name' => 'Apple iPad Pro (2021)', 'price' => 1099.00, 'description' => 'The Apple iPad Pro (2021) is the ultimate tablet for productivity and creativity. With a stunning Liquid Retina XDR display, M1 chip, and 5G connectivity, this tablet is designed to keep up with your busy lifestyle.'],
    ['name' => 'Sony A7S III', 'price' => 3499.99, 'description' => 'The Sony A7S III is a full-frame mirrorless camera designed for professional videographers. With 4K video recording, advanced autofocus, and a 12.1MP sensor, this camera is designed to capture stunning video in any lighting conditions.']
];

// recebe do JS
$text = $_GET["product"];

// lógica para buscar o produto

// devolve json com os campos
// error: true ou false
// message: mensagem informativa
// products: array com os produtos encontrados

