<html lang="en" class="dark scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nexus 3D - Immersive WebGL Experience</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        cyber: {
                            900: '#030712',
                            800: '#0B0F19',
                            700: '#111827',
                            600: '#1F2937',
                            accent: '#06B6D4',
                            purple: '#8B5CF6',
                            pink: '#EC4899'
                        }
                    }
                }
            }
        }
    </script>
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts: Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <!-- Three.js Library CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #030712;
            color: #F3F4F6;
            overflow-x: hidden;
        }
        .font-mono-custom {
            font-family: 'JetBrains Mono', monospace;
        }
        .glass-panel {
            background: rgba(17, 24, 39, 0.7);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .glass-card {
            background: rgba(31, 41, 55, 0.4);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.3s ease;
        }
        .glass-card:hover {
            border-color: rgba(6, 182, 212, 0.4);
            box-shadow: 0 0 25px rgba(6, 182, 212, 0.15);
        }
        .neon-glow {
            text-shadow: 0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3);
        }
        .neon-border {
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.3), inset 0 0 15px rgba(6, 182, 212, 0.1);
        }
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #030712;
        }
        ::-webkit-scrollbar-thumb {
            background: #1F2937;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #06B6D4;
        }
    </style>
</head>
<body class="bg-cyber-900 text-gray-100 antialiased selection:bg-cyan-500 selection:text-white">

    <!-- Notification Modal / Toast -->
    <div id="toast" class="fixed bottom-5 right-5 z-50 transform translate-y-20 opacity-0 transition-all duration-300 glass-panel px-6 py-3 rounded-xl border border-cyan-500/30 text-cyan-300 flex items-center space-x-3 shadow-2xl">
        <i class="fa-solid fa-circle-info text-cyan-400"></i>
        <span id="toast-message">Notification message here</span>
    </div>

    <!-- Navigation Bar -->
    <header class="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-white/5 transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <!-- Logo -->
            <a href="#home" class="flex items-center space-x-3 group">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center neon-border group-hover:scale-105 transition-transform">
                    <i class="fa-solid fa-cube text-white text-lg"></i>
                </div>
                <span class="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-transparent">NEXUS<span class="text-cyan-400">3D</span></span>
            </a>

            <!-- Desktop Nav Links -->
            <nav class="hidden md:flex items-center space-x-8 font-medium text-sm text-gray-300">
                <a href="#home" class="hover:text-cyan-400 transition-colors">Home</a>
                <a href="#gallery" class="hover:text-cyan-400 transition-colors">3D Gallery</a>
                <a href="#features" class="hover:text-cyan-400 transition-colors">Capabilities</a>
                <a href="#customizer" class="hover:text-cyan-400 transition-colors">Studio Customizer</a>
                <a href="#about" class="hover:text-cyan-400 transition-colors">About</a>
                <a href="#contact" class="hover:text-cyan-400 transition-colors">Contact</a>
            </nav>

            <!-- Actions -->
            <div class="hidden md:flex items-center space-x-4">
                <a href="#customizer" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-200">
                    Launch Studio
                </a>
            </div>

            <!-- Mobile Menu Button -->
            <button id="mobile-menu-btn" class="md:hidden text-gray-300 hover:text-cyan-400 focus:outline-none p-2">
                <i class="fa-solid fa-bars text-2xl"></i>
            </button>
        </div>

        <!-- Mobile Menu Dropdown -->
        <div id="mobile-menu" class="hidden md:hidden glass-panel border-t border-white/5 px-6 py-6 space-y-4">
            <a href="#home" class="block text-gray-300 hover:text-cyan-400 font-medium">Home</a>
            <a href="#gallery" class="block text-gray-300 hover:text-cyan-400 font-medium">3D Gallery</a>
            <a href="#features" class="block text-gray-300 hover:text-cyan-400 font-medium">Capabilities</a>
            <a href="#customizer" class="block text-gray-300 hover:text-cyan-400 font-medium">Studio Customizer</a>
            <a href="#about" class="block text-gray-300 hover:text-cyan-400 font-medium">About</a>
            <a href="#contact" class="block text-gray-300 hover:text-cyan-400 font-medium">Contact</a>
            <div class="pt-2">
                <a href="#customizer" class="block text-center w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25">
                    Launch Studio
                </a>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section id="home" class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <!-- Background Grid overlay -->
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
            <!-- Hero Text Content -->
            <div class="lg:col-span-6 space-y-6 text-center lg:text-left">
                <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/35 text-cyan-300 text-xs font-medium tracking-wide uppercase">
                    <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                    <span>Next-Gen WebGL Engine v3.4</span>
                </div>
                <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
                    Experience The <span class="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Future of 3D</span> Web
                </h1>
                <p class="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                    Immerse yourself in high-performance real-time WebGL rendering. Explore complex interactive 3D models, customize geometry parameters on the fly, and discover unparalleled web aesthetics.
                </p>
                <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-5 pt-4">
                    <a href="#gallery" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all text-center flex items-center justify-center space-x-2">
                        <span>Explore Gallery</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>
                    <a href="#customizer" class="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel text-gray-200 font-semibold text-base hover:border-cyan-500/50 hover:bg-gray-800/60 transition-all text-center flex items-center justify-center space-x-2">
                        <i class="fa-solid fa-wand-magic-sparkles text-cyan-400"></i>
                        <span>Live Studio</span>
                    </a>
                </div>

                <!-- Stats Quick View -->
                <div class="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800/80 mt-8">
                    <div>
                        <div class="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono-custom">60 FPS</div>
                        <div class="text-xs text-gray-500 mt-1">Hardware Accelerated</div>
                    </div>
                    <div>
                        <div class="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono-custom">100%</div>
                        <div class="text-xs text-gray-500 mt-1">WebGL Compatible</div>
                    </div>
                    <div>
                        <div class="text-2xl sm:text-3xl font-extrabold text-pink-400 font-mono-custom">Zero-Lag</div>
                        <div class="text-xs text-gray-500 mt-1">Optimized Shaders</div>
                    </div>
                </div>
            </div>

            <!-- Hero 3D Canvas Container -->
            <div class="lg:col-span-6 relative flex items-center justify-center">
                <div class="w-full h-[450px] sm:h-[550px] glass-panel rounded-3xl overflow-hidden relative group border border-cyan-500/20 shadow-2xl shadow-cyan-950/50">
                    <div id="hero-canvas-container" class="w-full h-full cursor-grab active:cursor-grabbing"></div>
                    <div class="absolute bottom-4 left-4 right-4 pointer-events-none flex justify-between items-center text-xs text-gray-400 px-3 py-2 rounded-xl glass-panel">
                        <span class="flex items-center space-x-2"><i class="fa-solid fa-computer-mouse text-cyan-400"></i> <span>Drag to rotate 3D Torus</span></span>
                        <span class="font-mono-custom text-cyan-400">WebGL 2.0</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 3D Interactive Gallery Section -->
    <section id="gallery" class="py-24 relative bg-cyber-800/50 border-t border-b border-white/5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <h2 class="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono-custom">Interactive Exhibition</h2>
                <h3 class="text-3xl sm:text-5xl font-extrabold tracking-tight">Live 3D Model Gallery</h3>
                <p class="text-gray-400">Switch between different procedural geometries rendered in real time. Customize material shaders, wireframe modes, and rotation speed directly.</p>
            </div>

            <!-- Gallery Controls & Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <!-- Model Selector Sidebar -->
                <div class="lg:col-span-4 space-y-4">
                    <div class="glass-panel p-6 rounded-3xl space-y-6">
                        <h4 class="text-lg font-bold text-gray-200 flex items-center space-x-2">
                            <i class="fa-solid fa-shapes text-cyan-400"></i>
                            <span>Select 3D Model</span>
                        </h4>
                        <div class="space-y-3">
                            <button onclick="switchGalleryModel('torusKnot')" id="btn-torusKnot" class="gallery-btn w-full text-left px-5 py-4 rounded-2xl glass-card flex items-center justify-between group border-cyan-500/40 bg-cyan-500/10 text-cyan-300">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400"><i class="fa-solid fa-ring"></i></div>
                                    <div>
                                        <div class="font-semibold text-sm">Glowing Torus Knot</div>
                                        <div class="text-xs text-gray-400">Complex mathematical surface</div>
                                    </div>
                                </div>
                                <i class="fa-solid fa-chevron-right text-xs opacity-50 group-hover:opacity-150 transition-opacity"></i>
                            </button>

                            <button onclick="switchGalleryModel('cube')" id="btn-cube" class="gallery-btn w-full text-left px-5 py-4 rounded-2xl glass-card flex items-center justify-between group text-gray-300 hover:text-white">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400"><i class="fa-solid fa-cube"></i></div>
                                    <div>
                                        <div class="font-semibold text-sm">Prismatic Hypercube</div>
                                        <div class="text-xs text-gray-400">Multi-layered rotational cube</div>
                                    </div>
                                </div>
                                <i class="fa-solid fa-chevron-right text-xs opacity-50 group-hover:opacity-100 transition-opacity"></i>
                            </button>

                            <button onclick="switchGalleryModel('icosahedron')" id="btn-icosahedron" class="gallery-btn w-full text-left px-5 py-4 rounded-2xl glass-card flex items-center justify-between group text-gray-300 hover:text-white">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400"><i class="fa-solid fa-gem"></i></div>
                                    <div>
                                        <div class="font-semibold text-sm">Crystal Icosahedron</div>
                                        <div class="text-xs text-gray-400">Polyhedral geometric crystal</div>
                                    </div>
                                </div>
                                <i class="fa-solid fa-chevron-right text-xs opacity-50 group-hover:opacity-100 transition-opacity"></i>
                            </button>

                            <button onclick="switchGalleryModel('pyramid')" id="btn-pyramid" class="gallery-btn w-full text-left px-5 py-4 rounded-2xl glass-card flex items-center justify-between group text-gray-300 hover:text-white">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400"><i class="fa-solid fa-mountain"></i></div>
                                    <div>
                                        <div class="font-semibold text-sm">Quantum Pyramid</div>
                                        <div class="text-xs text-gray-400">Tetrahedral glowing monument</div>
                                    </div>
                                </div>
                                <i class="fa-solid fa-chevron-right text-xs opacity-50 group-hover:opacity-100 transition-opacity"></i>
                            </button>
                        </div>

                        <!-- Real-time Shader Toggles -->
                        <div class="pt-4 border-t border-white/5 space-y-4">
                            <h5 class="text-xs font-bold uppercase tracking-wider text-gray-400">Renderer Controls</h5>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-300">Wireframe Mode</span>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="gallery-wireframe" class="sr-only peer" onchange="toggleGalleryWireframe()">
                                    <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                                </label>
                            </div>
                            <div class="space-y-2">
                                <div class="flex justify-between text-xs text-gray-400">
                                    <span>Rotation Velocity</span>
                                    <span id="speed-val" class="text-cyan-400 font-mono-custom">1.0x</span>
                                </div>
                                <input type="range" id="gallery-speed" min="0" max="3" step="0.1" value="1" oninput="updateGallerySpeed(this.value)" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Active 3D Model Canvas View -->
                <div class="lg:col-span-8">
                    <div class="w-full h-[500px] sm:h-[600px] glass-panel rounded-3xl relative overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 flex flex-col">
                        <!-- Top Info Badge inside Canvas -->
                        <div class="absolute top-6 left-6 z-10 flex items-center space-x-3 glass-panel px-4 py-2 rounded-2xl">
                            <span class="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
                            <span id="active-model-title" class="text-sm font-semibold text-gray-200">Glowing Torus Knot</span>
                        </div>
                        <!-- Canvas Container -->
                        <div id="gallery-canvas-container" class="w-full h-full cursor-grab active:cursor-grabbing"></div>
                        <!-- Bottom Instructions -->
                        <div class="absolute bottom-6 left-6 right-6 z-10 flex flex-wrap justify-between items-center text-xs text-gray-400 px-4 py-3 rounded-2xl glass-panel">
                            <div class="flex items-center space-x-4">
                                <span><i class="fa-solid fa-rotate text-cyan-400 mr-1"></i> Left Click + Drag to Orbit</span>
                                <span><i class="fa-solid fa-magnifying-glass text-cyan-400 mr-1"></i> Scroll to Zoom</span>
                            </div>
                            <button onclick="resetCamera()" class="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors font-medium">Reset View</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features / Stats Section -->
    <section id="features" class="py-24 relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <h2 class="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono-custom">Performance & Architecture</h2>
                <h3 class="text-3xl sm:text-5xl font-extrabold tracking-tight">Engineered for Maximum Speed</h3>
                <p class="text-gray-400">Discover what makes our WebGL rendering pipeline stand out in modern web development.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Feature 1 -->
                <div class="glass-card p-8 rounded-3xl space-y-5 relative group overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                    <div class="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl neon-border">
                        <i class="fa-solid fa-bolt-lightning"></i>
                    </div>
                    <h4 class="text-xl font-bold text-white">60 FPS Hardware Acceleration</h4>
                    <p class="text-gray-400 text-sm leading-relaxed">
                        Optimized Three.js pipelines leverage direct GPU rendering via WebGL 2.0 to ensure silky smooth frame rates across all desktop and mobile devices.
                    </p>
                </div>

                <!-- Feature 2 -->
                <div class="glass-card p-8 rounded-3xl space-y-5 relative group overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
                    <div class="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 text-2xl neon-border">
                        <i class="fa-solid fa-layer-group"></i>
                    </div>
                    <h4 class="text-xl font-bold text-white">Procedural Material Shaders</h4>
                    <p class="text-gray-400 text-sm leading-relaxed">
                        Advanced MeshStandard and Custom shaders with metallic roughness, emissive glow maps, and realistic environmental reflections.
                    </p>
                </div>

                <!-- Feature 3 -->
                <div class="glass-card p-8 rounded-3xl space-y-5 relative group overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all"></div>
                    <div class="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-400 text-2xl neon-border">
                        <i class="fa-solid fa-mobile-screen-button"></i>
                    </div>
                    <h4 class="text-xl font-bold text-white">Fully Responsive & Touch Ready</h4>
                    <p class="text-gray-400 text-sm leading-relaxed">
                        Seamlessly adapt to any screen size. Touch gesture support for mobile orbit controls, pinch-to-zoom, and fluid resizing.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Customizer Section -->
    <section id="customizer" class="py-24 relative bg-cyber-800/50 border-t border-white/5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <h2 class="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono-custom">Interactive Studio</h2>
                <h3 class="text-3xl sm:text-5xl font-extrabold tracking-tight">Live 3D Customizer</h3>
                <p class="text-gray-400">Modify properties of the active 3D sculpture in real-time. Adjust colors, scale, metallic finish, and emission glow instantly.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <!-- Customizer Canvas View -->
                <div class="lg:col-span-8 order-2 lg:order-1">
                    <div class="w-full h-[500px] sm:h-[550px] glass-panel rounded-3xl relative overflow-hidden border border-cyan-500/30 shadow-2xl">
                        <div id="customizer-canvas-container" class="w-full h-full cursor-grab active:cursor-grabbing"></div>
                        <div class="absolute top-6 left-6 z-10 glass-panel px-4 py-2 rounded-xl text-xs text-cyan-300 font-mono-custom">
                            Studio Live Preview
                        </div>
                    </div>
                </div>

                <!-- Customizer Controls Panel -->
                <div class="lg:col-span-4 order-1 lg:order-2 space-y-6">
                    <div class="glass-panel p-8 rounded-3xl space-y-6">
                        <h4 class="text-lg font-bold text-white flex items-center space-x-2">
                            <i class="fa-solid fa-sliders text-cyan-400"></i>
                            <span>Parameters</span>
                        </h4>

                        <!-- Color Picker -->
                        <div class="space-y-2">
                            <label class="text-sm text-gray-300 flex justify-between">
                                <span>Base Color</span>
                                <span id="color-hex-label" class="font-mono-custom text-cyan-400">#06B6D4</span>
                            </label>
                            <div class="flex items-center space-x-3">
                                <input type="color" id="custom-color" value="#06B6D4" oninput="updateCustomizerColor(this.value)" class="w-12 h-12 rounded-xl bg-transparent cursor-pointer border border-white/10">
                                <div class="flex space-x-2 flex-1">
                                    <button onclick="presetColor('#06B6D4')" class="w-8 h-8 rounded-lg bg-cyan-500"></button>
                                    <button onclick="presetColor('#8B5CF6')" class="w-8 h-8 rounded-lg bg-purple-500"></button>
                                    <button onclick="presetColor('#EC4899')" class="w-8 h-8 rounded-lg bg-pink-500"></button>
                                    <button onclick="presetColor('#10B981')" class="w-8 h-8 rounded-lg bg-emerald-500"></button>
                                    <button onclick="presetColor('#F59E0B')" class="w-8 h-8 rounded-lg bg-amber-500"></button>
                                </div>
                            </div>
                        </div>

                        <!-- Scale Slider -->
                        <div class="space-y-2">
                            <div class="flex justify-between text-sm text-gray-300">
                                <span>Object Scale</span>
                                <span id="scale-val" class="text-cyan-400 font-mono-custom">1.0x</span>
                            </div>
                            <input type="range" id="custom-scale" min="0.5" max="1.8" step="0.1" value="1.0" oninput="updateCustomizerScale(this.value)" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400">
                        </div>

                        <!-- Metalness Slider -->
                        <div class="space-y-2">
                            <div class="flex justify-between text-sm text-gray-300">
                                <span>Metalness</span>
                                <span id="metalness-val" class="text-cyan-400 font-mono-custom">0.8</span>
                            </div>
                            <input type="range" id="custom-metalness" min="0" max="1" step="0.05" value="0.8" oninput="updateCustomizerMetalness(this.value)" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400">
                        </div>

                        <!-- Roughness Slider -->
                        <div class="space-y-2">
                            <div class="flex justify-between text-sm text-gray-300">
                                <span>Surface Roughness</span>
                                <span id="roughness-val" class="text-cyan-400 font-mono-custom">0.2</span>
                            </div>
                            <input type="range" id="custom-roughness" min="0" max="1" step="0.05" value="0.2" oninput="updateCustomizerRoughness(this.value)" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400">
                        </div>

                        <!-- Action Button -->
                        <button onclick="triggerStudioSnapshot()" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all">
                            Save / Apply Configuration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-24 relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-6 space-y-6">
                    <h2 class="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono-custom">About Nexus 3D</h2>
                    <h3 class="text-3xl sm:text-4xl font-extrabold tracking-tight">Pushing the Boundaries of Browser Graphics</h3>
                    <p class="text-gray-400 leading-relaxed">
                        Nexus 3D is crafted to showcase the immense potential of modern WebGL technologies. By combining vanilla JavaScript efficiency with the robustness of Three.js, we deliver rich, responsive, and immersive 3D experiences directly inside any standard web browser without plugins.
                    </p>
                    <div class="grid grid-cols-2 gap-6 pt-4">
                        <div class="glass-card p-5 rounded-2xl">
                            <div class="text-2xl font-extrabold text-cyan-400 font-mono-custom mb-1">2026</div>
                            <div class="text-xs text-gray-400">Next-Gen Web Standards</div>
                        </div>
                        <div class="glass-card p-5 rounded-2xl">
                            <div class="text-2xl font-extrabold text-purple-400 font-mono-custom mb-1">99.9%</div>
                            <div class="text-xs text-gray-400">Device Compatibility</div>
                        </div>
                    </div>
                </div>
                <div class="lg:col-span-6">
                    <div class="glass-panel p-8 rounded-3xl border border-cyan-500/20 space-y-6 relative overflow-hidden">
                        <div class="absolute -top-20 -right-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl"></div>
                        <h4 class="text-xl font-bold text-white">Core Technologies</h4>
                        <div class="space-y-4">
                            <div class="flex items-center space-x-4 p-4 rounded-2xl glass-card">
                                <div class="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-lg"><i class="fa-brands fa-js"></i></div>
                                <div>
                                    <div class="font-semibold text-sm">Vanilla JavaScript (ES6+)</div>
                                    <div class="text-xs text-gray-400">Lightweight architecture with zero heavy framework bloat.</div>
                                </div>
                            </div>
                            <div class="flex items-center space-x-4 p-4 rounded-2xl glass-card">
                                <div class="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 text-lg"><i class="fa-solid fa-cube"></i></div>
                                <div>
                                    <div class="font-semibold text-sm">Three.js / WebGL 2.0</div>
                                    <div class="text-xs text-gray-400">Advanced lighting, shaders, and geometry rendering.</div>
                                </div>
                            </div>
                            <div class="flex items-center space-x-4 p-4 rounded-2xl glass-card">
                                <div class="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 text-lg"><i class="fa-solid fa-paintbrush"></i></div>
                                <div>
                                    <div class="font-semibold text-sm">Tailwind CSS & Glassmorphism</div>
                                    <div class="text-xs text-gray-400">Modern futuristic aesthetics with blurred translucency.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-24 relative bg-cyber-800/50 border-t border-white/5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-2xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/20 shadow-2xl relative">
                <div class="text-center space-y-4 mb-8">
                    <h2 class="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono-custom">Get In Touch</h2>
                    <h3 class="text-3xl font-extrabold tracking-tight">Let's Build Something Immersive</h3>
                    <p class="text-gray-400 text-sm">Have a project in mind or want to collaborate on a 3D web experience? Send us a message.</p>
                </div>

                <form onsubmit="handleContactSubmit(event)" class="space-y-6">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label class="text-sm text-gray-300 font-medium">Your Name</label>
                            <input type="text" required placeholder="Alex Turner" class="w-full px-4 py-3 rounded-xl glass-card text-white focus:outline-none focus:border-cyan-500 border border-white/10 transition-colors">
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm text-gray-300 font-medium">Email Address</label>
                            <input type="email" required placeholder="alex@example.com" class="w-full px-4 py-3 rounded-xl glass-card text-white focus:outline-none focus:border-cyan-500 border border-white/10 transition-colors">
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm text-gray-300 font-medium">Message</label>
                        <textarea rows="4" required placeholder="Tell us about your 3D project requirements..." class="w-full px-4 py-3 rounded-xl glass-card text-white focus:outline-none focus:border-cyan-500 border border-white/10 transition-colors resize-none"></textarea>
                    </div>
                    <button type="submit" class="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] transition-all">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 border-t border-white/5 bg-cyber-900 text-center text-gray-500 text-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div class="flex items-center justify-center space-x-3">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white">
                    <i class="fa-solid fa-cube text-xs"></i>
                </div>
                <span class="text-lg font-bold text-white tracking-wider">NEXUS<span class="text-cyan-400">3D</span></span>
            </div>
            <p>&copy; 2026 Nexus 3D Studio. All rights reserved. Built with Three.js & Tailwind CSS.</p>
        </div>
    </footer>

    <!-- Three.js Application Logic -->
    <script>
        // --- Toast Notification Helper ---
        function showToast(message) {
            const toast = document.getElementById('toast');
            const msg = document.getElementById('toast-message');
            msg.textContent = message;
            toast.classList.remove('translate-y-20', 'opacity-0');
            setTimeout(() => {
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3500);
        }

        // --- Mobile Menu Toggle ---
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu on link click
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // --- 1. HERO SECTION 3D RENDERER (Floating Glowing Torus Knot) ---
        let heroScene, heroCamera, heroRenderer, heroMesh;
        function initHero3D() {
            const container = document.getElementById('hero-canvas-container');
            if (!container) return;

            heroScene = new THREE.Scene();
            heroCamera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
            heroCamera.position.z = 4;

            heroRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            heroRenderer.setSize(container.clientWidth, container.clientHeight);
            heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            container.appendChild(heroRenderer.domElement);

            // Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
            heroScene.add(ambientLight);

            const pointLight1 = new THREE.PointLight(0x06b6d4, 3, 50);
            pointLight1.position.set(5, 5, 5);
            heroScene.add(pointLight1);

            const pointLight2 = new THREE.PointLight(0x8b5cf6, 3, 50);
            pointLight2.position.set(-5, -5, -5);
            heroScene.add(pointLight2);

            // Torus Knot Geometry
            const geometry = new THREE.TorusKnotGeometry(1.1, 0.35, 128, 32);
            const material = new THREE.MeshStandardMaterial({
                color: 0x06b6d4,
                metalness: 0.85,
                roughness: 0.15,
                emissive: 0x032830,
                emissiveIntensity: 0.4
            });
            heroMesh = new THREE.Mesh(geometry, material);
            heroScene.add(heroMesh);

            // Mouse interaction on hero
            let mouseX = 0, mouseY = 0;
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
                mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
            });

            // Animation Loop
            function animateHero() {
                requestAnimationFrame(animateHero);
                heroMesh.rotation.x += 0.005;
                heroMesh.rotation.y += 0.008;

                // Subtle parallax based on mouse
                heroMesh.rotation.x += mouseY * 0.002;
                heroMesh.rotation.y += mouseX * 0.002;

                heroRenderer.render(heroScene, heroCamera);
            }
            animateHero();

            // Resize listener
            window.addEventListener('resize', () => {
                if (!container) return;
                heroCamera.aspect = container.clientWidth / container.clientHeight;
                heroCamera.updateProjectionMatrix();
                heroRenderer.setSize(container.clientWidth, container.clientHeight);
            });
        }

        // --- 2. GALLERY SECTION 3D RENDERER ---
        let galleryScene, galleryCamera, galleryRenderer, activeGalleryMesh = null;
        let galleryModelType = 'torusKnot';
        let galleryWireframe = false;
        let gallerySpeed = 1.0;
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        function initGallery3D() {
            const container = document.getElementById('gallery-canvas-container');
            if (!container) return;

            galleryScene = new THREE.Scene();
            galleryCamera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
            galleryCamera.position.z = 4;

            galleryRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            galleryRenderer.setSize(container.clientWidth, container.clientHeight);
            galleryRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            container.appendChild(galleryRenderer.domElement);

            // Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
            galleryScene.add(ambientLight);

            const pLight = new THREE.PointLight(0x8b5cf6, 4, 50);
            pLight.position.set(4, 4, 4);
            galleryScene.add(pLight);

            const pLight2 = new THREE.PointLight(0x06b6d4, 3, 50);
            pLight2.position.set(-4, -4, 4);
            galleryScene.add(pLight2);

            // Orbit drag interactions
            container.addEventListener('mousedown', (e) => {
                isDragging = true;
                previousMousePosition = { x: e.clientX, y: e.clientY };
            });

            window.addEventListener('mousemove', (e) => {
                if (!isDragging || !activeGalleryMesh) return;
                const deltaX = e.clientX - previousMousePosition.x;
                const deltaY = e.clientY - previousMousePosition.y;

                activeGalleryMesh.rotation.y += deltaX * 0.008;
                activeGalleryMesh.rotation.x += deltaY * 0.008;

                previousMousePosition = { x: e.clientX, y: e.clientY };
            });

            window.addEventListener('mouseup', () => { isDragging = false; });

            // Touch support for gallery
            container.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                    isDragging = true;
                    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                }
            });

            window.addEventListener('touchmove', (e) => {
                if (!isDragging || !activeGalleryMesh || e.touches.length !== 1) return;
                const deltaX = e.touches[0].clientX - previousMousePosition.x;
                const deltaY = e.touches[0].clientY - previousMousePosition.y;

                activeGalleryMesh.rotation.y += deltaX * 0.008;
                activeGalleryMesh.rotation.x += deltaY * 0.008;

                previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            });

            window.addEventListener('touchend', () => { isDragging = false; });

            // Load initial model
            loadGalleryModel(galleryModelType);

            // Animation Loop
            function animateGallery() {
                requestAnimationFrame(animateGallery);
                if (activeGalleryMesh && !isDragging) {
                    activeGalleryMesh.rotation.x += 0.004 * gallerySpeed;
                    activeGalleryMesh.rotation.y += 0.007 * gallerySpeed;
                }
                galleryRenderer.render(galleryScene, galleryCamera);
            }
            animateGallery();

            // Resize listener
            window.addEventListener('resize', () => {
                if (!container) return;
                galleryCamera.aspect = container.clientWidth / container.clientHeight;
                galleryCamera.updateProjectionMatrix();
                galleryRenderer.setSize(container.clientWidth, container.clientHeight);
            });
        }

        function loadGalleryModel(type) {
            if (activeGalleryMesh) {
                galleryScene.remove(activeGalleryMesh);
                activeGalleryMesh.geometry.dispose();
                activeGalleryMesh.material.dispose();
            }

            let geometry;
            let color = 0x06b6d4;
            let titleText = "Glowing Torus Knot";

            if (type === 'torusKnot') {
                geometry = new THREE.TorusKnotGeometry(1.1, 0.35, 128, 32);
                color = 0x06b6d4;
                titleText = "Glowing Torus Knot";
            } else if (type === 'cube') {
                geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);
                color = 0x8b5cf6;
                titleText = "Prismatic Hypercube";
            } else if (type === 'icosahedron') {
                geometry = new THREE.IcosahedronGeometry(1.4, 0);
                color = 0xec4899;
                titleText = "Crystal Icosahedron";
            } else if (type === 'pyramid') {
                geometry = new THREE.ConeGeometry(1.4, 1.8, 4);
                color = 0x3b82f6;
                titleText = "Quantum Pyramid";
            }

            const material = new THREE.MeshStandardMaterial({
                color: color,
                metalness: 0.8,
                roughness: 0.2,
                wireframe: galleryWireframe,
                emissive: color,
                emissiveIntensity: 0.3
            });

            activeGalleryMesh = new THREE.Mesh(geometry, material);
            galleryScene.add(activeGalleryMesh);
            document.getElementById('active-model-title').textContent = titleText;
        }

        function switchGalleryModel(type) {
            galleryModelType = type;
            loadGalleryModel(type);

            // Update button styles
            document.querySelectorAll('.gallery-btn').forEach(btn => {
                btn.classList.remove('border-cyan-500/40', 'bg-cyan-500/10', 'text-cyan-300');
                btn.classList.add('text-gray-300');
            });
            const activeBtn = document.getElementById('btn-' + type);
            if (activeBtn) {
                activeBtn.classList.add('border-cyan-500/40', 'bg-cyan-500/10', 'text-cyan-300');
                activeBtn.classList.remove('text-gray-300');
            }
            showToast("Switched active model view");
        }

        function toggleGalleryWireframe() {
            galleryWireframe = document.getElementById('gallery-wireframe').checked;
            if (activeGalleryMesh) {
                activeGalleryMesh.material.wireframe = galleryWireframe;
            }
        }

        function updateGallerySpeed(val) {
            gallerySpeed = parseFloat(val);
            document.getElementById('speed-val').textContent = val + 'x';
        }

        function resetCamera() {
            if (activeGalleryMesh) {
                activeGalleryMesh.rotation.set(0, 0, 0);
            }
            showToast("Camera view reset");
        }


        // --- 3. CUSTOMIZER SECTION 3D RENDERER ---
        let customizerScene, customizerCamera, customizerRenderer, customizerMesh;
        let customizerConfig = {
            color: '#06B6D4',
            scale: 1.0,
            metalness: 0.8,
            roughness: 0.2
        };

        function initCustomizer3D() {
            const container = document.getElementById('customizer-canvas-container');
            if (!container) return;

            customizerScene = new THREE.Scene();
            customizerCamera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
            customizerCamera.position.z = 4;

            customizerRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            customizerRenderer.setSize(container.clientWidth, container.clientHeight);
            customizerRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            container.appendChild(customizerRenderer.domElement);

            // Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
            customizerScene.add(ambientLight);

            const pLight1 = new THREE.PointLight(0xffffff, 4, 50);
            pLight1.position.set(5, 5, 5);
            customizerScene.add(pLight1);

            // Dodecahedron sculpture for Customizer
            const geometry = new THREE.DodecahedronGeometry(1.3, 0);
            const material = new THREE.MeshStandardMaterial({
                color: customizerConfig.color,
                metalness: customizerConfig.metalness,
                roughness: customizerConfig.roughness,
                emissive: customizerConfig.color,
                emissiveIntensity: 0.25
            });
            customizerMesh = new THREE.Mesh(geometry, material);
            customizerScene.add(customizerMesh);

            // Mouse drag rotate for customizer
            let isCustDragging = false;
            let custPrevMouse = { x: 0, y: 0 };

            container.addEventListener('mousedown', (e) => {
                isCustDragging = true;
                custPrevMouse = { x: e.clientX, y: e.clientY };
            });

            window.addEventListener('mousemove', (e) => {
                if (!isCustDragging || !customizerMesh) return;
                const dx = e.clientX - custPrevMouse.x;
                const dy = e.clientY - custPrevMouse.y;
                customizerMesh.rotation.y += dx * 0.008;
                customizerMesh.rotation.x += dy * 0.008;
                custPrevMouse = { x: e.clientX, y: e.clientY };
            });

            window.addEventListener('mouseup', () => { isCustDragging = false; });

            // Animation Loop
            function animateCustomizer() {
                requestAnimationFrame(animateCustomizer);
                if (customizerMesh && !isCustDragging) {
                    customizerMesh.rotation.y += 0.006;
                }
                customizerRenderer.render(customizerScene, customizerCamera);
            }
            animateCustomizer();

            // Resize listener
            window.addEventListener('resize', () => {
                if (!container) return;
                customizerCamera.aspect = container.clientWidth / container.clientHeight;
                customizerCamera.updateProjectionMatrix();
                customizerRenderer.setSize(container.clientWidth, container.clientHeight);
            });
        }

        function updateCustomizerColor(hex) {
            customizerConfig.color = hex;
            document.getElementById('color-hex-label').textContent = hex.toUpperCase();
            if (customizerMesh) {
                customizerMesh.material.color.set(hex);
                customizerMesh.material.emissive.set(hex);
            }
        }

        function presetColor(hex) {
            document.getElementById('custom-color').value = hex;
            updateCustomizerColor(hex);
        }

        function updateCustomizerScale(val) {
            customizerConfig.scale = parseFloat(val);
            document.getElementById('scale-val').textContent = val + 'x';
            if (customizerMesh) {
                customizerMesh.scale.set(val, val, val);
            }
        }

        function updateCustomizerMetalness(val) {
            customizerConfig.metalness = parseFloat(val);
            document.getElementById('metalness-val').textContent = val;
            if (customizerMesh) {
                customizerMesh.material.metalness = parseFloat(val);
            }
        }

        function updateCustomizerRoughness(val) {
            customizerConfig.roughness = parseFloat(val);
            document.getElementById('roughness-val').textContent = val;
            if (customizerMesh) {
                customizerMesh.material.roughness = parseFloat(val);
            }
        }

        function triggerStudioSnapshot() {
            showToast("Configuration successfully applied & saved!");
        }

        function handleContactSubmit(e) {
            e.preventDefault();
            showToast("Message sent successfully! We will get back to you shortly.");
            e.target.reset();
        }

        // Initialize all 3D viewports on window load
        window.onload = function() {
            initHero3D();
            initGallery3D();
            initCustomizer3D();
        };
    </script>
</body>
</html>
