@php
    // Get Paymenter's dynamic Shop categories
    $paymenterLinks = \App\Classes\Navigation::getLinks();
    $shopLinks = array_filter($paymenterLinks, function($link) {
        return isset($link['children']) && count($link['children']) > 0;
    });
@endphp

<nav class="w-full bg-[#0a0e1a]/95 backdrop-blur-sm border-b border-gray-800 h-16 flex items-center fixed top-0 z-50">
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
        x-data="{
            slideOverOpen: false,
            hasAside: !!document.getElementById('main-aside')
        }"
        x-init="$watch('slideOverOpen', value => { document.documentElement.style.overflow = value ? 'hidden' : '' })">

        {{-- Left: Logo --}}
        <a href="https://pocketburrito.ca" class="flex items-center gap-2 shrink-0">
            <x-logo class="h-8" />
            <span class="text-xl font-bold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">PocketBurrito</span>
        </a>

        {{-- Right: Nav Links + Button grouped (matches pocketburrito.ca layout) --}}
        <div class="hidden md:flex items-center gap-6">
            <a href="https://pocketburrito.ca" class="text-gray-300 hover:text-white transition">
                Home
            </a>
            <a href="https://pocketburrito.ca/games" class="text-gray-300 hover:text-white transition">
                Games
            </a>

            <a href="https://pocketburrito.ca/pricing" class="text-gray-300 hover:text-white transition">
                Pricing
            </a>
            <a href="https://pocketburrito.ca/docs" class="text-gray-300 hover:text-white transition">
                Docs
            </a>
            <a href="https://panel.pocketburrito.ca" class="text-gray-300 hover:text-white transition">
                Panel Login
            </a>

            @if(auth()->check())
            <livewire:components.cart />
            <livewire:components.notifications />
            <x-dropdown :showArrow="false">
                <x-slot:trigger>
                    <img src="{{ auth()->user()->avatar }}" class="size-8 rounded-full border-2 border-neutral bg-background hover:border-primary transition-colors" alt="avatar" />
                </x-slot:trigger>
                <x-slot:content>
                    <div class="flex flex-col p-2 border-b border-neutral">
                        <span class="text-sm text-base break-words font-semibold">{{ auth()->user()->name }}</span>
                        <span class="text-xs text-muted break-words">{{ auth()->user()->email }}</span>
                    </div>
                    @foreach (\App\Classes\Navigation::getAccountDropdownLinks() as $nav)
                    <x-navigation.link :href="$nav['url']" :spa="isset($nav['spa']) ? $nav['spa'] : true">
                        {{ $nav['name'] }}
                    </x-navigation.link>
                    @endforeach
                    <a href="{{ route('services') }}" wire:navigate class="block px-3 py-2 text-sm text-base hover:text-primary transition-colors">
                        Services
                    </a>
                    <a href="https://panel.pocketburrito.ca" class="block px-3 py-2 text-sm text-base hover:text-primary transition-colors">
                        Control Panel
                    </a>
                    <livewire:auth.logout />
                </x-slot:content>
            </x-dropdown>
            @else
            <a href="{{ route('login') }}" class="text-gray-300 hover:text-white transition">
                My Account
            </a>
            <a href="{{ route('home') }}" wire:navigate class="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#6366f1]/50 transition">
                Order Now
            </a>
            @endif

            {{-- Mobile Menu Button --}}
            <button
                @click="slideOverOpen = !slideOverOpen"
                class="relative w-10 h-10 flex lg:hidden items-center justify-center rounded-lg hover:bg-neutral/20 transition"
                aria-label="Toggle Menu">
                <span x-show="!slideOverOpen" class="absolute inset-0 flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </span>
                <span x-show="slideOverOpen" class="absolute inset-0 flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </span>
            </button>
        </div>

        {{-- Mobile Slide-Over Menu --}}
        <template x-teleport="body">
            <div
                x-show="slideOverOpen"
                @keydown.window.escape="slideOverOpen=false"
                x-cloak
                class="fixed left-0 right-0 top-16 w-full z-[99]"
                style="height:calc(100dvh - 4rem);"
                aria-modal="true"
                tabindex="-1">
                <div
                    x-show="slideOverOpen"
                    @click.away="slideOverOpen = false"
                    x-transition.opacity.duration.300ms
                    class="absolute inset-0 bg-[#0a0e1a] border-t border-gray-800 shadow-lg overflow-y-auto flex flex-col">

                    <div class="flex flex-col h-full p-6">
                        <div class="flex-1 min-h-0 overflow-y-auto space-y-1">
                            <a href="https://pocketburrito.ca" class="block px-4 py-3 text-base font-medium text-white hover:text-white transition-colors rounded-lg hover:bg-white/5">Home</a>
                            <a href="https://pocketburrito.ca/games" class="block px-4 py-3 text-base font-medium text-white hover:text-white transition-colors rounded-lg hover:bg-white/5">Games</a>

                            <a href="https://pocketburrito.ca/pricing" class="block px-4 py-3 text-base font-medium text-white hover:text-white transition-colors rounded-lg hover:bg-white/5">Pricing</a>
                            <a href="https://pocketburrito.ca/docs" class="block px-4 py-3 text-base font-medium text-white hover:text-white transition-colors rounded-lg hover:bg-white/5">Docs</a>
                            <a href="https://panel.pocketburrito.ca" class="block px-4 py-3 text-base font-medium text-white hover:text-white transition-colors rounded-lg hover:bg-white/5">Panel Login</a>
                        </div>

                        <div class="mt-4 pt-4 border-t border-gray-800">
                            @if(auth()->check())
                            <div class="flex gap-3 items-center mb-4">
                                <img src="{{ auth()->user()->avatar }}" class="size-10 rounded-full border border-neutral bg-background" alt="avatar" />
                                <div class="flex flex-col">
                                    <span class="font-bold text-sm text-white">{{ auth()->user()->name }}</span>
                                    <span class="text-xs text-[#9ca3af]">{{ auth()->user()->email }}</span>
                                </div>
                            </div>
                            <div class="space-y-1">
                                @foreach (\App\Classes\Navigation::getAccountDropdownLinks() as $nav)
                                <a href="{{ $nav['url'] }}" wire:navigate class="block px-4 py-2 text-sm text-[#9ca3af] hover:text-white transition-colors">
                                    {{ $nav['name'] }}
                                </a>
                                @endforeach
                                <a href="{{ route('services') }}" wire:navigate class="block px-4 py-2 text-sm text-[#9ca3af] hover:text-white transition-colors">
                                    Services
                                </a>
                                <a href="https://panel.pocketburrito.ca" class="block px-4 py-2 text-sm text-[#9ca3af] hover:text-white transition-colors">
                                    Control Panel
                                </a>
                                <div class="pt-2">
                                    <livewire:auth.logout />
                                </div>
                            </div>
                            @else
                            <div class="flex flex-col gap-3">
                                <a href="{{ route('login') }}" wire:navigate class="block text-[#9ca3af] hover:text-white transition-colors text-center">
                                    My Account
                                </a>
                                <a href="{{ route('home') }}" wire:navigate class="block bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white px-6 py-2 rounded-lg font-semibold text-center">
                                    Order Now
                                </a>
                            </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</nav>
