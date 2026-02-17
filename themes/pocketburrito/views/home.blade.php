<div>
    {{-- Hero Section - matches pocketburrito.ca --}}
    <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-[#0a0a1f] via-[#13132b] to-[#1a0a2e]"></div>
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#8b5cf6]/10 via-transparent to-transparent"></div>
        <div class="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
            <h1 class="text-4xl lg:text-6xl font-bold mb-6">
                <span class="bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">Premium Game Server</span>
                <br>
                <span class="text-white">Hosting Made Easy</span>
            </h1>
            <p class="text-lg text-muted max-w-2xl mx-auto mb-8">
                Instant setup. DDoS protection. 24/7 support. Host Minecraft, Valheim, Terraria, and 15+ popular games.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
                <a href="#services" class="px-8 py-3 text-white font-semibold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-[#6366f1]/25">
                    Order Your Server Now
                </a>
                <a href="https://pocketburrito.ca/games" class="px-8 py-3 text-white font-semibold bg-background-secondary border border-neutral/50 rounded-lg hover:border-primary/50 transition-colors">
                    Browse Games
                </a>
            </div>

            {{-- Stats --}}
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
                <div class="text-center">
                    <div class="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">99.9%</div>
                    <div class="text-sm text-muted mt-1">Uptime</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">15+</div>
                    <div class="text-sm text-muted mt-1">Games</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">24/7</div>
                    <div class="text-sm text-muted mt-1">Support</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">< 60s</div>
                    <div class="text-sm text-muted mt-1">Setup Time</div>
                </div>
            </div>
        </div>
    </div>

    {{-- Services Section --}}
    <div id="services" class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-base mb-3">Our Services</h2>
            <p class="text-muted">Choose from our range of game server hosting solutions</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            @foreach ($categories as $category)
            <div class="flex flex-col bg-background-secondary border border-neutral/50 rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 duration-300">
                @if ($category->image)
                <img src="{{ Storage::url($category->image) }}" alt="{{ $category->name }}"
                    class="w-full h-48 object-cover object-center">
                @endif
                <div class="p-6 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold text-base mb-2">{{ $category->name }}</h3>
                    @if(theme('show_category_description', true) && $category->description)
                    <article class="prose dark:prose-invert text-sm text-muted mb-4 flex-grow">
                        {!! $category->description !!}
                    </article>
                    @endif
                    <a href="{{ route('category.show', ['category' => $category->slug]) }}" wire:navigate class="mt-auto">
                        <span class="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                            View Plans
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                        </span>
                    </a>
                </div>
            </div>
            @endforeach
        </div>
    </div>

    {{-- CTA Section --}}
    <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] via-[#a855f7] to-[#ec4899]"></div>
        <div class="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 class="text-3xl font-bold text-white mb-4">Ready to Start Gaming?</h2>
            <p class="text-white/80 max-w-xl mx-auto mb-8">
                Join thousands of gamers hosting their servers with us. Setup takes less than 60 seconds.
            </p>
            <a href="#services" class="inline-block px-8 py-3 text-[#8b5cf6] font-semibold bg-white rounded-lg hover:bg-white/90 transition-colors">
                Create Your Server Now
            </a>
        </div>
    </div>

    {!! hook('pages.home') !!}
</div>
