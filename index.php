<?php get_header(); ?>

<?php if(have_posts()) { ?>

    <!-- if we have posts, we will start the loop, with the WHILE loop -->
    <?php while(have_posts()){ ?>
        <?php the_post(); ?>
        <h2>
            <a href = "<?php the_permalink() ?>" title = "<?php the_title_attribute(); ?>"><?php the_title() ?></a>
        </h2>

        <div>
            <?php shivitestthemes_post_meta(); ?>
        </div>

        <div>
            <?php the_excerpt(); ?>
        </div>

        <?php shivitestthemes_read_more_link(); ?>

    <?php } ?>
        <br><br>
    <?php the_posts_pagination( ); ?>

<?php } else { ?>
    <!-- else the following message will be displayed -->
    <!-- the __() will return the string in respective language- english/chinese/hindi -->
    <p> <?php  esc_html_e('Sorry, nothing matches your criteria.','shivitestthemes'); ?></p>
<?php } ?>

<?php

//$comments = 1;

// printf(_n('One comment', '%s Comments', $comments, 'shivitestthemes'), $comments);

$city = 'london';

//echo esc_html__('Your city is', 'shivitestthemes'). $city;

printf(
    esc_html__('Your city is %s', 'shivitestthemes'),
    $city
);

?>

<?php get_footer(); ?>