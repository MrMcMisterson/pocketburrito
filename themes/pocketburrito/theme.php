<?php

return [
    'name' => 'PocketBurrito',
    'author' => 'PocketBurrito',
    'url' => 'https://pocketburrito.ca',

    'settings' => [
        [
            'name' => 'direct_checkout',
            'label' => 'Direct Checkout',
            'type' => 'checkbox',
            'default' => false,
            'database_type' => 'boolean',
            'description' => 'Don\'t show the product overview page, go directly to the checkout page',
        ],
        [
            'name' => 'small_images',
            'label' => 'Small Images',
            'type' => 'checkbox',
            'default' => false,
            'database_type' => 'boolean',
            'description' => 'Show small images in the product overview page',
        ],
        [
            'name' => 'show_category_description',
            'label' => 'Show Category Description',
            'type' => 'checkbox',
            'default' => true,
            'database_type' => 'boolean',
            'description' => 'Show the category description in the product overview page/homepage',
        ],
        [
            'name' => 'logo_display',
            'label' => 'Logo display',
            'type' => 'select',
            'options' => [
                'logo-only' => 'Logo only',
                'logo-and-name' => 'Logo and Name',
            ],
            'default' => 'logo-and-name',
        ],
        [
            'name' => 'home_page_text',
            'label' => 'Home Page Text',
            'type' => 'markdown',
            'default' => 'Premium Game Server Hosting Made Easy',
        ],
        // PocketBurrito Brand Colors - Light Mode
        [
            'name' => 'primary',
            'label' => 'Primary - Brand Color (Light)',
            'type' => 'color',
            'default' => '#8b5cf6',
        ],
        [
            'name' => 'secondary',
            'label' => 'Secondary - Brand Color (Light)',
            'type' => 'color',
            'default' => '#ec4899',
        ],
        [
            'name' => 'neutral',
            'label' => 'Borders, Accents... (Light)',
            'type' => 'color',
            'default' => '#E2E8F0',
        ],
        [
            'name' => 'base',
            'label' => 'Base - Text Color (Light)',
            'type' => 'color',
            'default' => '#0F172A',
        ],
        [
            'name' => 'muted',
            'label' => 'Muted - Text Color (Light)',
            'type' => 'color',
            'default' => '#64748B',
        ],
        [
            'name' => 'inverted',
            'label' => 'Inverted - Text Color (Light)',
            'type' => 'color',
            'default' => '#FFFFFF',
        ],
        [
            'name' => 'background',
            'label' => 'Background - Color (Light)',
            'type' => 'color',
            'default' => '#FFFFFF',
        ],
        [
            'name' => 'background-secondary',
            'label' => 'Background - Secondary Color (Light)',
            'type' => 'color',
            'default' => '#F8FAFC',
        ],
        // PocketBurrito Brand Colors - Dark Mode
        [
            'name' => 'dark-primary',
            'label' => 'Primary - Brand Color (Dark)',
            'type' => 'color',
            'default' => '#6366f1',
        ],
        [
            'name' => 'dark-secondary',
            'label' => 'Secondary - Brand Color (Dark)',
            'type' => 'color',
            'default' => '#8b5cf6',
        ],
        [
            'name' => 'dark-neutral',
            'label' => 'Borders, Accents... (Dark)',
            'type' => 'color',
            'default' => '#1f2937',
        ],
        [
            'name' => 'dark-base',
            'label' => 'Base - Text Color (Dark)',
            'type' => 'color',
            'default' => '#F8FAFC',
        ],
        [
            'name' => 'dark-muted',
            'label' => 'Muted - Text Color (Dark)',
            'type' => 'color',
            'default' => '#9ca3af',
        ],
        [
            'name' => 'dark-inverted',
            'label' => 'Inverted - Text Color (Dark)',
            'type' => 'color',
            'default' => '#050810',
        ],
        [
            'name' => 'dark-background',
            'label' => 'Background - Color (Dark)',
            'type' => 'color',
            'default' => '#050810',
        ],
        [
            'name' => 'dark-background-secondary',
            'label' => 'Background - Secondary Color (Dark)',
            'type' => 'color',
            'default' => '#0a0e1a',
        ],
    ],
];
