@php
    // Get Paymenter's dynamic Shop categories
    $paymenterLinks = \App\Classes\Navigation::getLinks();
    $shopLinks = array_filter($paymenterLinks, function($link) {
        return isset($link['children']) && count($link['children']) > 0;
    });
@endphp

<nav class="w-full bg-[#0a0a1f]/95 backdrop-blur-xl border-b border-[#8b5cf6]/20 h-14 flex items-center fixed top-0 z-20">
    <div class="w-full max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between h-14"
        x-data="{
            slideOverOpen: false,
            hasAside: !!document.getElementById('main-aside')
        }"
        x-init="$watch('slideOverOpen', value => { document.documentElement.style.overflow = value ? 'hidden' : '' })">

        {{-- Left: Logo --}}
        <a href="https://pocketburrito.ca" class="flex items-center gap-2 shrink-0">
            <x-logo class="h-8" />
            <span class="text-lg font-bold bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">PocketBurrito</span>
        </a>

        {{-- Right: Nav Links + Button grouped (matches pocketburrito.ca layout) --}}
        <div class="hidden md:flex items-center gap-6">
            <a href="https://pocketburrito.ca" class="text-sm font-medium text-gray-100 hover:text-white transition-colors">
                Home
            </a>
            <a href="https://pocketburrito.ca/games" class="text-sm font-medium text-gray-100 hover:text-white transition-colors">
                Games
            </a>

            {{-- Shop dropdown for Paymenter categories --}}
            @foreach ($shopLinks as $nav)
            <div class="relative">
                <x-dropdown>
                    <x-slot:trigger>
                        <span class="flex items-center text-sm font-medium text-gray-100 hover:text-white transition-colors cursor-pointer">
                            {{ $nav['name'] }}
                            <svg class="w-3.5 h-3.5 ml-1 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        </span>
                    </x-slot:trigger>
                    <x-slot:content>
                        @foreach ($nav['children'] as $child)
                        <x-navigation.link
                            :href="$child['url']"
                            :spa="isset($child['spa']) ? $nav['spa'] : true">
                            {{ $child['name'] }}
                        </x-navigation.link>
                        @endforeach
                    </x-slot:content>
                </x-dropdown>
            </div>
            @endforeach

            <a href="https://pocketburrito.ca/pricing" class="text-sm font-medium text-gray-100 hover:text-white transition-colors">
                Pricing
            </a>
            <a href="https://pocketburrito.ca/docs" class="text-sm font-medium text-gray-100 hover:text-white transition-colors">
                Docs
            </a>
            <a href="https://panel.pocketburrito.ca" class="text-sm font-medium text-gray-100 hover:text-white transition-colors">
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
                    <a href="https://panel.pocketburrito.ca" class="block px-3 py-2 text-sm text-base hover:text-primary transition-colors">
                        Control Panel
                    </a>
                    <livewire:auth.logout />
                </x-slot:content>
            </x-dropdown>
            @else
            <livewire:components.cart />
            <a href="{{ route('home') }}" wire:navigate class="px-5 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/80 rounded-full transition-colors">
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
                class="fixed left-0 right-0 top-14 w-full z-[99]"
                style="height:calc(100dvh - 3.5rem);"
                aria-modal="true"
                tabindex="-1">
                <div
                    x-show="slideOverOpen"
                    @click.away="slideOverOpen = false"
                    x-transition.opacity.duration.300ms
                    class="absolute inset-0 bg-[#0a0a1f] border-t border-[#8b5cf6]/20 shadow-lg overflow-y-auto flex flex-col">

                    <div class="flex flex-col h-full p-6">
                        <div class="flex-1 min-h-0 overflow-y-auto space-y-1">
                            <a href="https://pocketburrito.ca" class="block px-4 py-3 text-base font-medium text-white hover:text-[#8b5cf6] transition-colors rounded-lg hover:bg-white/5">Home</a>
                            <a href="https://pocketburrito.ca/games" class="block px-4 py-3 text-base font-medium text-white hover:text-[#8b5cf6] transition-colors rounded-lg hover:bg-white/5">Games</a>

                            @foreach ($shopLinks as $nav)
                            <div class="border-b border-[#8b5cf6]/10 pb-2 mb-2">
                                <span class="block px-4 py-2 text-xs font-semibold uppercase text-[#9ca3af] tracking-wider">{{ $nav['name'] }}</span>
                                @foreach ($nav['children'] as $child)
                                <a href="{{ $child['url'] }}" @if(!str_contains($child['url'], '#')) wire:navigate @endif class="block px-4 py-2 text-sm text-[#9ca3af] hover:text-[#8b5cf6] transition-colors">
                                    {{ $child['name'] }}
                                </a>
                                @endforeach
                            </div>
                            @endforeach

                            <a href="https://pocketburrito.ca/pricing" class="block px-4 py-3 text-base font-medium text-white hover:text-[#8b5cf6] transition-colors rounded-lg hover:bg-white/5">Pricing</a>
                            <a href="https://pocketburrito.ca/docs" class="block px-4 py-3 text-base font-medium text-white hover:text-[#8b5cf6] transition-colors rounded-lg hover:bg-white/5">Docs</a>
                            <a href="https://panel.pocketburrito.ca" class="block px-4 py-3 text-base font-medium text-white hover:text-[#8b5cf6] transition-colors rounded-lg hover:bg-white/5">Panel Login</a>
                        </div>

                        <div class="mt-4 pt-4 border-t border-[#8b5cf6]/10">
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
                                <a href="{{ $nav['url'] }}" wire:navigate class="block px-4 py-2 text-sm text-[#9ca3af] hover:text-[#8b5cf6] transition-colors">
                                    {{ $nav['name'] }}
                                </a>
                                @endforeach
                                <a href="https://panel.pocketburrito.ca" class="block px-4 py-2 text-sm text-[#9ca3af] hover:text-[#8b5cf6] transition-colors">
                                    Control Panel
                                </a>
                                <div class="pt-2">
                                    <livewire:auth.logout />
                                </div>
                            </div>
                            @else
                            <div class="flex flex-col gap-3">
                                <a href="{{ route('login') }}" wire:navigate>
                                    <x-button.secondary class="w-full">
                                        Login
                                    </x-button.secondary>
                                </a>
                                <a href="{{ route('home') }}" wire:navigate class="w-full text-center px-5 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary/80 rounded-full transition-colors">
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
