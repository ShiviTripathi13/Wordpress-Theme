<?php

function _themename_assets() {
    wp_enqueue_style('_themename-stylesheet', get_template_directory_uri() .'/dist/assests/css/bundle.css',
     array(), '1.0.0',  'all');

     //wp_enqueue_script('jquery');
     
     wp_enqueue_script(' _themename-scripts', get_template_directory_uri() .'/dist/assests/js/bundle.js',
      array('jquery'),  true);
}

add_action('wp_enqueue_scripts', '_themename_assets');



function _themename_admin_assets() {
    wp_enqueue_style('_themename-admin-stylesheet', get_template_directory_uri() .'/dist/assests/css/admin.css',
     array(), '1.0.0',  'all');


    wp_enqueue_script('_themename-admin-scripts', get_template_directory_uri() .'/dist/assests/js/admin.js',
     array(),true);
}

add_action('admin_enqueue_scripts', '_themename_admin_assets');