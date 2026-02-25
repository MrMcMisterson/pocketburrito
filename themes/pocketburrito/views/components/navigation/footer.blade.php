<footer class="w-full bg-background border-t border-neutral/30 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {{-- Brand Column --}}
            <div class="col-span-1 md:col-span-2">
                <div class="flex items-center gap-2 mb-4">
                    <x-logo class="h-10" />
                    @if(theme('logo_display', 'logo-and-name') != 'logo-only')
                    <span class="text-xl font-bold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">{{ config('app.name') }}</span>
                    @endif
                </div>
                <p class="text-sm text-muted leading-relaxed">
                    Premium game server hosting with instant setup, DDoS protection, and 24/7 support.
                </p>
                {{-- Social Icons --}}
                <div class="flex items-center gap-3 mt-4">
                    <a href="https://discord.gg/gjjGWYY7" target="_blank" class="text-gray-400 hover:text-white transition" aria-label="Discord">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
                    </a>
                </div>
            </div>

            {{-- Quick Links --}}
            <div>
                <h3 class="text-sm font-semibold text-base uppercase tracking-wider mb-4">Quick Links</h3>
                <ul class="space-y-2">
                    <li><a href="https://pocketburrito.ca/games" class="text-gray-400 hover:text-white transition">Game Servers</a></li>
                    <li><a href="https://pocketburrito.ca/pricing" class="text-gray-400 hover:text-white transition">Pricing</a></li>
                    <li><a href="https://pocketburrito.ca/docs" class="text-gray-400 hover:text-white transition">Documentation</a></li>
                    <li><a href="{{ route('home') }}" class="text-gray-400 hover:text-white transition">Client Area</a></li>
                </ul>
            </div>

            {{-- Support --}}
            <div>
                <h3 class="text-sm font-semibold text-base uppercase tracking-wider mb-4">Support</h3>
                <ul class="space-y-2">
                    @auth
                    <li><a href="{{ route('tickets') }}" wire:navigate class="text-gray-400 hover:text-white transition">Submit Ticket</a></li>
                    @endauth
                    <li><a href="https://pocketburrito.ca/docs" class="text-gray-400 hover:text-white transition">Knowledge Base</a></li>
                    <li><a href="https://panel.pocketburrito.ca" class="text-gray-400 hover:text-white transition">Control Panel</a></li>
                    <li><a href="https://discord.gg/gjjGWYY7" target="_blank" class="text-gray-400 hover:text-white transition">Discord Community</a></li>
                </ul>
            </div>

            {{-- Legal --}}
            <div>
                <h3 class="text-sm font-semibold text-base uppercase tracking-wider mb-4">Legal</h3>
                <ul class="space-y-2">
                    <li><a href="https://pocketburrito.ca/terms" class="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                    <li><a href="https://pocketburrito.ca/privacy" class="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                    <li><a href="https://pocketburrito.ca/refund" class="text-gray-400 hover:text-white transition">Refund Policy</a></li>
                </ul>
            </div>
        </div>

        {{-- Bottom Bar --}}
        <div class="border-t border-neutral/30 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p class="text-sm text-muted">
                &copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
            </p>
            <a class="bg-background-secondary border border-neutral/50 px-3 py-1.5 rounded-lg transition-colors group flex items-center gap-2 text-muted/50 hover:text-muted text-xs" href="https://paymenter.org" target="_blank">
                <span class="font-medium tracking-tight">{{ __('Powered by') }}</span>
                <span class="font-bold">Paymenter</span>
            </a>
        </div>
    </div>
</footer>
