<?php

function shivitestthemes_assets() {
    wp_enqueue_style('shivitestthemes-stylesheet', get_template_directory_uri() .'/dist/assests/css/bundle.css',
     array(), '1.0.0',  'all');

     //wp_enqueue_script('jquery');
     
     wp_enqueue_script('shivitestthemes-scripts', get_template_directory_uri() .'/dist/assests/js/bundle.js',
      array('jquery'),  true);
}

add_action('wp_enqueue_scripts', 'shivitestthemes_assets');



function shivitestthemes_admin_assets() {
    wp_enqueue_style('shivitestthemes-admin-stylesheet', get_template_directory_uri() .'/dist/assests/css/admin.css',
     array(), '1.0.0',  'all');


    wp_enqueue_script('shivitestthemes-admin-scripts', get_template_directory_uri() .'/dist/assests/js/admin.js',
     array(),true);
}

add_action('admin_enqueue_scripts', 'shivitestthemes_admin_assets');