<?php 

//creating Main Page Sidebar
function _themename_sidebar_widgets() {
    register_sidebar(array(
        'id' =>'primary-sidebar',
        'name' => esc_html__('Primary Sidebar', '_themename'),
        'description' => esc_html__('This sidebar appears in the blogpost page.', '_themename'),
        'before_widget' => '<section id= "%1$s" class= "c-sidebar-widget u-margin-bottom-20 %2$s"> ',
        'after_widget' => '</section>',
        'before_title' => '<h5>',
        'after_title' => '</h5>'
    ));   
}

//creating Sidebars for footer by taking user input
$footer_layout = '3,3,3,3';
$columns= explode(',', $footer_layout);
$footer_bg = 'dark';
$widget_theme = '';
if($footer_bg == 'light'){
    $widget_theme = 'c-footer-widget--dark';
} else{
    $widget_theme = 'c-footer-widget--light';
}

foreach($columns as $i => $column) {
    register_sidebar(array(
        'id' =>'footer-sidebar-' . ($i +1),
        'name' => sprintf(esc_html__('Footer Widgets Column %s', '_themename'), $i+1),
        'description' => esc_html__('Footer Widgets', '_themename'),
        'before_widget' => '<section id= "%1$s" class= "c-footer-widget' . $widget_theme . ' %2$s"> ',
        'after_widget' => '</section>',
        'before_title' => '<h5>',
        'after_title' => '</h5>'
    ));
}

add_action('widgets_init', '_themename_sidebar_widgets');